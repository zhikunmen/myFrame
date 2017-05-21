module PKGame {
	export class RemoveCommand  extends puremvc.MacroCommand{
		public constructor() {
			super();
		}
		 public execute(notification: puremvc.INotification): void {
            var rootView: egret.DisplayObjectContainer = notification.getBody();
            this.removeMediator();
            this.removeController();
            this.removeProxy();
        }
		private removeController():void{
            this.facade.removeCommand(PokerFourFacadeConst.SEND_DATA);
            this.facade.removeCommand(PokerFourFacadeConst.STARTUP);      
			this.facade.removeCommand(PokerFourFacadeConst.DESTORY);
        }
        private removeMediator():void{
			this.facade.removeMediator(PKMediator.NAME);
        }
        private removeProxy():void{
            this.facade.removeProxy(ServerPKProxy.NAME);
            this.facade = null;
            puremvc.Facade.instance = null;
        }
	}
}