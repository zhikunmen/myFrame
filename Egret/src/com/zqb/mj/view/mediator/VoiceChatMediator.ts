module PKGame {
	export class VoiceChatMediator extends puremvc.Mediator{
		public static NAME: string = "VoiceChatMediator";
		private _voiceVc:VoiceChat;
		public constructor(viewComponent: any) {
			super(VoiceChatMediator.NAME,viewComponent);
            this._voiceVc=viewComponent;
            this._voiceVc.addEventListener(UIEventConsts.SEND_RECORD,this.uiEventHandle,this);
		}
		 private uiEventHandle(evt:egret.Event):void{
            var type:string=evt.type;
            switch (type) {
                case UIEventConsts.SEND_RECORD:
					var vo:VoiceDataVo=evt.data;
					var req:Cmd.VoiceChat_C=new Cmd.VoiceChat_C();
					req.url=vo.url;
					req.time=vo.time.toString();
					req.words=vo.text;
					this.sendNotification(PokerFourFacadeConst.SEND_DATA,req,DataRequestCommand.GAME_DATA);
                    break;
                default:
                    break;
            }
        }
		 public listNotificationInterests(): Array<any> {
            return [
				PokerFourFacadeConst.USER_ENTER_ROOM,
				PokerFourFacadeConst.VOICE_NOTICE
				]
		 }
		public handleNotification(notification: puremvc.INotification): void {
			switch(notification.getName()) {
				case PokerFourFacadeConst.VOICE_NOTICE:
					this._voiceVc.showVoice(notification.getBody());
					break;
				case PokerFourFacadeConst.USER_ENTER_ROOM:
				    // this._voiceVc.test();
					break;
			}
		}
		public onRemove():void{
			if(this._voiceVc){
				this._voiceVc.removeEventListener(UIEventConsts.SEND_RECORD,this.uiEventHandle,this);
				this._voiceVc.destory();
				this._voiceVc = null;
			}
			super.onRemove();
		}
	}
}