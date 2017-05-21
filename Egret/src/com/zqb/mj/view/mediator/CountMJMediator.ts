module PKGame {
	export class CountMJMediator  extends puremvc.Mediator {
		public static NAME: string = "CountMJMediator";
        private _countVc:CountVc;
		public constructor(viewComponent: any) {
			super(CountMJMediator.NAME,viewComponent);
            this._countVc=viewComponent;
		}
		 public listNotificationInterests(): Array<any> {
            return [
				PokerFourFacadeConst.RELOGIN,							
				PokerFourFacadeConst.RESET_TABLE,				
				PokerFourFacadeConst.RESULT_NOTICE,			
				PokerFourFacadeConst.GAME_SET_LANDOWNER,
				PokerFourFacadeConst.GAME_NOTIFY_OPERATE,
				PokerFourFacadeConst.GAME_START,
				PokerFourFacadeConst.MINGPAI_GUANGBO,
				PokerFourFacadeConst.RESPONSE_MINGPAI_SEND,
				PokerFourFacadeConst.SEND_CARDS,
				PokerFourFacadeConst.IS_SELF_PASS_CARDS,
				PokerFourFacadeConst.DISCARD_NOTICE,

            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            switch(notification.getName())
			{			
				case PokerFourFacadeConst.RELOGIN:
					if(PKGame.RoomInfo.getInstance().operateId){
						let opSeat = PKGame.RoomInfo.getInstance().getSeatNoByUserId(PKGame.RoomInfo.getInstance().operateId);
					    this._countVc.setCount(opSeat,PKGame.RoomInfo.getInstance().opCount);
					}

					if (!PKGame.RoomInfo.getInstance().isXiaoReconnect) {

						var isFirst:boolean = PKGame.RoomInfo.getInstance().userList.every((data:any)=>{
							return data["handCardNum"] == 0;
						},this);
						if (PKGame.RoomInfo.getInstance().isMingPlay && isFirst) {

							this._countVc.setCount(0,5);
						}
					}
					break;
				case PokerFourFacadeConst.RESET_TABLE:
					this._countVc.reset();	
					break;
				case PokerFourFacadeConst.RESULT_NOTICE:
					this._countVc.reset();					
					break;
				case PokerFourFacadeConst.GAME_SET_LANDOWNER:
						let landSeat = PKGame.RoomInfo.getInstance().getSeatNoByUserId(notification.getBody()["landownerId"]);
						var count:number = notification.getBody()["showCardTime"];
						if (count > 0 && !PKGame.CardInfo.getInstance().isSelMingPai) {
							this._countVc.setCount(0,count);
						}else {
							this._countVc.reset();
						}
				    break;
				case PokerFourFacadeConst.GAME_NOTIFY_OPERATE:
					let opSeat = PKGame.RoomInfo.getInstance().getSeatNoByUserId(PKGame.RoomInfo.getInstance().operateId);
					this._countVc.setCount(opSeat,PKGame.RoomInfo.getInstance().opCount);
					break;
				case PokerFourFacadeConst.GAME_START:
					if (PKGame.RoomInfo.getInstance().isMingPlay) {

						var data:any = notification.getBody();
						var seat = 0;
						this._countVc.setCount(seat,data["showCardTime"]);
					}

				    break;
				case PokerFourFacadeConst.MINGPAI_GUANGBO:
				
					break;
				case PokerFourFacadeConst.RESPONSE_MINGPAI_SEND:
					if (!notification.getBody()["resultCode"]) {

						this._countVc.reset();
					}
					break;

				case PokerFourFacadeConst.SEND_CARDS:
					this._countVc.reset();
				    break;
				case PokerFourFacadeConst.IS_SELF_PASS_CARDS:

					var chuPaiData:Cmd.OperatorPokerCmd_S = notification.getBody();
					if (chuPaiData.sec) {
						this._countVc.setCount(0,chuPaiData.sec);

					}
					break;
				case PokerFourFacadeConst.DISCARD_NOTICE:
                    this._countVc.reset();
					break;

			}
        }
		 public onRemove():void{
            super.onRemove();
			if(this._countVc){
				this._countVc.destory();
				this._countVc=null;
			}
		 }

	}
}