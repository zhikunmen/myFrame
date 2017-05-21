// gm改牌
module PKGame {
    export class StopServicePanel extends BasePanel {
        public constructor() {
            super(2);

        }
        private kb: KeyBoard;
        private content: egret.Sprite;
        private noticeTxt: egret.TextField;

        public initPanel(): void {
            this.setSize(575, 360);
            this.content = new egret.Sprite();
            this.content.x = 60;
            this.content.y = 60;
            this.addChild(this.content);

            this.noticeTxt = new egret.TextField();
            this.noticeTxt.size = 28;
            this.noticeTxt.text = "      " + PKGame.RoomInfo.getInstance().notice;
            this.noticeTxt.width = 475;
            this.noticeTxt.height = 350;
            this.noticeTxt.textColor = 0x000000;
            this.content.addChild(this.noticeTxt);

        }

    }
}  
