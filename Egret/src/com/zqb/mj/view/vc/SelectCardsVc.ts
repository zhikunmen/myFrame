/**
 * 牌型选择
 */

module PKGame {

    export class SelectCardsVc extends BaseVc {
        private _bg:egret.Bitmap;
        private _container:egret.DisplayObjectContainer;
        private _cardArr:any[] = [];
        private _label:egret.Bitmap;
        private _square:egret.DisplayObjectContainer;

        private _dataArr:any[] = [];


        public initUI() {

            this._square = new egret.DisplayObjectContainer();
            this.addChild(this._square);
            var  square= new egret.Sprite();
            square.graphics.beginFill(GameUtil.black);
            var width:number = uniLib.Global.screenWidth;
            var height:number = uniLib.Global.screenHeight;
            square.graphics.drawRect(0,0,width,height);
            square.graphics.endFill();
            this._square.width = uniLib.Global.screenWidth;
            this._square.height = uniLib.Global.screenHeight;
            this._square.addChild(square);
            this._square.touchEnabled = true;

            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTap,this);
            this._bg  = ResUtil.createBitmapByName("selected_cards_bg_png");
            var rect:egret.Rectangle = new egret.Rectangle(24,33,15,5);
            this._bg.scale9Grid =rect;
            this.addChild(this._bg);


            this._label = ResUtil.createBitmapByName("selected_cards_label_png");
            this.addChild(this._label);

            // this._bg.width = 520;

            GameUtil.setContainerCenter(this._label);


            this._container = new egret.DisplayObjectContainer;
            this.addChild(this._container);

            this.visible = false;
            // var testData:any[] = [{"multiType":5,"outCardSet":[2415,2415,2415,2415,2415,2415,2415,2415,2415]},
            //     {"multiType":6,"outCardSet":[247,247,247,247,247,247,247,247,247]}]
            //     // {"multiType":7,"outCardSet":[1530,1530,1530,1530,1530,1530,1530,1530,1530]},
            //     // {"multiType":8,"outCardSet":[1530,1530,1530,1530,1530,1530,1530,1530,1530]},
            //     // {"multiType":8,"outCardSet":[1530,1530,1530,1530,1530,1530,1530,1530,1530]}];
            // this.updateView(testData);
        }

        private touchTap():void {


        }

        private onTouchEnd(e:egret.Event){
            var name = e.target.name;
            // CardInfo.getInstance().selectGroup = [];

            if (name == "") {

                this.resetView();
                this.visible = false;
                var cardVc:PKGame.CardsVc = GameUtil.getViewByName(PKGame.CardMJMediator.NAME)._cardVc;
                cardVc.resetSelfHandsCard(false);
            }
        }


        public updateView(data:any[]):void {


            if (!data) return;
            this.resetView();

            this._dataArr = data;
            var len:number = data.length;

            for (var i:number = 0; i < data.length; i++) {
                var itemData:any = data[i];
                if (itemData) this.createCards(itemData,i);
            }

            this._bg.height = 150 * (Math.ceil(len/2));
            this._bg.width = this._container.width + 40;
            GameUtil.setStageCenter(this._bg);
            this._bg.y = this._bg.y + 10;
            this._label.y = this._bg.y - this._label.height;
            this._square.visible = true;
            this._square.alpha = 0.5;
            this._square.touchEnabled = true;

            var cardVc:PKGame.CardsVc = GameUtil.getViewByName(PKGame.CardMJMediator.NAME)._cardVc;
            cardVc.setGlobalTouch(false);
        }



        public isShowView(show:boolean):void {
            this.visible = show;
        }

        private createCards(obj:any,index:number):void {

            var node:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
            var type:string = obj["multiType"].toString();
            var outCardSet:any[] = obj["outCardSet"];
            this.sortArr(outCardSet);
            if (outCardSet && outCardSet.length > 0) {
                for  (var i:number = 0; i < outCardSet.length; i++) {
                    var card:egret.Bitmap = new egret.Bitmap;
                    var cardName = PKtable.PokerTableCard.resNormal(outCardSet[i]);
                    card = ResUtil.createBitmapByName(cardName);
                    card.scaleX = 0.5;
                    card.scaleY = 0.5;
                    card.name = type;
                    card.touchEnabled = true;
                    card.x = (i)*20;
                    card.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
                    node.addChild(card);
                }

                this._container.addChild(node);

                //是否是奇数
                var isOdd = (index+1) % 2 == 1?true:false;
                var disX:number = isOdd ? - node.width/2 - 15:node.width/2 + 15;
                if (isOdd) {
                    var disY:number = Math.floor((index + 1)/2) * (node.height/2 + 10);
                }else {

                    var disY:number = Math.floor((index + 1)/2 - 1) * (node.height/2 + 10);
                }
                GameUtil.distanceCenterLineX(node,disX,disY);
            }
        }




        //牌型排序 3三条，4，3带一对 5，连对，6，三顺子，7，双飞，8，炸弹
        private sortArr(arr:any[]):void {
            arr.sort((a,b)=>{
                return GameUtil.getCardNum(a) - GameUtil.getCardNum(b);
            })
        }




        private isSend:boolean = false;
        private onTouchHandler(e:egret.TouchEvent):void {

            if (this.isSend) return;
            this.isSend = true;
            var type:number = Number(e.currentTarget.name);
            if (type) {
                //发送出牌命令
                var outCardSet = this.getSendData(type);
                if (outCardSet && outCardSet.length) {
                    var obj:any = new Cmd.OutCardPokerCmd_C();
                    obj.outCardSet = outCardSet;
                    // obj.multiType = type;
                    uniLib.NetMgr.tcpSend(obj);
                    this.resetView();
                    this.visible = false;
                    var cardVc:PKGame.CardsVc = GameUtil.getViewByName(PKGame.CardMJMediator.NAME)._cardVc;
                    cardVc.setGlobalTouch(true);
                }

            }
        }


        private getSendData(type:number):any {

            for (var i:number = 0; i < this._dataArr.length; i++) {

                var data:any = this._dataArr[i];
                if (data.multiType == type ) {
                    return data.outCardSet;
                }
            }

            return null;
        }


        private resetView():void {

            this.isSend = false;
            if (this._cardArr) {

                for  (var i:number = 0; i < this._cardArr.length; i++) {
                    var card:any = this._cardArr[i];
                    if (card) card.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
                }

                this._cardArr = [];
            }

            if (this._container.numChildren) {
                DisplayUtils.removeAllChildren(this._container);
            }

        }

        public dispose():void {
            this.resetView();
        }

        public destory() {
            super.destory();
            this.resetView();
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTap,this);
        }
    }
}
