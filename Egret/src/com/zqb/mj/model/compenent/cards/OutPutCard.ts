/// <reference path="../../../../../../Table.ts" />

module PKGame {
	/*
	**打出去的牌
	*/
	export class OutPutCard  extends CardMJ {
		private _seatId:number;
		public constructor() {
			super()
		}
		public initUI():void{
		}
		/**其他玩家的出牌 */
		public  setCard(seatId:number,thisId:number,scale:number=1,isResult:boolean = false):void{
			this.scale=scale;
			this._seatId=seatId;
			this.data=thisId;
			this.cardName = PKtable.PokerTableCard.resPutOut(thisId, seatId);
			this.showCard();
		}
		public get seatId():number{
			return this._seatId;
		}
		public set seatId(id:number){
			 this._seatId=id;
		}
		public destory(){
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}