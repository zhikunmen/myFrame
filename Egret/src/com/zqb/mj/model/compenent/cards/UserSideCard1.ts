module PKGame {

	export class UserSideCard1  extends UserSideCard{
		public constructor() {
			super();
			this.defaultPoint=this.initPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2 +990,ResUtil.changeYAxis(440));
			this.stepX=0;
			this.stepY=-34;//手牌间距
			this.takeCardStepX=0;
			this.takeCardStepY=-10;
			this.userSeat=1;
			this.displayPos=new egret.Point((uniLib.Global.screenWidth-1136)/2 +980,ResUtil.changeYAxis(469));
			// this.initOutPutCards();
		}

		/**重置初始位置 */
		public resetPoint(){
			this.defaultPoint=this.initPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2 +990,ResUtil.changeYAxis(440));
		}
	}
}