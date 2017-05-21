@echo off
pushd "%~dp0\Egret"

set BRANCH=master
set dst=..\release.ios
set temp=bin-release\web\dev
set temp2=..\Lobby\Egret\bin-release\native\dev
set lobbyDst=..\Lobby
set lobby=..\Lobby\Egret\resource\games\LYMahjong
call ImageStudio

rem ===============================================
rem °æ±¾±àÒë
rem ===============================================
if exist Scripts\NUL (
	xcopy Scripts bin-release\web\dev\Scripts\ /E /D
)

if exist error.txt  del error.txt /f /q

echo ----------------------------
echo egret build -e
call egret build -e

echo ----------------------------
rmdir /S /Q %temp%\resource
del /Q %temp%\*.*
call egret publish --version dev --runtime html5
rem ===============================================
rem ¿½±´µ½´óÌüÄ¿Â¼
rem ===============================================
upa %lobbyDst% git@git.code4.in:Mahjong/MahjongLobby.git %BRANCH%
rmdir /S /Q %lobby%\resource
del /Q %lobby%\*.*
xcopy %temp%\resource %lobby%\resource /e /i /h
xcopy %temp%\main.min.js %lobby%


upa %dst% git@git.code4.in:Mahjong/MahjongIos.git %BRANCH%
pushd "%~dp0\lobby\egret"
echo ----------------------------
echo egret build -e
call egret build -e
echo egret publish --version dev --runtime native
call egret publish --version dev --runtime native
pushd "%~dp0\Egret"

rmdir /s /q %dst%\resources\egret-game\resource
del /q %dst%\resources\egret-game\*.*
xcopy %temp2%\* %dst%\resources\egret-game /s

popd

if "%1"=="" pause