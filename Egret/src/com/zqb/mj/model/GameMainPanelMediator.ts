/**
 * Created by iluspan on 17/5/4.
 */
module  PKGame {

    export class GameMainPanelMediator extends puremvc.Mediator {

        public static NAME: string = "GameMainPanelMediator";
        private _gameMainView: GameMainPanel;


        public constructor(viewComponent: any) {
            super(GameMainPanelMediator.NAME, viewComponent);
            this._gameMainView = viewComponent;
            this.initGame();
        }

        private initGame():void{

            this.facade.sendNotification(PokerFourFacadeConst.SEND_DATA,null,DataRequestCommand.CONNECT_GAME_SERVER);
            // uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_SERVER_DEBUG_LEVEL,this.setDebugState,this);
            // egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
        }
        public onRemove(): void {
            super.onRemove();
            this._gameMainView.destroy();
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
                PokerFourFacadeConst.USER_ENTER_ROOM,
                PokerFourFacadeConst.PLAYER_ENTER_ROOM
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
            // var data:any = notification.getBody();
            var thisId: number = 0;
            var common = notification.getBody();
            switch (notification.getName()) {
                case PokerFourFacadeConst.USER_ENTER_ROOM:
                    this._gameMainView.enterRoom(common);
                    break;
                case PokerFourFacadeConst.PLAYER_ENTER_ROOM:
                    this._gameMainView.otherPlayerEnter(common["userInfo"]);
            }
        }

    }
}