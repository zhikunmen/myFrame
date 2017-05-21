module PKGame {
	/**
	 * 快捷聊天 id：20-25
	 */
    export class ChatItem extends BaseVc {
        public constructor() {
            super();
        }
        private chatGroup: egret.Bitmap[];
        private chatCoverGroup: egret.Sprite[];
        public initUI(): void {
            this.chatGroup = [];
            this.chatCoverGroup = [];
            for (var i: number = 0; i < 6; i++) {
                this.creatChatItem(i);
            }
        }
        private creatChatItem(index: number) {
            var bg: egret.Bitmap = ResUtil.createBitmapByName("chat_select");
            bg.x = 420;
            bg.y = 61 + 56 * index;
            bg.width = 460;
            bg.height = 30;
            bg.visible = false;
            bg.name = "short_chatbg";
            this.addChild(bg);

            var chat: egret.TextField = ResUtil.createTextFeild(0x163b41, egret.HorizontalAlign.LEFT, "", 28, 420, 61 + 56 * index, bg.width);
            chat.text = (index + 1) + "." + PKGame.GameData.getInstance().ShortTalkArr[index];
            this.addChild(chat);
            var cover: egret.Sprite = uniLib.DisplayUtils.createMask(0, bg.width, bg.height, 0x0);
            cover.name = "short_" + index;
            cover.x = 420;
            cover.y = 56 * (index + 1);
            cover.touchEnabled = true;
            this.addChild(cover);
            this.chatGroup.push(bg);
            this.chatCoverGroup.push(cover);
            cover.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickBegin, this);
            cover.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            cover.addEventListener(egret.TouchEvent.TOUCH_END, this.onClickEnd, this);
            cover.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onClickEnd,this);
        }

        private onClick(e: egret.TouchEvent) {
            var name: string = "2" + e.target.name.charAt(6);
            this.dispatchEventWith(UIEventConsts.SEND_COMMON_CHAT, false, name);
        }

        private onClickBegin(e: egret.TouchEvent) {
            var index: number = Number(e.target.name.charAt(6));
            this.chatGroup[index].visible = true;
        }

        private onClickEnd(e: egret.TouchEvent) {
            var index: number = Number(e.target.name.charAt(6));
            this.chatGroup[index].visible = false;
        }

        public destory() {
            for (var i: number = 0; i < this.chatCoverGroup.length; i++) {
                var face = this.chatCoverGroup[i];
                face.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickBegin, this);
                face.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                face.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClickEnd, this);
                uniLib.DisplayUtils.removeAllChildren(face);
                uniLib.DisplayUtils.removeFromParent(face);
            }
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this.chatGroup = [];
            this.chatCoverGroup = [];
        }
    }
}