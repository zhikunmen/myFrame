/**
 * 等等
 */

module PKGame {
    export class TestPanel extends  BaseVc{
        private selectedId:any = [];
        private selectedName:any = [];
        private selectedThisId = [];
        private index: number = 0;
        private cardButtonArr = ["确定", "取消", "重选"];
        private elmentArr:egret.TextField[] = [];
        private buttonArr:egret.TextField[] = [];
        // private inputText:egret.TextField;
        private cardArr = [];
        public initUI(): void {
            this.index = 0;
            this.buttonArr = [];
            this.elmentArr = [];
            this.create();
            // this.inputText = new egret.TextField();
            // this.inputText.type = egret.TextFieldType.INPUT;
            // this.addChild(this.inputText);
            // this.inputText.text = "请输入thiId......";
            // this.inputText.textColor = GameUtil.red;
            // // this.inputText.y = uniLib.Global.screenHeight / 2 + 200;
            //
            // this.inputText.addEventListener(egret.FocusEvent.FOCUS_IN,this.changeTextView,this);
        }

        private changeTextView(e:egret.FocusEvent):void {
            var text = e.currentTarget.text;

        }
        private contextText:egret.TextField;
        public create(): void {

            var bg: egret.Shape = new egret.Shape;
            this.addChild(bg);

            this.touchChildren = true;
            this.touchEnabled = true;
            this.setGameCard();
            this.setGameButton();
            this.x = 30;
            this.selectedThisId = [];
            this.selectedName = [];
            this.selectedId = [];

            this.contextText = new egret.TextField();
            this.contextText.textColor = GameUtil.green;
            this.addChild(this.contextText);
            this.contextText.text = "";
            this.contextText.width = uniLib.Global.screenWidth - 200;
            this.contextText.size = 24;
            this.contextText.x = 100;
            this.contextText.lineSpacing = 21;
            this.contextText.y = uniLib.Global.screenHeight/2+100;
            this.contextText.textAlign = egret.HorizontalAlign.RIGHT;

            bg.graphics.clear();
            bg.graphics.beginFill(0xFFEBCD, 1);
            bg.graphics.drawRect(-30, 80, this.width + 30, this.height + 200);
            bg.graphics.endFill();
        }

        //点击提示按钮
        private onCardTouchHandler(e: egret.TouchEvent): void {
            var hashCode = e.currentTarget.hashCode;
            var text = e.currentTarget.text;
            var name = Number(e.currentTarget.name);
            if (this.selectedId.indexOf(hashCode) >= 0) {
                this.changCardItemView(e.currentTarget,false);
                GameUtil.removeArrElement(this.selectedId,hashCode);
                GameUtil.removeArrElement(this.selectedName,text);
                GameUtil.removeArrElement(this.selectedThisId,name);
                this.refreshTextView();

                //删除选中状态的
            }else  {
                //选中状态
                if (this.selectedName.length >= 17) {
                    this.selectedName.length = 17;
                    PublicManage.getInstance().showMildWarnShow("您已经选满了牌");
                    return;
                }
                this.elmentArr.push(e.currentTarget);
                this.changCardItemView(e.currentTarget,true);
                this.selectedId.push(e.currentTarget.hashCode);
                this.selectedName.push(e.currentTarget.text);
                this.selectedThisId.push(name);
                this.refreshTextView();
            }
        }

        //刷新选中的文本视图;
        private refreshTextView():void {
            var str:string = ""
            for (var i:number = 0; i < this.selectedName.length; i++) {
                str += this.selectedName[i] + " ";
            }
            this.contextText.text = str;
        }

        private changCardItemView(txt:egret.TextField,isSelected:boolean = false):void {
            if (isSelected) {
                txt.textColor = GameUtil.red;
            }else  {
                txt.textColor = GameUtil.white;
            }
        }

        //
        private setGameCard(): void {
            this.cardArr = [
                1114, 1115, 113, 114, 115, 116, 117, 118, 119, 1110, 1111, 1112, 1113,
                1214, 1215, 123, 124, 125, 126, 127, 128, 129, 1210, 1211, 1212, 1213,
                1314, 1315,133, 134, 135, 136, 137, 138, 139, 1310, 1311, 1312, 1313,
                1414, 1415,143, 144, 145, 146, 147, 148, 149, 1410, 1411, 1412, 1413,
                1520,1530
            ];
            for (var i: number = 0; i < this.cardArr.length; i++) {
                var m: egret.Shape = new egret.Shape;
                this.addChild(m);
                m.graphics.clear();
                m.graphics.beginFill(0x666666, 1);
                m.graphics.drawRect(0, 0, 80, 30);
                m.graphics.endFill();

                var text: egret.TextField = new egret.TextField;
                this.addChild(text);
                text.textColor = GameUtil.white;
                text.type = "微软雅黑";
                text.size = 25;
                if ((i % 13) == 0) {
                    this.index++;
                }
                m.y = text.y = 50 * (this.index + 1);
                m.x = text.x = -10 + 98 * (i % 13);
                text.text = PKtable.PokerTableCard.selectByThisId(this.cardArr[i]).name;
                text.touchEnabled = true;
                text.name = PKtable.PokerTableCard.selectByThisId(this.cardArr[i]).thisId.toString();
                text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCardTouchHandler, this)
            }
        }
        //
        private setGameButton(): void {
            this.cardButtonArr = ["确定", "取消", "重选"];
            for (var i: number = 0; i < this.cardButtonArr.length; i++) {
                var m: egret.Shape = new egret.Shape;
                this.addChild(m);
                m.graphics.clear();
                m.graphics.beginFill(0x666666, 1);
                m.graphics.drawRect(0, 0, 80, 30);
                m.graphics.endFill();

                var text: egret.TextField = new egret.TextField;
                this.addChild(text);
                text.textColor = 0xffffff;
                text.type = "微软雅黑";
                text.size = 25;

                m.y = text.y = uniLib.Global.screenHeight / 2 +250;
                m.x = text.x = 470 + 100 * i;
                // GameUtil.setPosBySeat(m,0);
                // m.y = m.y - 300;
                // text.y = m.y;

                text.text = this.cardButtonArr[i].toString();
                text.touchEnabled = true;
                text.name = this.cardButtonArr[i].toString();
                text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchHandler, this);
                this.buttonArr.push(text);
            }
        }
        //
        private onButtonTouchHandler(e: egret.TouchEvent): void {
            if (e.currentTarget.name == "确定") {
                if (this.selectedThisId.length > 0) {
                    RepManager.ins.GMDealCardPokerCmd_C(this.selectedThisId,PKGame.MyUserInfo.getInstance().userId);
                } else {
                    RepManager.ins.ReadyStartPokerCmd_C();
                }
                this.dispatchEventWith(UIEventConsts.REMOVE_GM_PANEL);
            }
            if (e.currentTarget.name == "取消") {
                RepManager.ins.ReadyStartPokerCmd_C();
                this.dispatchEventWith(UIEventConsts.REMOVE_GM_PANEL);
            }
            if (e.currentTarget.name == "重选") {
                this.resetAllSelect();
            }
        }

        private resetAllSelect():void {
            this.selectedThisId = [];
            this.selectedName = [];
            this.selectedId = [];
            for (var i:number = 0; i < this.elmentArr.length; i++) {
                var text = this.elmentArr[i];
                text.textColor = GameUtil.white;
            }

            this.elmentArr = [];
            this.contextText.text = "";
        }
        //
        public destory(): void {
            console.log("TestPanel----del-----");
            for (var i:number = 0; i < this.elmentArr.length; i++) {
                var text: egret.TextField = this.elmentArr[i];
                text.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCardTouchHandler, this);
            }
            this.elmentArr = [];
            for (var i: number = 0; i < this.buttonArr.length; i++) {
                var text: egret.TextField = this.buttonArr[i];
                text.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTouchHandler, this);
            }

            // this.inputText.removeEventListener(egret.FocusEvent.FOCUS_IN,this.changeTextView,this);
            this.buttonArr = null;
            this.cardArr = null;
            this.selectedId = null;
            this.selectedName = null;
            this.index = 0;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}
