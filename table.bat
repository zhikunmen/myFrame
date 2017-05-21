@echo off
pushd %~dp0

set table=..\doudizhu2Common\table
call %table%\make.bat continue

del /Q /S Egret\src\table\*.ts
xcopy %table%\*.ts Egret\src\table /S /Y /F

del /Q /S Egret\resource\assets\table\*.json
xcopy %table%\*.json Egret\resource\assets\table /S /Y /F
del /Q /S Egret\resource\assets\table\*.server.json

popd
if "%1"=="" pause
