module PKGame {
	export class VoiceChat extends BaseVc {
		private _startBtn: GameButton;
		private _recording: RecordingMc;
		private _voiceArr: Array<VoiceMc>;
		private _curPosY: number;
		private _soundValue: boolean;
		public constructor() {
			super();
		}
		public initUI(): void {
			this._startBtn = new GameButton(["voice_btn2", "voice_btn1"]);
			this._startBtn.x = uniLib.Global.screenWidth-this._startBtn.width-(1136-1065-this._startBtn.width);
			this._startBtn.y = uniLib.Global.screenHeight - 320;
			this.addChild(this._startBtn);
			this._startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startRecord, this);
			this._recording = new RecordingMc();
			this.addChild(this._recording);
			this._recording.x = (DataCache.defaultWidth - this._recording.width) / 2;
			this._recording.y = (DataCache.defaultHeight - this._recording.height) / 2;
			this._recording.addEventListener(UIEventConsts.RECORD_TIME_OUT, this.recordEvent, this);
			this._voiceArr = [];
			GameInfo.topLayer.addChild(this._recording);
		}
		public test(){
			var vo:Cmd.VoiceChat_Brd=new Cmd.VoiceChat_Brd();
			vo.uid=uniLib.UserInfo.uid;
			vo.time=15+"";
			vo.url="";
			this.showVoice(vo);
		}
		public showVoice(vo: Cmd.VoiceChat_Brd): void {
			var seatId: number = RoomInfo.getInstance().getSeatNoByUserId(vo.uid);
			var point: egret.Point = PositionData.seatPosArr[seatId];

			if (!this._voiceArr[seatId]) {
				this._voiceArr[seatId] = new VoiceMc();

				if (seatId == 0 || seatId == 3) {
					this._voiceArr[seatId].x = point.x + 100;
				} else {
					this._voiceArr[seatId].scaleX = -1;
					this._voiceArr[seatId].x = point.x - 76;
					this._voiceArr[seatId].flip();
				}
				this._voiceArr[seatId].y = point.y + 25;
				GameInfo.topLayer.addChildAt(this._voiceArr[seatId], 0);
			}
			var data: VoiceDataVo = new VoiceDataVo();
			data.time = Number(vo.time);
			data.url = vo.url;
			data.uid = vo.uid;
			this._voiceArr[seatId].setData(data);

			if (seatId == 1 || seatId == 2) {
				this._voiceArr[seatId].x = point.x - 11;
			}
		}
		private recordEvent(evt: egret.Event): void {
			this.stopRecord();
		}
		private startRecord(evt: egret.TouchEvent): void {
			this._isCancel = false;
			this._curPosY = evt.localY;
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
			this.stopSound()
			uniLib.ZQGameSdk.startRecord();
			this._recording.startTimer();
		}
		//停止所有声音
		private stopSound(): void {
			this._soundValue = uniLib.SoundMgr.instance.soundOpen;
			uniLib.SoundMgr.instance.soundOpen = false;
			uniLib.SoundMgr.instance.pauseBgMusic();
		}
		//恢复声音
		private resumeSound(): void {
			uniLib.SoundMgr.instance.soundOpen = this._soundValue;
			uniLib.SoundMgr.instance.resumeBgMusic();
		}
		private _isCancel:boolean = false;
		private checkCancel(evt: egret.TouchEvent): void {
			if (evt.localY > this._curPosY + 20) {
				this._isCancel = true;
				egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
				egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
				this.resumeSound();
				uniLib.ZQGameSdk.stopRecord();
				this._recording.stopTimer();
			}
		}
		private stopRecord(evt: egret.TouchEvent = null): void {
			egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
			egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
			var text = this._recording.stopTimer();
			if(text <1000){
				var self = this;
				setTimeout(function() {
						self.resumeSound();
						uniLib.ZQGameSdk.stopRecord();
					}, 1000);
			}
			else{
				uniLib.ZQGameSdk.stopRecord(this.onRecordBack, this);
			}
		}
		private onRecordBack(obj: any): void {
			var self = this;
			var data: any = obj.data;
			if (obj.code == 0) {
				var voiceVo: VoiceDataVo = new VoiceDataVo();
				voiceVo.url = data.voiceUrl;
				voiceVo.time = Math.round(data.voiceDuration / 1000);
				voiceVo.nickName = uniLib.UserInfo.uid.toString();
				voiceVo.text = data.text;
				voiceVo.status = 0;
				if(isNaN(voiceVo.time)){
					//时间为空
					GameInfo.manage.showMildWarnShow("语音发送失败");
				}
				else{
					if(this._isCancel == false){
						this.dispatchEventWith(UIEventConsts.SEND_RECORD, false, voiceVo);
					}
				}
			} else {
				GameInfo.manage.showMildWarnShow(obj.errMsg);
			}
			if(!isNaN(data.voiceDuration)){
				setTimeout(function() {
					self.resumeSound();
				}, data.voiceDuration);
		    }
			else{
				setTimeout(function() {
					self.resumeSound();
				}, 1000);
			}
		}
		public destory() {
			if (this._startBtn) {
				this._startBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startRecord, this);
				egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
				egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
				this._startBtn.destory();
			}
			this._startBtn = null;
			if (this._recording) {
				ResUtil.removeFromParent(this._recording);
				this._recording.removeEventListener(UIEventConsts.RECORD_TIME_OUT, this.recordEvent, this);
				this._recording.destory();
			}
			this._recording = null;
			var voice: VoiceMc;
			for (var i: number = 0; i < this._voiceArr.length; i++) {
				voice = this._voiceArr[i];
				if (voice) {
					ResUtil.removeFromParent(voice);
					voice.destory();
					voice = null;
				}
			}
			this._voiceArr = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
	export class VoiceMc extends BaseVc {
		private _soundIcon: egret.Bitmap
		private _bg: egret.Bitmap;
		private _timer: egret.Timer;
		private _soundTime: number;
		private _startTime: number;
		private _timeTxt: egret.TextField;
		private _ifFlip: boolean = false;
		public constructor() {
			super();
		}
		public initUI(): void {
			this._bg = ResUtil.createBitmapByName("voice_paopao");
			this._bg.scale9Grid = new egret.Rectangle(50, 10, 30, 20);
			this.addChild(this._bg);
			this._soundIcon = ResUtil.createBitmapByName("voice_icon", 24, 11);
			this.addChild(this._soundIcon);
			this._timeTxt = ResUtil.createTextFeild(0xffffff, egret.HorizontalAlign.RIGHT, "", 18, 48, 13, 50);
			this.addChild(this._timeTxt);
		}
		private onTimer(evt: egret.TimerEvent): void {
			this._soundIcon.visible = !this._soundIcon.visible;
			var date: Date = new Date();
			var nowTime: number = date.getTime();
			var time: number = Math.floor((nowTime - this._startTime) / 1000);
			if (time >= this._soundTime) {
				this.stopTimer();
			}
		}
		private stopTimer(): void {
			this._soundIcon.visible = true;
			this.visible = false;
			if (this._timer) {
				this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
				this._timer.stop();
				this._timer = null;
			}
		}
		public flip(): void {
			this._ifFlip = true;
			this._timeTxt.skewY = 180;
			this._timeTxt.textAlign = egret.HorizontalAlign.LEFT;
		}
		public setData(vo: VoiceDataVo): void {
			if (vo.uid != uniLib.UserInfo.uid) {
				uniLib.ZQGameSdk.playRecord(vo.url, this.playEndBack, this);
			}
			if (vo.time) {
				this._timeTxt.text = vo.time + "''";
			} else {
				this._timeTxt.text = "";
			}

			this._soundTime = vo.time ? vo.time : 10;
			if (vo.time <= 3) {
				this._bg.width = 100;
			} else {
				this._bg.width = 100 + (vo.time - 3) * 5;
			}
			if (this._ifFlip) {
				this._timeTxt.x = this._bg.width - 12;
			} else {
				this._timeTxt.x = this._bg.width - 60;
			}

			this.stopTimer();
			this.visible = true;
			this._timer = new egret.Timer(200);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this._timer.start();
			var date: Date = new Date();
			this._startTime = date.getTime();
		}
		private playEndBack(obj: any): void {
			this.stopTimer();
		}
		public destory() {
			this.stopTimer();
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._bg = null;
			this._soundIcon = null;
		}
	}
	export class RecordingMc extends BaseVc {
		private _moving: egret.DisplayObjectContainer;
		private _time: egret.TextField;
		private _startTimer: egret.Timer;
		private _startTime: number;
		private _maxTime: number = 15;
		private _msTime:number = 0;
		public constructor() {
			super();
		}
		public initUI(): void {
			var recordbg: egret.Bitmap = ResUtil.createBitmapByName("voice_recording");
			this.addChild(recordbg);
			this._moving = new egret.DisplayObjectContainer();
			this._moving.x = 104;
			this._moving.y = 102;
			var icon: egret.Bitmap = ResUtil.createBitmapByName("voiceloading");
			icon.x = -icon.width / 2;
			icon.y = -icon.height / 2;
			this._moving.addChild(icon);
			this.addChild(this._moving);
			this._time = ResUtil.createTextFeild(0xC6D7DE, egret.HorizontalAlign.CENTER, "8''", 22, 74, 136, 75);
			this.addChild(this._time);
			this.visible = false;
		}
		public startTimer(): void {
			this.stopTimer();
			this.visible = true;
			this._startTimer = new egret.Timer(50, 0);
			var date: Date = new Date();
			this._startTime = date.getTime();
			this._startTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this._startTimer.start();
		}
		public stopTimer(): number {
			this.visible = false;
			if (this._startTimer) {
				this._startTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
				this._startTimer.stop();
				this._startTimer = null;
			}
			return this._msTime;
		}
		private onTimer(evt: egret.TimerEvent): void {
			var date: Date = new Date();
			var num: number = date.getTime();
			var nowT: number = Math.floor((num - this._startTime) / 1000);
			this._time.text = (nowT + 1) + "''";
			this._moving.rotation += 15;
			if (nowT >= this._maxTime) {
				this.dispatchEventWith(UIEventConsts.RECORD_TIME_OUT);
			}
			this._msTime = num - this._startTime;
		}
		public dispose() {
			this.stopTimer();
			if (this._moving) {
				uniLib.DisplayUtils.removeAllChildren(this._moving);
				uniLib.DisplayUtils.removeFromParent(this._moving);
			}
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._moving = null;
			this._time = null;
		}
	}
}