/**游戏ui模块 */
module PKGame {
    import Tween = egret.Tween;
    /**游戏胜利、失败菜单 */
    export class RoundResultSkin extends BaseEui {
        private _prepare_btn: eui.Button;
        private _data_list: eui.List;
        private _victory_image: eui.Image;
        private _victory__guang_image: eui.Image;
        private _failed_image: eui.Image;
        constructor() {
            super();
            this.skinName = "RoundResultSkin";
        }
        protected init(): void {
            super.init();
        }

        /**
         * 回调函数
         * 准备按钮
         */
        private prepare(): void {

            this.dispatchEventWith(UIEventConsts.READY);
        }

        public setData(): void {
            this.originzeRoundResultInfo();
            this.judgeVictoryOrFailed();

        }

        /**将玩家的头像url、昵称、分数变动整合好，用于胜利、失败面板的显示 */
        private originzeRoundResultInfo(): void {

            var roundResultData: Cmd.RewardObj[] = PKGame.RoomInfo.getInstance().chipsSets;
            var arr: eui.ArrayCollection = new eui.ArrayCollection();
            for (var i = 0, len = roundResultData.length; i < len; i++) {
                var itemData:any = roundResultData[i];
                var headUrl: string = itemData.headurl;
                var nickName: string = itemData.nickname;
                var scoreChanged: number = itemData.totalReward;
                var isOwner:number = itemData.isOwner;
                var isSelf:boolean = itemData.uid == PKGame.MyUserInfo.getInstance().userId;

                if (itemData.uid == PKGame.RoomInfo.getInstance().landownerId) {
                    var isKeng: boolean = true;
                }else {
                    var isKeng: boolean = false;
                }
                arr.addItem({ headUrl: headUrl, nickName: nickName, scoreChanged: scoreChanged, isKeng: isKeng ,isOwner,isSelf});
            }

            let data = arr;
            this._data_list.dataProvider = data;
            this._data_list.itemRenderer = RoundResultItem;
        }

        /**判断玩家胜利还是失败 */
        private judgeVictoryOrFailed(): void {

            var isWin:boolean = false;
            for (var i:number = 0; i < PKGame.RoomInfo.getInstance().chipsSets.length; i++) {
                var itemData:Cmd.RewardObj = PKGame.RoomInfo.getInstance().chipsSets[i];
                if (itemData.uid == PKGame.MyUserInfo.getInstance().userId && itemData.winType) {
                    isWin = true;
                }
            }
            if (isWin) {

                this._failed_image.visible = false;
                this._victory_image.visible = true;
                this._victory__guang_image.visible = true;
                egret.Tween.get(this._victory__guang_image, { loop: true }).to({ rotation: 360 }, 2000);
                //播放胜利
                uniLib.SoundMgr.instance.playSound("game_win_mp3");
            } else {
                this._failed_image.visible = true;
                this._victory_image.visible = false;
                this._victory__guang_image.visible = false;
                uniLib.SoundMgr.instance.playSound("game_lose_mp3");
            }
        }

        /**添加监听事件 */
        protected addEvent(): void {
            super.addEvent();
            this._prepare_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.prepare, this);
        }

        /**移除事件 */
        protected removeEvent(): void {
            super.removeEvent();
            this._prepare_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.prepare, this);
        }

        public destory(): void {
            super.destroy();
            Tween.removeTweens(this);
        }

    }
}