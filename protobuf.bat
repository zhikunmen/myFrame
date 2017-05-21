@echo off
pushd %~dp0

set cmd=..\doudizhuCommon\protobuf
set dst=Egret\src\common

del /Q /S "%dst%\*.ts"

del /Q /S "%cmd%\*.ts"
call protogx typescript "%cmd%"
xcopy "%cmd%\*.ts" "%dst%" /Y /F

popd
if "%1"=="" pause

