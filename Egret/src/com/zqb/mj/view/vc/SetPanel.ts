/**游戏ui模块 */
module PKGame {
    /**游戏设置菜单 */
    export class SetPanel extends BaseEui {
        private _close_btn: eui.Button;
        private _dismiss_room_btn: eui.Button;
        private _music_on_btn: eui.Button;
        private _music_off_btn: eui.Button;
        private _effect_on_btn: eui.Button;
        private _effect_off_btn: eui.Button;
        private _voice_on_btn: eui.Button;
        private _voice_off_btn: eui.Button;

        constructor() {
            super();
            this.skinName = "SetSkin";
        }
        protected init(): void {
            super.init();
            this._music_on_btn.visible = uniLib.SoundMgr.instance.musicOpen;
            this._music_off_btn.visible = !uniLib.SoundMgr.instance.musicOpen;
            this._effect_on_btn.visible = uniLib.SoundMgr.instance.soundOpen;
            this._effect_off_btn.visible = !uniLib.SoundMgr.instance.soundOpen;
        }

        /**显示设置菜单 */
        private show(): void {
            this.visible = true;
        }

        /**隐藏设置菜单 */
        private onClose(evt: egret.TouchEvent): void {
            this.dispatchEventWith(UIEventConsts.CLOSE);
        }
        /**解散房间按钮回调函数 */
        private dismissRoom(): void {
            this.dispatchEventWith(UIEventConsts.DISMISS_GAME);
            this.destory();
        }

        /**关闭音乐， */
        private offMusic(): void {
            if (this._music_on_btn.visible) {
                this._music_on_btn.visible = false;
                this._music_off_btn.visible = true;
            }
            console.log("关闭音乐， 关闭音乐， 关闭音乐");
            uniLib.SoundMgr.instance.musicOpen = false;
            uniLib.SoundMgr.instance.stopBgMusic();

        }
        /**打开音乐， */
        private onMusic(): void {
            if (this._music_off_btn.visible) {
                this._music_on_btn.visible = true;
                this._music_off_btn.visible = false;
            }
            console.log("打开音乐， 打开音乐， 打开音乐");
            uniLib.SoundMgr.instance.musicOpen = true;
        }
        /**关闭音效 */
        private offEffect(): void {
            if (this._effect_on_btn.visible) {
                this._effect_on_btn.visible = false;
                this._effect_off_btn.visible = true;
            }
            uniLib.SoundMgr.instance.soundOpen = false;
        }
        /**打开音效， */
        private onEffect(): void {
            if (this._effect_off_btn.visible) {
                this._effect_on_btn.visible = true;
                this._effect_off_btn.visible = false;
            }

            uniLib.SoundMgr.instance.soundOpen = true;
        }
        /**打开语音 */
        private turnOnVoice(): void {
            if (this._voice_on_btn.visible) {
                this._voice_on_btn.visible = false;
                this._voice_off_btn.visible = true;
            }
            //  uniLib.SoundMgr.instance. = true;
        }
        /**关闭语音 */
        private turnOffVoice(): void {
            if (this._voice_off_btn.visible) {
                this._voice_on_btn.visible = true;
                this._voice_off_btn.visible = false;
            }
        }

        /**添加监听事件 */
        protected addEvent(): void {
            super.addEvent();
            this._close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this._music_on_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.offMusic, this);
            this._music_off_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onMusic, this);
            this._effect_on_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.offEffect, this);
            this._effect_off_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onEffect, this);
            this._voice_on_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.turnOnVoice, this);
            this._voice_off_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.turnOffVoice, this);
            this._dismiss_room_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.dismissRoom, this);
        }

        /**移除事件 */
        protected removeEvent(): void {
            super.removeEvent();
            this._close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this._music_on_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.offMusic, this);
            this._music_off_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMusic, this);
            this._effect_on_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.offEffect, this);
            this._effect_off_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEffect, this);
            this._voice_on_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.turnOnVoice, this);
            this._voice_off_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.turnOffVoice, this);
            this._dismiss_room_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.dismissRoom, this);
        }

        public destory(): void {
            super.destroy();
            uniLib.DisplayUtils.removeFromParent(this);
        }

    }
}