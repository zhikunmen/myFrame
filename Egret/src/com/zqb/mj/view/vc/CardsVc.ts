module PKGame {
	export class CardsVc extends BaseVc {	
		private _startMc:StartEffectMc;
		private _bankPanel:egret.Sprite;
		private _moveCardArr:Array<BaseVc>;
		private _moveStackArr:Array<BaseVc>;
		private _cardSideArr:Array<UserSideCard>;
	    private _pointMc: egret.MovieClip;
		private _sendCardNArr:Array<number>=[4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1];
		private _mingPaiNode:egret.DisplayObjectContainer;

		/**
		 * 明牌容器
		 */

		public constructor() {
			super();
		}
		public destory():void{
			super.destory();
			egret.Tween.removeAllTweens();

			if(this._pointMc){
				this._pointMc.stop();
				ResUtil.removeFromParent(this._pointMc);
			}
			this._pointMc=null;
			if(this._startMc){
				this._startMc.destory();
			}
			this._startMc=null;
			if(this._bankPanel){
				uniLib.DisplayUtils.removeAllChildren(this._bankPanel);
				uniLib.DisplayUtils.removeFromParent(this._bankPanel);
			}
			this._bankPanel = null;
			var i:number;
			if(this._cardSideArr){
				for(i=0;i<4;i++){
					if(i == 0){
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.ACTION_HOST,this.onUserSideHandle,this);
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.USER_DODISCARD,this.onUserSideHandle,this);
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.ACTION_DISCARD,this.onUserSideHandle,this);
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.REMOVE_READYHAND,this.onUserSideHandle,this);
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.ACTION_READYHAND,this.onUserSideHandle,this);
					}
					if(this._cardSideArr[i]){
					    this._cardSideArr[i].destory();
					}
				}
			}
			this._cardSideArr=null;
			if(this._moveCardArr){
				for(i=0;i<this._moveCardArr.length;i++){
					this._moveCardArr[i].destory();
				}
			}
			this._moveCardArr=null;
			if(this._moveStackArr){
				for(i=0;i<this._moveStackArr.length;i++){
					this._moveStackArr[i].destory();
				}
			}
			this._moveStackArr=null;
			this._sendCardNArr=null;

			if (this._mingPaiNode.numChildren) {
				for (var i:number = 0; i<this._mingPaiNode.numChildren;i++) {
					var node:any = this._mingPaiNode.getChildAt(i);
					node.destory();
				}
				uniLib.DisplayUtils.removeFromParent(this._mingPaiNode);
				this._mingPaiNode = null;
			}
		}
		public initUI():void{
			this._moveStackArr=[];
			this._moveCardArr=[];
			this._cardSideArr=[];
			
			// this._actionEffect=new ActionEffectMc();

			this._bankPanel = new egret.Sprite;
			this.addChild(this._bankPanel);
			this._mingPaiNode = new egret.DisplayObjectContainer();
			this.addChild(this._mingPaiNode);


		}


		/**
		 * 设置明牌容器
		 * @param seat
		 * @param arr
		 */
		public setMingPaiNode(seat:number,arr:any,uid:number):void {
			if (!arr.length) return;
			var node:MingPaiNode = new MingPaiNode();
			 arr.sort((a:any,b:any)=> {
                var num1:number = GameUtil.cardValue(a);
                var num2:number = GameUtil.cardValue(b);
                if (num1 > num2) {
                    return -1
                }else if (num2 == num1) {
                    return 0
                }else {
                    return 1;
                }
            })
			node.setData(arr,uid);
			this._mingPaiNode.addChild(node);
			// GameUtil.setPosBySeat(node,seat,ddzGame.CardInfo.getInstance().mingPaiArr);
            GameUtil.setContainerPos(node,PKGame.PositionData.getInstance().mingPaiNodePosArr,seat)
		}

		/**
		 * 地主明牌，底牌插入
		 */

		public insertDiCards(arr:any,uid):void {
		
		    if (!arr.length || !uid) return;
			if (this._mingPaiNode.numChildren) {
				for (var i:number=0; i < this._mingPaiNode.numChildren; i++) {
					var mingPaiNode:any = this._mingPaiNode.getChildAt(i);
				   if (mingPaiNode instanceof MingPaiNode) {
					   mingPaiNode.insertDiCards(arr,uid);
				   }
				}
			}
		}


       //清掉打出去的明牌
	   public clearMingPaiCards(arr:any[],uid:number):void {
		   if (this._mingPaiNode.numChildren) {
			   for (var i:number = 0; i < this._mingPaiNode.numChildren; i++) {
				   var mingPaiNode:any = this._mingPaiNode.getChildAt(i);
				   if (mingPaiNode instanceof MingPaiNode) {
					   mingPaiNode.clearOutCards(arr,uid);
				   }
			   }

		   }
	   }

		public resetMingPaiNode():void {

			if (this._mingPaiNode.numChildren) {
				for (var i:number = 0; i < this._mingPaiNode.numChildren; i++) {
					var node:any = this._mingPaiNode.getChildAt(i);
					node.destory();
				}
				uniLib.DisplayUtils.removeAllChildren(this._mingPaiNode);
			}
		}





		public creatUserCardSide(){
			if(this._cardSideArr){
				for(let i = 0;i < this._cardSideArr.length ;i++){
					if(i == 0){				
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.ACTION_HOST,this.onUserSideHandle,this);
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.ACTION_DISCARD,this.onUserSideHandle,this);
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.REMOVE_READYHAND,this.onUserSideHandle,this);
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.ACTION_READYHAND,this.onUserSideHandle,this);
						if(this._cardSideArr[i])this._cardSideArr[i].removeEventListener(UIEventConsts.USER_DODISCARD_FAIL,this.onUserSideHandle,this);
					}
					if(this._cardSideArr[i]){
					    this._cardSideArr[i].destory();
					}
				}
			}
			this._cardSideArr = [];
			var len:number = PKGame.RoomInfo.getInstance().playerNumber;
			if(len == 2){
				var cardside:UserSideCard0=new UserSideCard0();
				cardside.addEventListener(UIEventConsts.ACTION_HOST,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.USER_DODISCARD,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.ACTION_DISCARD,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.REMOVE_READYHAND,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.ACTION_READYHAND,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.USER_DODISCARD_FAIL,this.onUserSideHandle,this);
				this._cardSideArr[0] = cardside;
				var cardside2:UserSideCard2=new UserSideCard2();
				this.addChild(cardside2);
				this._cardSideArr[2] = cardside2;
				this.addChild(cardside);
			}
			else if(len == 3){
				var cardside:UserSideCard0=new UserSideCard0();
				cardside.addEventListener(UIEventConsts.ACTION_HOST,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.USER_DODISCARD,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.ACTION_DISCARD,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.REMOVE_READYHAND,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.ACTION_READYHAND,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.USER_DODISCARD_FAIL,this.onUserSideHandle,this);
				this._cardSideArr[0] = cardside;
				var cardside2:UserSideCard1=new UserSideCard1();
				this.addChild(cardside2);
				this._cardSideArr[1] = cardside2;
				var cardside3:UserSideCard3=new UserSideCard3();
				this.addChild(cardside3);
				this._cardSideArr[3] = cardside3;
				this.addChild(cardside);
			}
			else{
				var cardside:UserSideCard0=new UserSideCard0();
				cardside.addEventListener(UIEventConsts.ACTION_HOST,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.USER_DODISCARD,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.ACTION_DISCARD,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.REMOVE_READYHAND,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.ACTION_READYHAND,this.onUserSideHandle,this);
				cardside.addEventListener(UIEventConsts.USER_DODISCARD_FAIL,this.onUserSideHandle,this);
				this._cardSideArr.push(cardside);
				var cardside1:UserSideCard1=new UserSideCard1();
				this.addChild(cardside1);
				this._cardSideArr.push(cardside1);
				var cardside2:UserSideCard2=new UserSideCard2();
				this.addChild(cardside2);
				this._cardSideArr.push(cardside2);
				var cardside3:UserSideCard3=new UserSideCard3();
				this.addChild(cardside3);
				this._cardSideArr.push(cardside3);
				this.addChild(cardside);
			}
		}
		private  onUserSideHandle(evt:egret.Event):void{
			this.dispatchEvent(evt);
		}
		/**
		 * 清空桌面
		 */
		public resetTable(){
            this.resetCards();
			// this._actionEffect.clearEffect();
			uniLib.DisplayUtils.removeAllChildren(this._bankPanel);
		}

		public  startGame():void{
			this.resetTable();
			//发牌动画
			// this.showStartEffect();
			// uniLib.SoundMgr.instance.playSound(SoundConsts.START);
		}
		
		/**
		 * 发牌
		 */
		public startSendCards(){
			for(let i:number=0;i<4;i++){
				if(this._cardSideArr[i]){
					this._cardSideArr[i].resetCard();
				}
			}
			this.sendCards();
		}
		private showStartEffect():void{
			if(!this._startMc){
				this._startMc=new StartEffectMc();
				this.addChild(this._startMc);
			}
			this._startMc.play();
		}

		public refreshBanker(){
			if(this._bankPanel == null) return;
			uniLib.DisplayUtils.removeAllChildren(this._bankPanel);
			var banker = ResUtil.createBitmapByName("bank");
			var point:egret.Point=PositionData.seatPosArr[RoomInfo.getInstance().landOwnerSeatId];
			if(!point){
				var self = this;
				setTimeout(function (): void {
					self.refreshBanker();//如果庄没有显示出来,就循环尝试
				}, 1000);
				return;
			}
			banker.x = point.x-5;
			banker.y = point.y-5;
			this._bankPanel.addChild(banker);
		}
		private sendCards():void{
			this._cardSideArr[0].sendCards(17);
		}

		public  setUserCards():void{
			let seatId:number;
			let userList = RoomInfo.getInstance().userList;
			for (let i:number = 0; i < userList.length; i++) {
				seatId = RoomInfo.getInstance().getSeatNoByUserId(userList[i].uid);

				if (seatId == 2) {
					seatId = 3;
				}
				if(this._cardSideArr[seatId]){
					this._cardSideArr[seatId].uid = userList[i].uid;
				    this._cardSideArr[seatId].handCardsArr = CardInfo.getInstance().getHandCardBySeat(seatId);
				}
			}
		}
		public  setEnable(boo:boolean):void{
			if(boo){
				PKGame.GameData.getInstance().waitCard = 0;
				this._cardSideArr[0].setEnable(true);
			}else{
				this._cardSideArr[0].setEnable(false);
			}
		}

		//手牌数组中最后一张
	    public  draw(thisId: number):void{
			// this.cacheAsBitmap = false;
			this.doDraw(thisId);
		}
		private  doDraw(thisId: number):void{
			// this.cacheAsBitmap = true;
			egret.Tween.removeTweens(this);
			this._cardSideArr[0].doDraw(thisId);
			// this.setEnable(true);	
		}
		/**
		 * 加入8张底牌
		 */
		public insertDipai(){
			this._cardSideArr[0].refreshHandCards();
			this._cardSideArr[0].addSelect(PKGame.RoomInfo.getInstance().landownerCardSet);
			PKGame.CardInfo.getInstance().selectGroup = PKGame.RoomInfo.getInstance().landownerCardSet;
			this.setEnable(false);

			this.setGlobalTouch(false);
			egret.setTimeout(()=>{
				this.setEnable(true);
				this.resetSelfHandsCard()
				this.setGlobalTouch(true);

			},this,3000)
		}
		/**
		 *出牌显示 
		 * @param userId
		 * @param cardId
		 * 
		 */		
		public  doDiscard(data:Cmd.OutCardPokerCmd_Brd):void{
			var seatId:number = RoomInfo.getInstance().getSeatNoByUserId(data.uid);
			if (seatId == 2) {
				seatId = 3;
			}
			if(this._cardSideArr[seatId]){
				this._cardSideArr[seatId].doDiscard(data.outCardSet,seatId);				
			}			
		}
		/**
		 * 清除当前玩家已出牌
		 */
		public  clearDiscard(){
			for (var i:number = 0; i < this._cardSideArr.length; i++) {
				if (this._cardSideArr[i]) {
					this._cardSideArr[i].clearDiscard(i);
				}
			}
		}

		

		public  setRelogindata(rev:Cmd.ReConnectPokerCmd_S):void{
			this.resetCards();
			for(let i = 0;i < 4;i++){
				if(i == 0){
					this._cardSideArr[0].setReloginData();
				    this._cardSideArr[0].refreshHandCards();
				}
				else{
					if(this._cardSideArr[i]){
						this._cardSideArr[i].setReloginData();
					}
				}
			}	
		}
		public  resetCards():void{
			for (var i:number = 0; i < 4; i++) {
				if(this._cardSideArr[i])this._cardSideArr[i].resetCard();
			}
		}

		public doWin(data: Cmd.WinRetPokerCmd_Brd){
			var rewardSet:Cmd.RewardObj[] = data.rewardSet;
			
		}

		private onMcPlayerComplete(evt:egret.Event){
			let target :egret.MovieClip= evt.target;
			if(target){
				target.stop();
				target.removeEventListener(egret.Event.COMPLETE,this.onMcPlayerComplete,this);
				uniLib.DisplayUtils.removeFromParent(target);
				target = null;
			}
		}	
		/**
		 * 点击游金后选牌
		 */
		public selectGoldOut(){
			this._cardSideArr[0].selectGoldOut();
		}
		public refreshTempCard(){
			for (var i:number = 0; i < 4; i++) {
				if(this._cardSideArr[i]){
					this._cardSideArr[i].refreshTempCard();
				}
			}
		}
		/**
		 * 切换后台后刷新手牌
		 */
		public refreshHandCards(freshtype:number = 0,data :any=null){
			this._cardSideArr[0].refreshHandCards(freshtype,data);
		}

		/**听牌箭头删除 */
		public hideCardListenIcon():void{
			this._cardSideArr[0].hideListenIcon();
		}
		/**托管蒙版 */
		public setHostMask(type:number){
			if(type == 1){
				this._cardSideArr[0].addHostMask();
			}
			else{
				this._cardSideArr[0].removeHostMask();
			}
		}
		/**
		 * 删除已经打出去的牌
		 */

		//重置自己的手牌
		public resetSelfHandsCard(isTween:boolean = false):void {
			var selftNode:any = this._cardSideArr[0];
			selftNode.initSelect(isTween);
		}

		//拉起提示的手牌
		public pullTipCards():void {
			var selftNode:any = this._cardSideArr[0];
			selftNode.setTipCardSelected();
		}

		//清理桌面上的牌
		public clearCards():void {
			for (var i:number = 0; i < this._cardSideArr.length; i++) {
				if (this._cardSideArr[i]) {

					this._cardSideArr[i].clearAllCards();
				}
			}
		}

		public setGlobalTouch(isSet:boolean):void {
			var selftNode:any = this._cardSideArr[0];
			selftNode.setGlobalTouch(isSet);
		}

		public getCardSideArr():any {
			return this._cardSideArr;
		}


	}
}
