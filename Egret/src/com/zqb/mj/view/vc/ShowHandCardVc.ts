/**
 * Created by iluspan on 17/4/12.
 */
module PKGame {

    export class ShowHandCardVc extends BaseVc {
        private _node0:egret.DisplayObjectContainer;
        private _node1:egret.DisplayObjectContainer;
        // private _node2:egret.DisplayObjectContainer;
        private _node3:egret.DisplayObjectContainer;

        // private _scoreNode:egret.DisplayObjectContainer;


        public initUI():void{
            this._node0 = new egret.DisplayObjectContainer();
            this.addChild(this._node0);
            this._node1 = new egret.DisplayObjectContainer();
            this.addChild(this._node1);
            // this._node2 = new egret.DisplayObjectContainer();
            // this.addChild(this._node2);
            this._node3 = new egret.DisplayObjectContainer();
            this.addChild(this._node3);
            // this._scoreNode = new egret.DisplayObjectContainer();
            // this.addChild(this._scoreNode);
        }


        public updateView(data:any):void {

            var rewardSet:any[] = data.rewardSet;

            this.dispose();
            this.setHandCards(this._node0,rewardSet[0]);
            this.setHandCards(this._node1,rewardSet[1]);
            // this.setHandCards(this._node2,rewardSet[2]);
            this.setHandCards(this._node3,rewardSet[2]);
           // / this.setSoreView(rewardSet);
        }

        //摊牌
        private setHandCards(node:egret.DisplayObjectContainer,data:any):void {
            var seat:number = RoomInfo.getInstance().getSeatNoByUserId(data["uid"]);
            if (seat == 2) {
                seat = 3;
            }
            var userCard:any = data["userCard"];
            if (!userCard) return;
            var len:number = userCard["handCardSet"].length;
            GameUtil.sortCards(userCard["handCardSet"]);

            if (len) {
                for (var i:number = 0; i < len; i++) {
                    var card:egret.Bitmap = new egret.Bitmap;
                    var cardName = PKtable.PokerTableCard.resNormal(userCard["handCardSet"][i]);
                    card = ResUtil.createBitmapByName(cardName);
                    card.scaleX = 0.63;
                    card.scaleY = 0.63;
                    card.name = cardName;
                    card.y = Math.floor(i/6)*40;
                    card.x = (i%6)*30;
                    node.addChild(card);
                }
            }
            GameUtil.setPosBySeat(node,seat,PKGame.CardInfo.getInstance().showCardArr);

            if (seat ==0) {
                node.y = node.y - 100;
            }
        }




        public dispose():void {
            if (this._node0.numChildren) {
                DisplayUtils.removeAllChildren(this._node0);
            }
            if (this._node1.numChildren) {
                DisplayUtils.removeAllChildren(this._node1);
            }
            // if (this._node2.numChildren) {
            //     DisplayUtils.removeAllChildren(this._node2);
            // }
            if (this._node3.numChildren) {
                DisplayUtils.removeAllChildren(this._node3);
            }

            // if (this._scoreNode.numChildren) {
            //     DisplayUtils.removeAllChildren(this._scoreNode);
            // }
        }

    }


}