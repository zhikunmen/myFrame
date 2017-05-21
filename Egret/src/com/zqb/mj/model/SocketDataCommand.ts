module Cmd {

    import CardInfo = PKGame.CardInfo;
    export function dispatch(cmd: string, obj?: any, type?: string): void {
        var facade: PKGame.PokerFourFacede = PKGame.PokerFourFacede.getInstance();
        facade.sendNotification(cmd, obj, type);
    }
    export function trace(rev: any, str: string = ""): void {
        // uniLib.Console.log(str + " "/*+rev.GetType()*/, JSON.stringify(rev));
    }

    /*
     * login
     */
    export function OnEnterPokerCmd_S(recv: Cmd.EnterPokerCmd_S) {
        uniLib.UIMgr.instance.hideLoading();


        PKGame.CardInfo.getInstance().initHandCard();
        if (!recv.resultCode) {
            recv.resultCode = 0;
        }
        if (recv.resultCode == PKGame.NetConsts.SUCCESS) {
            let rev = recv.roomState;
            PKGame.RoomInfo.getInstance().setData(rev);
            for(let i = 0; i < rev.userInfoSet.length; i++){
                if(rev.userInfoSet[i].uid == uniLib.NetMgr.UID){
                    uniLib.UserInfo.init(rev.userInfoSet[i]);
                    PKGame.MyUserInfo.getInstance().setData(rev.userInfoSet[i]);
                    if(rev.userInfoSet[i].onlineState == Cmd.OnlineState.OnlineState_Hosting){
                        PKGame.RoomInfo.getInstance().isHostMode = 1;
                    }
                }
            }
             if(!PKGame.DataCache.platParam){
               PKGame.DataCache.platParam = {}
            }

            PKGame.RoomInfo.getInstance().balanceDetail =[];
            PKGame.RoomInfo.getInstance().recordInfo = [];
            PKGame.DataCache.platParam.roomId = rev.roomId;
            dispatch(PKGame.PokerFourFacadeConst.RESET_TABLE);
            dispatch(PKGame.PokerFourFacadeConst.USER_ENTER_ROOM, rev);
        }else  {

            uniLib.GameModuleUtils.ExitGame(true);
            RES.destroyRes("preload",true);
            uniLib.ResUtils.clearResConfigByGroupName(["preload"]);

        }
    }
    /*
    * 玩家进入
    */
    export function OnEnterPokerCmd_Brd(rev: Cmd.EnterPokerCmd_Brd) {
        // if (!rev.isFirst) {
        //     rev.isFirst = true;
        // }
        var userInfo: PKGame.UserVo = new PKGame.UserVo(rev.userInfo);
        PKGame.RoomInfo.getInstance().addUser(userInfo);
        dispatch(PKGame.PokerFourFacadeConst.PLAYER_ENTER_ROOM, userInfo);
        // if (rev.isFirst) {
        //     //正常进入
        //     dispatch(ddzGame.PokerFourFacadeConst.PLAYER_ENTER_ROOM, userInfo);
        // }
        // else {
        //     dispatch(ddzGame.PokerFourFacadeConst.PLAYER_CONNECT, userInfo);
        // }
    }

    //改变牌型
    export function OnGMDealCardPokerCmd_S(rev:Cmd.GMDealCardPokerCmd_S) {
        if (rev.resultCode == 0) {
            RepManager.ins.ReadyStartPokerCmd_C();
        }
    }
    /*
     * 玩家离开
     */
    export function OnLeavePokerCmd_Brd(rev: Cmd.LeavePokerCmd_Brd) {
        if (rev.uid == uniLib.UserInfo.uid) {
            dispatch(PKGame.PokerFourFacadeConst.EXIT_GAME);
            return;
        }
        if (rev.state != 0) {
            //断线离开
            dispatch(PKGame.PokerFourFacadeConst.PLAYER_DISCONNECT,rev);
        }
        else if (rev.state == 0) {
            //正常离开
            dispatch(PKGame.PokerFourFacadeConst.PLAYER_LEFT,rev.uid);
        }
    }
    /*
     * 游戏开始
     */
    export function OnStartPokerCmd_Brd(rev: Cmd.StartPokerCmd_Brd) {
        PKGame.CardInfo.getInstance().isSelMingPai = false;
        PKGame.RoomInfo.getInstance().beiShu = 0;
        PKGame.RoomInfo.getInstance().isStart = true;
        PKGame.RoomInfo.getInstance().goldenCard = [];
        PKGame.RoomInfo.getInstance().curNumber = rev.curGameNbr;
        PKGame.CardInfo.getInstance().initHandCard();
        PKGame.RoomInfo.getInstance().outCardSuccArr = [];
        dispatch(PKGame.PokerFourFacadeConst.GAME_START,rev);
        PKGame.RoomInfo.getInstance().isXiaoReconnect = false;
        uniLib.SoundMgr.instance.playSound("start_mp3");
        PKGame.RoomInfo.getInstance().mingPlayerArr = [];
    }
    /**
     * 开局发牌
     */
    export function OnSelfCardPokerCmd_S(rev:Cmd.SelfCardPokerCmd_S){
        PKGame.CardInfo.getInstance().myCards = rev.handCard;
        var count:number = rev.handCard.remainderNum;
        dispatch(PKGame.PokerFourFacadeConst.SEND_CARDS, rev.handCard);
	    PKGame.RoomInfo.getInstance().isStart = true;
        PKGame.RoomInfo.getInstance().beiShu = 1;
        PKGame.RoomInfo.getInstance().stakeUsers = [];
        PKGame.RoomInfo.getInstance().jiaofenArr = [];
        PKGame.RoomInfo.getInstance().diPaiArr = [];
        PKGame.GameData.getInstance().isMyTime = false;
    }
    /**
     * 操作广播:叫分、出牌
     * 清除当前玩家已出的牌面
     */
    export function OnOperatorPokerCmd_Brd(rev:Cmd.OperatorPokerCmd_Brd){
        if(rev.opMulti){
            PKGame.RoomInfo.getInstance().opMulti = rev.opMulti;
        }
        else{
            PKGame.RoomInfo.getInstance().opMulti = [];
        }
        PKGame.RoomInfo.getInstance().opCount = rev.sec;
        PKGame.RoomInfo.getInstance().operateId = rev.uid;
        PKGame.RoomInfo.getInstance().operateType = rev.opType;
        dispatch(PKGame.PokerFourFacadeConst.GAME_NOTIFY_OPERATE);
        if(rev.uid == uniLib.UserInfo.uid && rev.opType == 2){
            dispatch(PKGame.PokerFourFacadeConst.NOTICE_CARD_ENABLE,true);
        }else {
              dispatch(PKGame.PokerFourFacadeConst.NOTICE_CARD_ENABLE,false);
        }
    }
    /**叫分广播 */
    export function OnStakePokerCmd_Brd(rev:Cmd.StakePokerCmd_Brd){
    
        trace("叫分广播：StakePokerCmd_Brd " + JSON.stringify(rev));
        PKGame.RoomInfo.getInstance().stakeUsers = rev.stakeSet;
        for (var i:number = 0; i < rev.stakeSet.length; i++) {
            PKGame.RoomInfo.getInstance().addJiaofenArr(rev.stakeSet[i]);
        }
        PKGame.GameData.getInstance().isMyTime = true;
        dispatch(PKGame.PokerFourFacadeConst.GAME_NOTIFY_STAKE,rev);
    }


    /**
     * 自己出牌操作
     */
    export function OnOperatorPokerCmd_S(rev:any){
        trace("自己出牌：OperatorPokerCmd_S " + JSON.stringify(rev));
        dispatch(PKGame.PokerFourFacadeConst.IS_SELF_PASS_CARDS,rev);
        //刷新手牌
    }
    /**
     * 定地主
     */
    export function OnSetLandownerPokerCmd_Brd(rev:Cmd.SetLandownerPokerCmd_Brd){
        trace("定地主：SetLandownerPokerCmd_Brd " + JSON.stringify(rev));
        PKGame.RoomInfo.getInstance().setLandOwnerInfo(rev.landownerId);
        PKGame.RoomInfo.getInstance().landownerCardSet = rev.landownerCardSet;
        PKGame.RoomInfo.getInstance().diPaiArr = rev.landownerCardSet;
        PKGame.RoomInfo.getInstance().jiaofenArr = [];
        PKGame.CardInfo.getInstance().updateUserHandCount(rev.landownerId,rev.landownerCardSet.length,0);
        if(rev.landownerId == uniLib.UserInfo.uid){
            PKGame.CardInfo.getInstance().addCard(rev.landownerCardSet,PKGame.CardInfo.getInstance().getHandCardBySeat(0));
        }
        dispatch(PKGame.PokerFourFacadeConst.GAME_SET_LANDOWNER,rev);
    }
    /**
     * 用户出牌返回
     * 失败返回，成功不返回
     */
    export function OnOutCardPokerCmd_S(rev: Cmd.OutCardPokerCmd_S) {
        trace("出牌返回：OutCardMahjongCmd_S " + JSON.stringify(rev));
        var outCardGroup:any = rev.outCardGroup;

        if (outCardGroup && outCardGroup.length) {
            dispatch(PKGame.PokerFourFacadeConst.OUT_CARDS_RESULT,outCardGroup);
        }
        if (!rev.resultCode) {
            rev.resultCode = 0;
        }
        if(rev.resultCode){
            PKGame.GameInfo.manage.showMildWarnShow("出牌失败");
        }
    }
    /*
    * 出牌通知
    */
    export function OnOutCardPokerCmd_Brd(rev: Cmd.OutCardPokerCmd_Brd) {
        trace("出牌通知：OutCardMahjongCmd_Brd " + JSON.stringify(rev));
        PKGame.RoomInfo.getInstance().OutCard = rev;
        var seatId:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(rev.uid);
       
        PKGame.CardInfo.getInstance().userHandCount[seatId] = rev.remainderNum;
        if (rev.uid == uniLib.UserInfo.uid) {

            if (rev.outCardSet) {
                PKGame.CardInfo.getInstance().discard(uniLib.UserInfo.uid,rev.outCardSet);
            }
        }
        dispatch(PKGame.PokerFourFacadeConst.DISCARD_NOTICE,rev);
    }
    /**
     * 提示返回
     */
    export function OnTipsPokerCmd_S(rev:Cmd.TipsPokerCmd_S){
        if (rev.tipsCardSet) {
            PKGame.CardInfo.getInstance().cardTipArr = rev.tipsCardSet;
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
        }
        trace("提示返回：TipsPokerCmd_S " + JSON.stringify(rev));

    }


    /**
     * 广播胡牌结果
     */
    export function OnWinRetPokerCmd_Brd(rev: Cmd.WinRetPokerCmd_Brd) {
        PKGame.RoomInfo.getInstance().isStart = false;
        PKGame.RoomInfo.getInstance().chipsSets = rev.rewardSet;
        dispatch(PKGame.PokerFourFacadeConst.RESULT_NOTICE, rev);
        PKGame.RoomInfo.getInstance().isXiaoReconnect = true;
        if (rev.landownerId) {
            PKGame.RoomInfo.getInstance().landownerId = rev.landownerId;
        }
      }
    /**断线重连 */
    export function OnReConnectPokerCmd_S(rev: Cmd.ReConnectPokerCmd_S) {
        if(rev.roomId){
            if(!PKGame.DataCache.platParam){
               PKGame.DataCache.platParam = {}
            }
            PKGame.DataCache.platParam.roomId = rev.roomId;
        }
        if(rev.curGameNbr){
            PKGame.RoomInfo.getInstance().curNumber = rev.curGameNbr;
        }
        if (rev.handCard && rev.handCard.handCardSet.length>0) {
            PKGame.RoomInfo.getInstance().isStart = true;
            PKGame.CardInfo.getInstance().myCards = rev.handCard;
        }

        if (rev.landownerId) {
             PKGame.RoomInfo.getInstance().landownerId = rev.landownerId;
        }

        if (rev.landownerCardSet && rev.landownerCardSet.length) {
           PKGame.RoomInfo.getInstance().landownerCardSet = rev.landownerCardSet;
           PKGame.RoomInfo.getInstance().diPaiArr = rev.landownerCardSet;
        }

        dispatch(PKGame.PokerFourFacadeConst.RELOGIN, rev);
    }
    /**
     * 每局中间 点击开始
     */
    export function OnReadyStartPokerCmd_S(rev: Cmd.ReadyStartPokerCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = 0;
        }
	    trace("点击开始：ReadyStartMahjongCmd_S" + JSON.stringify(rev));
        if (PKGame.RoomInfo.getInstance().isStart || rev.resultCode == 1) {
            dispatch(PKGame.PokerFourFacadeConst.RESET_RESULT_PANEL);
            return;
        }
        dispatch(PKGame.PokerFourFacadeConst.RESET_TABLE);
    }
    /*
     * 玩家准备通知
     */
    export function OnReadyStartPokerCmd_Brd(rev: Cmd.ReadyStartPokerCmd_Brd) {
         trace("准备通知：ReadyStartMahjongCmd_Brd" + JSON.stringify(rev));
        if (rev.uid == uniLib.UserInfo.uid) {
            dispatch(PKGame.PokerFourFacadeConst.RESET_TABLE);
        }
        PKGame.RoomInfo.getInstance().readyUsers = rev.readyUserSet;
        dispatch(PKGame.PokerFourFacadeConst.READY_NOTICE,rev);
    }
    /**
     * 在线状态
     */
    export function OnOnlineStatePokerCmd_Brd(rev:Cmd.OnlineStatePokerCmd_Brd){
        dispatch(PKGame.PokerFourFacadeConst.NOTIFY_ONLINE_STATE,rev);
    }


    //最后的结算面板
    export function OnFinalScorePokerCmd_Brd(rev:Cmd.FinalScorePokerCmd_Brd) {
        if (rev["detail"]) {
            PKGame.RoomInfo.getInstance().balanceDetail = rev["detail"];
        }
        PKGame.RoomInfo.getInstance().recordInfo = rev.recordInfo;
        dispatch(PKGame.PokerFourFacadeConst.FINAL_GAME_ACCOUNTS,rev);
    }

    export function OnSendGiftPokerCmd_Brd(rev: Cmd.SendGiftPokerCmd_Brd) {
        dispatch(PKGame.PokerFourFacadeConst.SEND_GIFTS_NOTICE, rev);
    }
    export function OnSendGiftPokerCmd_S(rev: Cmd.SendGiftPokerCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = 0;
        }
    }
    export function OnGetPersonalPanel_S(rev: Cmd.GetPersonalPanel_S) {
        dispatch(PKGame.PokerFourFacadeConst.USERINFO_DATA, rev.userInfo);
    }

    export function OnRequestDissolveRoom_S(rev: Cmd.RequestDissolveRoom_S) {
        if (!rev.resultCode) {
            rev.resultCode = 0;
        }
        if (rev.resultCode == PKGame.NetConsts.SUCCESS && rev.userNum > 1) {
            PKGame.GameInfo.manage.showMildWarnShow(PKGame.DataCache.langObj.alertTxt.dismissOk);
        }
    }
    export function OnRequestDissolveRoom_Brd(rev: Cmd.RequestDissolveRoom_Brd) {
        dispatch(PKGame.PokerFourFacadeConst.DISS_REQUEST_NOTICE, rev);
    }
    export function OnSuccessDissolveRoom_Brd(rev: Cmd.SuccessDissolveRoom_Brd) {
        dispatch(PKGame.PokerFourFacadeConst.DISS_RESULT_NOTICE, rev);
    }
    export function OnReplyDissolveRoom_Brd(rev: Cmd.ReplyDissolveRoom_Brd) {
        dispatch(PKGame.PokerFourFacadeConst.DISS_NOTICE, rev);
    }
    export function OnVoiceChat_Brd(rev: Cmd.VoiceChat_Brd) {
        dispatch(PKGame.PokerFourFacadeConst.VOICE_NOTICE, rev);
    }
    export function OnCommonChat_Brd(rev: Cmd.CommonChat_Brd) {
        dispatch(PKGame.PokerFourFacadeConst.NOTIFY_COMMON_CHAT, rev);
    }

    export function OnVoiceChatRecord_S(rev: Cmd.VoiceChatRecord_S) {
        dispatch(PKGame.PokerFourFacadeConst.NOTIFY_CHAT_RECORD, rev);
    }
    export function OnSetSameIpWarn_S(rev: Cmd.SetSameIpWarn_S) {
        dispatch(PKGame.PokerFourFacadeConst.NOTIFY_SAME_IP, rev);
    }

    /**明牌广播 */
    export function OnShowCardPokerCmd_Brd(rev:Cmd.ShowCardPokerCmd_Brd):void {
        dispatch(PKGame.PokerFourFacadeConst.MINGPAI_GUANGBO,rev);
        if (!GameUtil.isHaveForArr(PKGame.RoomInfo.getInstance().mingPlayerArr,rev.handCard.uid)) {
            uniLib.SoundMgr.instance.playSound(PKGame.MyUserInfo.getInstance().userSex + "_ming_mp3");
            egret.error("明牌广播");
        }
    }
    /**
     * 服务器返回的消息提示
     */
    export function OnSysMessagePokerCmd_S(rev: Cmd.SysMessagePokerCmd_S){
        PKGame.GameInfo.manage.showMildWarnShow(rev.desc);
    }
    /**积分更新 */
    export function OnChangePointPokerCmd_Brd(rev:Cmd.ChangePointPokerCmd_Brd){
         PKGame.RoomInfo.getInstance().beiShu = rev.multi;
         dispatch(PKGame.PokerFourFacadeConst.NOTIFY_POINT_CHANGE,rev);
    }

    export function OnShowCardPokerCmd_S(rev:ShowCardPokerCmd_S):void {
        if (!rev["resultCode"]) {
            PKGame.CardInfo.getInstance().isSelMingPai = true;
        }
        dispatch(PKGame.PokerFourFacadeConst.RESPONSE_MINGPAI_SEND,rev);
    }

}

module Pmd {
     export function OnServerShutDownLoginUserPmd_S(rev: Pmd.ServerShutDownLoginUserPmd_S) {
        PKGame.RoomInfo.getInstance().leftTime = rev.lefttime;
        PKGame.RoomInfo.getInstance().notice = rev.desc;
        Cmd.dispatch(PKGame.PokerFourFacadeConst.STOP_SREVICE_NOTICE, rev);
    }
}
