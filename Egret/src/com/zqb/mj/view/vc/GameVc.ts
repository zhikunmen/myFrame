module PKGame {
	import thisIdToCardId = PKtable.PokerTableCard.thisIdToCardId;
	import Tween = egret.Tween;
	export class GameVc extends BaseVc {
		private _setBtn: GameButton;
		private _shareBtn: GameButton;//邀请好友
		private _backBtn: GameButton;//返回大厅
		private _dissBtn: GameButton;//解散房间

		private _hostBtn: GameButton;//托管按钮
		private _helpBtn: GameButton;//游戏秘籍
		private _changeIcon: GameButton;//换房间人数

		private _timer: egret.Timer;
		private _sysMsgVc: GameSysMsg;
		private _signal: egret.Bitmap;
		private _notice: egret.BitmapText;
		private StopServiceInfo: egret.Bitmap;
		private _hostIcon: egret.Sprite;
		private _roomType: egret.TextField;
		private _listenPanel: egret.Sprite; //待和牌
		private _roomNumber: egret.TextField;//房间局数
		private _roomIdTxf: egret.TextField;
		private _restCardNum: egret.TextField;   //剩余牌数
		private _roomPlayerNum: egret.TextField; //人数
		private _timer_1000: uniLib.TimerBase;

		private _dateTxt: egret.TextField;      //当前日期
		private _timeTxt: egret.TextField;      //当前时间
		private _signalTxt: egret.TextField;    //没信号文字
		private _enterTips: egret.TextField;     //进房间提示
		private _betteryPercent: egret.Bitmap;  //电池电量
		private _resultPanel: GameOverPanel;
		private _dipaiNode:egret.Sprite;//底牌容器


		//低分
		private _difen:ui.AlignBitmapText;
		private _beishu:ui.AlignBitmapText;
		//发牌动画容器
		private _fapaiActionNode:egret.DisplayObjectContainer;

		public constructor() {
			super();
		}
		public destory(): void {
			super.destory();
			if (this._sysMsgVc) {
				this._sysMsgVc.destory();
				this._sysMsgVc = null;
			}
			uniLib.Global.removeEventListener(uniLib.ZqEvent.NATIVE_TO_EGERET, this.onNativeMessage, this);
			if (this._timer_1000) {
				this._timer_1000.stop();
			}
			this._timer_1000 = null;
			if (this._timer) {
				this._timer.stop();
				this._timer.removeEventListener(egret.TimerEvent.TIMER, this.showLeftTime, this);
				this._timer = null;
			}
			if (this.StopServiceInfo) {
				this.StopServiceInfo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showstopServicePanel, this);
				uniLib.DisplayUtils.removeFromParent(this.StopServiceInfo);
			}
			this.StopServiceInfo = null;
			if (this._setBtn) {
				this._setBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);
				this._setBtn.destory();
				this._setBtn = null;
			}

			if (this._shareBtn) {
				this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
				this._shareBtn.destory();
			}
			this._shareBtn = null;
			if (this._backBtn) {
				this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnTouch, this);
				this._backBtn.destory();
			}
			this._backBtn = null;
			if (this._dissBtn) {
				this._dissBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDissBtnTouch, this);
				this._dissBtn.destory();
			}
			this._dissBtn = null;

			if(this._helpBtn){
				this._helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpBtnTouch, this);
				this._helpBtn.destory();
			}
			this._helpBtn = null;


			if (this._hostIcon) {
				this._hostIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHostTouchHandler, this);
				uniLib.DisplayUtils.removeAllChildren(this._hostIcon);
				uniLib.DisplayUtils.removeFromParent(this._hostIcon);
			}
			this._hostIcon = null;
			if (this._changeIcon) {
				this._changeIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showChangeUserNumConfirm, this);
				uniLib.DisplayUtils.removeAllChildren(this._changeIcon);
				uniLib.DisplayUtils.removeFromParent(this._changeIcon);
			}
			this._changeIcon = null;
			if(this._notice){
				this._notice.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showstopServicePanel, this);
			}
			this._notice = null;
			if(this._resultPanel){
				this._resultPanel.destory();
			}
			this._resultPanel = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._dateTxt = null;
			this._timeTxt = null;
			this._signal = null;
			this._signalTxt = null;
			this._roomType = null;
			this._roomNumber = null;
			if(this._restCardNum){
				egret.Tween.removeTweens(this._restCardNum);
			}
			this._restCardNum = null;
			this._roomPlayerNum = null;
			this._betteryPercent = null;
			if(this._enterTips){
				egret.Tween.removeTweens(this._enterTips);
			}
			this._enterTips = null;
		}
		public initUI(): void {
			var topBg:egret.Bitmap = ResUtil.createBitmapByName("bg_floor_png");
			this.addChild(topBg);


			var bg: egret.Bitmap = ResUtil.createBitmapByName("dizhu_bg_png", 0, 0);
			bg.width = uniLib.Global.screenWidth;
			bg.height = uniLib.Global.screenHeight;
			this.addChild(bg);
			var titleBg:egret.Bitmap = ResUtil.createBitmapByName("bg_biaoti_png");
			this.addChild(titleBg);
			GameUtil.setContainerCenter(titleBg);

			var titleBg1:egret.Bitmap = ResUtil.createBitmapByName("bg_neikuang_2_png");
			this.addChild(titleBg1);
			var rect:egret.Rectangle = new egret.Rectangle(5,5,30,30);
			titleBg1.scale9Grid = rect;
			titleBg1.width = 176;
			titleBg1.height = 71;
			GameUtil.setContainerCenter(titleBg1);

			var buttomBg:egret.Bitmap = ResUtil.createBitmapByName("bg_tiaoti_2_png");
			var rect:egret.Rectangle = new egret.Rectangle(44,6,62,39);
			buttomBg.scale9Grid = rect;
			buttomBg.width = 1280;
			buttomBg.height = 52;
			buttomBg.y = uniLib.Global.screenHeight - buttomBg.height;
			this.addChild(buttomBg);

			var labelBg1:egret.Bitmap = ResUtil.createBitmapByName("bg_neikuang_1_png");
			var rect:egret.Rectangle = new egret.Rectangle(12,12,12,12);
			labelBg1.scale9Grid = rect;
			labelBg1.width = 205;
			labelBg1.height = 35;
			labelBg1.y = uniLib.Global.screenHeight - labelBg1.height;
			labelBg1.x = uniLib.Global.screenWidth / 6;
			this.addChild(labelBg1);

			var nameLabel:egret.TextField = new egret.TextField();
			nameLabel.text = "昵称:";
			nameLabel.y = labelBg1.y;
			nameLabel.x = labelBg1.x - nameLabel.width;
			nameLabel.size = 30;
			this.addChild(nameLabel);



			var labelBg2:egret.Bitmap = ResUtil.createBitmapByName("bg_neikuang_1_png");
			var rect:egret.Rectangle = new egret.Rectangle(12,12,12,12);
			labelBg2.scale9Grid = rect;
			labelBg2.width = 205;
			labelBg2.height = 35;
			labelBg2.y = uniLib.Global.screenHeight - labelBg2.height;
			labelBg2.x = uniLib.Global.screenWidth / 6 +labelBg1.width + 100;
			this.addChild(labelBg2);

			var jifenLabel:egret.TextField = new egret.TextField();
			jifenLabel.text = "积分:";
			jifenLabel.x = labelBg2.x - jifenLabel.width - 20;
			jifenLabel.y = labelBg2.y;
			jifenLabel.size = 30;
			this.addChild(jifenLabel);

			this._setBtn = new GameButton(["btn_set_png", "btn_set_png"]);
			this._setBtn.y = 15;
			this._setBtn.touchEnabled = true;
			this.addChild(this._setBtn);
			this._setBtn.x = uniLib.Global.screenWidth - 80;

			this._setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);

			var label2:egret.TextField = new egret.TextField();
			label2.text = "设置";
			label2.size = 20;
			label2.x = this._setBtn.x + 5;
			label2.y = this._setBtn.y + this._setBtn.height;
			this.addChild(label2);



			this._listenPanel = new egret.Sprite;//uniLib.DisplayUtils.createMask(1,500,30,0xFFF000);
			this._listenPanel.x = (uniLib.Global.screenWidth - 1136) / 2 + 170;
			this._listenPanel.y = uniLib.Global.screenHeight - 199;
			GameInfo.topLayer.addChild(this._listenPanel);
			this._listenPanel.visible = false;
			var roomNumBg:egret.Bitmap = new egret.Bitmap(RES.getRes("bg_neikuang_2_png"));
			GameUtil.setSale9Grid(roomNumBg,[5,5,30,30],185,90);
			roomNumBg.y = 10;
			this.addChild(roomNumBg);
			var fanghaoLabel:egret.TextField = new egret.TextField();
			fanghaoLabel.text = "房号:";
			fanghaoLabel.x = 20;
			fanghaoLabel.y = 20;
			this.addChild(fanghaoLabel);

			var jushuLabel:egret.TextField = new egret.TextField();
			jushuLabel.text = "局数:";
			jushuLabel.x = 20;
			jushuLabel.y = fanghaoLabel.y + fanghaoLabel.height + 10;
			this.addChild(jushuLabel);
			this._roomIdTxf = ResUtil.createTextFeild(GameUtil.white, egret.HorizontalAlign.LEFT, "", 22, fanghaoLabel.x + fanghaoLabel.width + 10,fanghaoLabel.y + 5, 150);
			this.addChild(this._roomIdTxf);
			this._roomNumber = ResUtil.createTextFeild(GameUtil.white, egret.HorizontalAlign.LEFT, "未开局", 22,jushuLabel.x + jushuLabel.width + 10,jushuLabel.y +5, 150);
			this.addChild(this._roomNumber);

			this._restCardNum = ResUtil.createTextFeild(0xfff600, egret.HorizontalAlign.LEFT, "", 18);
			this._restCardNum.width=150;
			this._restCardNum.textAlign = egret.HorizontalAlign.CENTER;
			this._restCardNum.x = (uniLib.Global.screenWidth - this._restCardNum.width)>>1;
			this._restCardNum.y = (uniLib.Global.screenHeight)>>1;
			this.addChild(this._restCardNum);

			this._backBtn = new GameButton(["back1", "back2"]);
			this._backBtn.touchEnabled = true;
			this._backBtn.touchChildren = true;
			this._backBtn.x = (uniLib.Global.screenWidth - 1136) / 2 + 180;
			this._backBtn.y = uniLib.Global.screenHeight - 260;
			this._backBtn.visible = false;
			this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnTouch, this);
			this.addChild(this._backBtn);

			this._shareBtn = new GameButton(["invite1", "invite2"]);
			this._shareBtn.touchEnabled = true;
			this._shareBtn.touchChildren = true;
			this._shareBtn.x = (uniLib.Global.screenWidth - 1136) / 2 + 400;
			this._shareBtn.y = uniLib.Global.screenHeight - 260;
			this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
			this.addChild(this._shareBtn);
			this._shareBtn.visible = false;
			if (uniLib.Global.is_sandbox == 1) {
				this._shareBtn.visible = false;
			}

			this._dissBtn = new GameButton(["deskdismiss1", "deskdismiss1"]);
			this._dissBtn.touchEnabled = true;
			this._dissBtn.touchChildren = true;
			this._dissBtn.x = (uniLib.Global.screenWidth - 1136) / 2 + 750;
			this._dissBtn.y = uniLib.Global.screenHeight - 260;
			this._dissBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDissBtnTouch, this);
			this.addChild(this._dissBtn);
			this._dissBtn.visible = false;

			this._changeIcon = new GameButton(["change_btn2", "change_btn1"]);
			this._changeIcon.touchEnabled = true;
			this._changeIcon.x = uniLib.Global.screenWidth / 2  - this._changeIcon.width / 2 - 7;
			this._changeIcon.y = uniLib.Global.screenHeight - 105;
			this.addChild(this._changeIcon);
			this._changeIcon.visible = false;

			this._signal = ResUtil.createBitmapByName("");
			this._signal.x = uniLib.Global.screenWidth - 210;
			this._signal.y = uniLib.Global.screenHeight - 33;
			this.addChild(this._signal);

			this._signalTxt = ResUtil.createTextFeild(GameUtil.white, egret.HorizontalAlign.LEFT, "没信号", 13, uniLib.Global.screenWidth - 210,uniLib.Global.screenHeight - 33 , 100);
			this.addChild(this._signalTxt);
			this._signalTxt.visible = false;

			var bettery: egret.Bitmap = ResUtil.createBitmapByName("dianliang_bgkuang_png");
			bettery.x = uniLib.Global.screenWidth - 260;
			bettery.y = uniLib.Global.screenHeight - 33;
			this.addChild(bettery);

			this._betteryPercent = ResUtil.createBitmapByName("dianliang_jindu_png");
			this._betteryPercent.scale9Grid = new egret.Rectangle(1, 5, 0, 2);
			this._betteryPercent.x = uniLib.Global.screenWidth - 260;
			this._betteryPercent.y = uniLib.Global.screenHeight - 30;
			this._betteryPercent.width = 23;
			this.addChild(this._betteryPercent);

			this._timeTxt = ResUtil.createTextFeild(GameUtil.white, egret.HorizontalAlign.LEFT, "00:00", 30, uniLib.Global.screenWidth - 350, uniLib.Global.screenHeight-40, 100);
			this.addChild(this._timeTxt);

			var date: Date = new Date();
			var dateStr: string = (date.getUTCMonth() + 1) + "-" + this.setTimeFormat(date.getUTCDate());

			this._timeTxt.text = this.setTimeFormat(date.getHours()) + ":" + this.setTimeFormat(date.getMinutes());

			this._timer_1000 = new uniLib.TimerBase(10000, this.countSecond, this);
			this._timer_1000.start();

			uniLib.SoundMgr.instance.playBgMusic([SoundConsts.BG_MUSIC]);
			this._signalTxt.visible = false;
			this._signal.texture = RES.getRes("4G_png");

			this.updateJoinRoom();
			var vision: egret.TextField = ResUtil.createTextFeild(0x6da8c8, egret.HorizontalAlign.LEFT, "版本：", 18, uniLib.Global.screenWidth - 126, uniLib.Global.screenHeight - 20, 200);
			vision.text = uniLib.Global.version.toString();
			this.addChild(vision);

			uniLib.Global.addEventListener(uniLib.ZqEvent.NATIVE_TO_EGERET, this.onNativeMessage, this);
			this._sysMsgVc = new GameSysMsg();
			this._sysMsgVc.x = 179;
			this._sysMsgVc.y = 63;
			GameInfo.topLayer.addChild(this._sysMsgVc);
			this._helpBtn = new GameButton(["btn_help_png","btn_help_png"]);
			this._helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHelpBtnTouch,this);
			this._helpBtn.touchEnabled = true;
			this._helpBtn.y = 15;
			this._helpBtn.x = this._setBtn.x - 80;
			this.addChild(this._helpBtn);
			var label1:egret.TextField = new egret.TextField();
			label1.text = "帮助";
			label1.size = 20;
			label1.x = this._helpBtn.x + 5;
			label1.y = this._helpBtn.y + this._helpBtn.height;
			this.addChild(label1);

			var label3:egret.TextField = new egret.TextField();
			label3.text = "底牌";
			label3.x =  uniLib.Global.screenWidth/2 - label3.width/2;
			label3.y = 20;
			this.addChild(label3);


			var label4:egret.TextField = new egret.TextField();
			label4.text = "底分";
			label4.x = label3.x - 150;
			label4.y = 10;
			label4.size = 22;
			this.addChild(label4);

			var label5:egret.TextField = new egret.TextField();
			label5.text = "倍数";
			label5.x = label3.x + 150;
			label5.y = 10;
			label5.size = 22;
			this.addChild(label5);
			this._difen = GameUtil.createAlignBitmapText("gameNum_fnt","1",label4.x + 10,label4.y + 30,-1,egret.HorizontalAlign.CENTER);
			this.addChild(this._difen);
			this._beishu = GameUtil.createAlignBitmapText("gameNum_fnt","1",label5.x + 10,label5.y + 30,-1,egret.HorizontalAlign.CENTER);
			this.addChild(this._beishu);




			this._fapaiActionNode = new egret.DisplayObjectContainer();
			this.addChild(this._fapaiActionNode);
			this.blackCardPanel = new egret.Sprite();
			this.addChild(this.blackCardPanel);

			this.openCardPanel = new egret.Sprite();
			this.addChild(this.openCardPanel);

			this._dipaiNode = new egret.Sprite();
			this.addChild(this._dipaiNode);

			if (uniLib.Global.debugLevel >= 1) {
				this.showDebugButton();
			}

			// this.showDebugButton();
			this.showEnterButtons();
		}

		/**
		 *
		 * @param num 倍数
		 */
		public refreshBeishu(num:number = 1):void {
			this._beishu.text =  num + "";
		}

		public resetDiPaiNode():void {
			uniLib.DisplayUtils.removeAllChildren(this._dipaiNode);

		}



		/**发牌牌运动时间 */
		private continueTime: number = 100;
		/**发牌间隔时间 */
		private intervalTime: number = 100;
		/**显示发牌给自己的动画 */
		private showSendCardUser(): void {
			for (var i = 0; i < 17; i++) {
			    var card:egret.Bitmap = ResUtil.createBitmapByName("ant_card_1_png");
			    this._fapaiActionNode.addChild(card);
				card.scaleX = 0.8;
				card.scaleY = 0.8;
				card.anchorOffsetX = card.width / 2;
				card.anchorOffsetY = card.height / 2;
				card.x = uniLib.Global.screenWidth / 2;
				card.y = 200;
				egret.Tween.get(card).wait(i * this.intervalTime)
                    .to({ x: GameData._user_point[0], y: GameData._user_point[1] }, this.continueTime)
                    .call(this.removeCard, this, [card]);
			}
		}

		/**移除牌 */
		private removeCard(card:egret.Bitmap): void {
			if (card) {
				if (card.parent) {
					//移除发牌
					card.parent.removeChild(card);
					card = null;
				}
			}
		}
		/**显示发牌给左右两边客户的动画 */
		private showSendCardCustomer(): void {
			for (var i = 0; i < 17; i++) {
				var card:egret.Bitmap = ResUtil.createBitmapByName("ant_card_2_png");
				this._fapaiActionNode.addChild(card);
				card.scaleX = 0.8;
				card.scaleY = 0.8;
				card.anchorOffsetX = card.width / 2;
				card.anchorOffsetY = card.height / 2;
				card.x = uniLib.Global.screenWidth / 2;
				card.y = GameData._left_customer_point[1];
				egret.Tween.get(card).wait(i * this.intervalTime)
                    .to({ x: GameData._left_customer_point[0], y: GameData._left_customer_point[1] }, this.continueTime)
                    .call(this.removeCard, this, [card]).call(this.updateHandCardsNum,this,[i + 1]);
			}
			for (var i = 0; i < 17; i++) {
				var card:egret.Bitmap = ResUtil.createBitmapByName("ant_card_2_png");
				this._fapaiActionNode.addChild(card);
				card.scaleX = 0.8;
				card.scaleY = 0.8;
				card.anchorOffsetX = card.width / 2;
				card.anchorOffsetY = card.height / 2;
				card.x = uniLib.Global.screenWidth / 2;
				card.y = GameData._right_customer_point[1];
				egret.Tween.get(card).wait(i * this.intervalTime)
                    .to({ x: GameData._right_customer_point[0], y:GameData._right_customer_point[1] }, this.continueTime)
                    .call(this.removeCard, this, [card]);
			}
		}

		private updateHandCardsNum(num:number):void {
			
			var playerVc:SeatPlayerMJMediator = GameUtil.getViewByName(SeatPlayerMJMediator.NAME);
			playerVc.updateHandCardsNum(num);

		}


		/**
		 *
		 * @param num
		 * 低分
		 */
		public refreshDifen(num:number = 1):void {
			this._difen.text = num + "";
		}
		private onHostBtnTouch(e:egret.Event){
			this.dispatchEventWith(UIEventConsts.ACTION_HOST);
		}
		private onHelpBtnTouch(e:egret.Event){
			this.dispatchEventWith(UIEventConsts.SHOW_HELP);
		}
		public showDebugButton(){
			this.showGmPanel();

		}
		private onNativeMessage(evt: uniLib.ZqEvent) {
			if (evt.param.cmd == uniLib.ZQGameSdk.NETSTATE && evt.param.code == 0) {
				if (evt.param.data[uniLib.ZQGameSdk.NETSTATE] == uniLib.NetState.NO_SIGNAL)
					this._signalTxt.visible = true;
				else if (evt.param.data[uniLib.ZQGameSdk.NETSTATE] == uniLib.NetState.WIFI) {
					this._signalTxt.visible = false;
					this._signal.texture = RES.getRes("wifi");
				}
				else if (evt.param.data[uniLib.ZQGameSdk.NETSTATE] == uniLib.NetState.DATA_FLOWS) {
					this._signalTxt.visible = false;
					this._signal.texture = RES.getRes("data");
				}
				else if (evt.param.data[uniLib.ZQGameSdk.NETSTATE] == uniLib.NetState.WIFI_AND_DATA) {
					this._signalTxt.visible = false;
					this._signal.texture = RES.getRes("wifi");
				}
			}
			else if (evt.param.cmd == uniLib.ZQGameSdk.BATTERY && evt.param.code == 0) {
				this._betteryPercent.width = evt.param.data[uniLib.ZQGameSdk.BATTERY] / 100 * 23;
			}
		}
		private countSecond() {
			var date: Date = new Date();
			var dateStr: string = (date.getUTCMonth() + 1) + "-" + this.setTimeFormat(date.getUTCDate());
			// this._dateTxt.text = dateStr;
			this._timeTxt.text = this.setTimeFormat(date.getHours()) + ":" + this.setTimeFormat(date.getMinutes());

			uniLib.ZQGameSdk.getNetStateType();
			uniLib.ZQGameSdk.getBatteryPer();
		}

		private setTimeFormat(value: number) {
			var txt: string = "";
			if (value < 10) {
				txt = "0" + value;
			}
			else {
				txt = value + "";
			}
			return txt;
		}
		/**
		 * 显示 解散、返回、分享按钮
		 */
		private showEnterButtons() {
			if (!this._backBtn || !this._shareBtn || !this._dissBtn) return;
			if(PKGame.DataCache.platParam){
				let roomId:number = Number(PKGame.DataCache.platParam.roomId);
				if(roomId < 100000) return;
			}
			this._backBtn.visible = true;
			if (uniLib.Global.is_sandbox != 1) {
				this._shareBtn.visible = true;
			}
			if(uniLib.Global.is_sandbox == 1){
				this._helpBtn.visible = false;
			}
			this._dissBtn.visible = true;
		}
		/**收到服务器通知 显示提前开局按钮 */
		public ShowChangeIcon(){
			if(this._changeIcon){
				this._changeIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showChangeUserNumConfirm, this);
				this._changeIcon.visible = true;
			}
		}


		private onShareBtnTouch() {
			this.dispatchEventWith(UIEventConsts.SHARE_GAME);
		}
		private onBackBtnTouch() {
			this.dispatchEventWith(UIEventConsts.EXIT_GAME);
		}
		private onDissBtnTouch() {
			this.dispatchEventWith(UIEventConsts.DISMISS_GAME);
		}

		private gmTool() {
			this.dispatchEventWith(UIEventConsts.SHOW_GM_TOOL);
		}

		private onHostTouchHandler(evt: egret.TouchEvent): void {
			if (PKGame.RoomInfo.getInstance().host_mode) {
				PKGame.RoomInfo.getInstance().host_mode = 0;
				PKGame.GameInfo.manage.showMildWarnShow("取消托管");
			}
			else {
				PKGame.RoomInfo.getInstance().host_mode = 1;
				PKGame.GameInfo.manage.showMildWarnShow("托管");
			}
		}

		/**
		 * 请求更换房间人数
		 */
		private onChangeTouchHandler(evt: egret.Event){
			this.dispatchEventWith(UIEventConsts.REQUEST_CHANGE_USERNUM);
		}

		private showChangeUserNumConfirm():void{
			if(!PKGame.RoomInfo.getInstance().userList)
				return;
			if(PKGame.RoomInfo.getInstance().userList.length == 1){
				PublicManage.getInstance().showMildWarnShow("当前房间只有您自己，不可提前开局");
				return;
			}
			var msg:string = "是否将房间改为"+ PKGame.RoomInfo.getInstance().userList.length + "人模式，提前开局？";
			GameInfo.manage.showConfirmPanel(msg,["确定","取消"],[this.onChangeTouchHandler],null,this);
		}

		private onSet() {
			this.dispatchEventWith(UIEventConsts.SHOW_SETTING);
		}



		private _gmPanel:TestPanel;
		public showGmPanel(){
			if(!this._gmPanel){
				this._gmPanel = new TestPanel();
				this._gmPanel.addEventListener(UIEventConsts.REMOVE_GM_PANEL, this.removeGmPanel, this);
				GameInfo.topLayer.addChild(this._gmPanel);
			}
		}

		public removeGmPanel(){
			if(this._gmPanel){
				this._gmPanel.removeEventListener(UIEventConsts.REMOVE_GM_PANEL, this.removeGmPanel, this);
				this._gmPanel.destory();
			}
			uniLib.DisplayUtils.removeFromParent(this._gmPanel);
			this._gmPanel = null;
		}

		public showResult(res: any): void {
			egret.Tween.removeTweens(this);
			this.showResultPanel(res);
			// egret.Tween.get(this).wait().call(this.showResultPanel, this, [res]);
		}
		private showResultPanel(res: any): void {


			if(!this._resultPanel){
				this._resultPanel = new GameOverPanel();
				this._resultPanel.name = "result";
				this._resultPanel.x = (uniLib.Global.screenWidth - this._resultPanel.width) / 2;
				this._resultPanel.y = (uniLib.Global.screenHeight - this._resultPanel.height) / 2;
			}
			this._resultPanel.reset();
			GameInfo.topLayer.addChild(this._resultPanel);
		}
		private onShowGmPanel(evt: egret.Event){
			this.showGmPanel();
		}
		private onResultHandle(evt: egret.Event): void {
			this.dispatchEvent(evt);
		}
		public removeResultPanel(): void {
			if(this._resultPanel){
			    this._resultPanel.destory;
				uniLib.DisplayUtils.removeFromParent(this._resultPanel);
				this._resultPanel = null;
			}
		}
		public reset(): void {
			this._listenPanel.visible = false;
			egret.Tween.removeTweens(this._restCardNum);
			this._restCardNum.text = "";
			this.removeResultPanel();
		}
		/**
		 * 进房间刷新玩法
		 */
		public updateEnterRoom() {
			egret.Tween.removeTweens(this._enterTips);
			this._enterTips.text = "";

		}
		/**
		 * 开局
		 * 设置当前轮数
		 */
		public updateRound(): void {

			this._roomNumber.text = PKGame.RoomInfo.getInstance().curNumber + "/" + PKGame.RoomInfo.getInstance().totalNumber;

		}

		/**
		 * 开局
		 * 设置房间id
		 */
		public updateRoomId(): void {
			this._roomIdTxf.text = PKGame.DataCache.platParam.roomId;
		}
		/**
		 * 进入游戏时提醒玩家
		 */
		public updateJoinRoom(): void{
			this._enterTips = ResUtil.createTextFeild(0x6ba8c7, egret.HorizontalAlign.LEFT, "正在加载房间数据.", 18, 0, 0, 200);
			this._enterTips.x = (uniLib.Global.screenWidth - this._enterTips.width + 48) >> 1;
			this._enterTips.y = uniLib.Global.screenHeight - 300 * uniLib.ScreenUtils.scaleFactor;
			this.addChild(this._enterTips);
			egret.Tween.get(this._enterTips,{"loop":true}).to({"text":this._enterTips.text + "."},500).to({"text":this._enterTips.text + ".."},500).wait(500);
		}

		/**
		 * 处理网络问题
		 */
		public updateNetWork(ok: boolean){
			if(ok){
				if(this._restCardNum){
					this._restCardNum.text = "发牌中，请稍等.";
					egret.Tween.get(this._restCardNum,{"loop":true}).to({"text":this._restCardNum.text + "."},500).to({"text":this._restCardNum.text + ".."},500).wait(500);
				}
			}else{
				if(this._restCardNum){
					egret.Tween.removeTweens(this._restCardNum);
					this._restCardNum.text = "";
				}
			}
		}
		/**
		 * 播放底牌动画
		 */
		private blackCardPanel: egret.Sprite;                 //初始8张黑牌
		private openCardPanel:egret.Sprite;
		private cardMap:MySelfCard[] = [];                    //底牌
		private openCardMap:MySelfCard[] = [];
		private initPoint:egret.Point = new egret.Point(260,230);
		private endLoc: number[][] = [[540,230],[620,230],[700,230],[500,230],[580,230],[660,230],[740,230],[820,230]];
		public showBlackDiPai(){

			for(var i: number = 0;i <3;i++) {
				var card:MySelfCard = new MySelfCard();
				card.name = i.toString();
				card.x = this.initPoint.x;
				card.y = this.initPoint.y;
				card.scaleX = card.scaleY = 0.8;
				card.setBlackCard();
				this.blackCardPanel.addChild(card);
				this.cardMap.push(card);
				egret.Tween.get(card).wait(20 * (i)).call(this.moveStartHandler,this,[card]);
			}
		}

		public resetBlackAndOpenCards():void {
			this.cardMap = [];
			uniLib.DisplayUtils.removeAllChildren(this.blackCardPanel);
			this.openCardMap = [];
			uniLib.DisplayUtils.removeAllChildren(this.openCardPanel);
		}
		private moveStartHandler(param){
			var card:MySelfCard = <MySelfCard>param;
			egret.Tween.get(card).to({ x: this.endLoc[0][0],y: this.endLoc[0][1]},300,egret.Ease.sineIn).call(this.moveEndHandler,this,[card]);
		}
		private moveEndHandler(param){
			var card: MySelfCard = <MySelfCard>param;
			var index: number = Number(card.name);
			egret.Tween.get(card).to({ x: this.endLoc[index][0],y: this.endLoc[index][1]},300,egret.Ease.sineIn).call(this.tweenCompelete,this,[card]);
		}
		private tweenCompelete(param){
			egret.Tween.removeTweens(param);
		}

		/**收牌 */
		private count:number = 0;
		public collectCard(): void {
			var numbChild: number = 30;
			var toX: number = uniLib.Global.screenWidth / 2 - 200;
			var toY: number = 200;
			for (var i = 0; i < numbChild; i++) {
				var card:MySelfCard = new MySelfCard();
				card.name = i.toString();
				card.x = 300;
				card.y = 200;
				card.setBlackCard();
				card.scaleX = card.scaleY =  0.8;
				this.addChild(card);
				egret.Tween.get(card).to({ x: 300 + 20*i , y: toY }, 1000).call(this.countd, this,[card]);
			}
			//播放
		}

		private countd(card:MySelfCard): void {
			Tween.removeTweens(card);
			card.destory();
			this.count++;
			// console.log("" + this.count + "  -> " + this._all_card_root.numChildren);
			if (this.count == 30) {
				// 显示发牌动画给每一个玩家的
				this.count = 0;
				this.showSendCardUser();
				this.showSendCardCustomer();
				this.showSelfCards();
			}
		}

		//发自己的牌动画
		private showSelfCards():void {
			if (PKGame.RoomInfo.getInstance().diPaiArr.length) {
				RepManager.ins.EnterPokerCmd_C();
				return;
			}
			var cardVc:CardMJMediator = GameUtil.getViewByName(CardMJMediator.NAME);
			cardVc.startCards();
			
			if (!PKGame.CardInfo.getInstance().isSelMingPai && PKGame.RoomInfo.getInstance().isMingPlay) {
				
				if (PKGame.RoomInfo.getInstance().stakeUsers.length) {
				var operation:OperateMJMediator = GameUtil.getViewByName(OperateMJMediator.NAME);
				operation.showMingPaiBtn(2);
				}
				
			}
		}
		/**
		 * 打开底牌
		 */
		public openDiPai(){

			for(var i: number = 0;i <this.cardMap.length;i++) {
				var card:MySelfCard = this.cardMap[i];
				var tween = egret.Tween.get(card);
				tween.to({ scaleX: 0.01 }, 100).call(this.tweenComplete1, this,[card,i]);
			}
			// var self = this;
			// setTimeout(function() {
			// 	self.clearDiPai();
			// }, 2000);
		}


		private tweenComplete1(param: MySelfCard,index:number) {
			//清除黑牌
			if(!param) return;
			egret.Tween.removeTweens(param);
			DisplayUtils.removeFromParent(param);
			// this.blackCardPanel.removeChild(param);
			//生成对应牌点扑克 由0.01翻至1
			this.turnOverCardHandler(index);
			if (index == 0) {
				var seff = this;
				seff.clearDiPai();
			}
		}
		private movePorker: MySelfCard;                   //正在移动的牌
		private turnOverCardHandler(index:number) {
			var card:MySelfCard = new MySelfCard;
			card.setCard(PKGame.RoomInfo.getInstance().landownerCardSet[index]);
			card.scaleX = 0.01;
			card.name = String(index);
			if (this.endLoc[index][0]) {

				card.x = this.endLoc[index][0];
			}
			if (this.endLoc[index][1]) {

				card.y = this.endLoc[index][1];
			}
			this.openCardPanel.addChildAt(card,0);
			this.openCardMap.push(card);
			//明牌 由0.01翻至1
			var tween = egret.Tween.get(card);
			tween.to({ scaleX: 1 }, 100).wait(150).call(this.tweenCompelete, this,[card]);

		}

		public clearDiPai(){
			for(var i: number = 0;i <this.cardMap.length;i++) {
				var card:MySelfCard = this.cardMap[i];
				card.destory();
			}
			uniLib.DisplayUtils.removeAllChildren(this.blackCardPanel);
			this.cardMap = [];
			for(var i: number = 0;i <this.openCardMap.length;i++) {
				var card:MySelfCard = this.openCardMap[i];
				// var seatId:number = ddzGame.RoomInfo.getInstance().landOwnerSeatId;
				var point:egret.Point = new egret.Point(uniLib.Global.screenWidth/2,-100);
				egret.Tween.get(card).to({x:point.x,y:point.y,scaleX:0.01,scaleY:0.01},200).call(this.flyToLandOwer,this,[card]);
			}
			// this.openCardMap = [];
		}

		private count1:number = 0;
		private flyToLandOwer(){
			this.count1 ++;
			if (this.count1 == this.openCardMap.length) {
				uniLib.DisplayUtils.removeAllChildren(this._dipaiNode);
				this.count1 = 0;
				for(var i: number = 0;i <this.openCardMap.length;i++) {
					var card:MySelfCard = this.openCardMap[i];
					card.destory();
				}
				uniLib.DisplayUtils.removeAllChildren(this.openCardPanel);
				this.openCardMap = [];
				this.showDipaiView();
			}
		}
		//显示底牌
		public showDipaiView():void {

			uniLib.DisplayUtils.removeAllChildren(this._dipaiNode);
			for (var i:number = 0; i < PKGame.RoomInfo.getInstance().diPaiArr.length; i++) {
				var name:string = PKtable.PokerTableCard.resNormal(PKGame.RoomInfo.getInstance().diPaiArr[i]);
				var card:egret.Bitmap =ResUtil.createBitmapByName(name);
				card.scaleX = card.scaleY = 0.45;
				card.x = i * 55;
				this._dipaiNode.addChild(card);

			}
			GameUtil.setStageCenter(this._dipaiNode);
			this._dipaiNode.y = 0;
		}
		/**
		 * 隐藏邀请按钮等
		 */
		public disposeBtn() {
			if (this._shareBtn) {
				this._shareBtn.destory();
				ResUtil.removeFromParent(this._shareBtn);
				this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
			}
			this._shareBtn = null;
			if (this._backBtn) {
				this._backBtn.destory();
				ResUtil.removeFromParent(this._backBtn);
				this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnTouch, this);
			}
			this._backBtn = null;
			if (this._dissBtn) {
				this._dissBtn.destory();
				ResUtil.removeFromParent(this._dissBtn);
				this._dissBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDissBtnTouch, this);
			}
			this._dissBtn = null;
			if(this._changeIcon){
				this._changeIcon.destory();
				ResUtil.removeFromParent(this._changeIcon);
				this._changeIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showChangeUserNumConfirm, this);
			}
			this._changeIcon = null;
		}

		/**服务器发来停服公告 */
		public setStopService() {
			this.StopServiceInfo = new egret.Bitmap(RES.getRes("notice_serviceStop"));
			this.StopServiceInfo.touchEnabled = true;
			this.StopServiceInfo.x = (uniLib.Global.screenWidth) / 2 - 610;
			this.StopServiceInfo.y = uniLib.Global.screenHeight - 715;
			this.StopServiceInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showstopServicePanel, this);
			this.addChild(this.StopServiceInfo);

			this._notice = new egret.BitmapText();
			var bitmapFont:egret.BitmapFont = RES.getRes("notice_service_fnt");
			this._notice.font = bitmapFont;
			this._notice.x = (uniLib.Global.screenWidth) / 2 - 600;
			this._notice.y =uniLib.Global.screenHeight - 705;
			this.addChild(this._notice);
			this._notice.touchEnabled = true;
			this._notice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showstopServicePanel, this);


			this._countIndex = PKGame.RoomInfo.getInstance().leftTime;

			this.stopTimer();
			this._timer = new egret.Timer(1000);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.showLeftTime, this);
			this._timer.start();

		}
		private _countIndex = 0;
		/**停服倒计时 */
		private showLeftTime() {
			// var countSecond = ddzGame.RoomInfo.getInstance().leftTime;  //倒计时总时间
			this._countIndex--;
			if(this._countIndex <=0){
				this.stopTimer();
			}
			var time = this.formatSeconds(this._countIndex);
			//   console.info("time",time,"_countIndex",this._countIndex);

			this._notice.text = time;

		}

		private formatSeconds(value:number) {
			if(value<0)return;
			var theTime = value;// 秒
			var theTime1 = 0;// 分
			var theTime2 = 0;// 小时
			if (theTime > 60) {
				theTime1 = Math.floor(theTime / 60);
				theTime = Math.floor(theTime % 60);
				if (theTime1 > 60) {
					theTime2 = Math.floor(theTime1 / 60);
					theTime1 = Math.floor(theTime1 % 60);
				}
			}

			var result = " "+this.getzf((theTime).toString()) ;

			if (theTime1 >= 0) {
				result =""+this.getzf((theTime1).toString()) + result;

			}
			if (theTime2 >= 0) {
				result =  this.getzf((theTime2).toString())  + result;
			}
			return result;
		}

		private getzf(num:string) {

			if (parseInt(num) < 10&&parseInt(num)>0) {
				num = '0' + num;
			}
			else if(parseInt(num)==0){
				num = '00';
			}
			return num;
		}
		private stopTimer(): void {
			if (this._timer) {
				this._timer.stop();
				this._timer.removeEventListener(egret.TimerEvent.TIMER, this.showLeftTime, this);
				this._timer = null;
			}
		}
		private showstopServicePanel() {
			this.dispatchEventWith(UIEventConsts.SHOW_STOP_SERVICE);
		}
	}
}
