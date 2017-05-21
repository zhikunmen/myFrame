module PKGame {
	export class SeatPlayerMJMediator  extends puremvc.Mediator {
		public static NAME: string = "SeatPlayerMJMediator";
        private _requestUid:number = 0;
        private _seatVc:SeatPlayVc;
        private _userInfoPanel:UserInfoPanel;
		public constructor(viewComponent: any) {
			super(SeatPlayerMJMediator.NAME,viewComponent);
            this._seatVc=viewComponent;
            this._seatVc.addEventListener(UIEventConsts.SHOW_USER_INFO,this.uiEventHandle,this);
		}
        private uiEventHandle(evt:egret.Event):void{
            var type:string=evt.type;
            switch (type) {
                case UIEventConsts.SHOW_USER_INFO:
                if(this._requestUid != evt.data){
                    this.getUserData(evt.data);
                    this._requestUid = evt.data;
                }
                this.showUserInfoPanel();
                break;
                default:
                    break;
            }
        }
        public onRegister():void{
            super.onRegister();
           
        }
		 public listNotificationInterests(): Array<any> {
            return [     
                PokerFourFacadeConst.RELOGIN,               
                PokerFourFacadeConst.GAME_START,
                PokerFourFacadeConst.PLAYER_LEFT,
                PokerFourFacadeConst.RESET_TABLE,
                PokerFourFacadeConst.READY_NOTICE,
                PokerFourFacadeConst.RESULT_NOTICE,
                PokerFourFacadeConst.USERINFO_DATA,
                PokerFourFacadeConst.PLAYER_CONNECT,  
                PokerFourFacadeConst.DISCARD_NOTICE,       
                PokerFourFacadeConst.USER_ENTER_ROOM,
                PokerFourFacadeConst.GAME_NOTIFY_STAKE,
                PokerFourFacadeConst.PLAYER_ENTER_ROOM,             
                PokerFourFacadeConst.PLAYER_DISCONNECT,  
                PokerFourFacadeConst.SEND_GIFTS_NOTICE,
                PokerFourFacadeConst.GAME_SET_LANDOWNER,
                PokerFourFacadeConst.NOTIFY_POINT_CHANGE,
                PokerFourFacadeConst.NOTIFY_ONLINE_STATE,
                PokerFourFacadeConst.MINGPAI_GUANGBO,
                PokerFourFacadeConst.SEND_CARDS,
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            switch(notification.getName()) {
                 case PokerFourFacadeConst.USER_ENTER_ROOM:
                     this._seatVc.initSeat();
                     this._seatVc.updatePlayers(RoomInfo.getInstance().userList);
                     break;
                case PokerFourFacadeConst.PLAYER_ENTER_ROOM:
                    var enter:PKGame.UserVo = notification.getBody();
                    if(enter.uid != uniLib.UserInfo.uid){
                            this._seatVc.addSeatPlayer(enter);
                            // this._seatVc.updatePlayers(RoomInfo.getInstance().userList);
                            this._seatVc.updateStatus(enter.uid, Cmd.OnlineState.OnlineState_Online);
                    }
                    break;
                case PokerFourFacadeConst.PLAYER_LEFT:
                    this._seatVc.removePlayer(notification.getBody());
                    break; 
                case  PokerFourFacadeConst.RELOGIN:
                    var data:Cmd.ReConnectPokerCmd_S = notification.getBody();
                    // if(data.handCard&& data.handCard.handCardSet.length>0){
                    //     //游戏状态
                    //     this._seatVc.resetReady();
                    // }
                    if (PKGame.RoomInfo.getInstance().userList.length == 3) {
                        this._seatVc.resetReady();
                    }
                    if (data.othersShowCard && data.othersShowCard.length) {
                        for (var i:number = 0; i < data.othersShowCard.length; i++) {
                            var mingPaiData1:Cmd.UserCardObj =  data.othersShowCard[i];
                            if (mingPaiData1 && mingPaiData1.uid) {
                                var seat:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(mingPaiData1.uid);
                            }
                           this._seatVc.setRoleMingLabel(mingPaiData1.uid);
                        }
                    }
                    this._seatVc.setRole();
                    if (data.showCard) {
                        this._seatVc.setRoleMingLabel(PKGame.MyUserInfo.getInstance().userId);
                    }
					break; 
                case  PokerFourFacadeConst.READY_NOTICE:
					this._seatVc.refreshPlayerReady(RoomInfo.getInstance().readyUsers);
					break;
                case  PokerFourFacadeConst.RESULT_NOTICE:
                    this._seatVc.updatePlayers(RoomInfo.getInstance().chipsSets);
                    this._seatVc.resetRole();
					break;
                case PokerFourFacadeConst.USERINFO_DATA:
                    if(this._userInfoPanel){
                        this._userInfoPanel.setData(notification.getBody())
                    }
                    break
                case PokerFourFacadeConst.SEND_GIFTS_NOTICE:
                        this._seatVc.showGift(notification.getBody());
                    break
                case PokerFourFacadeConst.GAME_START:
                    this._seatVc.reset();
                    this._seatVc.resetReady();
                    this._seatVc.resetCardNum();
                    if (PKGame.RoomInfo.getInstance().isMingPlay) {
                        this._seatVc.resetMingPaiLabel();
                    }
                    // this._seatVc.resetMingPaiLabel();
                    break;
                case PokerFourFacadeConst.RESET_TABLE:
                    break;
                case PokerFourFacadeConst.PLAYER_CONNECT:
                    var rev:PKGame.UserVo = notification.getBody();
                    this._seatVc.updateStatus(rev.uid, Cmd.OnlineState.OnlineState_Online);
                    if(rev.uid != uniLib.UserInfo.uid){
                        var nickName:string = RoomInfo.getInstance().getUserVoByUid(rev.uid).nickName;
                        PublicManage.getInstance().showMildWarnShow("玩家"+nickName+"已回来");
                    }
                    break;
                case PokerFourFacadeConst.PLAYER_DISCONNECT:
                    var leave:Cmd.LeavePokerCmd_Brd = notification.getBody();
                    this._seatVc.updateStatus(leave.uid,leave.state);
                    var nickName: string = RoomInfo.getInstance().getUserVoByUid(leave.uid).nickName;
                    if (leave.state == Cmd.OnlineState.OnlineState_Leave && leave.uid != uniLib.UserInfo.uid) {
                        return;
                    }
                    if (leave.state == Cmd.OnlineState.OnlineState_Online) {
                        return;
                    }
                    else{
                        PublicManage.getInstance().showMildWarnShow("玩家"+nickName+"已断线，请等待");
                    }
                    break;
                case PokerFourFacadeConst.NOTIFY_ONLINE_STATE:
                     var online:Cmd.OnlineStatePokerCmd_Brd = notification.getBody();
                     this._seatVc.updateStatus(online.uid,online.state);
                    break;
                case PokerFourFacadeConst.NOTIFY_POINT_CHANGE:
                    // let point:Cmd.ChangePointPokerCmd_Brd = notification.getBody();
                    // this._seatVc.floatPoint(point);
                    break;
                case PokerFourFacadeConst.GAME_NOTIFY_STAKE:
                    this._seatVc.refreshStake(RoomInfo.getInstance().stakeUsers);
                    if (PKGame.RoomInfo.getInstance().isMingPlay) {

                        var jiaoFenData:Cmd.StakePokerCmd_Brd = notification.getBody();
                        var isChongJiao:boolean = false;
                        if (jiaoFenData.stakeSet && jiaoFenData.stakeSet.length == 3) {

                            isChongJiao = jiaoFenData.stakeSet.every((data:Cmd.StakeSet)=>{
                                return data.multi == 0;
                            },this)
                        }
                        if (isChongJiao) {
                            this._seatVc.resetMingPaiLabel();
                            PKGame.RoomInfo.getInstance().mingPlayerArr = [];
                        }
                    }
                    break;
                case PokerFourFacadeConst.GAME_SET_LANDOWNER:
                    this._seatVc.resetStake();
                    this._seatVc.setRole();
                    var dizhuData:Cmd.SetLandownerPokerCmd_Brd = notification.getBody();
                    var seat:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(dizhuData.landownerId);
                    PKGame.CardInfo.getInstance().userHandCount[seat] = 20;
                    this._seatVc.updateCardNum(dizhuData.landownerId);
                    break;
                case PokerFourFacadeConst.DISCARD_NOTICE:
                    this._seatVc.updateCardNum(PKGame.RoomInfo.getInstance().operateId);
                    break;
                case PokerFourFacadeConst.MINGPAI_GUANGBO:
                    if (PKGame.RoomInfo.getInstance().isMingPlay) {

                        var mingData:Cmd.ShowCardPokerCmd_Brd = notification.getBody();
                        if (mingData.handCard) {
                            this._seatVc.setMingPaiLabel(mingData.handCard.uid);
                        }
                    }
                    break;
                case PokerFourFacadeConst.SEND_CARDS:
                   
                    this._seatVc.resetStake();
                    break;
            }
        }
        private showUserInfoPanel():void{
            if(!this._userInfoPanel){
                this._userInfoPanel=new UserInfoPanel();
                this._userInfoPanel.x = (uniLib.Global.screenWidth - this._userInfoPanel.width)>>1;
                this._userInfoPanel.y = (uniLib.Global.screenHeight - this._userInfoPanel.height)>>1;
                this._userInfoPanel.addEventListener(UIEventConsts.GIFT_SEND,this.onUserPanelHandle,this);
                this._userInfoPanel.addEventListener(UIEventConsts.CLOSE,this.onUserPanelHandle,this);
            }else{
                this._userInfoPanel.reset();
            }
            PopupManager.addPopUp(this._userInfoPanel,true,false);
        }
        private _isClick:boolean = true;
        private onUserPanelHandle(evt:egret.Event):void{
		var self: any = this;
            var type:string=evt.type;
            switch (type) {
                case UIEventConsts.GIFT_SEND:
                if(this._isClick){
                    var req:Cmd.SendGiftPokerCmd_C=new Cmd.SendGiftPokerCmd_C();
					req.gift=evt.data;
                    this.sendNotification(PokerFourFacadeConst.SEND_DATA,req,DataRequestCommand.GAME_DATA);
                    PopupManager.removePopUp(this._userInfoPanel);
                    this.hideUserInfo();
                    this._isClick = false;
		    setTimeout(function (): void {
			    self._isClick = true;
		    }, 2600);
                 }
                 else{
                     PublicManage.getInstance().showMildWarnShow("您的操作太频繁了！请休息一下吧");
                 }
                break;
                case UIEventConsts.CLOSE:
                    PopupManager.removePopUp(this._userInfoPanel);
                    this.hideUserInfo();
                    break;
                default:
                    break;
            }
        }
        private hideUserInfo():void{
            this._isClick = true;
            this._requestUid = 0;
        }
        private removeUserInfo():void{
            this._isClick = true;
             if(this._userInfoPanel){
                 this._userInfoPanel.removeEventListener(UIEventConsts.GIFT_SEND,this.onUserPanelHandle,this);
                 this._userInfoPanel.removeEventListener(UIEventConsts.CLOSE,this.onUserPanelHandle,this);
                 this._userInfoPanel.destory();
                 this._userInfoPanel=null;
             }
            this._requestUid = 0;
        }
        private getUserData(userId:number):void{
            var req:Cmd.GetPersonalPanel_C=new Cmd.GetPersonalPanel_C();
            req.uid=userId;
            this.sendNotification(PokerFourFacadeConst.SEND_DATA,req,DataRequestCommand.GAME_DATA);
	    uniLib.NetMgr.setMsgTimeout(8,"GetPersonalPanel_C");
        }

        //更新手牌数量
        public updateHandCardsNum(num:number):void {

            this._seatVc.updateFaCardsNum(num);

        }

    
        public onRemove():void{
            super.onRemove();
            this.removeUserInfo();
            if(this._seatVc){
                 this._seatVc.removeEventListener(UIEventConsts.SHOW_USER_INFO,this.uiEventHandle,this);
                  this._seatVc.destory();
                  this._seatVc=null;
            }
         }
	}
}
