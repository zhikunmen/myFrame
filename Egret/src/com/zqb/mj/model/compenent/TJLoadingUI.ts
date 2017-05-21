//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class TJLoadingUI extends egret.Sprite {
    public constructor() {
        super();
        this.init();
    }
    private back: egret.Sprite = new egret.Sprite;
    private _loadingBG: egret.Bitmap = new egret.Bitmap;
    private _loadingLogo:egret.Bitmap=new egret.Bitmap;
    private promptText: egret.TextField = new egret.TextField;
    private loadPanel:egret.Sprite = new egret.Sprite;
    private text: Array<any> = [
        "",
        "",
        ""
    ]

    private init(): void {
        this.back = uniLib.DisplayUtils.createMask(1,uniLib.Global.screenWidth,uniLib.Global.screenHeight,0x000000);
        this.back.touchEnabled = false;
        this.addChild(this.back);
        RES.getResByUrl("resource/assets/preLoad_bg.png",function(texture: egret.Texture) {
            this._loadingBG.texture = texture;
            this._loadingBG.anchorOffsetX = this._loadingBG.width * 0.5;
            this._loadingBG.anchorOffsetY = this._loadingBG.height * 0.5;
            this._loadingBG.x = uniLib.Global.screenWidth / 2;
            this._loadingBG.y = uniLib.Global.screenHeight / 2;
            this.back.addChild(this._loadingBG);
            // this.loadPanel.addChild(this._loadingLogo);
            // this.promptText.text = this.text[Math.floor(Math.random() * 3)];
            // this.promptText.x = (640 - this.promptText.width) / 2;
            // this.promptText.y = (1136 - this.promptText.height) / 2 + 180;
            // this.addChild(this.promptText);
            egret.Tween.get(this._loadingBG,{ loop: true }).to({ rotation: 3600 },30000);
        },this,RES.ResourceItem.TYPE_IMAGE);

        RES.getResByUrl("resource/assets/preLoad_icon.png",function(texture: egret.Texture) {
            this._loadingLogo.texture = texture;
            this._loadingLogo.anchorOffsetX = this._loadingLogo.width * 0.5;
            this._loadingLogo.anchorOffsetY = this._loadingLogo.height * 0.5;
            this._loadingLogo.x = uniLib.Global.screenWidth / 2;
            this._loadingLogo.y = uniLib.Global.screenHeight / 2;
            this.addChild(this._loadingLogo);
            // this.promptText.text = this.text[Math.floor(Math.random() * 3)];
            // this.promptText.x = (640 - this.promptText.width) / 2;
            // this.promptText.y = (1136 - this.promptText.height) / 2 + 180;
            // this.addChild(this.promptText);
        },this,RES.ResourceItem.TYPE_IMAGE);

    }

    private onAddToStage(e: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        egret.Tween.get(this._loadingBG,{ loop: true }).to({ rotation: 360 },600);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
    }

    public setProgress(txt: any,cur: number,gpName: string) {

    }

    private onRemoveFromStage(e: egret.Event): void {
        egret.Tween.removeTweens(this._loadingBG);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
    }
}
