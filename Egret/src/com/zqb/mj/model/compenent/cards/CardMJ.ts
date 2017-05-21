module PKGame {
	/*
	**麻将牌基类
	*/
	export class CardMJ extends BaseVc {
		private _data: number;
		private _card: egret.Bitmap;
		private _cardName: string;
		private _scale: number = 1;
		private _nameTxt: egret.TextField;
		private _val:number;
		private _initY:number = ResUtil.changeYAxis(410);
		//调试状态打印thisid
		public static CardWidth: number = 118;
		public static CardHeight: number = 163;
		public GetCardWidth(): number {
			return CardMJ.CardWidth;
		}
		public GetCardHeight(): number {
			return CardMJ.CardHeight;
		}
		private _boo: boolean = true;
		public constructor() {
			super();
		}
		public set scale(num: number) {
			this._scale = num;
		}
		public initUI(): void {
		}
		public showCard(): void {
			if (!this._card) {
				this._card = ResUtil.createBitmapByName(this._cardName);
				this.addChildAt(this._card, 0);
			} else {
				this._card.texture = ResUtil.createTexture(this._cardName);
			}
			this._card.scaleX = this._card.scaleY = this._scale;
			this.setNameTxt();
		}
		private setNameTxt() {
			if (this._nameTxt) {
				uniLib.DisplayUtils.removeFromParent(this._nameTxt);
				this._nameTxt = null;
			}
			if (PKGame.RoomInfo.getInstance().GM_Mode) {
				this._nameTxt = uniLib.DisplayUtils.createTextLabel(0x0, egret.HorizontalAlign.LEFT, "" + this._data, 12, 50, 15);
				this.addChild(this._nameTxt);
			}
		}
		
		public get card(): egret.Bitmap {
			return this._card;
		}

		public set data(cardId: number) {
			this._data = cardId;
			this._val = GameUtil.cardValue(cardId);
		}
		public get data(): number {
			return this._data;
		}
		/**除去ID中第一位 得到真实ID */
		public getCardData():number{
			// var id:string = this._data.toString();
			// var point:number = table.PokerTableCard.selectByThisId(this._data).point;
			// var data = id.substr(2,id.length);
			return this._val;
		}
		public set cardName(name: string) {
			this._cardName = name;
		}
		public get cardName(): string {
			return this._cardName;
		}
		
		private isMove: boolean = false;
		public set select(boo: boolean) {
			if (boo && !this.isMove && this.y == this._initY) {
				this.isMove = true;
				egret.Tween.get(this).to({ y: this.y - Math.floor(this.height / 5) }, 50).call(this.finish, this, [this]);
			}
			else {
				egret.Tween.get(this).to({ y: this._initY }, 50).call(this.finish, this, [this]);
			}
		}

		public resetSelected():void {
			this.y = this._initY;
		}

		public setInitY() {
			egret.Tween.removeTweens(this);
			this.y = this._initY;
			// if (this.card) {
			// 	egret.Tween.removeTweens(this.card);
			// 	this.card.y = 0;
			// }
		}
		private finish(param) {
			egret.Tween.removeTweens(param);
			this.isMove = false;
		}
		private finishGold(param) {
			egret.Tween.removeTweens(param);
		}
		public destory() {			
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._data = null;
			this._card = null;
		}
	}
}
