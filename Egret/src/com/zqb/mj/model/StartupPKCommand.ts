/**
 *
 * @author 
 *
 */
module PKGame {
    export class StartupPKCommand extends puremvc.MacroCommand{
        public constructor() {
            super();
        }
        public execute(notification: puremvc.INotification): void {
            var rootView: egret.DisplayObjectContainer = notification.getBody();
            this.initController();
            this.initProxy();
            this.initMediator();
        }
        private initController():void{
            this.facade.registerCommand(PokerFourFacadeConst.SEND_DATA,DataRequestCommand);
             this.facade.registerCommand(PokerFourFacadeConst.DESTORY,RemoveCommand);
        }
        private initMediator():void{
            var gameVc:GameVc=new GameVc();
            GameInfo.uiLayer.addChild(gameVc);
            this.facade.registerMediator(new PKMediator(gameVc));
        }
        private initProxy():void{
            this.facade.registerProxy(new ServerPKProxy())
        }
    }

}
