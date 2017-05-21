module PKGame {
	export class RecordItem extends BaseVc{
		private _curIndex:number;
		private _voiceBtn:GameButton;
		private _inputBg:egret.Bitmap;			
		private _voiceMc:egret.Sprite;
		private _tempTip:egret.TextField;
		private _itemGroup:RecordVoiceItem[];
		private _scrollView:egret.ScrollView;
		private _curVoice:RecordVoiceItem;
		public constructor() {
			super();
		}
		public initUI():void{
			this._itemGroup = [];
			this._voiceBtn=new GameButton(["yaya_record","yaya_record"]);
			this._voiceBtn.x=14;
			this._voiceBtn.y=146;
			this.addChild(this._voiceBtn);
			this._inputBg=ResUtil.createBitmapByName("yaya_chat_bg",58,147);
			this.addChild(this._inputBg);
			this._curIndex=0;
			this.resetBtn();
			this._voiceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);

			this._voiceMc=new egret.Sprite();
			this._voiceMc.name = "short_mc";
			this.addChild(this._voiceMc);

			this._scrollView=ResUtil.createScroll(this._voiceMc,350,250,20,5);
			this._scrollView.horizontalScrollPolicy="off";
			this._scrollView.verticalScrollPolicy="on";
			this.addChild(this._scrollView);

			this._tempTip = ResUtil.createTextFeild(0x333333,egret.HorizontalAlign.CENTER,"暂无数据",20,0,110,335);
			this.addChild(this._tempTip);
			/***********************************test***********************************/ 
			// var item:Cmd.VoiceObj=new Cmd.VoiceObj();
			// item.time="3";
			// item.url="http://store.aiwaya.cn/amr5826c8e234eaf20c10714847.amr";
			// item.timestamp = "2016-11-12 15:46:43";
			// var item1:Cmd.VoiceObj=new Cmd.VoiceObj();
			// item1.time="5";
			// item1.url="http://store.aiwaya.cn/amr5826c8fb34eaf20cab724847.amr";
			// item1.timestamp = "2016-10-10 16:33:33";
			// var item3:Cmd.VoiceObj=new Cmd.VoiceObj();
			// item3.time="15";
			// item3.url="http://store.aiwaya.cn/amr5826c9f846d7f20c1acb40f9.amr";
			// item3.timestamp = "2016-10-10 16:33:33";
			// this.initData([item,item1]);
			/***********************************test***********************************/ 
		}
		public initData(arr:Array<Cmd.VoiceObj>):void{
			if(arr[0] == null){				
				return;
			}
			this._itemGroup = [];
			uniLib.DisplayUtils.removeAllChildren(this._voiceMc);
			this._tempTip.visible = false;
			for(var i=0;i<arr.length;i++){
				this.showOneVoice(arr[i]);
			}
			if(arr.length >3){
					this._scrollView.setScrollPosition((arr.length-3)*80,0);
			}
		}
		public showOneVoice(data:Cmd.VoiceObj):void{
			var item:RecordVoiceItem=new RecordVoiceItem();
			item.name = "short_"+data.uid;
			item.setData(data);
			if(this._voiceMc.height!=0){
				item.y=this._voiceMc.height;
			}
			item.touchChildren=true;
			item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayVoice,this);
			this._voiceMc.addChild(item);
			this._itemGroup.push(item);
		}
		private onPlayEnd(evt:egret.Event):void{
			var item:RecordVoiceItem=evt.currentTarget;
			item.removeEventListener(RecordVoiceItem.PLAY_END,this.onPlayEnd,this);
			this._curVoice=null;
		}
		private onPlayVoice(evt:egret.TouchEvent):void{
			var item:RecordVoiceItem=evt.currentTarget;
			if(this._curVoice==evt.currentTarget){
				item.stopPlay();
				item.removeEventListener(RecordVoiceItem.PLAY_END,this.onPlayEnd,this);
			}else{
				if(this._curVoice){
					this._curVoice.stopPlay();
					this._curVoice.removeEventListener(RecordVoiceItem.PLAY_END,this.onPlayEnd,this);
				}
				item.startPlay();
				item.addEventListener(RecordVoiceItem.PLAY_END,this.onPlayEnd,this);
				this._curVoice=item;
			}
		}
		private onClick(evt:egret.TouchEvent):void{
			if(evt.currentTarget==this._voiceBtn){
				this._curIndex=0;
			}else{
				this._curIndex=1;
			}
			this.resetBtn();
		}
		private resetBtn():void{
			if(this._curIndex==0){
				this._inputBg.visible=false;
				this._voiceBtn.visible=false;
			}else{
				this._inputBg.visible=true;
				this._voiceBtn.visible=true;
			}
		}
		public destory(){
			if(this._voiceBtn){
				this._voiceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
				this._voiceBtn.destory();
			}
			this._voiceBtn = null;
			for(var i:number = 0;i<this._itemGroup.length;i++){
				var item = this._itemGroup[i];
				item.removeEventListener(RecordVoiceItem.PLAY_END,this.onPlayEnd,this);
				item.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayVoice,this);
				item.destory();
			}
			if(this._voiceMc){
				uniLib.DisplayUtils.removeAllChildren(this._voiceMc);
			}
			this._voiceMc = null;
			this._scrollView = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._inputBg = null;
			this._curVoice = null;
		}
	}
	export class RecordVoiceItem extends BaseVc{
		public static PLAY_END:string="playEnd";
		private _nameTxt:egret.TextField;
		private _voiceIcon:egret.Bitmap;
		private _timeTxt:egret.TextField;
		private _voiceLenTxt:egret.TextField;
		private _data:Cmd.VoiceObj;
		private _timer_200:uniLib.TimerBase;
		private _soundIcon:egret.Bitmap;
		private _second:number = 0;
		private _totalWidth:number = 300;
		private _content:egret.Sprite;
		public constructor() {
			super();
		}
		public initUI():void{
			this._content = uniLib.DisplayUtils.createMask(0,300,80,0x0);
			this._content.touchEnabled = true;
			this._content.name = "short_record_content";
			this.addChild(this._content);
			this._nameTxt=ResUtil.createTextFeild(0xa04c28,egret.HorizontalAlign.LEFT,"me",18,0,5,150);			
			this._content.addChild(this._nameTxt);

			this._timeTxt = ResUtil.createTextFeild(0xa04c28,egret.HorizontalAlign.LEFT,"me",13,10+this._nameTxt.width,10,150);
			this._content.addChild(this._timeTxt);

			this._voiceIcon=ResUtil.createBitmapByName("chat_pop",0,30);
			this._voiceIcon.name = "short_sound_pop";
			this._voiceIcon.scale9Grid=new egret.Rectangle(31,9,10,21);
			this._voiceIcon.width=300;
			this._content.addChild(this._voiceIcon);

			this._soundIcon=ResUtil.createBitmapByName("yaya_voice_icon",20,40);
			this._soundIcon.name = "short_sound_icon";
			this._content.addChild(this._soundIcon);

			this._voiceLenTxt=ResUtil.createTextFeild(0x333333,egret.HorizontalAlign.LEFT,"3''",22,142,45,50);
			this._voiceLenTxt.x = this._voiceIcon.width - this._voiceLenTxt.width;
			this._voiceLenTxt.name = "short_voice_len"
			this._content.addChild(this._voiceLenTxt);

			this._voiceIcon.touchEnabled=true;
		}
		private stopTimer():void{
			this._soundIcon.visible=true;
			if(this._timer_200){
				this._timer_200.stop();
			}
			this._timer_200=null;
			this._second = 0;
		}
		private onTimer(evt:egret.TimerEvent):void{
			this._second++;
			var time:number = Number(this.data.time)*1000;//转化为毫秒
			if(this._second >= time/200){
				this.stopPlay();
			}
			else{
				this._soundIcon.visible=!this._soundIcon.visible;
			}

		}
		public startPlay():void{
			if(this._data.uid != uniLib.UserInfo.uid){
				uniLib.ZQGameSdk.playRecord(this._data.url,this.playEndBack,this);
			}
			
			this._voiceIcon.texture=ResUtil.createTexture("yaya_voice2");
			this.stopTimer();
			this._timer_200=new uniLib.TimerBase(200,this.onTimer,this);
			this._timer_200.start();
		}
		public stopPlay():void{
			uniLib.ZQGameSdk.stopPlayRecord(this._data.url);
			this.stopTimer();
			this._voiceIcon.texture=ResUtil.createTexture("chat_pop");
		}
		private playEndBack(obj:any):void{
			this.stopTimer();
		}
		public get data():Cmd.VoiceObj{
			return this._data;
		}
		public setData(data:Cmd.VoiceObj):void{
			this._data=data;
			this._nameTxt.text=PKGame.RoomInfo.getInstance().getUserVoByUid(data.uid).nickName;
			this._voiceLenTxt.text=data.time+"''";
			this._timeTxt.text = data.timestamp;
			var voiceLen = Number(data.time);
			if(voiceLen <5){
				this._voiceIcon.width = (5/15)*this._totalWidth;
			}
			else{
				this._voiceIcon.width = (voiceLen/15)*this._totalWidth;
			}
			
			this._voiceLenTxt.x = this._voiceIcon.width - this._voiceLenTxt.width;
		}
		public destory():void{
			super.destory();
			this.stopTimer();
			if(this._content){
				uniLib.DisplayUtils.removeAllChildren(this._content);
				uniLib.DisplayUtils.removeFromParent(this._content);
			}
			this._data = null;
			this._content = null;
			this._nameTxt=null;
			this._soundIcon = null;
			this._voiceIcon=null;
			this._timeTxt=null;
			this._voiceLenTxt = null
		}
	}
}