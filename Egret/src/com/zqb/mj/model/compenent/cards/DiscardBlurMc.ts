module PKGame {
	export class DiscardBlurMc extends BaseVc{
		private _outCard:OutPutCard
		private _seatId:number;
		private _blurBitMap:egret.Bitmap;
		public constructor(type:number) {
			super();
			this._seatId=type;
		}
		public  initUI():void{
			this._blurBitMap=ResUtil.createBitmapByName("out_blur");
			if(this._seatId%2+1==1){
				this._blurBitMap.x=10;
				this._blurBitMap.y=13
			}else{
				this._blurBitMap.rotation=90;
				this._blurBitMap.x=-15;
				this._blurBitMap.y=-8
			}
			this.addChild(this._blurBitMap);
			this._outCard=new OutPutCard();
			this._outCard.alpha=0.2;
			this.addChildAt(this._outCard,0);
		}
		public setCard(thisId:number):void{
			this._outCard.setCard(this._seatId,thisId);
		}
		public destory(){
			if(this._outCard){
				this._outCard.destory();
			}
			this._outCard = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._blurBitMap = null;
		}
	}
}