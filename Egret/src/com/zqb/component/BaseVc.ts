module PKGame {
	export class BaseVc extends egret.DisplayObjectContainer{
		public constructor() {
			super();
			this.initUI()
		}
		public initUI():void{

		}
		public destory():void{
			ResUtil.removeFromParent(this);
			ResUtil.removeAllChildren(this);
		}
	}
}