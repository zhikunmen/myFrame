module PKGame {
	export class BlurBackCard extends BaseVc{
		private _card:egret.Bitmap;
		public constructor() {
			super();
		}
		public setType(type:number):void{
			if(!this._card){
				this._card=ResUtil.createBitmapByName("lymj_blur");
				this.addChild(this._card);
			}
			if(type==1){
				this._card.x=-2;
				this._card.y=-26;
				this._card.rotation=0;
			}else{
				this._card.x=-24;
				this._card.y=-1;
				this._card.rotation=90;
			}
		}
		public destory(){
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._card = null;
		}
	}
}