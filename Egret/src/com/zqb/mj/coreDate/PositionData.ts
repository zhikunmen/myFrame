module PKGame {

	/**
	 *
	 * **/
	export class PositionData {

		private static instance:PositionData;
		public static getInstance():PositionData{
			if(!this.instance) {
				this.instance = new PositionData();
			}
			return this.instance;
		}
		public static seatPosArr: Array<egret.Point> = [new egret.Point(30, 525), new egret.Point(1012, 220), new egret.Point(480, 11), new egret.Point(30, 220)];
		public countPosArr:Object[]= [{"x":uniLib.Global.screenWidth/2 - 40,"y":uniLib.Global.screenHeight/2-100},{"x":uniLib.Global.screenWidth - 250,"y":uniLib.Global.screenHeight/2 - 50},{"x":200,"y":uniLib.Global.screenHeight/2 - 50}]
		public jingBaoPosArr:Object[] = [{"x":100,"y":uniLib.Global.screenHeight - 180},{"x":uniLib.Global.screenWidth - 60,"y":uniLib.Global.screenHeight/2 - 220},{"x":100,"y":uniLib.Global.screenHeight/2 - 220}];
		public mingPaiNodePosArr:Object[] = [{"x":0,"y":0},{"x":uniLib.Global.screenWidth - 330 ,"y":uniLib.Global.screenHeight/2 - 260},{"x":130,"y":uniLib.Global.screenHeight/2 - 260}];
	}

}