module PKGame {
	export class ChowCardsPanel extends BaseVc {
		/**取消按钮 */
		private _cancleBtn: GameButton;
		/**吃牌集合 */
		private _chowCards: GroupCard[];
		/**初始操作排序位置 */
		private _defaultPoint: egret.Point;
		/**吃牌间隔 */
		private _stepX: number = -170;
		/**杠牌间隔 */
		private _stepKongX: number = - 200;
		private _bg: egret.Sprite;
		/**杠牌集合 */
		private _kongCards: GroupCard[];
		public constructor() {
			super();
		}
		public initUI(): void {
			if (!this._cancleBtn) {
				this._cancleBtn = new GameButton(["operate_cancel1", "operate_cancel2"], null, false);
			}
			this._defaultPoint = new egret.Point((uniLib.Global.screenWidth - 1136) / 2 + 866, uniLib.Global.screenHeight - 230);
		}
		/**多个吃牌选择面板 */
		public createChowPanel(): void {
			uniLib.DisplayUtils.removeAllChildren(this);
			this._chowCards = null;
			if (!this._cancleBtn) {
				this._cancleBtn = new GameButton(["operate_cancel1", "operate_cancel2"], null, false);
			}
			this._cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeChow, this);
			// this._chowCards = GroupCardsFactory.getInstance().getChowCards();
			this._cancleBtn.x = this._defaultPoint.x;
			this._cancleBtn.y = this._defaultPoint.y + 3;
			this.addChild(this._cancleBtn);
			this.sortChowCards();
		}
		/**根据吃牌数量进行排序 */
		private sortChowCards(): void {
			for (var i = 0; i < this._chowCards.length; i++) {
				this._bg = new egret.Sprite();
				this.addChild(this._bg);
				this._bg.x = this._defaultPoint.x + ((this._chowCards.length - i) * this._stepX);
				this._bg.y = this._defaultPoint.y + 15;
				let bgKuang = new egret.Bitmap();
				let eatIcon = new egret.Bitmap();
				if (i == 0) {
					eatIcon = ResUtil.createBitmapByName("eatIcon");
					eatIcon.x = -50;
					eatIcon.y = 18;
					bgKuang = ResUtil.createBitmapByName("eatCardKuang_bg1");
					bgKuang.scale9Grid = new egret.Rectangle(84, 15, 7, 96);
					eatIcon.visible = true;
				}
				else {
					bgKuang = ResUtil.createBitmapByName("eatCardKuang_bg2");
					bgKuang.scale9Grid = new egret.Rectangle(27, 13, 15, 96);
					eatIcon.visible = false;
				}
				bgKuang.width = 180;
				bgKuang.height = 108;
				this._chowCards[i].x = 25;
				this._chowCards[i].y = 22;
				this._chowCards[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectChowCards, this);
				this._chowCards[i].touchEnabled = true;
				this._bg.addChild(bgKuang);
				this._bg.addChild(this._chowCards[i]);
				this._bg.addChild(eatIcon);
			}
		}

		private selectChowCards(evt: egret.Event): void {
			//evt.target.data是每个牌组的信息，在创造的时候进行复制
			var eatString: string[] = evt.target.data.split(",");
			// ddzGame.CardInfo.getInstance().eatObj.one = Number(eatString[0]);
			// ddzGame.CardInfo.getInstance().eatObj.two = Number(eatString[1]);
			this.dispatchEventWith(UIEventConsts.ACTION_BEGIN_CHOW);
		}
		/**创建暗杠牌面板 */
		public createKongPanel(barArr: number[]): void {
			uniLib.DisplayUtils.removeAllChildren(this);
			this._kongCards = null;
			if (!this._cancleBtn) {
				this._cancleBtn = new GameButton(["operate_cancel1", "operate_cancel2"], null, false);
			}
			this._cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeChow, this);
			// this._kongCards = GroupCardsFactory.getInstance().getKongCards(barArr);
			this._cancleBtn.x = this._defaultPoint.x;
			this._cancleBtn.y = this._defaultPoint.y + 3;
			this.addChild(this._cancleBtn);
			this.sortKongCards();
		}

		/**根据杠牌数量进行排序 */
		private sortKongCards(): void {
			for (var i = 0; i < this._kongCards.length; i++) {
				this._bg = new egret.Sprite();
				this.addChild(this._bg);
				this._bg.x = this._defaultPoint.x + ((this._kongCards.length - i) * this._stepKongX);
				this._bg.y = this._defaultPoint.y + 15;
				let bgKuang = new egret.Bitmap();
				let kongIcon = new egret.Bitmap();
				if (i == 0) {
					kongIcon = ResUtil.createBitmapByName("kongIcon");
					kongIcon.x = -50;
					kongIcon.y = 18;
					bgKuang = ResUtil.createBitmapByName("eatCardKuang_bg1");
					bgKuang.scale9Grid = new egret.Rectangle(84, 15, 7, 96);
					bgKuang.visible = true;
				} else {
					bgKuang = ResUtil.createBitmapByName("eatCardKuang_bg2");
					bgKuang.scale9Grid = new egret.Rectangle(27, 13, 15, 96);
					kongIcon.visible = false;
				}
				bgKuang.width = 225;
				bgKuang.height = 108;
				this._kongCards[i].x = 25;
				this._kongCards[i].y = 22;
				this._kongCards[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectKongCards, this);
				this._kongCards[i].touchEnabled = true;
				this._bg.addChild(bgKuang);
				this._bg.addChild(this._kongCards[i]);
				this._bg.addChild(kongIcon);
			}
		}
		/**选择的杠牌ID */
		private selectKongCards(evt: egret.Event): void {
			PKGame.CardInfo.getInstance().kongThisId = evt.target.data;
			this.dispatchEventWith(UIEventConsts.ACTION_BEGIN_KONG);
		}
		public destory(): void {
			super.destory();
			if (this._chowCards && this._chowCards[0]) {
				for (var i = 0; i < this._chowCards.length; i++) {
					this._chowCards[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectChowCards, this);
					this._chowCards[i].destory();
				}
			}
			this._chowCards = null;
			if (this._kongCards && this._kongCards[0]) {
				for (var i = 0; i < this._kongCards.length; i++) {
					this._kongCards[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectKongCards, this);
					this._kongCards[i].destory();
				}
			}
			if (this._cancleBtn) {
				this._cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeChow, this);
				this._cancleBtn = null;
			}
			if (this._bg) {
				uniLib.DisplayUtils.removeAllChildren(this._bg);
				uniLib.DisplayUtils.removeFromParent(this._bg);
			}
			this._bg = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}

		private closeChow(): void {
			this.dispatchEventWith(UIEventConsts.ACTION_STOP_CHOW);
			this.destory();
			PopupManager.removePopUp(this);
		}
	}
}