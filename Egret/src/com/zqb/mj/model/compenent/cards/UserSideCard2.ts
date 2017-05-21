module PKGame {
	export class UserSideCard2  extends UserSideCard{
		public constructor() {
			super();
			this.defaultPoint=this.initPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2 +829,12);
			this.stepX=-40;
			this.stepY=0;
			this.takeCardStepX=-10;
			this.takeCardStepY=0;
			this.userSeat=2;
			this.displayPos=new egret.Point((uniLib.Global.screenWidth-1136)/2 +829,17);
			// this.initOutPutCards();
		}

		/**重置初始位置 */
		public resetPoint(){
			this.defaultPoint=this.initPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2 +829,12);
		}
	}
}