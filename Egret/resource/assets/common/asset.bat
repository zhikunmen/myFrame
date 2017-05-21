@echo off
pushd "%~dp0"

set src=.\原始散图资源
set dst=.\resource
set mcSrc=.\原始序列帧资源
set mcDst=.\
call ImageStudio

rem =========================================
rem game - normal atlas
rem =========================================
del /Q /S %dst%\game\*.json;%dst%\game\*.png
del /Q %src%\game\*.json;%src%\game\*.png
call ImagePack egret %src%\game\* -margin:1
move /Y %src%\game\*.json %dst%\game
move /Y %src%\game\*.png %dst%\game

REM rem =========================================
rem rem mc - movieclip
rem rem =========================================
REM del /q /s %mcDst%\mc\*.json;%mcDst%\mc\*.png
REM del /q %mcSrc%\mc\*.json;%mcSrc%\mc\*.png
REM call imagepack egret %mcSrc%\mc\* -margin:1
REM move /y %mcSrc%\mc\*.json %mcDst%\mc
REM move /y %mcSrc%\mc\*.png %mcDst%\mc
REM Tools\bin\createmovieclip.exe single.json %mcDst%\mc

popd
if "%1"=="" pause
