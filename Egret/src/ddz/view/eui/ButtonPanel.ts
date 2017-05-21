/**
 *
 */
module  PKGame {
    export class  ButtonPanel extends BaseEui {

        //不出按钮
        private _passButton:eui.Button;
        //提示按钮
        private _tipButton:eui.Button;
        //出牌按钮
        private _chupaiButton:eui.Button;


        constructor() {
            super();
            this.skinName = "ButtonPanel";
        }
    }
}
