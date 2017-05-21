@echo off
pushd "%~dp0"

set BRANCH=master

if not exist Egret\egretProperties.json copy Egret\egretProperties.json.example Egret\egretProperties.json

upa . git@git.code4.in:Poker/doudizhu2.git %BRANCH%
upa ..\doudizhu2Common git@git.code4.in:Poker/doudizhu2Common.git %BRANCH%
upa ..\..\libsrc\uniLib git@git.code4.in:uni_h5/uniLib_h5.git

popd
if "%1"=="" pause