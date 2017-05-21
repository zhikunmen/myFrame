module PKGame {
	export class CheckMc extends BaseVc{
		private _check:boolean;
		private _checkIcon:egret.Bitmap;
		public constructor() {
			super();
		}
		public initUI():void{
			var bg:egret.Bitmap=ResUtil.createBitmapByName("setting_checkbg");
			this.addChild(bg);
			this._checkIcon=ResUtil.createBitmapByName("setting_check",16,16);
			this.addChild(this._checkIcon);
			this.check=false;
		}
		public set check(boo:boolean){
			this._check=boo;
			this._checkIcon.visible=boo;
		}
		public destory(){
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._checkIcon = null;
		}
	}
}