module PKGame {
	export class OperateMJMediator  extends puremvc.Mediator  {
		public static NAME: string = "OperateMJMediator";
        private _menuVc:OperateVc;
		public constructor(viewComponent: any) {
			super(OperateMJMediator.NAME,viewComponent);
			this._menuVc=viewComponent;
			this._menuVc.addEventListener(UIEventConsts.ACTION_CANCEL,this.onOperate,this);
			this._menuVc.addEventListener(UIEventConsts.ACTION_OPERATE,this.onOperate,this);
			this._menuVc.addEventListener(UIEventConsts.ACTION_STAKE,this.onOperate,this);
			this._menuVc.addEventListener(UIEventConsts.ACTION_DISCARD,this.onOperate,this);
			this._menuVc.addEventListener(UIEventConsts.ACTION_MINGPAI,this.onOperate,this);
		}
		 public onRemove():void{
            super.onRemove();
			if(this._menuVc){
				this._menuVc.removeEventListener(UIEventConsts.ACTION_CANCEL,this.onOperate,this);
				this._menuVc.removeEventListener(UIEventConsts.ACTION_OPERATE,this.onOperate,this);
				this._menuVc.removeEventListener(UIEventConsts.ACTION_STAKE,this.onOperate,this);
				this._menuVc.removeEventListener(UIEventConsts.ACTION_DISCARD,this.onOperate,this);
				this._menuVc.destory();
				this._menuVc=null;
			}
		 }
		private  onOperate(evt:egret.Event):void{
			var type:string=evt.type;
			var obj:any;
			switch(type){
				case UIEventConsts.ACTION_CANCEL:
					var cardVc:CardsVc = GameUtil.getViewByName(PKGame.CardMJMediator.NAME)._cardVc;
					cardVc.resetSelfHandsCard(true);

					obj=new Cmd.PassPokerCmd_C();
					break;
				case UIEventConsts.ACTION_STAKE:
				    obj = new Cmd.StakePokerCmd_C();
					obj.multi = evt.data;
					break;
				case UIEventConsts.ACTION_MINGPAI:
					obj = new Cmd.ShowCardPokerCmd_C();
					break;
				case UIEventConsts.ACTION_OPERATE:
					if (PKGame.CardInfo.getInstance().cardTipArr.length) {
						var cardVc:PKGame.CardsVc = GameUtil.getViewByName(PKGame.CardMJMediator.NAME)._cardVc;
						cardVc.resetSelfHandsCard(true);
						var index:number = PKGame.CardInfo.getInstance().cardTipIndex;
						var arr:any[] = [];
						arr = PKGame.CardInfo.getInstance().cardTipArr[index];
						var arr1:any[] =[];
						for (var i:number = 0; i < arr.length; i++) {
							var item:any = arr[i];
							arr1.push(item);
						}
						PKGame.CardInfo.getInstance().selectGroup = arr1;
						cardVc.pullTipCards();
						PKGame.CardInfo.getInstance().cardTipIndex ++;
						if (PKGame.CardInfo.getInstance().cardTipIndex >= PKGame.CardInfo.getInstance().cardTipArr.length) {
							PKGame.CardInfo.getInstance().cardTipIndex = 0;
						}

				}else {
						obj = new Cmd.TipsPokerCmd_C();
					}
				    break;
				case UIEventConsts.ACTION_DISCARD:
					obj = new Cmd.OutCardPokerCmd_C();
					obj.outCardSet = CardInfo.getInstance().selectGroup;
					break;
			}	
			if(obj){
				this.sendNotification(PokerFourFacadeConst.SEND_DATA,obj,DataRequestCommand.GAME_DATA);
				uniLib.NetMgr.setMsgTimeout(8,"OutCardMahjongCmd_C");
			}
			
		}
		 public listNotificationInterests(): Array<any> {
            return [
                 PokerFourFacadeConst.GAME_START,
				 PokerFourFacadeConst.SHOW_ACTION,				 
				 PokerFourFacadeConst.RESET_TABLE,	 
				 PokerFourFacadeConst.RESULT_NOTICE,
				 PokerFourFacadeConst.REMOVE_ACTION,
				 PokerFourFacadeConst.GAME_SET_LANDOWNER,
				 PokerFourFacadeConst.GAME_NOTIFY_OPERATE,
				 PokerFourFacadeConst.RESULT_NOTICE,
				 PokerFourFacadeConst.IS_SELF_PASS_CARDS,
				 PokerFourFacadeConst.RESPONSE_MINGPAI_SEND,
				 PokerFourFacadeConst.MINGPAI_GUANGBO,
				 PokerFourFacadeConst.RELOGIN,
				 PokerFourFacadeConst.GAME_NOTIFY_STAKE,
				 PokerFourFacadeConst.SEND_CARDS,
				 PokerFourFacadeConst.DISCARD_NOTICE,
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            switch(notification.getName()) {
				case PokerFourFacadeConst.RESET_TABLE:
				    this._menuVc.startGame();
					break;
                case PokerFourFacadeConst.GAME_START:
					this._menuVc.startGame();
				    if (!PKGame.CardInfo.getInstance().isSelMingPai&&PKGame.RoomInfo.getInstance().isMingPlay) {
						this._menuVc.showStartMingPaiBtn(1);
					}
				
					break;
				case PokerFourFacadeConst.RESULT_NOTICE:
					this._menuVc.removeAction();
					var obj:Cmd.WinRetPokerCmd_Brd = notification.getBody();
					break;
				case PokerFourFacadeConst.REMOVE_ACTION:
					// this._menuVc.removeAction();
					break;
				case PokerFourFacadeConst.SHOW_ACTION:
					// this._menuVc.showAction(notification.getBody().opType);
					break;
				case PokerFourFacadeConst.GAME_NOTIFY_OPERATE:
				    if(PKGame.RoomInfo.getInstance().operateId != uniLib.UserInfo.uid){
				    	this.removeAction();
						return;
					}
					
					if(PKGame.RoomInfo.getInstance().operateType == 1){
						//叫分
						this._menuVc.removeAction();
						this._menuVc.showAction(PKGame.RoomInfo.getInstance().operateType,PKGame.RoomInfo.getInstance().opMulti);
					}
				    break;
				case PokerFourFacadeConst.GAME_SET_LANDOWNER:
					this._menuVc.removeAction();
					var landData:Cmd.SetLandownerPokerCmd_Brd = notification.getBody();

					if (PKGame.RoomInfo.getInstance().isMingPlay && !PKGame.CardInfo.getInstance().isSelMingPai) {

						this._menuVc.showStartMingPaiBtn(2);

					}else {
					}
					break;
				case PokerFourFacadeConst.RESULT_NOTICE:
					this._menuVc.removeAction();
					break;
				case  PokerFourFacadeConst.IS_SELF_PASS_CARDS:
				    
					var data:any = notification.getBody();
					var type:number;
					var num:number;
				    if (data) {
						type = data["opType"];
						 num = data["button"];
					}

					this._menuVc.removeAction();
					this._menuVc.setButtonView(type,num);
					break;
				case PokerFourFacadeConst.RESPONSE_MINGPAI_SEND:
				    if (!notification.getBody()["resultCode"]) {
						
						this._menuVc.removeAction();
					}
					break;
				case PokerFourFacadeConst.MINGPAI_GUANGBO:
					if (notification.getBody()["uid"] == PKGame.MyUserInfo.getInstance().userId) {
						this._menuVc.removeAction();
					}
					break;
				case PokerFourFacadeConst.RELOGIN:
					//是否是发牌前断线重连
					this.removeAction();
					if (!PKGame.RoomInfo.getInstance().isXiaoReconnect) {

						var isFirst:boolean = PKGame.RoomInfo.getInstance().userList.every((data:any)=>{
							return data["handCardNum"] == 0;
						},this);
						if (PKGame.RoomInfo.getInstance().isMingPlay && isFirst) {

							this.showMingPaiBtn(1);
						}
					}
					break;

			    case PokerFourFacadeConst.GAME_NOTIFY_STAKE:
					this._menuVc.removeAction();
					break;
				case PokerFourFacadeConst.SEND_CARDS:
					this._menuVc.removeAction();
					if (PKGame.RoomInfo.getInstance().isMingPlay && !PKGame.CardInfo.getInstance().isSelMingPai) {
						this.showMingPaiBtn(2);
					}
					break;
				case PokerFourFacadeConst.DISCARD_NOTICE:
					this.removeAction();
					break;
            }
        }
        //显示明牌按钮

        public showMingPaiBtn(type:number):void {
			this._menuVc.showStartMingPaiBtn(type);
		}
		public removeAction():void {
			this._menuVc.removeAction();
		}
		//删除发牌明牌按钮
		public removeFaMingBtn():void {
			this._menuVc.removeFaMingBtn();
		}
	}
}
