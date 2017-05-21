module PKGame {
	export class CountVc extends BaseVc{		
		private _countSecond:number;
		private _timer:egret.Timer;
		private _countIndex:number;
		private _countSeatId:number;
		private _clockPanel:egret.Sprite;
		private _countNum1:ui.AlignBitmapText;

		public constructor() {
			super();
			this.initUI();
		}
		public initUI():void{
			this._clockPanel = new egret.Sprite;
			this.addChild(this._clockPanel);
			this._clockPanel.visible = false;
			var bg:egret.Bitmap = ResUtil.createBitmapByName("icon_clock_png");
			this._clockPanel.addChild(bg);
			
			this._countNum1 = this.createAlignBitmapText("gameNum_fnt","0",25,27,20,egret.HorizontalAlign.CENTER);
			this._countNum1.x = 30;
			this._countNum1.y = 30;
			this._clockPanel.addChild(this._countNum1);
		}

		public  setCount(seatId:number,count:number):void{
			this.isShowTimer(true);
			if(!seatId)seatId = 0;
			if (count == undefined) {
				count = 0;
			}
			this._clockPanel.visible = true;
			this._countSecond=count;
			this._countSeatId=seatId;
			this._countNum1.text = count + "";
			this.setPosition();
			this.stopTimer();
			if (count > 0) {

				this.startCount();
			}
		}
		private startCount():void{
			this._countIndex=0;
			this._timer=new egret.Timer(1000);
			this._timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
			this._timer.start();
		}
		private onTimer(evt:egret.TimerEvent):void{

			this._countSecond --;
			this._countNum1.text = this._countSecond + "";
			if (this._countSecond <= 0) {
				this.stopTimer();
			}
			if (this._countSecond == 2) {
				uniLib.SoundMgr.instance.playSound("cattle_clock_mp3")
			}
		}
		private stopTimer():void{
			if(this._timer){
				this._timer.stop();
				this._timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
				this._timer=null;
			}
		}
		public  reset():void{
			this.isShowTimer(false);
			this.stopTimer();
			this._countSecond = 0;
			this._countNum1.text ="0";
		}
		
		private setPosition(){
			// GameUtil.setPosBySeat(this._clockPanel,this._countSeatId,ddzGame.CardInfo.getInstance()._clockOffsetArr);
            GameUtil.setContainerPos(this._clockPanel,PKGame.PositionData.getInstance().countPosArr,this._countSeatId)
		}
		private createAlignBitmapText(fontName: string,text: string,x: number = 0,y: number = 0,width: number = -1,hAlign: string = "left"): ui.AlignBitmapText {
			var tf: ui.AlignBitmapText = new ui.AlignBitmapText();
			if(width != -1) {
				tf.width = width;
			}
			tf.font = RES.getRes(fontName);
			tf.text = text;
			tf.x = x;
			tf.y = y;
			tf.hAlign = hAlign;
			return tf;
		}

		public isShowTimer(isShow:boolean):void {
			this.visible = isShow;
		}
		public destory(){
			this.stopTimer();
			this._countNum1 = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}