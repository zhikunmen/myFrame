module PKGame {
	export class DismissPanel extends BasePanel{
		private yesBtn:GameButton;
		private noBtn:GameButton;
		private _timer:egret.Timer;
		private _startTime:number;
		private _totalTime:number;
		private info: egret.TextField;
		private _userList:Array<number>;
		private _timeTxt:egret.TextField;
		private _colorArr:Array<number>=[0xff7200,0x119300,0xff0c00];
		/**0 解散房间 1 切换房间人数 */
		private _dissGame: number;
		public constructor() {
			super(2);
		}
		public initPanel():void{
			this.touchEnabled = true;
			this.setSize(635,500);
			this.hideClose();
			this.yesBtn = new GameButton(["button11","button12"]);
			this.yesBtn.x = 36;
			this.yesBtn.y = 398;
			this.addChild(this.yesBtn);
			this.noBtn = new GameButton(["button21","button22"]);
			this.noBtn.x = 346;
			this.noBtn.y = 398;
			this.addChild(this.noBtn);
			var infoIcon1:egret.Bitmap=ResUtil.createBitmapByName("word_agree");
			infoIcon1.x=Math.round(this.yesBtn.x+(this.yesBtn.width-infoIcon1.width)/2);
            infoIcon1.y=this.yesBtn.y+10;
            this.addChild(infoIcon1);
			var infoIcon2:egret.Bitmap=ResUtil.createBitmapByName("word_refuse");
			infoIcon2.x=Math.round(this.noBtn.x+(this.noBtn.width-infoIcon2.width)/2);
            infoIcon2.y=this.noBtn.y+10;
            this.addChild(infoIcon2);
			this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgreeHandler,this);
			this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRefuse,this);
			this.info = ResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.LEFT,"",32,50,30,500);
            this.info.lineSpacing=10;
            this.addChild(this.info);
			for(var i=0;i<4;i++){
				this["_userName"+i]=ResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.LEFT,"",32,137,173+53*i,222);
				this.addChild(this["_userName"+i]);
				this["_status"+i]=ResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.CENTER,"",32,328,173+53*i,150);
				this.addChild(this["_status"+i]);
			}
			this._timeTxt= ResUtil.createTextFeild(0xDB4508,egret.HorizontalAlign.RIGHT,"",25,540,15,50);
			this.addChild(this._timeTxt);
		}
		private stopTimer():void{
			if(this._timer){
				this._timer.removeEventListener(egret.TimerEvent.TIMER,this.timerHandle,this);
				this._timer.stop();
				this._timer=null;
			}
		}
		private timerHandle(evt:egret.Timer):void{
			var data:Date=new Date();
			var now:number=data.getTime();
			var num:number=this._totalTime-(now-this._startTime)/1000;
			if(num>0){
				this._timeTxt.text=Math.floor(this._totalTime-(now-this._startTime)/1000).toString();
			}else{
				this.dispatchEventWith(UIEventConsts.CLOSE);
			}
		}
		public setData(vo:any):void{
			this._dissGame = 1;
			//暂时用等待时间来判断是解散房间还是修改房间人数。   修改房间人数 目前是没有等待时间
			if(vo.waitTime){
				this._dissGame = 0;
				this._totalTime=vo.waitTime;
				this.stopTimer();		
				var data:Date=new Date();
				this._startTime=data.getTime();
				this._timer=new egret.Timer(200,0);
				this._timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandle,this);
				this._timer.start();
				this._timeTxt.text=this._totalTime.toString();
			}
			var user:UserVo=RoomInfo.getInstance().getUserVoByUid(vo.uid);
			if(user){
				var str:string=DataCache.langObj.uiTxt.DismissPanel.info;
				var arr:Array<string>=str.split("#");
				if(!vo.waitTime){
					var msg:string=arr[0]+user.nickName+"\n申请将房间人数设置为" + PKGame.RoomInfo.getInstance().userList.length;
				}else{
					var msg:string=arr[0]+user.nickName+arr[1];
				}
				this.info.text=msg;
			}
			var userList:Array<UserVo>=RoomInfo.getInstance().userList;
			this._userList=[];
			var index:number=0;
			for(var i=0;i<userList.length;i++){
				if(userList[i]){
					this["_userName"+index].text=userList[i].nickName;
					this["_status"+index].text=DataCache.langObj.uiTxt.DismissPanel.status0;
					this["_status"+index].textColor=this._colorArr[0];
					this._userList.push(userList[i].uid);
					if(userList[i].uid==vo.uid){
						this["_status"+index].textColor=this._colorArr[1];
						this["_status"+index].text=DataCache.langObj.uiTxt.DismissPanel.status1;
					}
					index++;
				}
			}
			if(vo.uid==uniLib.UserInfo.uid){
				this.enableBtns();
			}
		}

		private enableBtns():void{
			if(this.yesBtn){
				this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgreeHandler,this);
			}
			if(this.noBtn){
				this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRefuse,this);
			}
		}
		 public updateStatus(status:number,uid:number):void{
			if(status==0){
				status=2;
			}
			var index:number=this._userList.indexOf(uid);
			if(index>=0){
				this["_status"+index].text=DataCache.langObj.uiTxt.DismissPanel["status"+status];
				this["_status"+index].textColor=this._colorArr[status];
			}
		}
		 private onAgreeHandler(evt:egret.Event):void{
			if(this._dissGame == 0){
            	this.dispatchEventWith(UIEventConsts.DISMISS_BACK,false,1);
			}else{
				this.dispatchEventWith(UIEventConsts.AGREE_CHANGE_USERNUM,false,1);
			}
			this.enableBtns();
        }
        private onRefuse(evt:egret.Event):void{
           if(this._dissGame == 0){
            	this.dispatchEventWith(UIEventConsts.DISMISS_BACK,false,0);
			}else{
				this.dispatchEventWith(UIEventConsts.AGREE_CHANGE_USERNUM,false,0);
			}
		   this.enableBtns();
        }
		public destory(){
			this.enableBtns();
			if(this.yesBtn){
				this.yesBtn.destory();
			}
			this.yesBtn = null;
			if(this.noBtn){
				this.noBtn.destory();
			}
			this.noBtn = null;
			if(this._timer){
				this._timer.removeEventListener(egret.TimerEvent.TIMER,this.timerHandle,this);
				this._timer.stop();
			}
			this._timer=null;
			this.info = null;
			this._timeTxt = null;
			this._userList = null;
			super.destory();
		}
	}
}