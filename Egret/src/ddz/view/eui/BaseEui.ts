
module PKGame {

	/** 使用eui的接口 */
	export interface EuiSkinInt {

	}
	export class BaseEui extends eui.Component implements EuiSkinInt{

		constructor (){
			super();
		}

		protected childrenCreated():void {
			super.childrenCreated();
			this.init();
			this.addEvent();
		}
		
		//初始化
		protected init():void {

		}

		//添加事件
		protected addEvent():void {


		}
		//移除事件
		protected removeEvent():void {

		}




		//摧毁
		public destroy():void {

			this.removeEvent();
		}
	}
}