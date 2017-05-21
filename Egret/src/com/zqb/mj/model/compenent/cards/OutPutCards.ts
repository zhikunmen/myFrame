module PKGame {
	export class OutPutCards extends BaseVc{
		private _initPoint:egret.Point=new egret.Point(387,503);
		public stepX:number=26;
		public stepY:number=0;
		public lineX:number=0;
		public lineY:number=-36;
		public numArr:Array<number>=[12,12];
		public cardTotal:number;
		public cardArr:Array<OutPutCard>;
		private _curIndex:number;
		private _type:number;//方位
		private _cardWidth:number=48;
		private outCardsGroup:number[];//保存所有打出去的牌数据
		public constructor() {
			super();
		}
		public  get initPoint():egret.Point{
			return this._initPoint;
		}
		public  set initPoint(p:egret.Point){
			 this._initPoint=p;
		}
		public  set type(seatId:number){
			this._type=seatId;
		}
		public  get type():number{
			return this._type;
		}
		public  initCards():void{
			this.cardTotal=0;
			for (var j:number = 0; j < this.numArr.length; j++) {
				this.cardTotal+=this.numArr[j];
			}
			if(this.cardArr&&this.cardArr.length==this.cardTotal){
				return;
			}
			this.cardArr=new Array<OutPutCard>();
			var outCard:OutPutCard;
			var posObj:any;
			for (var i:number = 0; i < this.cardTotal; i++) {
				outCard=new OutPutCard();
				posObj=this.getLintNum(i);
				outCard.x=Math.round(this._initPoint.x+Math.round(this.stepX)*(posObj.index+posObj.offN)+posObj.line*Math.round(this.lineX));
				outCard.y=Math.round(this._initPoint.y+Math.round(this.stepY)*(posObj.index+posObj.offN)+posObj.line*Math.round(this.lineY));
				if(this.stepY<0||this.lineY<0){
					this.addChildAt(outCard,0);
				}else{
					this.addChild(outCard);
				}
				this.cardArr.push(outCard);
			}
			this._curIndex=0;
			this.outCardsGroup = [];
		}
		private  getLintNum(index:number):any{
			var posObj:any={};
			var total:number=0;
			for (var j:number = 0; j < this.numArr.length; j++) {
				if(index<total+this.numArr[j]){
					posObj.line=j;
					posObj.index=index-total;
					posObj.offN=(this.numArr[0]-this.numArr[j])/2;
					return posObj
				}
				total+=this.numArr[j];
			}
			return posObj;
		}
		/**
		 * 游戏中删除已打出的牌
		 */
		public  removeOutPutCard(cardId:number):void{
			this.outCardsGroup = ArrayUtil.removeValue(CardInfo.getInstance().getOutCardBySeat(this._type),cardId);
			var outCard:OutPutCard;
			for (var i:number = 0; i < this.cardArr.length; i++) {
				outCard=this.cardArr[i];
				outCard.visible=false;
				outCard.data = null;
			}
			this._curIndex=0;
			for(var i:number=0;i<this.outCardsGroup.length;i++){
				this.showOutPutCard(this.outCardsGroup[i]);
			}
		}
		public  getCurOutPutPos():egret.Point{
			if(this._curIndex==0){
				return new egret.Point(Math.round(this.cardArr[0].x+this.cardArr[0].width/2),Math.round(this.cardArr[0].y));
			}
			return new egret.Point(Math.round(this.cardArr[this._curIndex-1].x+this.cardArr[this._curIndex-1].width/2),Math.round(this.cardArr[this._curIndex-1].y));
		}
		public  getNextOutPutPos():egret.Point{
			if(this.cardArr[this._curIndex] == null) return null;
			return new egret.Point(Math.round(this.cardArr[this._curIndex].x),Math.round(this.cardArr[this._curIndex].y));
		}
		public  getNextPointPos():egret.Point{
			var w:number=(this.stepX==0?this._cardWidth:Math.abs(this.stepX));
			return new egret.Point(Math.round(this.cardArr[this._curIndex].x+w/2),Math.round(this.cardArr[this._curIndex].y));
		}
		public  showOutPutCard(thisId:number):egret.Point{
			let outCard:OutPutCard;
			//判断是否已经包含thisId
			for (var i:number = 0; i < this.cardArr.length; i++) {
				outCard = this.cardArr[i];
				if(outCard.data == thisId){
					this._curIndex = i+1;
					return this.getCurOutPutPos();
				}
			}	
			this.cardArr[this._curIndex].visible=true;
			this.cardArr[this._curIndex].setCard(this._type,thisId,0.63);
			this._curIndex++;
			return new egret.Point(Math.round(this.cardArr[this._curIndex-1].x+this.cardArr[this._curIndex-1].width/2),Math.round(this.cardArr[this._curIndex-1].y));
		}
		public  resetCard():void{
			var outCard:OutPutCard;
			for (var i:number = 0; i < this.cardArr.length; i++) {
				outCard=this.cardArr[i];
				outCard.visible=false;
				outCard.data = null;
			}
			this._curIndex=0;
			this.outCardsGroup = [];
		}
		//重新根据数据刷新
		public  showOutPutCardArr(arr:Array<any>):void{
			this._curIndex=0;
			for(var i:number=0;i<arr.length;i++){
				this.showOutPutCard(arr[i]);
			}
		}
		/**
		 * 补花
		 */
		public fillFlower(value:number[]){
		   if(value == null)
		        return;
		   let cards:number[] = CardInfo.getInstance().getOutCardBySeat(this._type);
			this._curIndex = 0;
 			for(var j:number=0;j<cards.length;j++){
				var thisId:number = cards[j];
				this.cardArr[this._curIndex].visible=true;
				this.cardArr[this._curIndex].setCard(this._type,thisId);
				this._curIndex++;
			}	
		}

		public destory(){
			for(var i:number = 0;i<this.cardArr.length;i++){
				var card:OutPutCard = this.cardArr[i];
				card.destory();
			}
			this.cardArr = null;
			this.outCardsGroup = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}