/**游戏ui模块 */
module PKGame {
    /**游戏结束列表单项 */
    export class GameOverItem extends eui.ItemRenderer {
        private _sub_list: eui.List;
        private _head_img: eui.Image;
        private _player_icon_frame: eui.Image;
        private _nike_name: eui.Label;
        private _uid: eui.Label;
        private _total_text: eui.Label;
        private _isWinner: eui.Image;
        private _datas: any;
        private _fangzhu:eui.Image;
        constructor() {
            super();
            this.skinName = "GameOverItemSkin"
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this._sub_list.itemRenderer = GameOverItemSub;
            // this._sub_list.itemRendererSkinName = "GameOverItemSubSkin";
        }
        private dataArr: eui.ArrayCollection;
        protected dataChanged(): void {
            super.dataChanged();
            if (this.data == null) {
                return;
            }
            this._datas = this.data;
            console.log("GameOverItemSkin->" + this._datas);
            this.dataArr = new eui.ArrayCollection();
            if (!this._datas.pointArr) {
                return;
            }
            for (var i = 0, len = this._datas.pointArr.length; i < len; i++) {
                this.dataArr.addItem(this._datas.pointArr[i]);
            }
            this._sub_list.dataProvider = this.dataArr;
            this._head_img.source = this._datas.headurl;
            this._nike_name.text = this._datas.nickName;
            this._isWinner.visible = this._datas.isWinner?true:false;
            this._fangzhu.visible = this._datas.isOwner ? true:false;
            this._uid.text = this._datas.uid + "";
            if (this._datas.total > 0) {
                this._total_text.text = "总成绩：+" + this._datas.total;
            } else {
                this._total_text.text = "总成绩：" + this._datas.total;
            }
            this.setPlayerIconMask();
        }

        /**将头像用特定形状的png图片进行遮罩 */
        private setPlayerIconMask(): void {
            let maskTexture: egret.Texture = RES.getRes("mask_head_png");
            let maskImg: egret.Bitmap = new egret.Bitmap();
            this.addChild(maskImg);
            maskImg.texture = maskTexture;
            let iconX = this._player_icon_frame.x;
            let iconY = this._player_icon_frame.y;
            let iconWidth = this._player_icon_frame.width;
            let iconHeight = this._player_icon_frame.height;
            let maskX = iconX + iconWidth / 2;
            let maskY = iconY + iconHeight / 2;
            maskImg.anchorOffsetX = maskImg.width / 2;
            maskImg.anchorOffsetY = maskImg.height / 2;
            maskImg.x = maskX;
            maskImg.y = maskY - 6;
            this._head_img.mask = maskImg;
        }
        /**添加监听事件 */
        private addEvent(): void {
        }

        /**移除事件 */
        private removeEvent(): void {
        }

        public destory(): void {

            this._datas = null;
            this._head_img = null;
            this._nike_name = null;
            this._player_icon_frame = null;
            this._sub_list = null;
            this._uid = null;
            this._total_text = null;
        }

    }
}