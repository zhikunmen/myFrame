@echo off
pushd "%~dp0"

set src=..\doudizhu2Common\resource
set dst=Egret\resource\assets\game

call ImageStudio

rem =========================================
rem game - normal atlas
rem =========================================
del /Q /S %dst%\game\*.json;%dst%\game\*.png
del /Q %src%\game\*.json;%src%\game\*.png
call ImagePack egret %src%\game\* -margin:1
move /Y %src%\game\*.json %dst%\game
move /Y %src%\game\*.png %dst%\game



rem =========================================
rem mc - MovieClip
rem =========================================
rem del /Q /S %dst%\mc\*.json;%dst%\mc\*.png
rem del /Q %src%\mc\*.json;%src%\mc\*.png
rem call ImagePack egret %src%\mc\* -margin:1
rem move /Y %src%\mc\*.json %dst%\mc
rem move /Y %src%\mc\*.png %dst%\mc
rem Tools\bin\CreateMovieClip.exe single.json %dst%\mc

popd
if "%1"=="" pause
