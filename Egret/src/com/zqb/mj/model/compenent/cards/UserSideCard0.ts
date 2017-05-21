module PKGame {
	export class UserSideCard0 extends UserSideCard{

		private _cardInterval:number = 100;

		public constructor() {
			super();
			this.initPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2 ,ResUtil.changeYAxis(410));
			this.displayPos=new egret.Point((uniLib.Global.screenWidth-1136)/2 ,ResUtil.changeYAxis(539));
			this.defaultPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2 ,ResUtil.changeYAxis(514));
			this.stepX=50;
			this.stepY=0;
			this.takeCardStepX=10;
			this.takeCardStepY=0;
			this.userSeat=0;
			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchEnd,this);
		}

		public setGlobalTouch(isSet:boolean):void {

			if (isSet) {
				egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchEnd,this);
			}else {

				egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchEnd,this);
			}
		}
		/**初始发牌使用 */
		public sendCards(num:number):void {

			uniLib.SoundMgr.instance.playSound("deal_mp3");
			if (!this.handsCard)return;
			var index: number = this.handsCard.numChildren;
			if (!this.handCardsArr || this.handCardsArr.length <= 0)return;

			var card: MySelfCard;
			for (var i: number = 0; i < num; i++) {
				card = new MySelfCard();
				let thisId = this.handCardsArr[index + i];
				if (thisId == null) {
					break;
				}
				card.setCard(thisId);
				card.x = this.initPoint.x + (index + i) * Math.round(this.stepX);
				card.y = this.initPoint.y + (index + i) * Math.round(this.stepY);
				card.index = index + i;
				card.name = thisId.toString();
				card.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
				var time: number = this._cardInterval * i;
				egret.Tween.get(card).wait(time).call(this.addCards, this, [card]);
			}
		}

		//
		private count:number = 0;
		private addCards(card):void {

			this.count ++;
			// if (ddzGame.RoomInfo.getInstance().stakeUsers.length) {
			// 	var operaVc:OperateMJMediator = GameUtil.getViewByName(OperateMJMediator.NAME);
			// 	operaVc.removeFaMingBtn();
			// }
			if (this.count == 17) {
				this.count = 0;
				var gameVc:PKMediator = GameUtil.getViewByName(PKMediator.NAME);
				gameVc.showBlackCards();

				// operate.removeAction();
                if (PKGame.RoomInfo.getInstance().diPaiArr.length) {
					RepManager.ins.EnterPokerCmd_C();
				}

			}
			if(this.stepY<0){
				this.handsCard.addChildAt(card,0);
			}else{
				this.handsCard.addChild(card);
			}
			this.sortCard();

		}

		private onTouchEnd(e:egret.Event){
			var card:MySelfCard  = e.target;

			if(card && card.name||CardInfo.getInstance().selectGroup.length == 0)return;
			this.initSelect();
			// CardInfo.getInstance().selectGroup = [];
		}
		
		private onTouchTap(e:egret.Event){

			if (this.isMove) return;
			var card:MySelfCard  = e.currentTarget;
			if(!card) return;
			if(!card.getSelect()){
				card.setSelect(true);
				this.updateSelect(card.data,0);
				// this._selectList.push(card.index);
			}
			else{
				card.setSelect(false);
				this.updateSelect(card.data,1);
				// var index:number = this._selectList.indexOf(card.index);
				// this._selectList.splice(index,1);
			}
			console.error(">>>>"+JSON.stringify(CardInfo.getInstance().selectGroup));
		}
		/**
		 * type 0:增加牌ID
		 *      1:减少牌ID
		 */
		private updateSelect(thisId:number,type:number){
			if(type == 0){
				CardInfo.getInstance().addCard([thisId],CardInfo.getInstance().selectGroup);
			}
			else if(type == 1){
				CardInfo.getInstance().removeCard(thisId,CardInfo.getInstance().selectGroup);
			}
		}
		/**
		 * 批量处理选中牌
		 */		
		public addSelect(cardSet:number[]){
			var len :number=this.handsCard.numChildren;
			var card:MySelfCard;
			for (var i :number = 0; i < len; i++) {
				card=this.handsCard.getChildAt(i) as MySelfCard;
				card.setInitY();
				if(ArrayUtil.isInArray(card.data,cardSet)){
					card.setSelect(true);
				}
			}
		}
		private setSigleCard(index:number,thisId:number,isOpen:boolean = false){
			var card:MySelfCard = new MySelfCard();			
			card.x=this.initPoint.x+index*Math.round(this.stepX)+Math.round(this.takeCardStepX);
			card.y=this.initPoint.y+index*Math.round(this.stepY)+Math.round(this.takeCardStepY);
			card.index=index;
			card.name = thisId.toString();
			if(this.stepY<0){
				this.handsCard.addChildAt(card,0);
			}else{
				this.handsCard.addChild(card);
			}
			card.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
			if(thisId && !isOpen){
				card.setCard(thisId);
			}
			else if(thisId && isOpen){
				card.setOpenCard(thisId);
			}
		}	
		private selectCard:MySelfCard = null;
		
		/**
		 * 手牌排序 
		 */
		public sortCard():void{
			var len :number=this.handsCard.numChildren;
			var arr:Array<any>=[];
			var obj:any;
			var card:MySelfCard;
			for (var i :number = 0; i < len; i++) {
				card=this.handsCard.getChildAt(i) as MySelfCard;
				card.setInitY();
				obj={};
				obj.value=card.getCardData();
				obj.mc=card;
				arr.push(obj);
			}
			arr.sort(function(a: any,b: any): number{
                if(a.value > b.value) return -1;
                else if(a.value == b.value) return 0;
                return 1;
            });	
		
			for (var j :number = 0; j < arr.length; j++) {
				card=arr[j].mc;
				card.x=Math.round((this.curIndex+j)*Math.round(this.stepX));
				card.y=this.initPoint.y+(this.curIndex+j)*Math.round(this.stepY);
				card.index=this.curIndex+j;
				this.handsCard.setChildIndex(card,j);
			}
			GameUtil.setContainerCenter(this.handsCard,true);
		}
		public  setEnable(boo:boolean):void{
			var len:number=this.handsCard.numChildren;
			var card:MySelfCard;
			for (var i:number = 0; i < len; i++) {
				card=this.handsCard.getChildAt(i) as MySelfCard;
				if(boo){
					card.touchEnabled=true;	
					if(!card.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
						card.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
					}
					this.handsCard.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onHandsMoveHandler,this);
					this.handsCard.addEventListener(egret.TouchEvent.TOUCH_END,this.onHandsEndHandler,this);
					this.handsCard.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onHandsBeginHandler,this);
				}else{
					card.touchEnabled=false;
					card.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
					this.handsCard.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onHandsMoveHandler,this);
					this.handsCard.removeEventListener(egret.TouchEvent.TOUCH_END,this.onHandsEndHandler,this);
					this.handsCard.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onHandsBeginHandler,this);
				}
			}
		}


		private onHandsBeginHandler(e:egret.TouchEvent):void {
			this.isMove = false;
			// this.initSelect()
		}
		//拖动选牌

		private isMove:boolean = false;
		private onHandsMoveHandler(e):void {
			this.isMove = true;
			var localX = e.localX;
			var card:MySelfCard  = e.target;

			if(!card || card.data && GameUtil.isHaveElemt(PKGame.CardInfo.getInstance().selectGroup,card.data)) return;
			this.updateSelect(card.data,0);
			card.setSelect(true);
			card.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);

		}

		private onHandsEndHandler(e):void {

			var len:number = this.handsCard.numChildren;
			if (len) {
				for (var i:number = 0; i < len; i++) {
					var card:any= this.handsCard.getChildAt(i);
					if (card) {
						card.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
					}
				}
			}
		}
		
		public removeCard(arr:number[],boo:Boolean=true):egret.Point{
			var len:number;
			var myCard:MySelfCard;
			var point:egret.Point;
			for (var i:number = 0; i < arr.length; i++) {
				len=this.handsCard.numChildren;
				for (var j:number = 0; j < len; j++) {
					myCard=this.handsCard.getChildAt(j) as MySelfCard;
					if(myCard&&myCard.data==arr[i]){
						point=new egret.Point();
						point.x=myCard.x;
						point.y=myCard.y;
						myCard.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
						this.handsCard.removeChild(myCard);
						myCard.setInitY();
						myCard.destory();
						myCard = null;
						if(boo){
							this.curIndex++;
						}
						break;
					}
				}
			}
			this.sortCard();
			return point;
		}
		
		public resetHandleCardPos():void{
			if(this.displayCardsMc.numChildren>0){
				this.initPoint.x=this.displayPos.x+this.displayCardsMc.width+20;
			}else{
				this.initPoint.x=this.defaultPoint.x;
			}
			var len:number;
			var myCard:MySelfCard;
			len=this.handsCard.numChildren;
			for (var j:number = 0; j < len; j++) {
				myCard=this.handsCard.getChildAt(j) as MySelfCard;
				myCard.x=Math.round(myCard.index*Math.round(this.stepX));
				myCard.y=Math.round(this.initPoint.y+myCard.index*Math.round(this.stepY));
				if(myCard.index==this.drawIndex){
					myCard.x+=Math.round(this.takeCardStepX);
				}
			}
		}
		protected  removeHandleCards():void{
			var len:number;
			var myCard:MySelfCard;
			len=this.handsCard.numChildren;
			for (var j:number = 0; j < len; j++) {
				myCard=this.handsCard.getChildAt(0) as MySelfCard;
				if(myCard.hasEventListener(egret.TouchEvent.TOUCH_END)){
					myCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
				}
				myCard.destory();
				myCard = null;
			}
			uniLib.DisplayUtils.removeAllChildren(this.handsCard);
		}
		/**
		 * 初始为未选中
		 */
		public initSelect(isTween:boolean = false){

			if (!this.handsCard) return;
			if (!isTween) {

				var len:number=this.handsCard.numChildren;
				var card:MySelfCard;
				for (var i :number = 0; i < len; i++) {
					card=this.handsCard.getChildAt(i) as MySelfCard;
					card.setSelect(false);
				}
			}else {

				var len:number=this.handsCard.numChildren;
				var card:MySelfCard;
				for (var i :number = 0; i < len; i++) {
					card=this.handsCard.getChildAt(i) as MySelfCard;
					card.resetSelected();
				}
			}
			CardInfo.getInstance().selectGroup = [];

		}
		/**
		 * 删除现有手牌
		 */
		private disposeHandCards(){
            let len=this.handsCard.numChildren;
			let card:MySelfCard;
			for (var i:number = len - 1; i >= 0; i--) {
				card =this.handsCard.getChildAt(i) as MySelfCard;
				card.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
				card.setInitY();
				card.destory();
				card = null;
			}

			uniLib.DisplayUtils.removeAllChildren(this.handsCard);
			this.handsCard.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onHandsMoveHandler,this);
			this.handsCard.removeEventListener(egret.TouchEvent.TOUCH_END,this.onHandsEndHandler,this);

			this.handCardsArr = [];
		}
		/**
		 * 刷新手牌
		 */
		public refreshHandCards(freshtype:number = 0,data :any=null){
			this.disposeHandCards();
			this.handCardsArr = PKGame.CardInfo.getInstance().getHandCardBySeat(0);
			for (var j:number = 0; j < this.handCardsArr.length; j++) {
				this.setSigleCard(j,this.handCardsArr[j]);
			}
			this.resetHandleCardPos();
			this.initPoint.x=this.defaultPoint.x;
			this.sortCard();
		}
        /**添加要不起蒙版 */
		private _mask: egret.Sprite;

		private hostMask:egret.Bitmap;
		/**托管蒙版 */
		public addHostMask(){
			if(!this.hostMask){
				this.hostMask = ResUtil.createBitmapByName("host_mask");
				this.hostMask.x = (uniLib.Global.screenWidth-this.hostMask.width)/2;
				this.hostMask.y = this.initPoint.y - this.hostMask.height + 20 ;
				this.addChild(this.hostMask);
				this.hostMask.touchEnabled = true;
				this.hostMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hostMaskTouch,this);
			}
		}
		/**移除托管蒙版 */
		public removeHostMask(){
			if(this.hostMask){
				this.hostMask.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hostMaskTouch,this);
				uniLib.DisplayUtils.removeFromParent(this.hostMask);
			}
			this.hostMask = null;
		}
		private hostMaskTouch(e:egret.Event){
			this.dispatchEventWith(UIEventConsts.ACTION_HOST);	
		}
		public destory(){
			egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
			this.handsCard.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onHandsMoveHandler,this);
			if(this._mask){
				uniLib.DisplayUtils.removeAllChildren(this._mask);
				uniLib.DisplayUtils.removeFromParent(this._mask);
			}
			this._mask = null;
			if(this.hostMask){
				this.hostMask.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hostMaskTouch,this);
				uniLib.DisplayUtils.removeFromParent(this.hostMask);
			}
			this.hostMask = null;
			var len=this.handsCard.numChildren;
			var card:MySelfCard;
			for (; this.handsCard.numChildren > 0;) {
				card =this.handsCard.getChildAt(this.handsCard.numChildren - 1) as MySelfCard;
				if(card){
					card.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
					card.destory();
				}			
			}
			card = null;
			super.destory();
		}

		/**
		 * 亮自己的手牌
		 */
		public showUserHandCard(seatId:number,handCardSet:number[]){
			if(!PKGame.RoomInfo.getInstance().GM_Mode)return;
			this.curIndex = this.displayCardsMc.numChildren * 3;
			this.disposeHandCards();
			for (var j:number = 0; j < handCardSet.length; j++) {
				this.setSigleCard(j,handCardSet[j],true);
			}
			//显示剩下的手牌
			let totalCards:number[] = CardInfo.getInstance().getHandCardBySeat(seatId);
			for (var j:number = 0; j < totalCards.length; j++) {
				if(!ArrayUtil.isInArray(totalCards[j],handCardSet)){
					this.setSigleCard(j,this.handCardsArr[j]);
				}			
			}
			this.resetHandleCardPos();
		}

		/**重置初始位置 */
		public resetPoint(){
			this.initPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2,ResUtil.changeYAxis(410));
			this.displayPos=new egret.Point((uniLib.Global.screenWidth-1136)/2,ResUtil.changeYAxis(539));
			this.defaultPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2,ResUtil.changeYAxis(514));
		}

		//提示拉起牌
		public setTipCardSelected():void {
			if (!this.handsCard) return;
			var len:number = this.handsCard.numChildren;
			for (var i:number = 0; i < len; i++) {
				var item:any = this.handsCard.getChildAt(i);
				if (PKGame.CardInfo.getInstance().selectGroup.indexOf(item.data) >= 0) {
					item.setSelect(true);
				}
			}
		}
	}
}
