module PKGame {
	/**
	 * 动画 聊天
	 */
    export class RoomFacePanel extends BaseVc {
        public constructor() {
            super();
        }
        private _root: egret.Bitmap;
        private _content: egret.Sprite;
        private btnGroup: PKGame.ToggleButton[];
        private _faceItem: FaceItem;
        private _chatItem: ChatItem;
        private _recordItem: RecordItem;
        // private inputTxt:egret.TextField;
        private sendBtn: GameButton;
        private textField: egret.TextField;
        private _yetOpen: egret.TextField;
        public initUI(): void {
            this.touchEnabled = false;
            var bg = ResUtil.createBitmapByName("chat_map", 0, 0);
            // bg.scale9Grid=new egret.Rectangle(20,20,20,100);
            // bg.width = 366;
            // bg.height = 370;
            bg.touchEnabled = true;
            bg.name = "short_map";
            this.addChild(bg);
            this.y = uniLib.Global.screenHeight / 2 - bg.height / 2;
            var closeBtn: GameButton = new GameButton(["userInfo_close1", "userInfo_close2"], "", false);
            closeBtn.x = bg.width - 51;
            closeBtn.y = -10;
            closeBtn.addClickArea(20);
            closeBtn.touchEnabled = true;
            closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.addChild(closeBtn);
            this._content = new egret.Sprite;
            this._content.name = "short_content";
            this.addChild(this._content);

            this.btnGroup = [];
            // this.createBarBtn("face_btn1", "face_btn2", "short_face", false, 313, 53);
            this.createBarBtn("chat_btn1", "chat_btn2", "short_chat", true, 420, 20);
            this.createBarBtn("record_btn1", "record_btn2", "short_record", false, 651, 20);
            this.showFacePanel();
            this.shortChatPanel();
            this.showRecordPanel();
            this._chatItem.visible = true;

            this.textField = new egret.TextField();
            this.textField.name = "short_input";
            this.textField.width = 300;
            this.textField.textAlign = egret.VerticalAlign.MIDDLE;
            this.textField.textColor = 0xffffff;
            this.textField.size = 28;
            this.textField.type = egret.TextFieldType.INPUT;
            this.textField.height = 30;
            this.textField.x = 415;
            this.textField.y = 474;
            this.textField.text = "请输入聊天内容";
            this.touchEnabled = true;
            this.addChild(this.textField);
            this.textField.addEventListener(egret.FocusEvent.FOCUS_IN, this.onTextFieldFocusIn, this);
            this.textField.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);

            // this.sendBtn = ResUtil.createBitmapByName("send_btn1");
            this.sendBtn = new GameButton(["send_btn2", "send_btn1"], "", false);
            this.sendBtn.name = "short_send";
            this.sendBtn.x = 758;
            this.sendBtn.y = 458;
            this.sendBtn.touchEnabled = true;
            this.addChild(this.sendBtn);
            this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }
        private onTouchTap(e: egret.TouchEvent) {
            if (e.target == this.textField) {
                e.target.setFocus();
            }
        }
        private sendClickHandler(e: egret.TouchEvent) {
            var content: string = this.textField.text;
            if (content.indexOf("请输入聊天内容") != -1) {
                this.textField.text = "";
                return;
            }
            this.dispatchEventWith(UIEventConsts.SEND_COMMON_TALK, false, content);
            this.textField.text = "";
        }
        private onTextFieldFocusIn(event: egret.FocusEvent): void {
            event.target.setFocus();
            if (this.textField.text.indexOf("请输入聊天内容") != -1) {
                this.textField.text = "";
            }
        }

        private onTextFieldFocusOut(event: egret.FocusEvent): void {
            if (this.textField.text == "") {
                this.textField.text = "请输入聊天内容";
            }
        }
        private btnClickHandler(e: egret.TouchEvent) {
            var name: string = e.currentTarget.name;
            switch (name) {
                // case "short_face":
                //     this.clear();
                //     this.initBarStatus();
                //     this.btnGroup[0].select = true;
                //     this._faceItem.visible = true;
                //     break;
                case "short_chat":
                    // this.clear();
                    this.initBarStatus();
                    this.btnGroup[0].select = true;
                    this._chatItem.visible = true;
                    if(this._yetOpen){
                        this._yetOpen.visible = false;
                    }
                    break;
                  case "short_record":
                   this.initBarStatus();
                   this.btnGroup[1].select = true;
                   this._chatItem.visible = false;
                   this.createRecordYetOpen();
                //    this._recordItem.visible = true;
                //    this.dispatchEventWith(UIEventConsts.SEND_CHAT_RECORD);
                  break;
            }
        }

        /**点击聊天记录 显示暂未开放 */
        private createRecordYetOpen(){
            if(!this._yetOpen){
                this._yetOpen = ResUtil.createTextFeild(0x163b41,egret.HorizontalAlign.CENTER,"此功能暂未开放",30);
                this.addChild(this._yetOpen);
                this._yetOpen.x = 540;
                this._yetOpen.y = 280;
            }
            this._yetOpen.visible = true;
        }

        /**
         * 创建导航按钮
         */
        private createBarBtn(res1: string, res2: string, name: string, isSelect: Boolean, x: number, y: number) {
            var btn: PKGame.ToggleButton = new PKGame.ToggleButton(res1, res2, "", name);
            btn.select = isSelect;
            btn.x = x;
            btn.y = y;
            this.addChild(btn);
            this.btnGroup.push(btn);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        }
        private initBarStatus() {
            for (var i = 0; i < this.btnGroup.length; i++) {
                var btn: PKGame.ToggleButton = this.btnGroup[i];
                btn.select = false;
            }
        }

        private showFacePanel() {
            if (!this._faceItem) {
                this._faceItem = new FaceItem;
                this._faceItem.x = 15;
                this._faceItem.y = 35;
                this._content.addChild(this._faceItem);
            }
            this._faceItem.visible = true;
        }


        private shortChatPanel() {
            if (!this._chatItem) {
                this._chatItem = new ChatItem;
                this._chatItem.x = 15;
                this._chatItem.y = 55;
                this._content.addChild(this._chatItem);
            }
            this._chatItem.visible = false;
        }

        private showRecordPanel() {
            if (!this._recordItem) {
                this._recordItem = new RecordItem;
                this._recordItem.x = 15;
                this._recordItem.y = 45;
                this._content.addChild(this._recordItem);
            }
            this._recordItem.visible = false;
        }

        public setRecordData(rev: Cmd.VoiceChatRecord_S) {
            if (this._recordItem) {
                this._recordItem.initData(rev.records);
            }
        }

        private clear() {
            this._faceItem.visible = false;
            this._chatItem.visible = false;
            this._recordItem.visible = false;
        }
        public destory(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            for (var i: number = 0; i < this.btnGroup.length; i++) {
                var btn: PKGame.ToggleButton = this.btnGroup[i];
                btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
            }
            this.btnGroup = null;
            if (this.textField) {
                this.textField.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onTextFieldFocusIn, this);
                this.textField.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
            }
            this.textField = null;
            if (this.sendBtn) {
                this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
            }
            this.sendBtn = null;
            if (this._faceItem) {
                this._faceItem.destory();
            }
            this._faceItem = null;
            if (this._chatItem) {
                this._chatItem.destory();
            }
            this._chatItem = null;
            if (this._recordItem) {
                this._recordItem.destory();
            }
            this._recordItem = null;
            uniLib.DisplayUtils.removeAllChildren(this._content);
            uniLib.DisplayUtils.removeFromParent(this._content);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }

        public get FaceItem(): FaceItem {
            return this._faceItem
        }

        public get ChatItem(): ChatItem {
            return this._chatItem;
        }

        public get RecordItem(): RecordItem {
            return this._recordItem;
        }

        private onClose(evt: egret.TouchEvent): void {
            this.visible = false;
            PopupManager.removePopUp(this);
        }
    }
}