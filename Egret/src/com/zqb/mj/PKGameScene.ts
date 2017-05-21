module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class PKGameScene extends uniLib.GameScene{
		public constructor() {
    		super();
		}
        public start():void{
            super.start();
			if(DataCache.gameInfo&&DataCache.gameInfo.defaultOrientation!=egret.OrientationMode.LANDSCAPE){
				uniLib.ScreenUtils.landscape = true;
			}
            GameInfo.uiLayer = this.uiLayer;
			GameInfo.mainUILayer = this.topLayer;
            GameInfo.topLayer=this.mainUILayer;
			this.initPositionData();
		    PokerFourFacede.getInstance().startUp(this);
		}
		public destroy():void{
			super.destroy();
			PKGame.PokerFourFacede.getInstance().sendNotification(PKGame.PokerFourFacadeConst.DESTORY);
		}
		/**
		 * 初始化位置属性,以做到右对齐
		 */
		private initPositionData():void{
			for(var i = 0; i < PositionData.seatPosArr.length;i++){
				if(i == 1 || i == 2){
					PositionData.seatPosArr[i].x = uniLib.Global.screenWidth-(1136-PositionData.seatPosArr[i].x);
				}
				if(i == 0){
					PositionData.seatPosArr[i].y = ResUtil.changeYAxis(PositionData.seatPosArr[i].y);
				}
			}
			if(DataCache.defaultWidth!=uniLib.Global.screenWidth)
			{
				DataCache.defaultWidth = uniLib.Global.screenWidth;
				DataCache.defaultHeight = uniLib.Global.screenHeight;
			}
		}
	}
}
