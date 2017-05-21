
module PKGame {
	/*****系统消息跑马灯 */
	export class GameSysMsg extends BaseVc{
		private _msgTxt:egret.TextField;
		private _noticeArr:string[] = [];
		private _txtMc:egret.DisplayObjectContainer;
		private _txtWidth:number;
		private _buffer:number;
		public constructor() {
			super();
		}
		public initUI():void{
			this._buffer=30;
			var bg: egret.Bitmap = ResUtil.createBitmapByName("mjl_lobby_systembg");
			bg.scale9Grid = new egret.Rectangle(75, 20, 20, 20);
			bg.width = 924;
			this._txtWidth=828;
			this.addChild(bg);
			this._msgTxt=ResUtil.createTextFeild(0xffffff,egret.HorizontalAlign.LEFT,"系统公告",32, 55, 16);
			this._msgTxt.multiline=false;
			uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_GM,this.onNoticeCome,this);       
			uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_HORN,this.onNoticeCome,this);
			uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_SYSTEM,this.onNoticeCome,this);
			uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_IMPORTANT,this.onNoticeCome,this);
			this._txtMc=new egret.DisplayObjectContainer();
			this._txtMc.addChild(this._msgTxt);
			this._txtMc.x=75;
			this.addChild(this._txtMc);
			this._txtMc.scrollRect=new egret.Rectangle(0,0,this._txtWidth,bg.height);
			this.visible=false;
			// this._msgTxt.text = "这里是测试";
			// this.startScroll();
		}
		private startScroll():void{
			this.visible = true;
			egret.Tween.removeTweens(this._msgTxt);
			this._msgTxt.x = this._txtWidth + this._buffer;
			var w: number = this._msgTxt.textWidth < this._txtWidth ? this._txtWidth : this._msgTxt.textWidth;
			egret.Tween.get(this._msgTxt).to({ x: -( this._msgTxt.textWidth+this._buffer)},20*(w+this._buffer)).call(this.scrollEnd,this);
		}
		private scrollEnd():void{
			egret.Tween.removeTweens(this._msgTxt);
			this.visible=false;
		}
		private onNoticeCome(e:uniLib.ZqEvent):void{
			var notice: Pmd.CommonChatUserPmd_CS = e.param;
			if(this._noticeArr==null){
				this._noticeArr=[];
			}
			this._noticeArr.push(notice.info);
			this._msgTxt.text = this._noticeArr.shift();
			this.startScroll();
		}
		public destory():void{
			super.destory();
			uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_GM,this.onNoticeCome,this);       
			uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_HORN,this.onNoticeCome,this);
			uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_SYSTEM,this.onNoticeCome,this);
			uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_IMPORTANT,this.onNoticeCome,this);
			this.scrollEnd();
			if(this._txtMc){
				uniLib.DisplayUtils.removeAllChildren(this._txtMc);
				uniLib.DisplayUtils.removeFromParent(this._txtMc);
			}
			this._txtMc=null;
			this._msgTxt=null;
			this._noticeArr=null;
		}
	}
}