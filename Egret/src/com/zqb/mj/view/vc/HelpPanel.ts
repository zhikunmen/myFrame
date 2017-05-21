/**游戏ui模块 */
module PKGame {
    /**游戏帮助菜单 */
    export class HelpPanel extends BaseEui {
        private _close_btn: eui.Button;
        private _txt:egret.TextField;
        private contenNode:eui.Group;
        private _contextScrollView:egret.ScrollView;

        constructor() {
            super();
            this.skinName = "HelpSkin";
        }
        protected init(): void {
            super.init();


            var str:string = null;
            if(RES.hasRes("help_4085_txt")){
                str = RES.getRes("help_4085_txt");
            }else {
                return;
            }

            this._txt = new egret.TextField();
            this._txt.textFlow = (new egret.HtmlTextParser).parser(str)
            var contenNode:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
            contenNode.addChild(this._txt);
            this._contextScrollView = new egret.ScrollView();
            this._contextScrollView.width = 398.67;
            this._contextScrollView.height = 284;
            this._contextScrollView.bounces = false;
            this.contenNode.addChild(this._contextScrollView);
            this._contextScrollView.setContent(contenNode);
            this._contextScrollView.verticalScrollPolicy = "on";

        }

        /**隐藏帮助菜单 */
        private hide(): void {
            // this.visible = false;
            uniLib.PopUpMgr.removePopUp(this);
            this.dispatchEventWith(UIEventConsts.CLOSE);
        }

        /**添加监听事件 */
        protected addEvent(): void {
            super.addEvent();
            this._close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        }

        /**移除事件 */
        protected removeEvent(): void {
            super.removeEvent();
            this._close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);

        }

        public destory(): void {
            super.destroy();
            this._txt = null;
        }

    }
}