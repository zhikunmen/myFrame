module PKGame {
	/*
	**背面牌
	*/
	export class OutPutBackCard  extends CardMJ {
		public constructor() {
			super();
		}
		public initUI():void{
		}
		public setCard(seatId:number,scale:number=1):void{
			this.scale=scale;
			var cardStr:string;
			if(seatId==0){
				cardStr="Wall_Card0";
			}else if(seatId==1||seatId==3){
				cardStr="Wall_Card1";
			}else{
				cardStr="Wall_Card0";
			}
			this.cardName=cardStr;
			this.showCard();
		}
		public destory(){
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}