module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class ServerPKProxy extends puremvc.Proxy{
        public static NAME: string = "ServerMJProxy";
        public constructor() {
            super(ServerPKProxy.NAME);
        }
        public onRegister(): void {
        }
        private _config: any;
        public initServer(): void {
			uniLib.UIMgr.instance.showProcessBar(null, 99, 100, "正在连接游戏服务器...", "", true);
            let gameId: number = Number(uniLib.BrowersUtils.GetRequest("gameId"));
            let zoneId: number = Number(uniLib.BrowersUtils.GetRequest("zoneId"));
			if (DataCache.gameInfo == null || DataCache.gameInfo.zoneInfo == null) {
				this._config = RES.getRes("config_json");
				uniLib.NetMgr.init(this._config.LoginUrl, gameId ? gameId : this._config.GameID, zoneId ? zoneId : this._config.ZoneID, this.onHttpInitSucc, this.onHttpInitFail, this);
			} else {
				uniLib.NetMgr.init(uniLib.Global.defaultConfig.login_url, DataCache.gameInfo.zoneInfo.gameid, DataCache.gameInfo.zoneInfo.zoneid, this.onHttpInitSucc, this.onHttpInitFail, this);
			}
        }
        /**
         * http平台登录完成
         */
        private onHttpInitSucc(obj:any): void {
            //下面可以通过uniLib.NetMgr.httpSend发送http消息了
            var uid: number = uniLib.NetMgr.UID;
            uniLib.NetMgr.initSocket(this.onSockInitSucc, this.onSockInitFail, this,"","","",false,true);//初始化平台socket
            // uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC,this.reconnct,this);
        }

        private onHttpInitFail(back?:any): boolean {
            if(back){
                PublicManage.getInstance().showMildWarnShow("游戏登录失败:"+JSON.stringify(back));
            }else{
                PublicManage.getInstance().showMildWarnShow("游戏登录失败");
            }
            this.facade.sendNotification(PokerFourFacadeConst.EXIT_GAME);
	    return true;
        }

        /**
         * socket连接完成
         */
        private onSockInitSucc(): void {
		    uniLib.UIMgr.instance.showProcessBar(null, 100, 100, "正在进入房间...", "", true);
            var data: Cmd.EnterPokerCmd_C = new Cmd.EnterPokerCmd_C();
            let roomId = Number(uniLib.BrowersUtils.GetRequest("roomId"));
            let handCardInitId = Number(uniLib.BrowersUtils.GetRequest("handCardInitId"));
            let recordUid = Number(uniLib.BrowersUtils.GetRequest("recordUid"));
            let gameId = Number(uniLib.BrowersUtils.GetRequest("ddzGame"));      
            let robotId = Number(uniLib.BrowersUtils.GetRequest("robotId"));
            let robotNum = Number(uniLib.BrowersUtils.GetRequest("robotNum"));
            let subGameType = Number(uniLib.BrowersUtils.GetRequest("subGameType"));
            data.roomId = roomId ? roomId : 0;
            //本地跟测试服的调试
            data.globalRoomId = roomId ? roomId : 111111;
	    if (robotId > 0){
		    data.robotId = robotId;
	    }

	    if (robotNum > 0){
		    data.robotNum = robotNum;
	    }
	    if (gameId > 0){
		    data.gameId = gameId;
	    }

		if(PKGame.DataCache.platParam){
			data.globalRoomId = PKGame.DataCache.platParam.globalRoomId;
			data.roomId = PKGame.DataCache.platParam.roomId;
		}
		this.sendData(data);

		uniLib.Global.jsonCompress = new Cmd.JsonCompressNullUserPmd_CS();
	    uniLib.Global.jsonCompress.msglist = [
		    "Cmd.OutCardMahjongCmd_Brd",		//	1
		    "Cmd.OutCardMahjongCmd_S",		//	2
		    "Cmd.SelfCardMahjongCmd_S",		//	3
		    "Cmd.ReadyStartMahjongCmd_Brd",		//	4
		    "Cmd.ReadyStartMahjongCmd_S",		//	5
		    "Cmd.BarOutCardMahjongCmd_Brd",		//	6
		    "Cmd.BarCardMahjongCmd_Brd",		//	7
		    "Cmd.SendCardMahjongCmd_Brd",		//	8
		    "Cmd.SendCardMahjongCmd_S",		//	9
		    "Cmd.SetBankerMahjongCmd_Brd",		//	10
		    "Cmd.EnterMahjongCmd_Brd",		//	11
		    "Cmd.EnterMahjongCmd_S",		//	12
		    "Cmd.FinalScoreMahjongCmd_Brd",		//	13
		    "Cmd.GetPersonalPanel_S",		//	14
		    "Cmd.HostMahjongCmd_Brd",		//	15
		    "Cmd.SysMessageMahjongCmd_S",		//	16
		    "Cmd.TouchCardMahjongCmd_Brd",		//	17
		    "Cmd.OnlineStateMahjongCmd_Brd",		//	18
		    "Cmd.BarCardMahjongCmd_S",		//	19
		    "Cmd.BarDealCardMahjongCmd_Brd",		//	20
		    "Cmd.ReConnectMahjongCmd_S",		//	21
		    "Cmd.BarDealCardMahjongCmd_S",		//	22
		    "Cmd.BarDiceMahjongCmd_Brd",		//	23
		    "Cmd.ReplyDissolveRoom_Brd",		//	24
		    "Cmd.RequestChangeUserNbrRoom_Brd",		//	25
		    "Cmd.RequestChangeUserNbrRoom_C",		//	26
		    "Cmd.RequestDissolveRoom_Brd",		//	27
		    "Cmd.RequestDissolveRoom_S",		//	28
		    "Cmd.ReturnChangeUserNbrRoom_C",		//	29
		    "Cmd.SeaFloorCardMahjongCmd_Brd",		//	30
		    "Cmd.SeaRoamTurnMahjongCmd_Brd",		//	31
		    "Cmd.BirdMahjongCmd_Brd",		//	32
		    "Cmd.CancelOpMahjongCmd_S",		//	33
		    "Cmd.CommonChat_Brd",		//	34
		    "Cmd.SendGiftMahjongCmd_Brd",		//	35
		    "Cmd.EatCardMahjongCmd_Brd",		//	36
		    "Cmd.EatCardMahjongCmd_S",		//	37
		    "Cmd.ShowChangeUserNbrRoom_S",		//	38
		    "Cmd.StartMahjongCmd_Brd",		//	39
		    "Cmd.StartNewRoundOpCmd_Brd",		//	40
		    "Cmd.StartNewRoundOpCmd_S",		//	41
		    "Cmd.StartNewRoundOpTimeCmd_Brd",		//	42
		    "Cmd.SuccessDissolveRoom_Brd",		//	43
		    "Cmd.SupplyCardMahjongCmd_Brd",		//	44
		    "Cmd.SupplyCardMahjongCmd_S",		//	45
		    "Cmd.LeaveMahjongCmd_Brd",		//	46
		    "Cmd.LeaveMahjongCmd_S",		//	47
		    "Cmd.TouchCardMahjongCmd_S",		//	48
		    "Cmd.VoiceChat_Brd",		//	49
		    "Cmd.WinCardMahjongCmd_Brd",		//	50
		    "Cmd.WinMahjongCmd_S",		//	51
		    "Cmd.BarCardMahjongCmd_C",		//	52
		    "Cmd.BarOpMahjongCmd_C",		//	53
		    "Cmd.CancelOpMahjongCmd_C",		//	54
		    "Cmd.CommonChat_C",		//	55
		    "Cmd.EatCardMahjongCmd_C",		//	56
		    "Cmd.EnterMahjongCmd_C",		//	57
		    "Cmd.GetPersonalPanel_C",		//	58
		    "Cmd.HostMahjongCmd_C",		//	59
		    "Cmd.LeaveMahjongCmd_C",		//	60
		    "Cmd.OutCardMahjongCmd_C",		//	61
		    "Cmd.ReadyStartMahjongCmd_C",		//	62
		    "Cmd.ReplyDissolveRoom_C",		//	63
		    "Cmd.RequestDissolveRoom_C",		//	64
		    "Cmd.SeaRoamMahjongCmd_C",		//	65
		    "Cmd.SendGiftMahjongCmd_C",		//	66
		    "Cmd.ServerEchoMahjongCmd_SC",		//	67
		    "Cmd.SoundSet_C",		//	68
		    "Cmd.StartNewRoundOpCmd_C",		//	69
		    "Cmd.SupplyCardMahjongCmd_C",		//	70
		    "Cmd.TouchCardMahjongCmd_C",		//	71
		    "Cmd.VoiceChat_C",		//	72
		    "Cmd.CashChickenCmd_Brd",		//	73
		    "Cmd.WinMahjongCmd_C",		//	74
	    ];
            this.sendData(uniLib.Global.jsonCompress);
        }
        private onSockInitFail(back?:any): void {
             if(back){
                PublicManage.getInstance().showMildWarnShow("游戏服务器连接失败:"+JSON.stringify(back));
            }else{
                PublicManage.getInstance().showMildWarnShow("游戏服务器连接失败");
            }
             this.facade.sendNotification(PokerFourFacadeConst.EXIT_GAME);
        }
        public  sendData(obj:any):void{
            ResUtil.trace("sendData:"+JSON.stringify(obj));
			uniLib.NetMgr.tcpSend(obj);
		}
        
        /**
         * 私聊
         * @param e
         */
        private onPrivateChat(e: uniLib.ZqEvent):void{
            // var msg: Pmd.CommonChatUserPmd_CS = e.param;
            // var info: ChatMsgVo = JSON.parse(msg.info);
            // if(info.uid==MyUserInfo.getInstance().userId){
            //     this.sendNotification(FacadeConsts.RECEIVE_PRIVATE_CHAT,info);
            // }
        }
        
        /**
         * 公聊
         * @param e
         */
        private onRoomChat(e: uniLib.ZqEvent):void{
            // var msg: Pmd.CommonChatUserPmd_CS = e.param;
            // var info: ChatMsgVo = JSON.parse(msg.info);
            // if(info.type==1){
            //     var vo: UserInfo = RoomData.getInstance().getPlayerById(info.uid);
            //     info.name = vo.userName;
            //     this.sendNotification(FacadeConsts.SHOW_WORLD_CHAT,info);
            // }else{
            //     this.sendNotification(FacadeConsts.RECEIVE_FACE,info);
            // }
        }
        private onSystemMsg(e: uniLib.ZqEvent): void {
            // var msg: Pmd.CommonChatUserPmd_CS = e.param;
            // ResUtil.trace(msg.info);
            // var info: any = JSON.parse(msg.info);
        }
         public onRemove():void{
            super.onRemove();
            uniLib.NetMgr.closeSocket();
            GameData.getInstance().destory();
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC,this.onSockInitSucc,this);
         }
         public closeSocket():void{
             ResUtil.trace("closeSocket");
             uniLib.NetMgr.closeSocket();
         }
	}
}
