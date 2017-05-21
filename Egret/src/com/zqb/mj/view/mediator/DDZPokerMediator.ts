module PKGame {
	export class PKMediator extends puremvc.Mediator  {
		public static NAME: string = "PKMediator";
        private _gameVc:GameVc;
        private _dismissPanel:DismissPanel;
        private _recordPanel:GameOverPanel;
		public constructor(viewComponent: any) {
			super(PKMediator.NAME,viewComponent);
            this._gameVc= viewComponent;
            this.initGame();         
            this._gameVc.addEventListener(UIEventConsts.CLOSE,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.DESTORY,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.SHOW_HELP,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.EXIT_GAME,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.DISMISS_GAME,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.SHARE_GAME,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.SHOW_GM_TOOL,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.SHOW_SETTING,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.ACTION_HOST,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.SHOW_STOP_SERVICE,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.GET_SCORE_DATA,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.GM_SELECT_CARDS,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.GM_SELECT_HANDCARD,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.GM_SELECT_HEAPCARD,this.uiHandle,this);
            this._gameVc.addEventListener(UIEventConsts.REQUEST_CHANGE_USERNUM,this.uiHandle,this);
		}
       private uiHandle(evt:egret.Event):void{
             switch(evt.type)
			{
                case UIEventConsts.DESTORY:
				{
                    this.sendNotification(PokerFourFacadeConst.DESTORY);
					break;
				}
				case UIEventConsts.READY:
                    this.removeLotter();

					break;
                case UIEventConsts.SHOW_SETTING:
                    this.showSetting();
                    break
                case UIEventConsts.SHOW_GM_TOOL:
                    this.showGmTool();
                    break;	
                case UIEventConsts.EXIT_GAME:
                    this.exitGame();
                    break;
                case UIEventConsts.SHARE_GAME:
                    this.showShare();
                    break;
                case UIEventConsts.DISMISS_GAME:
                    this.showDismissConfirm();
                    break;
                case UIEventConsts.SHOW_STOP_SERVICE:
                    this.showStopServiceNotice();
                    break;

                case UIEventConsts.SHOW_HELP:
                    this.showHelp();
                    break;

				default:
				{
					break;
				}
			}
       }
		 public listNotificationInterests(): Array<any> {
            return [
                PokerFourFacadeConst.RELOGIN,  
                PokerFourFacadeConst.DESTORY,         
                PokerFourFacadeConst.GM_DELETE,          
                PokerFourFacadeConst.EXIT_GAME,
                PokerFourFacadeConst.SEND_CARDS,
                PokerFourFacadeConst.GAME_START,    
                PokerFourFacadeConst.DISS_NOTICE,
                PokerFourFacadeConst.RESET_TABLE,
                PokerFourFacadeConst.GM_HEAP_CARD,
                PokerFourFacadeConst.GM_CHANGE_CARD,
                PokerFourFacadeConst.RESULT_NOTICE,
                PokerFourFacadeConst.NOTIFY_SAME_IP,
                PokerFourFacadeConst.LASTCARD_CHANGE,
                PokerFourFacadeConst.USER_ENTER_ROOM,
                PokerFourFacadeConst.TOTAL_RECORD_DATA,
                PokerFourFacadeConst.DISS_RESULT_NOTICE,
                PokerFourFacadeConst.NOTIFY_CHAT_RECORD,
                PokerFourFacadeConst.RESET_RESULT_PANEL,
                PokerFourFacadeConst.SELF_DISCARD_NOTICE,
                PokerFourFacadeConst.DISS_REQUEST_NOTICE,
                PokerFourFacadeConst.DISCARD_NOTICE,
                PokerFourFacadeConst.GAME_SET_LANDOWNER,
                PokerFourFacadeConst.STOP_SREVICE_NOTICE,
                PokerFourFacadeConst.CHANGE_USERNUM_NOTICE,
                PokerFourFacadeConst.CHANGE_USERNUM_BACK,
                PokerFourFacadeConst.SHOW_CHANGE_BTN,
                PokerFourFacadeConst.FINAL_GAME_ACCOUNTS,
                PokerFourFacadeConst.NOTIFY_POINT_CHANGE,
                PokerFourFacadeConst.MINGPAI_GUANGBO,
            ];
        }
        public handleNotification(notification: puremvc.INotification): void {
            switch(notification.getName()) {
                case PokerFourFacadeConst.USER_ENTER_ROOM:
                    this.updateSoundSet();
                    this._gameVc.resetBlackAndOpenCards();
                    this._gameVc.updateRoomId();
                    this._gameVc.updateEnterRoom();
                    break;
                case PokerFourFacadeConst.GAME_START:
                    this._gameVc.reset();
                    this._gameVc.refreshBeishu();
                    this._gameVc.refreshDifen();
                    this._gameVc.updateRound();
                    this._gameVc.disposeBtn();
                    this._gameVc.updateRoomId();
                    this._gameVc.resetDiPaiNode();
                    break;
                case PokerFourFacadeConst.SEND_CARDS:
                    this._gameVc.resetBlackAndOpenCards();
                    this._gameVc.resetDiPaiNode();
                    this._gameVc.collectCard();
                    this._gameVc.disposeBtn();
                    break;
                case PokerFourFacadeConst.RESET_TABLE:
                    this._gameVc.reset();
                    this._gameVc.updateNetWork(false);
                    break;
                case PokerFourFacadeConst.RESULT_NOTICE:
                    egret.setTimeout(()=>{
                        this.showLotterView();
                    },this,2000);
                    break;
                case  PokerFourFacadeConst.LASTCARD_CHANGE:
                    break;
                case PokerFourFacadeConst.RELOGIN:
                    this.updateSoundSet();
                    this._gameVc.updateRound();
                    this._gameVc.updateRoomId();
                    this._gameVc.updateEnterRoom();

                    var isAllReady:boolean = false;
                    var data:any = PKGame.RoomInfo.getInstance().userList;
                    if (data&&data.length == 3) {
                        this._gameVc.disposeBtn();
                        isAllReady = data.every((data)=>{
                            return data.bReady == true;
                        },this)
                    }
                    var relogin:Cmd.ReConnectPokerCmd_S = notification.getBody();

                    if (!relogin.landownerId && relogin.handCard.handCardSet.length) {
                        this._gameVc.showBlackDiPai();
                    }

                    if (uniLib.Global.debugLevel >= 1) {
                        this._gameVc.removeGmPanel();
                    }
                    if (relogin.landownerCardSet && relogin.landownerCardSet.length) {
                        this._gameVc.showDipaiView();
                    }

                    this._gameVc.refreshBeishu(relogin.mutil);


                    this._gameVc.refreshDifen(relogin.baseMulti);
                    break;
                case PokerFourFacadeConst.DISCARD_NOTICE:
                    
                    break;
                case PokerFourFacadeConst.TOTAL_RECORD_DATA:
                    this.showTotal(notification.getBody());
                    break;
                case PokerFourFacadeConst.DISS_RESULT_NOTICE:
                    var req2:Cmd.SuccessDissolveRoom_Brd=notification.getBody();
                    this.dissData = req2;
                    var msg:string="";
                    var arr:Array<string>;
                    if(req2.bOk){
                        msg=DataCache.langObj.uiTxt.DismissPanel.success;
                        arr=req2.agreeUsers;
                    }else{
                        msg=DataCache.langObj.uiTxt.DismissPanel.fail;
                        arr=req2.disagreeUsers;
                    }
                    var labelArr:Array<string>=msg.split("#");
                    if(req2.bOk){
                       GameInfo.manage.showConfirmPanel(labelArr[0]+arr.toString()+labelArr[1],["确定"],[this.dismissok],null,this,0,false);
		            }else{
                       GameInfo.manage.showConfirmPanel(labelArr[0]+arr.toString()+labelArr[1],["确定"],[],null,this,0,false);
		            }
                    this.removeDissPanel();
                    break;
                case PokerFourFacadeConst.CHANGE_USERNUM_NOTICE:
                case PokerFourFacadeConst.DISS_REQUEST_NOTICE:
                    var user:UserVo=RoomInfo.getInstance().getUserVoByUid(notification.getBody().uid);
                    if(user){
                        this.showDissPanel(notification.getBody());
                    }
                    break;
                case PokerFourFacadeConst.CHANGE_USERNUM_BACK:
                case PokerFourFacadeConst.DISS_NOTICE:
                    if(this._dismissPanel){
                        var rev1: any=notification.getBody();
                        this._dismissPanel.updateStatus(rev1.isAgree,rev1.uid);
                        if(rev1.uid == uniLib.UserInfo.uid){
                            this.removeDissPanel();
                        }
                    }
                    break;
                case PokerFourFacadeConst.NOTIFY_CHAT_RECORD:
                    if(this._shortChat){
                        this._shortChat.setRecordData(notification.getBody());
                    }
                    break;
                case PokerFourFacadeConst.EXIT_GAME:
                    this.exitGame();
                    break;
                case PokerFourFacadeConst.RESET_RESULT_PANEL:
                    this._gameVc.removeResultPanel();
                    break;
                case PokerFourFacadeConst.NOTIFY_SAME_IP:
                    var ip:Cmd.SetSameIpWarn_S = notification.getBody();
                    if(ip.sameSet && ip.sameSet.length>0){
                        this.ipWarnPanel(ip.sameSet);
                    }
                    break;
                case PokerFourFacadeConst.GM_HEAP_CARD:
					if(this._gmTool){
                        GameInfo.topLayer.addChild(this._gmTool);
                        this._gmTool.setHeapCard(PKGame.CardInfo.getInstance().heapCard);
                        this._gmTool.setTypeButton(notification.getBody());
                    }
					break;
                case PokerFourFacadeConst.GM_CHANGE_CARD:
                    if(this._gmTool){
                         this._gmTool.setHeapCard(PKGame.CardInfo.getInstance().heapCard);
                    }
                    break;
                case PokerFourFacadeConst.GM_DELETE:
                    PKGame.PublicManage.getInstance().showMildWarnShow("请等待发牌后，执行GM");
                     if(this._gmTool){
                         this._gmTool.destory();
                     }
                     this._gmTool = null;
                    break;
                case PokerFourFacadeConst.STOP_SREVICE_NOTICE:
                     this._gameVc.setStopService();
                    break;
                case PokerFourFacadeConst.GAME_SET_LANDOWNER:
                    this._gameVc.updateNetWork(false);
                    var difen:number = notification.getBody()["baseMulti"];

                    var landId:number = notification.getBody()["landownerId"];
                    if (landId == PKGame.MyUserInfo.getInstance().userId) {
                        this._gameVc.refreshBeishu(PKGame.RoomInfo.getInstance().beiShu * 2);
                    }else {
                        this._gameVc.refreshBeishu(PKGame.RoomInfo.getInstance().beiShu);
                    }
                    this._gameVc.refreshDifen(difen);
                    this._gameVc.openDiPai();

                case PokerFourFacadeConst.SHOW_CHANGE_BTN:
                    this._gameVc.ShowChangeIcon();
                    break;
                case PokerFourFacadeConst.FINAL_GAME_ACCOUNTS:
                    // this._gameVc.showResult(notification.getBody());
                    if (notification.getBody()["state"] == 2) return;
                    this.removeLotter();
                    break;
                case  PokerFourFacadeConst.NOTIFY_POINT_CHANGE:
                    var beishu:number = notification.getBody()["multi"];
                    this._gameVc.refreshBeishu(beishu);
                    break;
                case  PokerFourFacadeConst.MINGPAI_GUANGBO:
                    if (notification.getBody()["uid"] == PKGame.MyUserInfo.getInstance().userId) {

                    }
                    break;
            }
        }
        /**
         * ip提示
         */
        private ipWarnPanel(sameSet:string[]){
            var msg = "";
            for(var i:number = 0;i<sameSet.length;i++){
                if(i==sameSet.length-1)msg = msg+sameSet[i];
                else msg = msg+sameSet[i]+",";
            }
            GameInfo.manage.showConfirmPanel("玩家"+msg+"IP相同,请注意",["确定"],[],null,this,0,false);
        }
        private dissData:Cmd.SuccessDissolveRoom_Brd;

        private initGame():void{

            var cardVc:CardsVc=new CardsVc();
            GameInfo.uiLayer.addChild(cardVc);
            this.facade.registerMediator(new CardMJMediator(cardVc));
            var seatVc:SeatPlayVc=new SeatPlayVc();
            GameInfo.uiLayer.addChild(seatVc);
            this.facade.registerMediator(new SeatPlayerMJMediator(seatVc));
            var operateVc:OperateVc=new OperateVc();
            GameInfo.uiLayer.addChild(operateVc);
            this.facade.registerMediator(new OperateMJMediator(operateVc));
            var countVc:CountVc=new CountVc();
            GameInfo.uiLayer.addChild(countVc);
            this.facade.registerMediator(new CountMJMediator(countVc));
            var actionEffect:ActionEffectMc = new ActionEffectMc();
            GameInfo.uiLayer.addChild(actionEffect);
            this.facade.registerMediator(new ActionEffectMediator(actionEffect));
            this.facade.sendNotification(PokerFourFacadeConst.SEND_DATA,null,DataRequestCommand.CONNECT_GAME_SERVER);
            uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_SERVER_DEBUG_LEVEL,this.setDebugState,this);
        }
        private setDebugState(evt: egret.Event){
			// this._gameVc.showDebugButton();
		}
        private onTouchHandler(e:egret.TouchEvent){
            var name:string = e.target.name;
            if(name.indexOf("short")>=0){

            }
            else{
                if(this._shortChat&&this._shortChat.visible){
                    this.hideShortChat();
                }
            }
        }
        public onRemove():void{
            super.onRemove();
             this.facade.removeMediator(CountMJMediator.NAME);
             this.facade.removeMediator(SeatPlayerMJMediator.NAME);
             this.facade.removeMediator(CardMJMediator.NAME);
             this.facade.removeMediator(OperateMJMediator.NAME);
             this.facade.removeMediator(VoiceChatMediator.NAME);
             this.facade.removeMediator(ActionEffectMediator.NAME);
             if(this._gameVc){
                this._gameVc.removeEventListener(UIEventConsts.CLOSE,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.DESTORY,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.SHOW_HELP,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.EXIT_GAME,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.DISMISS_GAME,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.SHARE_GAME,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.ACTION_HOST,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.SHOW_GM_TOOL,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.SHOW_SETTING,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.SHOW_STOP_SERVICE,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.GET_SCORE_DATA,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.GM_SELECT_CARDS,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.GM_SELECT_HANDCARD,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.GM_SELECT_HEAPCARD,this.uiHandle,this);
                this._gameVc.removeEventListener(UIEventConsts.REQUEST_CHANGE_USERNUM,this.uiHandle,this);
                this._gameVc.destory();
                this._gameVc=null;
             }
             this.removeShortChat();
             this.removeDissPanel();
             this.removeTotalPanel();
             this.removeHelp();
             this.removeSetting();
             uniLib.Global.removeEventListener(uniLib.ZqEvent.EVENT_SERVER_DEBUG_LEVEL,this.setDebugState,this);
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        }
        private showTotal(arr:Array<Cmd.UserRecord>):void{
            egret.Tween.removeTweens(this);
            this.showResultPanel(arr);
        }


        public showChatPanel():void {
             if(this._shortChat&&this._shortChat.visible){
                        this.hideShortChat();
                    }
                    else{
                        this.showShortChat();
                    }
        }

        //大结算
        private showResultPanel(arr:Array<Cmd.UserRecord>){
            egret.Tween.removeTweens(this);
            if(!this._recordPanel){
                this._recordPanel = new GameOverPanel();
                this._recordPanel.name = "result";
                this._recordPanel.x = (uniLib.Global.screenWidth - this._recordPanel.width) / 2;
            }
            this._recordPanel.reset();
            PopupManager.addPopUp(this._recordPanel,true,false);
        }
        private removeTotalPanel():void{
            if(this._recordPanel){
                PopupManager.removePopUp(this._recordPanel);
                this._recordPanel.destory();
                this._recordPanel=null;
            }
        }
        /**游戏秘籍 */
        private _helpPanel:HelpPanel;
        private showHelp(){
             if(!this._helpPanel){
                this._helpPanel=new HelpPanel();

                this._helpPanel.addEventListener(UIEventConsts.CLOSE,this.removeHelp,this);
            }
            PopupManager.addPopUp(this._helpPanel,true);
        }
        private removeHelp(){
            if(this._helpPanel){
                this._helpPanel.removeEventListener(UIEventConsts.CLOSE,this.removeSetting,this)
                uniLib.DisplayUtils.removeFromParent(this._helpPanel);
                this._helpPanel.destory();
                PopupManager.removePopUp(this._helpPanel);
                this._helpPanel=null;
            }
        }

        //设置
        private _settingPanel:SetPanel;
        private showSetting():void{
            if(!this._settingPanel){
                this._settingPanel=new SetPanel();
                this._settingPanel.x = (uniLib.Global.screenWidth - this._settingPanel.width)>>1;
                this._settingPanel.y = (uniLib.Global.screenHeight - this._settingPanel.height)>>1;
                this._settingPanel.addEventListener(UIEventConsts.CLOSE,this.removeSetting,this);
                this._settingPanel.addEventListener(UIEventConsts.DISMISS_GAME,this.showDismissConfirm,this);
            }
            PopupManager.addPopUp(this._settingPanel,true,false);
            // uniLib.PopUpMgr.addPopUp(this._settingPanel,true,false);
       }
        private removeSetting():void{
            if(this._settingPanel){
                var req:Cmd.SoundSet_C=new Cmd.SoundSet_C();
                // req.setInfo = this._settingPanel.getSoundData();
			    this.sendNotification(PokerFourFacadeConst.SEND_DATA,req,DataRequestCommand.GAME_DATA);
                this._settingPanel.removeEventListener(UIEventConsts.CLOSE,this.removeSetting,this);
                this._settingPanel.removeEventListener(UIEventConsts.DISMISS_BACK,this.showDismissConfirm,this);
                this._settingPanel.removeEventListener(UIEventConsts.AGREE_CHANGE_USERNUM,this.showDismissConfirm,this);
                PopupManager.removePopUp(this._settingPanel);
                this._settingPanel.destory();
                this._settingPanel=null;
            }
       }

       //小结算
        private _lotterPanel:RoundResultSkin;

        private showLotterView():void {

            if (!this._lotterPanel) {
                this._lotterPanel = new RoundResultSkin();
                this._lotterPanel.setData();
                this._lotterPanel.x = (uniLib.Global.screenWidth - this._lotterPanel.width)>>1;
                this._lotterPanel.y = (uniLib.Global.screenHeight - this._lotterPanel.height)>>1;
                this._lotterPanel.addEventListener(UIEventConsts.READY,this.removeLotter,this);
                PopupManager.addPopUp(this._lotterPanel,true,false);
            }
        }

        private removeLotter():void {

            if(this._lotterPanel){
                this._lotterPanel.removeEventListener(UIEventConsts.READY,this.removeLotter,this);
                PopupManager.removePopUp(this._lotterPanel);
                this._lotterPanel.destory();
                this._lotterPanel=null;
            }
            if(PKGame.RoomInfo.getInstance().recordInfo.length){
                this.showTotal(PKGame.GameData.getInstance().recordInfo);
            }
            else{
            
                if (uniLib.Global.debugLevel >= 1) {
                    var gameVc = GameUtil.getViewByName(PKMediator.NAME)._gameVc;
                    gameVc.showGmPanel();
                }else {
                    RepManager.ins.ReadyStartPokerCmd_C();
                }
            }
        }


       //快捷聊天
       private _isClick:boolean = true;
       private _shortChat:RoomFacePanel;
       private showShortChat(){
           if(!this._shortChat){
               this._shortChat = new RoomFacePanel;
               this._shortChat.x = uniLib.Global.screenWidth / 2 - this._shortChat.width / 2;
               this._shortChat.addEventListener(UIEventConsts.SEND_CHAT_RECORD,this.requestRecord,this);
               this._shortChat.FaceItem.addEventListener(UIEventConsts.SEND_COMMON_CHAT,this.commonChatHandler,this);
               this._shortChat.ChatItem.addEventListener(UIEventConsts.SEND_COMMON_CHAT,this.commonChatHandler,this);
               this._shortChat.RecordItem.addEventListener(UIEventConsts.SEND_COMMON_CHAT,this.commonChatHandler,this);
               this._shortChat.addEventListener(UIEventConsts.SEND_COMMON_TALK,this.commonTalkHandler,this);
            //    GameInfo.mainUILayer.addChild(this._shortChat);
               PopupManager.addPopUp(this._shortChat,true);
           }else{
               this._shortChat.visible=true;
               PopupManager.addPopUp(this._shortChat,true);
           }
            
       }
       private requestRecord(){
            var req:Cmd.VoiceChatRecord_C=new Cmd.VoiceChatRecord_C();
			this.sendNotification(PokerFourFacadeConst.SEND_DATA,req,DataRequestCommand.GAME_DATA);
       }
       private commonTalkHandler(e:egret.Event){
		var self: any = this;
           if(!this._isClick){
		   PublicManage.getInstance().showMildWarnShow("您的操作太频繁了！请休息一下吧");
               return;
            }
            var content:string = e.data;
            var req:Cmd.CommonChat_C=new Cmd.CommonChat_C();
            req.words = content;
	    this.sendNotification(PokerFourFacadeConst.SEND_DATA,req,DataRequestCommand.GAME_DATA);
	    uniLib.NetMgr.setMsgTimeout(8,"CommonChat_C");
            this._isClick = false;
	    setTimeout(function (): void {
		    self._isClick = true;
	    }, 3000);
            this.hideShortChat();
       }
       private commonChatHandler(e:egret.Event){
		var self: any = this;
           if(!this._isClick){
		   PublicManage.getInstance().showMildWarnShow("您的操作太频繁了！请休息一下吧");
		   return;
            }
            var id:string = e.data;
            var req:Cmd.CommonChat_C=new Cmd.CommonChat_C();
            req.voiceId = Number(id);
			this.sendNotification(PokerFourFacadeConst.SEND_DATA,req,DataRequestCommand.GAME_DATA);
            this._isClick = false;
	    setTimeout(function (): void {
		    self._isClick = true;
	    }, 3000);
            this.hideShortChat();
       }
       private hideShortChat():void{
           if(this._shortChat){
               this._shortChat.visible=false;
               PopupManager.removePopUp(this._shortChat);
           }
       }
       private removeShortChat(){
           if(this._shortChat){
               this._shortChat.removeEventListener(UIEventConsts.SEND_CHAT_RECORD,this.requestRecord,this);
               this._shortChat.removeEventListener(UIEventConsts.SEND_COMMON_TALK,this.commonTalkHandler,this);
               this._shortChat.FaceItem.removeEventListener(UIEventConsts.SEND_COMMON_CHAT,this.commonChatHandler,this);
               this._shortChat.ChatItem.removeEventListener(UIEventConsts.SEND_COMMON_CHAT,this.commonChatHandler,this);
               this._shortChat.RecordItem.removeEventListener(UIEventConsts.SEND_COMMON_CHAT,this.commonChatHandler,this);
               this._shortChat.destory();
           }
           this._shortChat = null;
       }
       private _gmTool:RoomGmTool;
       private showGmTool(){
          if(!this._gmTool){
               this._gmTool = new RoomGmTool;
               PKGame.RoomInfo.getInstance().isShowGMTool = true;
            //    PopupManager.addPopUp(this._gmTool,false,true);
          }
          else{
            //   PopupManager.removePopUp(this._gmTool);
            PKGame.RoomInfo.getInstance().isShowGMTool = false;
              this._gmTool.destory();
              this._gmTool = null;
          }
       }

       private showShare(){
           var vo:uniLib.WXShareVo = new uniLib.WXShareVo();
           vo.shareWay=0;
           if(PKGame.DataCache.platParam){
                vo.title = PKGame.DataCache.platParam.shareInfo.title;
                vo.description = PKGame.DataCache.platParam.shareInfo.content;
                vo.webpageUrl = PKGame.DataCache.platParam.shareInfo.webPageUrl;
           }
           uniLib.ZQGameSdk.share(vo,null,this);
       }
       private showDismissConfirm():void{
			var msg:string = DataCache.langObj.alertTxt.dismissTip;
            this.removeSetting();
			GameInfo.manage.showConfirmPanel(msg,["确定","取消"],[this.onDismissYesHandler],null,this);
		}
        private onDismissYesHandler(evt:egret.Event):void{
			 var req1:Cmd.RequestDissolveRoom_C=new Cmd.RequestDissolveRoom_C();
			this.sendNotification(PokerFourFacadeConst.SEND_DATA,req1,DataRequestCommand.GAME_DATA);
		}
        private dismissok(evt:egret.Event):void{
            this.removeDissPanel();
            var data:Cmd.UserRecord[] = PKGame.RoomInfo.getInstance().recordInfo;
            if(data.length){
                this.showResultPanel(data);
            }
            else{
                this.exitGame();
            }
        }
        private showDissPanel(vo: any):void{
            if(vo == null)return;
            if(this._dismissPanel){
                this.removeDissPanel();
            }
            if(!this._dismissPanel){
                this._dismissPanel=new DismissPanel();
                this._dismissPanel.x = (uniLib.Global.screenWidth - this._dismissPanel.width)>>1;
                this._dismissPanel.y = (uniLib.Global.screenHeight - this._dismissPanel.height)>>1;
                this._dismissPanel.setData(vo);
                this._dismissPanel.addEventListener(UIEventConsts.CLOSE,this.dissHandle,this);
                this._dismissPanel.addEventListener(UIEventConsts.DISMISS_BACK,this.dissHandle,this);
                this._dismissPanel.addEventListener(UIEventConsts.AGREE_CHANGE_USERNUM,this.dissHandle,this);
            }
            PopupManager.addPopUp(this._dismissPanel,true,false);
        }
        private removeDissPanel():void{
            if(this._dismissPanel){
                this._dismissPanel.removeEventListener(UIEventConsts.CLOSE,this.dissHandle,this)
                this._dismissPanel.removeEventListener(UIEventConsts.DISMISS_BACK,this.dissHandle,this);
                this._dismissPanel.removeEventListener(UIEventConsts.AGREE_CHANGE_USERNUM,this.dissHandle,this);
                PopupManager.removePopUp(this._dismissPanel);
                this._dismissPanel.destory();
            }
            this._dismissPanel=null;
        }
        private dissHandle(evt:egret.Event):void{
            switch(evt.type){
				case UIEventConsts.DISMISS_BACK:{
                    var req:Cmd.ReplyDissolveRoom_C=new Cmd.ReplyDissolveRoom_C();
                    req.isAgree=evt.data;
                    this.sendNotification(PokerFourFacadeConst.SEND_DATA,req,DataRequestCommand.GAME_DATA);
					break;            
				}
                case UIEventConsts.CLOSE:{
                    this.removeDissPanel();
                    break;
                }
            }        
        }
        public exitGame():void{
           var req:Cmd.LeavePokerCmd_C=new Cmd.LeavePokerCmd_C();
           req.state = 0;
           this.sendNotification(PokerFourFacadeConst.SEND_DATA,req,DataRequestCommand.GAME_DATA);
           if(DataCache.gameInfo&&DataCache.gameInfo.defaultOrientation!=egret.OrientationMode.LANDSCAPE){
                uniLib.ScreenUtils.landscape=false;
           }
           uniLib.GameModuleUtils.ExitGame();
           RES.destroyRes("ddz_gameRes",true);
           uniLib.ResUtils.clearResConfigByGroupName(["ddz_gameRes"]);
           
           if(DataCache.destroyResOnExit){
            }
       }
        private _stopServicePanel:StopServicePanel;
        private showStopServiceNotice(){
            if(!this._stopServicePanel){
			   this._stopServicePanel  = new StopServicePanel();
			}
            PopupManager.addPopUp(this._stopServicePanel,true,true);
            this._stopServicePanel.addEventListener(UIEventConsts.CLOSE,this.removeStopNotice,this);
        }
        //显示背面牌
        public showBlackCards():void {
            this._gameVc.showBlackDiPai();

        }
       private removeStopNotice():void{
            if(this._stopServicePanel){
                this._stopServicePanel.removeEventListener(UIEventConsts.CLOSE,this.removeStopNotice,this)
                PopupManager.removePopUp(this._stopServicePanel);
                this._stopServicePanel.destory();
                this._stopServicePanel=null;
            }
       }
	}
}
