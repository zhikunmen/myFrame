module PKGame {
	export class UserSideCard3 extends UserSideCard{
		public constructor() {
			super();
			this.defaultPoint=this.initPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2 +130,75);
			this.stepX=0;
			this.stepY=35;
			this.takeCardStepX=0;
			this.takeCardStepY=10;
			this.userSeat=3;
			this.displayPos=new egret.Point((uniLib.Global.screenWidth-1136)/2 +120,35);
		}

		/**重置初始位置 */
		public resetPoint(){
			this.defaultPoint=this.initPoint=new egret.Point((uniLib.Global.screenWidth-1136)/2 +130,75);
		}
	}
}