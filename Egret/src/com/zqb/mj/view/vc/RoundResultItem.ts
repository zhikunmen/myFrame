/**游戏ui模块 */
module PKGame {
    /**游戏胜利、失败菜单 */
    export class RoundResultItem extends eui.ItemRenderer {
        private _player_icon: eui.Image;
        private _player_icon_frame: eui.Image;
        private _player_name: eui.Label;
        private _changed_score: eui.Label;
        private _is_keng: eui.Image;
        private _bg_image:eui.Image;
        private _bg_image1:eui.Image;

        constructor() {
            super();
            this.skinName = "RoundResultItemSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected dataChanged(): void {
            this._player_name.text = this.data.nickName;
            this._changed_score.text = this.data.scoreChanged;
            this._player_icon.source = this.data.headUrl;
            this.setPlayerIconMask();
            this._is_keng.visible = this.data.isKeng;
            if (this.data.isSelf) {
                this._bg_image.visible = false;
                this._bg_image1.visible = true;
            }else {

                this._bg_image.visible = true;
                this._bg_image1.visible = false;
            }

        }

        /**将头像用特定形状的png图片进行遮罩 */
        private setPlayerIconMask(): void {
            let maskTexture: egret.Texture = RES.getRes("mask_head_png");
            let maskImg: egret.Bitmap = new egret.Bitmap();
            this.addChild(maskImg);
            maskImg.texture = maskTexture;
            let iconX = this._player_icon_frame.x;
            let iconY = this._player_icon_frame.y;
            let iconWidth = this._player_icon_frame.width * 0.7;
            let iconHeight = this._player_icon_frame.height * 0.7;
            let maskX = iconX + iconWidth / 2;
            let maskY = iconY + iconHeight / 2;
            maskImg.anchorOffsetX = maskImg.width / 2;
            maskImg.anchorOffsetY = maskImg.height / 2;
            maskImg.x = maskX;
            maskImg.y = maskY - 6;
            this._player_icon.mask = maskImg;
        }

        /**添加监听事件 */
        private addEvent(): void {
        }

        /**移除事件 */
        private removeEvent(): void {
        }

        public destory(): void {
        }

    }
}