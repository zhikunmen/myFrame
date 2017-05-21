/// <reference path="../../../../../../Table.ts" />

module PKGame {
	/*
	**自己的牌
	*/
	export class MySelfCard  extends CardMJ  {
		public index:number;
		private _readyObj:any;
		private _maskIcon:egret.Bitmap;
		private isSelect:boolean = false;
		public constructor() {
			super();
		}
		public initUI():void{

		}
		public  set readyObj(obj:any){
			this._readyObj=obj;
		}
		public  get readyObj():any{
			return this._readyObj;
		}

		public  setCard(newCard:number,scale:number=1):void{
			this.data=newCard;
			this.scale=scale;
			if(newCard == null)
				return;
			this.cardName = PKtable.PokerTableCard.resNormal(newCard);
			this.showCard();
			// this.setKuange(newCard);
			this.card.alpha=1;

		}


		private setKuange(thisId:number):void {
			if (GameUtil.isBoodHand(thisId)) {
				this._maskIcon = ResUtil.createBitmapByName("Poker_guang_png");
				this.addChild(this._maskIcon);
			}
		}
		public setBlackCard(){
			this.scale=1;
			this.cardName = "BackCard";
			this.showCard();
			this.card.alpha=1;
		}
		public setOpenCard(thisId:number){
			this.data=thisId;
			this.cardName = PKtable.PokerTableCard.resNormal(thisId);
			this.showCard();
			this.card.alpha=1;
		}

		public setSelect(boo:boolean){
			this.select = boo;
			this.isSelect = boo;
		}
		public getSelect():boolean{
			return this.isSelect;
		}
		public destory(){

			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._maskIcon = null;
		}
	}
}