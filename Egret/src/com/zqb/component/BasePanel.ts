module PKGame {
	export class BasePanel extends BaseVc{
		private _closeBtn:GameButton;
		private _bg:egret.Bitmap;
		private _title:egret.Bitmap;
		private _initY:number;
		/** 
		 * 1为设置面板  2为解散房间面板
        */
		public constructor(type:number) {
			super();
			this.initBg(type);
		}
		public initBg(type:number){
			this._initY=-13;
			if(type == 1){
				this._bg=ResUtil.createBitmapByName("msgPanel");
				this._bg.scale9Grid=new egret.Rectangle(450,110,60,80);
			}
			else{
				this._bg=ResUtil.createBitmapByName("msgBoxBg");
				this._bg.scale9Grid=new egret.Rectangle(180,60,90,60);
			}
			this._bg.touchEnabled=true;
			this._bg.width=577;
			this._bg.height=482-this._initY;
			this._bg.y=this._initY;
			this.addChild(this._bg);
			this._closeBtn=new GameButton(["userInfo_close1","userInfo_close2"]);
			this._closeBtn.x=this._bg.width-61;
			this._closeBtn.y=-20;
			this.addChild(this._closeBtn);
			this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandle,this);
			this.initPanel();
		}
		public initPanel():void{
		}
		public hideClose():void{
			this._closeBtn.visible=false;
		}
		public set title(iconUrl:string){
			if(!this._title){
				this._title=ResUtil.createBitmapByName(iconUrl);
				this._title.x=Math.round((157-this._title.width)/2);
				this._title.y=14;
				this.addChild(this._title);
			}
		}
		public setSize(w:number,h:number):void{
			this._bg.width=w;
			this._bg.height=h-this._initY;
			this._closeBtn.x=this._bg.width-61;
		}
		private closeHandle(evt:egret.TouchEvent):void{
			this.dispatchEventWith(UIEventConsts.CLOSE);
		}
		public destory():void{
			super.destory();
			if(this._closeBtn){
				this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandle,this);
				this._closeBtn=null;
			}
			this._bg=null;
			this._title=null;
		}
		
	}
}