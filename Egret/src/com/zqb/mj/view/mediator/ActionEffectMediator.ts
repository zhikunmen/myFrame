/**
 *
 */
module PKGame {
    import is = egret.is;
    import tr = egret.sys.tr;
    export class ActionEffectMediator extends puremvc.Mediator {
        public static NAME: string = "ActionEffectMediator";
        private _actionEffectVc: ActionEffectMc;

        public constructor(viewComponent: any) {
            super(ActionEffectMediator.NAME, viewComponent);
            this._actionEffectVc = viewComponent;
        }

        public onRemove(): void {
            super.onRemove();

            this._actionEffectVc.destory();
        }

        private  onOperate(evt: egret.Event): void {
            var type: string = evt.type;
            var obj: any;
            switch (type) {

            }
        }

        public showCommonChat(uid: number, commonId: string) {
            this._actionEffectVc.showCommonChat(uid, commonId);
        }

        public showCommonTalk(uid: number, content: string) {
            this._actionEffectVc.showCommonTalk(uid, content);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PokerFourFacadeConst.GAME_START,
                PokerFourFacadeConst.NOTIFY_COMMON_CHAT,
                PokerFourFacadeConst.RESULT_NOTICE,
                PokerFourFacadeConst.DISCARD_NOTICE,
                PokerFourFacadeConst.OUT_CARDS_RESULT,
                PokerFourFacadeConst.RELOGIN,
                PokerFourFacadeConst.IS_SELF_PASS_CARDS,
                PokerFourFacadeConst.READY_NOTICE,
        

            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            // var data:any = notification.getBody();
            var thisId: number = 0;
            var common = notification.getBody();
            switch (notification.getName()) {

                case PokerFourFacadeConst.NOTIFY_COMMON_CHAT:

                    if (common.voiceId) {
                        this._actionEffectVc.showCommonChat(common.uid, String(common.voiceId));
                    }
                    else if (common.words) {
                        this._actionEffectVc.showCommonTalk(common.uid, common.words);
                    }
                    break;
                case PokerFourFacadeConst.RESULT_NOTICE:
                    if (!common) return;

                    //地主id

                    //1表示春天，2表示返春
                    var chun:number = common.springType;

                    if (chun == 1) {
                        this._actionEffectVc.PlayPaixingEffect(13,0);
                    }else if (chun == 2) {

                        this._actionEffectVc.PlayPaixingEffect(14,0);
                    }
                    this._actionEffectVc.showHandCardNode.updateView(common);
                    this._actionEffectVc.resetBaoDanView();
                    break;
                case PokerFourFacadeConst.GAME_START:
                    this._actionEffectVc.clearEffect();
                    this._actionEffectVc.resetBaoDanView();
                    break;
                case PokerFourFacadeConst.DISCARD_NOTICE:
                    if (common && common.uid) {
                        var seat:number = RoomInfo.getInstance().getSeatNoByUserId(common.uid);
                        var seatId:number = seat;
                        if (seat == 2) {
                            seat = 3
                        }
                        var type = common["outCardSetType"];
                        var outCards = common["outCardSet"];
                        var sex = PKGame.MyUserInfo.getInstance().userSex;

                        var str:string = "";
                        if (type) {
                            if (type == 1) {
                                var cardNum = GameUtil.getCardNum(outCards[0]);
                                str = sex + "_dan_zhang_" + cardNum + "_mp3"
                            }else if (type == 2) {
                                var cardNum = GameUtil.getCardNum(outCards[0]);
                                str = sex + "_dui_zi_" + cardNum + "_mp3";
                            }else {
                                str = sex + "_pai_type_" + type + "_mp3";
                            }
                        }else {
                            str = sex + "_bu_yao_mp3";
                        }
                        uniLib.SoundMgr.instance.playSound(str);
                        // this._actionEffectVc.showBaoDanEffect(2);
                        var cardNum: number = PKGame.CardInfo.getInstance().userHandCount[seatId];
                        if (cardNum == 1) {
                            this._actionEffectVc.showBaoDanEffect(seat);
                            uniLib.SoundMgr.instance.playSound("alarm_mp3");
                        } else if (cardNum == 2) {
                            this._actionEffectVc.showBaoDanEffect(seat);
                            uniLib.SoundMgr.instance.playSound("alarm_mp3");
                        }
                    }

                    this._actionEffectVc.isPassCards(false);
                    this._actionEffectVc.PlayPaixingEffect(type, seat);
                    // this._actionEffectVc.selectCardsVc.isShowView(false);

                    break;
                case PokerFourFacadeConst.OUT_CARDS_RESULT:

                    break;
                case PokerFourFacadeConst.RELOGIN:
                    this._actionEffectVc.resetBaoDanView();
                    if (!PKGame.RoomInfo.getInstance().isXiaoReconnect && PKGame.RoomInfo.getInstance().landownerId) {
                        for (var i:number = 0; i < PKGame.RoomInfo.getInstance().userList.length; i++) {
                            var userData:UserVo = PKGame.RoomInfo.getInstance().userList[i];

                            if (userData.handCardNum <= 2) {
                                var seat:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(userData.uid);
                                this._actionEffectVc.showBaoDanEffect(seat);
                            }
                        }

                    }
                    break;
                case PokerFourFacadeConst.IS_SELF_PASS_CARDS:
                    if (common.opType == 1) {
                        this._actionEffectVc.isPassCards(false);
                    }else if (common.opType == 2) {
                        this._actionEffectVc.isPassCards(true);
                    }
                    break;
                case PokerFourFacadeConst.READY_NOTICE:

                    if (common&&common["uid"] == PKGame.MyUserInfo.getInstance().userId) {
                        this._actionEffectVc.clearEffect();
                    }
                   
                    break;
                    
            }
        }
    }
}


