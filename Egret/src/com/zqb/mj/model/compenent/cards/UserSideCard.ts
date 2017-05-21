module PKGame {
	import DisplayUtils = uniLib.DisplayUtils;
	export class UserSideCard extends BaseVc{
		public uid:number;
		private _stepX:number;
		private _stepY:number;
		private _userSeat:number;                                              //对应座位方向0-3
		private _curIndex:number=0;
		private _drawIndex:number=13;
		public initPoint:egret.Point;
		public takeCardStepX:number;
		public takeCardStepY:number;		

		//亮手牌
		public showCardNode:egret.DisplayObjectContainer;
		private _displayPos:egret.Point;	
		private _tempPanel:egret.DisplayObjectContainer;                                      //保存玩家打出去时暂存的牌
		private _handCardsArr:Array<number>;                      
		private _defaultPoint:egret.Point;
		private _cardsBitArr:egret.Bitmap[];
		private _discardEffect:DiscardBlurMc;
		private _handsCard:egret.DisplayObjectContainer;
		private _otherHandMc:egret.DisplayObjectContainer;                     //
		private _displayCardsMc:egret.DisplayObjectContainer;                  //碰杠牌容器
		public constructor() {
			super();
		}
		public initUI():void{
			this.curIndex=0;
			this._cardsBitArr=[];
			this._handCardsArr=[];
			this._handsCard=new egret.DisplayObjectContainer();
			this.addChild(this._handsCard);
			this._displayCardsMc=new egret.DisplayObjectContainer();
			this._displayCardsMc.touchEnabled = false;
			this._displayCardsMc.touchChildren = false;
			this.addChild(this._displayCardsMc);
			this._otherHandMc=new egret.DisplayObjectContainer();
			this.addChild(this._otherHandMc);
			this._tempPanel = new egret.DisplayObjectContainer();
			this.addChild(this._tempPanel);
			this.showCardNode = new egret.DisplayObjectContainer();
			this.addChild(this.showCardNode);

		}
		public get defaultPoint():egret.Point{
			return this._defaultPoint;
		}
		public set defaultPoint(p:egret.Point){
			this._defaultPoint=p;
		}
		public get displayCardsMc():egret.DisplayObjectContainer{
			return this._displayCardsMc;
		}

		public get curIndex():number{
			return this._curIndex;
		}
		public set curIndex(num:number){
			this._curIndex=num;
		}
		public get handsCard():egret.DisplayObjectContainer{
			return this._handsCard;
		}
		public get stepX():number{
			return this._stepX;
		}
		public set stepX(num:number){
			 this._stepX=num;
		}

		public get stepY():number{
			return this._stepY;
		}
		public set stepY(num:number){
			this._stepY=num;
		}
		public set userSeat(type:number){
			this._userSeat=type;
		}
		public get userSeat():number{
			return this._userSeat;
		}
		public get handCardsArr():Array<number>{
			return this._handCardsArr;
		}
		public set handCardsArr(arr:number[]){
			this._handCardsArr = arr;
		}
		public get displayPos():egret.Point{
			return this._displayPos;
		}
		public set displayPos(p:egret.Point){
			this._displayPos=p;
		}
		public get drawIndex():number{
			return this._drawIndex;
		}
		public sendCards(num:number):void{
			if(this.userSeat!=0){
				if(!this._handsCard)return;
				if(this._handsCard.numChildren>17){
					return;
				}
				var index:number=this._handsCard.numChildren+this._curIndex;
				var card:egret.Bitmap;
				for (var i:number = 0; i < num; i++) {
					/***************控制手牌个数************* */
					if(this._cardsBitArr[index+i]){
						card=this._cardsBitArr[index+i];
					}else{
						card=ResUtil.createBitmapByName("BackCard"+this.userSeat);
						this._cardsBitArr[index+i]=card;
					}
					card.name="card"+(index+i);
					card.x=Math.round(this.initPoint.x+(index+i)*this.stepX);
					card.y=Math.round(this.initPoint.y+(index+i)*this.stepY);

				}
			}
		}



		public  setEnable(boo:boolean):void{			
		}
	
		public doDraw(sendId:number=null):void{
			if(this.userSeat!=0 && !RoomInfo.getInstance().GM_Mode){
				this.addDrawCard();
			}
			else if(this.userSeat!=0 && RoomInfo.getInstance().GM_Mode){
				let thisId = sendId;
				this.showDrawCard(thisId);
			}
		}
		private  addDrawCard():void{
			var card:egret.Bitmap;
			if(this._cardsBitArr[this._drawIndex]){
				card=this._cardsBitArr[this._drawIndex];
			}else{
				card=ResUtil.createBitmapByName("BackCard"+this.userSeat);
				this._cardsBitArr[this._drawIndex]=card;
			}
			card.name="card"+this._drawIndex;
			card.x=this.initPoint.x+this._drawIndex*this.stepX+this.takeCardStepX;
			card.y=this.initPoint.y+(this._drawIndex)*this.stepY+this.takeCardStepY;
			if(this.stepY<0){
				this.handsCard.addChildAt(card,0);
			}else{
				this.handsCard.addChild(card);
			}
		}
		private showDrawCard(thisId:number){
			var card:egret.Bitmap;
			if(this._cardsBitArr[this._drawIndex]){
				card=this._cardsBitArr[this._drawIndex];
			}else{
				let name:string = PKtable.PokerTableCard.resPutOut(thisId, this.userSeat);
				card=ResUtil.createBitmapByName(name);
				this._cardsBitArr[this._drawIndex]=card;
			}
			card.name="card"+this._drawIndex;
			card.x=this.initPoint.x+this._drawIndex*this.stepX+this.takeCardStepX;
			card.y=this.initPoint.y+(this._drawIndex)*this.stepY+this.takeCardStepY;
			if(this.stepY<0){
				this.handsCard.addChildAt(card,0);
			}else{
				this.handsCard.addChild(card);
			}
		}
		/**
		 * 清除准备操作的玩家打出去的牌
		 */
		public clearDiscard(seat:number){

			if (PKGame.CardInfo.getInstance().outCardSeatId != seat) {
				if (this._tempPanel.numChildren) {
					DisplayUtils.removeAllChildren(this._tempPanel);
					this._tempPanel.name = "";
				}
			}
		}

		/**
		 *出牌 
		 * @param cardId
		 * 
		 */		
		// private _tempCard:egret.Bitmap[][] = [[],[],[],[]];
		public  doDiscard(cardSet:number[],seatId:number){
			if (this._tempPanel.numChildren) {
				uniLib.DisplayUtils.removeAllChildren(this._tempPanel);
				this._tempPanel.name = "";
			}
			if(!cardSet || cardSet.length <=0){
				//要不起
				var pass:egret.Bitmap = ResUtil.createBitmapByName("label_not_chu");
				this._tempPanel.addChild(pass);
				this._tempPanel.name = "pass";
				GameUtil.setPosBySeat(pass,seatId,PKGame.CardInfo.getInstance().readyLabelOffsetArr);
				// this._tempCard[seatId].push(pass);
				return;
			}
			let obj:any;
			let arr:Array<any>=[];
			for(var i=0;i<cardSet.length;i++){
				let id:number = cardSet[i];
				let point:number = PKtable.PokerTableCard.selectByThisId(id).point;
				obj={};
				obj.point=point;
				obj.id=id;
				arr.push(obj);
			}
			arr.sort(function(a: any,b: any): number{
				var num1:number = GameUtil.cardValue(a.id);
				var num2:number = GameUtil.cardValue(b.id);
				if (num1 > num2) {
					return -1
				}else if (num2 == num1) {
					return 0
				}else {
					return 1;
				}
            });

			var node:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
			for(var i=0;i<arr.length;i++){
				var card:egret.Bitmap = new egret.Bitmap;
				var cardName = PKtable.PokerTableCard.resNormal(arr[i].id);
				card = ResUtil.createBitmapByName(cardName);
				card.scaleX = 0.63;
				card.scaleY = 0.63;
				card.name = cardName;
				// card.y = ddzGame.GameData.getInstance().TempeLocation[seatId][1];
				card.x =  i*30;
				// this._tempCard[seatId].push(card);
				// this._tempPanel.addChild(card);
				node.addChild(card);
			}
			this._tempPanel.name = "card";
			this._tempPanel.addChild(node);
			GameUtil.setPosBySeat(this._tempPanel,seatId,PKGame.CardInfo.getInstance().outCardArr);
		}

		//清理桌面上的牌型

		public clearAllCards():void {

			if (this._tempPanel.numChildren) {
				DisplayUtils.removeAllChildren(this._tempPanel);
				this._tempPanel.name = "";
			}
			// this._tempCard = [[],[],[],[]];

			if (this.handsCard && this.handsCard.numChildren) {
				DisplayUtils.removeAllChildren(this.handsCard);
				this.handCardsArr = [];
			}
		}


		private  movieEnd(cardVo:CardVo):void{
			if(this._discardEffect && this._discardEffect.parent){
				this._discardEffect.parent.removeChild(this._discardEffect);
			}	
			this._discardEffect = null;		
			// if(this._tempCard){
			// 	egret.Tween.removeTweens(this._tempCard);
			// }
			uniLib.DisplayUtils.removeAllChildren(this._tempPanel);
		}
		public refreshTempCard(){
			//删除打出去的牌
			// uniLib.DisplayUtils.removeAllChildren(this._tempPanel);
		}
		public  removeCard(arr:Array<number>, boo:Boolean=true):egret.Point{
			if(!this._cardsBitArr||this._cardsBitArr.length==0){
				return null;
			}
			var point:egret.Point;
			if(!boo){
				let obj = this._cardsBitArr[this._drawIndex];
				if(obj && obj.parent){
					point=new egret.Point(obj.x, obj.y)
					uniLib.DisplayUtils.removeFromParent(obj);
					return point;
				}
				
			}
			for (var i:number = 0; i < arr.length; i++) {
				let obj = this._cardsBitArr[this._curIndex];
				if(obj){
					if(obj.parent){
						point=new egret.Point();
						point.x= obj.x;
						point.y=obj.y;
						uniLib.DisplayUtils.removeFromParent(obj);
						point=new egret.Point();
					}
					if(boo){
						this._curIndex++;
					}
				}
			}
			this.refreshCard();
			return point;
		}
		protected  refreshCard():void{
			var card:egret.Bitmap;
			if(!this._cardsBitArr || this._cardsBitArr.length <= 0)return;
			for (var i:number = 0; i < this._cardsBitArr.length; i++) 
			{
				card=this._cardsBitArr[i];
				if(i>=this._curIndex){
					if(!card){
						this._cardsBitArr[i]=card=ResUtil.createBitmapByName("BackCard"+this.userSeat);
						this._handsCard.addChild(this._cardsBitArr[i])
					}
					card.x=Math.round(this.initPoint.x+i*Math.round(this.stepX));
					card.y=Math.round(this.initPoint.y+i*Math.round(this.stepY));
					if(i==this._drawIndex){
						card.x+=Math.round(this.takeCardStepX);
						card.y+=Math.round(this.takeCardStepY);
					}
				}else{
					if(card&&card.parent){
						card.parent.removeChild(card);
					}
				}				
			}
		}

		public resetHandleCardPos():void{
			this.initPoint.x=this._defaultPoint.x;
			this.initPoint.y=this._defaultPoint.y;
			if(this._displayCardsMc.numChildren>0){
				if(this.userSeat==1){
					this.initPoint.y=this._displayPos.y-(this._displayCardsMc.height+10)-this._stepY*3*this._displayCardsMc.numChildren;
				}else if(this.userSeat==3){
					this.initPoint.y=this._displayPos.y+this._displayCardsMc.height+5-this._stepY*3*this._displayCardsMc.numChildren;
				}else if(this.userSeat==2){
					this.initPoint.x=this._displayPos.x-(this._displayCardsMc.width+10)-this._stepX*3*this._displayCardsMc.numChildren;
				}
			}
			var len:number;
			var myCard:egret.Bitmap;
			len=this.handsCard.numChildren;
			var index:number
			for (var j:number = 0; j < len; j++) {
				myCard=this.handsCard.getChildAt(j) as egret.Bitmap;
				if(myCard){
					index=Number(myCard.name.slice(4));
					myCard.x=Math.round(this.initPoint.x+index*Math.round(this.stepX));
					myCard.y=Math.round(this.initPoint.y+index*Math.round(this.stepY));
					if(index==this._drawIndex){
						myCard.x+=Math.round(this.takeCardStepX);
						myCard.y+=Math.round(this.takeCardStepY);
					}
				}
				
			}
		}

		

		public  resetCard():void{
			this.resetPoint();
			this.removeResult();
			// this.outPutCards.resetCard();
			this.removeHandleCards();
			this.removeGroupCards();
			this._curIndex=0;
			this.resetHandleCardPos()
		}
		private  removeGroupCards():void{
			var len:number=this._displayCardsMc.numChildren;
			var card:GroupCard;
			for (var i:number = 0; i < len; i++) {
				card=this._displayCardsMc.removeChildAt(0) as GroupCard;
				card.destory();
				card = null;
			} 
			uniLib.DisplayUtils.removeAllChildren(this._displayCardsMc);
		}
		private  removeResult():void{
			uniLib.DisplayUtils.removeAllChildren(this._otherHandMc);
		}
		protected  removeHandleCards():void{
			uniLib.DisplayUtils.removeAllChildren(this.handsCard);			
		}
		/**
		 * 重连数据
		 */
		public  setReloginData():void{
			this.resetCard();
			this._handCardsArr = CardInfo.getInstance().getHandCardBySeat(this._userSeat);
			// var outPutArr:number[] = CardInfo.getInstance().getOutCardBySeat(this._userSeat);
			// this.outPutCards.showOutPutCardArr(outPutArr);
		}

		/**
		 * 刷新手牌
		 */
		public refreshHandCards(freshtype:number = 0,data :any=null){
		}
		/**
		 *  批量处理选中牌
		 */
		public addSelect(cardSet:number[]){
		}
		/**
		 * 点击游金后选牌
		 */
		public selectGoldOut(){
		}

		/**隐藏听牌箭头 */
		public hideListenIcon(){			
		}
		/**托管蒙版 */
		public addHostMask(){
		}
		/**移除托管蒙版 */
		public removeHostMask(){
		}
		/**重置初始位置 */
		public resetPoint(){		
		}


		public destory(){

			if(this._handsCard){

				uniLib.DisplayUtils.removeAllChildren(this.handsCard);
				uniLib.DisplayUtils.removeFromParent(this._handsCard);
			}
			this._handsCard = null;
			if(this._otherHandMc){
                uniLib.DisplayUtils.removeAllChildren(this._otherHandMc);
				uniLib.DisplayUtils.removeFromParent(this._otherHandMc);
				this._otherHandMc = null;
			}
			
			if(this._displayCardsMc){
				uniLib.DisplayUtils.removeAllChildren(this._displayCardsMc);
				uniLib.DisplayUtils.removeFromParent(this._displayCardsMc);
			}
			this._displayCardsMc = null;
			if(this._tempPanel){
				uniLib.DisplayUtils.removeAllChildren(this._tempPanel);
				uniLib.DisplayUtils.removeFromParent(this._tempPanel);
			}
			if(this._discardEffect){
				this._discardEffect.destory();
				this._discardEffect=null;
			}
			this._tempPanel = null;
			// this._tempCard = null;
			this._handCardsArr=null;
			this._defaultPoint=null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
		
	}
}
