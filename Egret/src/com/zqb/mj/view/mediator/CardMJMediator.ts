module PKGame {
	export class CardMJMediator  extends puremvc.Mediator {
		public static NAME: string = "CardMJMediator";
        private _cardVc:CardsVc;
		private thisId: number;
		private timeStamp: number;
		public constructor(viewComponent: any) {
			super(CardMJMediator.NAME,viewComponent);
			this.initGame();
            this._cardVc=viewComponent;
			this._cardVc.addEventListener(UIEventConsts.ACTION_HOST,this.onOperate,this);
			this._cardVc.addEventListener(UIEventConsts.USER_DODISCARD,this.onOperate,this);
            this._cardVc.addEventListener(UIEventConsts.ACTION_DISCARD,this.onOperate,this);
			this._cardVc.addEventListener(UIEventConsts.REMOVE_READYHAND,this.onOperate,this);
			this._cardVc.addEventListener(UIEventConsts.ACTION_READYHAND,this.onOperate,this);
			this._cardVc.addEventListener(UIEventConsts.USER_DODISCARD_FAIL,this.onOperate,this);
		}
		public onRemove():void{
            super.onRemove();
			egret.MainContext.instance.stage.removeEventListener(egret.Event.DEACTIVATE,this.onDeactivateHandler,this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.EVENT_ACTIVE_SOCKET_CACHE_OK, this.onActivateHandler, this);
			if(this._cardVc){
				this._cardVc.removeEventListener(UIEventConsts.ACTION_HOST,this.onOperate,this);
				this._cardVc.removeEventListener(UIEventConsts.USER_DODISCARD,this.onOperate,this);
				this._cardVc.removeEventListener(UIEventConsts.ACTION_DISCARD,this.onOperate,this);
				this._cardVc.removeEventListener(UIEventConsts.REMOVE_READYHAND,this.onOperate,this);
				this._cardVc.removeEventListener(UIEventConsts.ACTION_READYHAND,this.onOperate,this);
				this._cardVc.removeEventListener(UIEventConsts.USER_DODISCARD_FAIL,this.onOperate,this);
				this._cardVc.destory();
				this._cardVc=null;
			}
		}
        private  onOperate(evt:egret.Event):void{
			var type:string=evt.type;
			var obj:any = null;
			switch(type){
				case UIEventConsts.ACTION_DISCARD:
					obj = new Cmd.OutCardPokerCmd_C();
					obj.thisId = evt.data;
					let time = new Date().getTime();
					if(this.thisId == obj.thisId && this.timeStamp - time < 200)
						return ;
					this.thisId = obj.thisId;
					this.timeStamp = time;
					break;
				case UIEventConsts.ACTION_READYHAND:

					break;
				case UIEventConsts.REMOVE_READYHAND:
					break;
				case UIEventConsts.USER_DODISCARD:
					// this._cardVc.doDiscard(uniLib.UserInfo.uid,ddzGame.GameData.getInstance().waitCard);
					break;
				case UIEventConsts.USER_DODISCARD_FAIL:
					// this._cardVc.removeOutPutCard(0,evt.data);
					break;

			}
			if(obj){
				this.sendNotification(PokerFourFacadeConst.SEND_DATA,obj,DataRequestCommand.GAME_DATA);
				uniLib.NetMgr.setMsgTimeout(8,"OutCardMahjongCmd_C");
			}			
		}
		 public listNotificationInterests(): Array<any> {
            return [				
				PokerFourFacadeConst.RELOGIN,			
				PokerFourFacadeConst.GAME_START,			
                PokerFourFacadeConst.SEND_CARDS,
				PokerFourFacadeConst.RESET_TABLE,
				PokerFourFacadeConst.GM_CHANGE_CARD,
				PokerFourFacadeConst.DISCARD_NOTICE,
				PokerFourFacadeConst.OUT_CARD_REFRESH,
				PokerFourFacadeConst.USER_ENTER_ROOM,
				PokerFourFacadeConst.GAME_SET_LANDOWNER,
                PokerFourFacadeConst.NOTIFY_COMMON_CHAT,
				PokerFourFacadeConst.NOTICE_CARD_ENABLE,
				PokerFourFacadeConst.GAME_NOTIFY_OPERATE,
				PokerFourFacadeConst.SELF_HANDCARD_CHANGE,
				PokerFourFacadeConst.NOTIFY_HOST,
				PokerFourFacadeConst.RESULT_NOTICE,
				PokerFourFacadeConst.MINGPAI_GUANGBO,
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            switch(notification.getName()) {
				case PokerFourFacadeConst.RESET_TABLE:
					this._cardVc.resetTable();
					break;
                case PokerFourFacadeConst.GAME_START:
                    this._cardVc.startGame();
				    if (PKGame.RoomInfo.getInstance().isMingPlay){

						this._cardVc.resetMingPaiNode();
					}

                    break;
			    case PokerFourFacadeConst.GAME_SET_LANDOWNER:
				    //底牌加入手牌
					let land:Cmd.SetLandownerPokerCmd_Brd = notification.getBody();
					if(land.landownerId == uniLib.UserInfo.uid){
						this._cardVc.insertDipai();
					}
                    //地主插入底牌调用接口
                    this._cardVc.insertDiCards(land.landownerCardSet,land.landownerId);
					break;
				case PokerFourFacadeConst.USER_ENTER_ROOM:
					this._cardVc.creatUserCardSide();
					if(PKGame.RoomInfo.getInstance().isHostMode == 1){
						this._cardVc.setHostMask(1);
					}
					break;
				case PokerFourFacadeConst.SELF_HANDCARD_CHANGE:
					let thisId: number = notification.getBody();
					if(!thisId)
						this._cardVc.refreshHandCards();
					else
						this._cardVc.draw(thisId);
					break;
                case PokerFourFacadeConst.SEND_CARDS:
                    this._cardVc.setUserCards();
					this._cardVc.startGame();

                    break;
				case PokerFourFacadeConst.RELOGIN:		    
				    this._cardVc.creatUserCardSide();
					this._cardVc.setRelogindata(notification.getBody());
					if(RoomInfo.getInstance().isHostMode == 1){
						this._cardVc.setHostMask(1);
					}

					var Carddata:any = notification.getBody();
					if (Carddata["othersShowCard"].length && PKGame.RoomInfo.getInstance().isMingPlay) {
						this._cardVc.resetMingPaiNode();

						for (var i:number = 0; i < Carddata["othersShowCard"].length; i++) {
							var showData:Cmd.UserCardObj = Carddata["othersShowCard"][i];
							var arr:any = showData["handCardSet"];
							if (arr && arr.length) {
								arr.sort((a,b)=>{
									var num1 = GameUtil.cardValue(a);
									var num2 = GameUtil.cardValue(b);
									if (num1 > num2) {
										return -1;
									}else if (num1 == num2) {
										return 0;
									}else {
										return 1;
									}
								})
							}
							var seat:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(showData["uid"]);
							this._cardVc.setMingPaiNode(seat,arr,showData["uid"]);
						}
					}

					//重连有最新出的牌


					if (Carddata.newOutCard && !GameUtil.isObjectOfNull(Carddata.newOutCard.outCardSet)) {
						var seatId:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(Carddata.newOutCard.uid);
						if (seatId == 2) {
							seatId = 3;
						}
						PKGame.CardInfo.getInstance().outCardSeatId = seatId;
						this._cardVc.doDiscard(Carddata.newOutCard);
					}

					break;
				case PokerFourFacadeConst.RESULT_NOTICE:
					this._cardVc.doWin(notification.getBody());
					this._cardVc.hideCardListenIcon();
					this._cardVc.setEnable(false);
					this._cardVc.clearCards();
					this._cardVc.resetMingPaiNode();
					break;
				case PokerFourFacadeConst.OUT_CARD_REFRESH:
				   this._cardVc.refreshHandCards(1,notification.getBody());
				   break;
				case PokerFourFacadeConst.GM_CHANGE_CARD:
					this._cardVc.refreshHandCards();
					break;
				case PokerFourFacadeConst.NOTICE_CARD_ENABLE:
					this._cardVc.setEnable(true);
					break;
				case PokerFourFacadeConst.DISCARD_NOTICE:

				    var data = PKGame.RoomInfo.getInstance().OutCard;

					if (data.outCardSet && data.outCardSet.length > 0) {
						var seatId:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(data.uid);
						if (seatId == 2) {
							seatId = 3;
						}
						PKGame.CardInfo.getInstance().outCardSeatId = seatId;
						this._cardVc.clearMingPaiCards(data.outCardSet,data.uid);
					}
					this._cardVc.clearDiscard();
				    this._cardVc.doDiscard(data);
					
				    break;
				case PokerFourFacadeConst.GAME_NOTIFY_OPERATE:
				    // this._cardVc.clearDiscard();
				    break;
				case PokerFourFacadeConst.MINGPAI_GUANGBO:

					 var mingPaiData:Cmd.ShowCardPokerCmd_Brd = notification.getBody();
					if (mingPaiData.handCard.uid != PKGame.MyUserInfo.getInstance().userId && PKGame.RoomInfo.getInstance().isMingPlay) {
						var seat:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(mingPaiData.handCard["uid"]);
						
						this._cardVc.setMingPaiNode(seat,mingPaiData.handCard["handCardSet"],mingPaiData.handCard["uid"]);
					}
					break;
            }
        }
		private initGame():void{
			egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE,this.onDeactivateHandler,this);
			uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_ACTIVE_SOCKET_CACHE_OK, this.onActivateHandler, this);			
		}
		private onActivateHandler(evt: egret.Event):void{
			// this._cardVc.refreshBanker();
			this._cardVc.refreshTempCard();
        }
        //开始发牌
        public startCards():void {
			this._cardVc.startSendCards();
		}

		private onDeactivateHandler(){
 
		}
	}
}
