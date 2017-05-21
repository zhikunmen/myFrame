@echo off
pushd "%~dp0\Egret"

set BRANCH=master
set dst=..\release
set temp=bin-release\web\dev
call ImageStudio

rem ===============================================
rem 版本编译
rem ===============================================
if exist Scripts\NUL (
	xcopy Scripts bin-release\web\dev\Scripts\ /E /D
)

if exist error.txt  del error.txt /f /q

echo ----------------------------
echo egret build -e
call egret build -e

echo ----------------------------
echo egret publish --version dev
call egret publish --version dev

rem ===============================================
rem 发布内容优化
rem ===============================================
ImageOptimize 15 "%temp%\resource\assets\game\effects"
ImageOptimize 15 "%temp%\resource\assets\game\font"
ImageOptimize 15 "%temp%\resource\assets\game\game"
for /f "tokens=* delims=" %%i in ('dir /b /s "%temp%\resource\*.json"') do (
	echo [OPTIMIZE] %%i
	jsmin < "%%i" > "%%i~"
	move /Y "%%i~" "%%i"
)
for /f "tokens=* delims=" %%i in ('dir /b /s "%temp%\resource\*.exml"') do (
	echo [OPTIMIZE] %%i
	call VersionTool xmlmin "%%i"
)

rem ===============================================
rem 拷贝到发布目录
rem ===============================================
upa %dst% git@git.code4.in:Mahjong/MahjongClient.release.git %BRANCH%

rmdir /S /Q %dst%\libs
rmdir /S /Q %dst%\resource
del /Q %dst%\*.*
xcopy %temp%\* %dst% /S

popd

if "%1"=="" pause