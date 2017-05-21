/**游戏ui模块 */
module PKGame {
    /**游戏结束列表单项子项 */
    export class GameOverItemSub extends eui.ItemRenderer {
        private _round_num: eui.Label;
        private _point: eui.Label;
        private _datas: any;
        constructor() {
            super();
            this.skinName = "GameOverItemSubSkin"
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected dataChanged(): void {
            super.dataChanged();
            if (this.data == null) {
                return;
            }
            this._datas = this.data;
            console.log("GameOverItemSubSkin->" + this._datas);
            if (!this._datas.point) {
                return;
            }
            this._round_num.text = this._datas.roundNum;
            if (this._datas.point > 0) {
                this._point.text = "+" + this._datas.point;
            } else {
                this._point.text = "" + this._datas.point;
            }
        }

        /**添加监听事件 */
        private addEvent(): void {
        }

        /**移除事件 */
        private removeEvent(): void {
        }

        public destory(): void {
            this._round_num = null;
            this._datas = null;
            this._point = null;
        }

    }
}