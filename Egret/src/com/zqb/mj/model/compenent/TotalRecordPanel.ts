module PKGame {
	export class TotalRecordPanel extends BaseVc {
		private _shareBtn: GameButton;
		private _contentMc: egret.DisplayObjectContainer;
		private _backBtn: GameButton;
		private _againBtn:GameButton;//再来一局
		public constructor() {
			super();
		}
		public initUI(): void {
			var bg: egret.Bitmap = ResUtil.createBitmapByName("total_bg");
			bg.height = DataCache.defaultHeight;//* uniLib.ScreenUtils.scaleFactor;
			bg.width = DataCache.defaultWidth;
			this.addChild(bg);
			//牌局结束
			var titleBg: egret.Bitmap = ResUtil.createBitmapByName("total_title", 0, 15);
			titleBg.x = (bg.width - titleBg.width) >> 1;
			this.addChild(titleBg);
			//结果背景
			var resultBg: egret.Bitmap = ResUtil.createBitmapByName("userInfo_bg");
			resultBg.scale9Grid = new egret.Rectangle(200, 100, 16, 21);
			resultBg.width = 1274;
			resultBg.height = 609;
			resultBg.x = 2;
			resultBg.y = 105;
			this.addChild(resultBg);
			var info: egret.TextField = ResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.LEFT, DataCache.langObj.uiTxt.TotalRecordPanel.info
				, 18, 480, ResUtil.changeYAxis(585), 500);
			this.addChild(info);
			this._shareBtn = new GameButton(["total_share1", "total_share2"]);
			this._shareBtn.x = (uniLib.Global.screenWidth - 1136) + 1035;
			this._shareBtn.y = 5;
			this.addChild(this._shareBtn);
			this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
			if (uniLib.Global.is_sandbox != 0) {
				this._shareBtn.visible = false;
			}
			this._contentMc = new egret.DisplayObjectContainer();
			this._contentMc.x = 22;
			this._contentMc.y = 180;
			this.addChild(this._contentMc);
			this._backBtn = new GameButton(["exit", "exit"]);
			this._backBtn.x = 5;
			this._backBtn.y = 5;
			this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
			this.addChild(this._backBtn);

			this._againBtn = new GameButton(["total_again1", "total_again2"]);
			this._againBtn.x = (uniLib.Global.screenWidth - 1136) + 885;
			this._againBtn.y = 5;
			this._againBtn.visible = false;
			this.addChild(this._againBtn);
			this._againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgain, this);

			var roomInfo: egret.TextField = ResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.LEFT, "", 18, 40, 138, 300);
			if (PKGame.DataCache.platParam) {
				roomInfo.text = "房号: " + PKGame.DataCache.platParam.roomId + "   " + PKGame.RoomInfo.getInstance().totalNumber + "局";
			}
			else {
				roomInfo.text = "房号: 13058091314" + "   " + "16局";
			}
			this.addChild(roomInfo);

			var roomTitle: egret.TextField = ResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.LEFT, "", 18, (uniLib.Global.screenWidth - 1136) / 2 + 500, 138, 200);
			roomTitle.text = RoomInfo.getInstance().getPlayType();
			if(uniLib.Global.is_sandbox == 1){
				roomTitle.text = "";
			}
			this.addChild(roomTitle);

			var roomTime: egret.TextField = ResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.LEFT, "", 18, (uniLib.Global.screenWidth - 1136) + 900, 138, 200);
			var date: Date = new Date();
			var dateStr: string = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
			roomTime.text = dateStr + "  " + this.setTimeFormat(date.getHours()) + ":" + this.setTimeFormat(date.getMinutes()) + ":" + this.setTimeFormat(date.getSeconds());
			this.addChild(roomTime);
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
		private onBack(evt: egret.TouchEvent): void {
			// this.dispatchEventWith(UIEventConsts.EXIT_GAME);
			var gameVc:any = GameUtil.getViewByName(PKMediator.NAME);
			gameVc.exitGame();
		}
		/**再来一局 */
		private onAgain(evt: egret.TouchEvent):void{
			this.dispatchEventWith(UIEventConsts.EXIT_GAME);
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_G2L,"game_request_continue");		
		}
		public setData(arr: Array<Cmd.UserRecord>): void {
			this.removeAll();
			if (!arr) {
				return;
			}
			var len: number = arr.length;
			var item: TotalItem;
			let codeUrl: HeadMc;
			switch (arr.length) {
				case 2:
					codeUrl = new HeadMc(320, 320);
					for (var i = 0; i < len; i++) {
						item = new TotalItem();
						item.setData(arr[i]);
						item.x = 120 + 680 * i;
						this._contentMc.addChild(item);
					}
					codeUrl.x = 450;
					codeUrl.y = 64;
					break;
				case 3:
					codeUrl = new HeadMc(270, 270);
					for (var i = 0; i < 3; i++) {
						item = new TotalItem();
						item.setData(arr[i]);
						item.x = 8 + 306 * i;
						this._contentMc.addChild(item);
					}
					codeUrl.x = 308 * 3 + 20;
					codeUrl.y = 100;
					break;
				case 4://四人暂不需要二维码
					// codeUrl = new HeadMc(250, 250);
					for (var i = 0; i < len; i++) {
						item = new TotalItem();
						item.setData(arr[i]);
						item.x = 8 + 306 * i;
						this._contentMc.addChild(item);
					}
					break;
			}

			if (PKGame.DataCache.platParam.shareInfo && PKGame.DataCache.platParam.shareInfo.codeUrl) {
				if(codeUrl){
					codeUrl.headUrl = PKGame.DataCache.platParam.shareInfo.codeUrl;
					this._contentMc.addChild(codeUrl);
				}
			}
			else {
				if(codeUrl){
					uniLib.DisplayUtils.removeFromParent(codeUrl);
				}
			}

		}
		private removeAll(): void {
			var len: number = this._contentMc.numChildren;
			var item: TotalItem;
	        while(this._contentMc.numChildren>0){
				item=this._contentMc.removeChildAt(0) as TotalItem;
				item.destory();
				item=null;
			}
		}
		//截图分享
		private onShare(evt: egret.TouchEvent): void {
			/*******************增加扫码下载************** 
			var shareImage:egret.DisplayObjectContainer=new egret.DisplayObjectContainer();
			var recordImage:egret.Bitmap=new egret.Bitmap();
			recordImage.texture=uniLib.DisplayUtils.catchScreenToTex(this,new egret.Rectangle(0,0,this.width,this.height));
			shareImage.addChild(recordImage);
			var qrcode:egret.Bitmap=ResUtil.createBitmapByName("mjl_url_png",942,4);
			shareImage.addChild(qrcode);
			var downTxt:egret.TextField=ResUtil.createTextFeild(0xffffff,egret.HorizontalAlign.RIGHT,"扫码下载",18,822,40,104);
			shareImage.addChild(downTxt);*/
			var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
			vo.shareWay = 0;
			var tx:egret.Bitmap = new egret.Bitmap(uniLib.DisplayUtils.catchScreenToTex(this, new egret.Rectangle(0, 0, this.width, this.height),0.6));
			vo.shareImageData = uniLib.DisplayUtils.catchScreen(tx, new egret.Rectangle(0, 0, this.width, this.height));
			uniLib.ZQGameSdk.share(vo, null, null);
		}
		public destory(): void {
			super.destory();
			this.removeAll();
			if (this._shareBtn) {
				this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
				this._shareBtn.destory();
				this._shareBtn = null;
			}
			if (this._backBtn) {
				this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
				this._backBtn.destory();
				this._backBtn = null;
			}
			if (this._againBtn) {
				this._againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgain, this);
				this._againBtn.destory();
				this._againBtn = null;
			}
			if (this._contentMc) {
				uniLib.DisplayUtils.removeAllChildren(this._contentMc);
				uniLib.DisplayUtils.removeFromParent(this._contentMc);
			}
			this._contentMc = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}

	}
	export class TotalItem extends BaseVc {
		private _headMc: HeadMc;
		private _hostIcon: egret.Bitmap;
		private _nameTxt: egret.TextField;
		private _idTxt: egret.TextField;
		private _dataTxt5: egret.TextField;
		private _total: NumBitmapFormat;
		private _winIcon: egret.Bitmap;
		private _contextScrollView:egret.ScrollView;
		private _textContainer:egret.DisplayObjectContainer;

		private _count:number;
		public constructor() {
			super();
		}
		public initUI(): void {
			var bg: egret.Bitmap = ResUtil.createBitmapByName("total_contentbg");
			this.addChild(bg);
			bg.width = 300;
			bg.height = 465;
			this._headMc = new HeadMc(93, 83);
			this._headMc.x = 10;
			this._headMc.y = 5;
			this.addChild(this._headMc);
			this._hostIcon = ResUtil.createBitmapByName("total_host", 10, 10);
			this.addChild(this._hostIcon);
			this._nameTxt = ResUtil.createTextFeild(0x1e454a, egret.HorizontalAlign.LEFT, "", 25, 135, 31, 180);
			this.addChild(this._nameTxt);
			this._idTxt = ResUtil.createTextFeild(0x376b88, egret.HorizontalAlign.LEFT, "", 22, 135, 69, 130);
			this.addChild(this._idTxt);
			this._textContainer = new egret.DisplayObjectContainer();
			this._contextScrollView = new egret.ScrollView();
			this._contextScrollView.width = 200;
			this._contextScrollView.height = 200;
			this._contextScrollView.x = 62;
			this._contextScrollView.y = 156;
			this._contextScrollView.verticalScrollPolicy = "on";
			this._contextScrollView.bounces = false;
			this.addChild(this._contextScrollView);
			this._contextScrollView.setContent(this._textContainer);
			var label: egret.TextField;
			label = ResUtil.createTextFeild(0xffffff, egret.HorizontalAlign.LEFT, "总成绩", 22, 62, 380, 72);
			this.addChild(label);
			this._winIcon = ResUtil.createBitmapByName("total_winner", 260, -14);
			this.addChild(this._winIcon);
			this._winIcon.visible = false;
		}
		public setData(vo: Cmd.UserRecord = null): void {
			this._nameTxt.text = vo.nickname;
			this._idTxt.text = vo.uid.toString();
			this._hostIcon.visible = vo.isWinner == 1?true:false;               //是否房主
			this._headMc.headUrl = vo.headurl;
			this._count = 4;
			var arr:any = GameUtil.getFinalDetail(vo.uid);

			for (var i:number = 0; i < arr.length; i++) {
				var label:egret.TextField = ResUtil.createTextFeild(GameUtil.white,egret.HorizontalAlign.RIGHT,"0",22,20,38 * i);
				var points = arr[i]["integral"] > 0 ? "+" + arr[i]["integral"]:arr[i]["integral"];
				label.text = GameUtil.juNumArr[i] + "      " + points;
				this._textContainer.addChild(label);
			}
			if (vo.tip != undefined && (vo.tip) != 0) {
				this["_dataTxt" + 5] = ResUtil.createTextFeild(0xffffff, egret.HorizontalAlign.CENTER, "0", 18, 169, 140 + 37 * this._count, 58);
				this.addChild(this["_dataTxt" + 5]);
				this._dataTxt5.text = vo.tip.toString();
				var label: egret.TextField;
				label = ResUtil.createTextFeild(0xffffff, egret.HorizontalAlign.LEFT, "房主小费", 18, 62, 140 + 37 * this._count, 107);
				label.name = "label" + 5;
				this.addChild(label);
			}

			var point: ui.AlignBitmapText;
			if (vo.totalScore >= 0) {
				point = this.createAlignBitmapText("win_fnt", "+0", 140, 370, 175, egret.HorizontalAlign.LEFT);
				point.text = "+" + vo.totalScore.toString();
			}
			else {
				point = this.createAlignBitmapText("lose_fnt", "", 140, 370, 175, egret.HorizontalAlign.LEFT);
				point.text = vo.totalScore.toString();
			}
			this.addChild(point);
			if (vo.isWinner) {
				this._winIcon.visible = true;
			}
		}
		private createAlignBitmapText(fontName: string, text: string, x: number = 0, y: number = 0, width: number = -1, hAlign: string = "left"): ui.AlignBitmapText {
			var tf: ui.AlignBitmapText = new ui.AlignBitmapText();
			if (width != -1) {
				tf.width = width;
			}
			tf.font = RES.getRes(fontName);
			tf.text = text;
			tf.x = x;
			tf.y = y;
			tf.hAlign = hAlign;
			return tf;
		}
		public destory() {
			if (this._headMc) {
				this._headMc.destory();
			}
			this._headMc = null;
			if (this._total) {
				this._total.destory();
			}
			this._total = null;
			this._hostIcon = null;
			this._winIcon = null;
			this._nameTxt = null;
			this._idTxt = null;
			this._dataTxt5 = null;
			this._contextScrollView = null;
			this._textContainer = null;
		}
	}
}