@echo off
pushd "%~dp0"

set BRANCH=zhejiang-jinhua
set copy_path=Egret\bin-release\web\dev
set dst_lobby=.\Lobby\Egret\resource\games\ZJJHMahjong

set lobby_name=Lobby
rem ===============================================
rem °æ±¾±àÒë
rem ===============================================
if exist Scripts\NUL (
	xcopy Scripts bin-release\web\dev\Scripts\ /E /D
)
if exist error.txt  del error.txt /f /q

upa %lobby_name% git@git.code4.in:Mahjong/MahjongLobby.git %BRANCH%

rmdir /S /Q %copy_path%\resource
del /Q %copy_path%\*.*

rmdir /S /Q %dst_lobby%\resource
del /Q %dst_lobby%\*.*

pushd "%~dp0\Egret"
echo ----------------------------
echo egret build -e
call egret build -e
call egret publish --version dev --runtime html5
popd

rem ===============================================
rem ¿½±´µ½´óÌüÄ¿Â¼
rem ===============================================
xcopy %copy_path%\resource %dst_lobby%\resource /e /i /h
xcopy %copy_path%\main.min.js %dst_lobby%

popd

if "%1"=="" pause