module PKGame {
	export class SettingPanel extends BasePanel {


		private _backBtn: GameButton;
		public constructor() {
			super(1);
		}
		public initPanel(): void {
			this.setSize(730, 587);
			var title: egret.Bitmap = ResUtil.createBitmapByName("label_set_png", 45, 15);
			this.addChild(title);
			this._backBtn = new GameButton(["btn_dissolve_1_png", "btn_dissolve_2_png"]);
			this._backBtn.touchEnabled = true;
			this._backBtn.touchChildren = true;
			this._backBtn.x = 240;
			this._backBtn.y = 490;
			this._backBtn.scaleX = this._backBtn.scaleY = 0.7;
			this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDismiss, this);
			this.addChild(this._backBtn);

		}

		public getSoundData(): Cmd.SetInfo {
			var data: Cmd.SetInfo = new Cmd.SetInfo;
			data.sound = uniLib.SoundMgr.instance.soundOpen;
			data.music = uniLib.SoundMgr.instance.musicOpen;
			data.control = PKGame.GameData.getInstance().audioPlayMode;
			if (PKGame.RoomInfo.getInstance().languageMode == "pu") {
				data.dialect = 1;
			}
			else {
				data.dialect = 2;
			}
			return data;
		}
		private onDismiss(evt: egret.TouchEvent): void {
			this.dispatchEventWith(UIEventConsts.DISMISS_GAME);
			this.destory();
		}

		public destory(): void {
			super.destory();
			if (this._backBtn) {
				this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDismiss, this);
				this._backBtn = null;
			}

			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);

		}
		private onClose(evt: egret.TouchEvent): void {
            this.dispatchEventWith(UIEventConsts.CLOSE);
        }


	}
}
