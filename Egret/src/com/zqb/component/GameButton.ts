module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameButton extends egret.Sprite{
        private lable: egret.TextField;
        private srcArr: Array<string>;
        private _icon: egret.Bitmap;
        private _labelTxt: egret.TextField;
        private _label: string;
        private _area:egret.Sprite;
        private _autoDestory:boolean;
        public constructor(arr: Array<string>,label:string=null,autoDestory:boolean=true) {
            super();
            this.srcArr = arr;
            this._label = label;
            this._autoDestory=autoDestory;
            this.initUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
		}
        private onRemove(evt:egret.Event):void{
            if(this._autoDestory){
                this.destory();
            }
        }
        private initUI(): void {
            var src: string;
            src = this.srcArr[0];
            if(!this._icon) {
                this._icon = ResUtil.createBitmapByName(src);
                this.addChild(this._icon);
            } else {
                this._icon.texture = ResUtil.createTexture(src);
            }
            if(this._label){
                this._labelTxt = ResUtil.createTextFeild(0xFFFFFF,egret.HorizontalAlign.CENTER,this._label,25,0,8,this._icon.width);
                this.addChild(this._labelTxt);
            }
            this.setEnable(true);
            this.name = src;
        }
        private onTouchBegin(evt:egret.TouchEvent):void{
            this._icon.texture = ResUtil.createTexture(this.srcArr[1]);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this); 
        }
        private onTouchEnd(evt: egret.TouchEvent): void {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this); 
            this._icon.texture = ResUtil.createTexture(this.srcArr[0]);
           
        }
        public addClickArea(num:number):void{
            if(!this._area){
                this._area=new egret.Sprite();
                this._area.touchEnabled=true;
                this.addChild(this._area)
            }
            this._area.graphics.clear();
			this._area.graphics.beginFill(0xff0000,0);
			this._area.graphics.drawRect(-num,-num,this._icon.width+num*2,this._icon.height+num*2);
            this._area.graphics.endFill();
        }

        public setEnable(value:boolean){
            if(value){
                this.touchEnabled = true;
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
                this._icon.texture = ResUtil.createTexture(this.srcArr[0]);
            }
            else{
                this.touchEnabled = false;
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
                if (this.srcArr[2]) {
                    this._icon.texture = ResUtil.createTexture(this.srcArr[2]);
                }else {
                    this._icon.texture = ResUtil.createTexture(this.srcArr[1]);
                }
            }
        }
        public destory():void{
            this.touchEnabled = false;
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this); 
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            ResUtil.removeFromParent(this);
            ResUtil.removeAllChildren(this);
            this._area=null;
            this._icon=null;
            this._label=null;
            this._labelTxt=null;
         
        }
	}
}
