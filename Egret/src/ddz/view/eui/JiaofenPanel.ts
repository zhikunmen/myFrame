/**
 * Created by iluspan on 17/5/4.
 */

module PKGame {

    export class JiaofenPanel extends BaseEui {

        //不叫按钮
        private bujiaoButton:eui.Button;
        //一分按钮
        private jiaofen1Button:eui.Button;
        private jiaofen2Button:eui.Button;
        private jiaofen3Button:eui.Button;
        constructor() {
            super();
            this.skinName = "JiaofenPanel";
        }
    }
}
