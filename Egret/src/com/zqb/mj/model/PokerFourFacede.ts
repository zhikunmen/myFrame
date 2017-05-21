module PKGame {
	export class PokerFourFacede extends puremvc.Facade{
		public constructor() {
			super();
		}
		 public static getInstance(): PokerFourFacede {
            if(this.instance == null) this.instance = new PokerFourFacede();
            return <PokerFourFacede><any>(this.instance);
        }
        public initializeController(): void {
            super.initializeController();
            this.registerCommand(PokerFourFacadeConst.STARTUP,StartupPKCommand);
        }
		
		/**
		 * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
		 * @param	rootView	-	PureMVC应用程序的根视图root，包含其它所有的View Componet
         * MJGameScene
		 */
        public startUp(rootView: egret.DisplayObjectContainer): void {
            this.sendNotification(PokerFourFacadeConst.STARTUP,rootView);
            // this.removeCommand(MahjongFourFacadeConst.STARTUP); //PureMVC初始化完成，注销STARUP命令
        }
	}
}