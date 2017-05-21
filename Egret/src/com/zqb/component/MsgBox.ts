module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class MsgBox extends egret.Sprite{
        private yesBtn: GameButton;
        private noBtn: GameButton;
        private title: egret.TextField;
        private info: egret.TextField;
        private _backFn: Array<Function>;
        private _backObj: any;
        private _needClose:boolean;//是否需要closeBtn
		public constructor(needClose:boolean) {
            super();
            this.touchEnabled = true;
            this._needClose = needClose;
            this.initUI();
		}
		private initUI():void{
            var bg: egret.Bitmap = ResUtil.createBitmapByName("msgBoxBg");
            bg.scale9Grid=new egret.Rectangle(180,60,90,60);
            bg.width=635;
            bg.height=391;
            this.addChild(bg);
            this.title = ResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.CENTER,"",32,140,18,191);
            this.info = ResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.CENTER,"",32,110,39,393);
            this.info.height = 200;
            this.info.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.info.lineSpacing=2;
            this.addChild(this.info);
            this.addChild(this.title);
            if(this._needClose){
                var closeBtn: GameButton = new GameButton(["userInfo_close1","userInfo_close2"]);
                closeBtn.x = bg.width-61;
                closeBtn.y = -10;
                closeBtn.addClickArea(20);
                closeBtn.touchEnabled = true;
                closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
                this.addChild(closeBtn);
            }
		}
        private onClose(evt:egret.TouchEvent):void{
            PopupManager.removePopUp(this);
            this.destory();
        }
        public setData(title: string,msg: string,labelarr: Array<any> = null,backFn: Array<Function> = null,backObject: any = null,countdown:number = 0):void
		{
            this._backFn = backFn;
            this._backObj = backObject;
            this.title.text = title;
            this.info.text = msg;
            // if(this.info.textHeight < 145)
            // {
            //     this.info.y = 16 + (145 - this.info.textHeight) / 2;
            // }else{
            //     this.info.y = 36; 
            // }
            if(labelarr.length==1){
                this.yesBtn = new GameButton(["button11","button12"])//,labelarr[0]);
                this.yesBtn.x = Math.round((this.width - this.yesBtn.width) / 2);
                this.yesBtn.y = this.height-105;
                this.addChild(this.yesBtn);
                let yesWord = ResUtil.createBitmapByName("word_sure",65,8);
                this.yesBtn.addChild(yesWord);
            } else if(labelarr.length == 2){
                this.yesBtn = new GameButton(["button11","button12"])//,labelarr[0]);
                this.yesBtn.x = 36;
                this.yesBtn.y = 290;
                this.addChild(this.yesBtn);
                let yesWord = ResUtil.createBitmapByName("word_sure",65,8);
                this.yesBtn.addChild(yesWord);
                this.noBtn = new GameButton(["button21","button22"])//,labelarr[1]);
                this.noBtn.x = 336;
                this.noBtn.y = 290;
                this.addChild(this.noBtn);
                let noWord = ResUtil.createBitmapByName("word_cancel",65,8);
                this.noBtn.addChild(noWord);
            }
            if(this._backFn && this._backFn[0]) {
                this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this._backFn[0],this._backObj);
            }
            if(this._backFn && this._backFn[1]) {
                this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this._backFn[1],this._backObj);
            }
            if(this.yesBtn){
                this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
            }
            if(this.noBtn) {
                this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
            }
		}
		public destory():void{
            if(this.yesBtn){
                if(this._backFn && this._backFn[0]) {
                    this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this._backFn[0],this._backObj);
                }
                this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
                uniLib.DisplayUtils.removeAllChildren(this.yesBtn);
                uniLib.DisplayUtils.removeFromParent(this.yesBtn);
                this.yesBtn = null;
            }
            if(this.noBtn) {
                this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
                if(this._backFn && this._backFn[1]) {
                    this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this._backFn[1],this._backObj);
                }
                uniLib.DisplayUtils.removeAllChildren(this.noBtn);
                uniLib.DisplayUtils.removeFromParent(this.noBtn);
                this.noBtn = null;
            }
            this.title = null;
            this.info = null;
            this._backFn = null;
            this._backObj = null;
            ResUtil.removeFromParent(this);
            ResUtil.removeAllChildren(this);
		}
		
	}
}
