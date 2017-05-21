/**游戏ui模块 */
module PKGame {
    import is = egret.is;
    /**游戏结束菜单 */
    export class GameOverPanel extends BaseEui {
        private _share_btn: eui.Button;
        private _one_more_btn: eui.Button;
        private _show_list: eui.List;
        private _show_lab: eui.Label;
        private _backBtn:eui.Button;
        private _dateLabel:eui.Label;
        constructor() {
            super();
            this.skinName = "GameOverSkin";
        }
        protected init(): void {
            super.init();
            this._show_list.itemRenderer = GameOverItem;
        }

        /**分享按钮回调 */
        private share(): void {
            //TODO分享
            var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            var tx:egret.Bitmap = new egret.Bitmap(uniLib.DisplayUtils.catchScreenToTex(this, new egret.Rectangle(0, 0, this.width, this.height),0.6));
            vo.shareImageData = uniLib.DisplayUtils.catchScreen(tx, new egret.Rectangle(0, 0, this.width, this.height));
            uniLib.ZQGameSdk.share(vo, null, null);
        }
        private dataArr: eui.ArrayCollection;
        
        /**刷新 */
        public reset(): void {
            //
            this._show_lab.text = "房间号：" + PKGame.RoomInfo.getInstance().roomId + " 对局数："
                + PKGame.RoomInfo.getInstance().curNumber + "/" +PKGame.RoomInfo.getInstance().totalNumber;
            this.dataArr = new eui.ArrayCollection();
            this._dateLabel.text = "";

            //对每个位置循环
            for (var i:number = 0; i < PKGame.RoomInfo.getInstance().recordInfo.length; i++) {
                var itemData:Cmd.UserRecord = PKGame.RoomInfo.getInstance().recordInfo[i];

                var dataArrData:any = {};
                //头像 uid headUrl*/
                dataArrData.pointArr = GameUtil.getFinalDetail(itemData.uid);
                dataArrData.uid = itemData.uid;
                dataArrData.headurl = itemData.headurl;
                dataArrData.nickName = itemData.nickname;
                dataArrData.total = itemData.totalScore;
                dataArrData.isWinner = itemData.isWinner;
                dataArrData.isOwner = itemData.isOwner;
                this.dataArr.addItem(dataArrData);
            }
            this._show_list.dataProvider = this.dataArr;
        }
        /**再来一局按钮回调 */
        private oneMoreAgain(): void {
            uniLib.PopUpMgr.removePopUp(this);
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_G2L,"game_request_continue");
        }

        /**添加监听事件 */
        protected addEvent(): void {
            super.addEvent();
            this._share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            this._one_more_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.oneMoreAgain, this);
            this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBackHandler,this);
        }

        private onBackHandler():void {
            var gameVc:any = GameUtil.getViewByName(PKMediator.NAME);
            gameVc.exitGame();
        }

        /**移除事件 */
        protected removeEvent(): void {

            super.removeEvent();
            this._share_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            this._one_more_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.oneMoreAgain, this);
            this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBackHandler,this);

        }

        public destory(): void {
            super.destroy();

            this._one_more_btn = null;
            this._share_btn = null;
            this._backBtn = null;
            this._dateLabel = null;
        }

    }
}