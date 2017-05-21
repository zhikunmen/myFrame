/**
 显示明牌容器
 */
module PKGame {

     export class  MingPaiNode extends BaseVc {

        private cardArr:MySelfCard[] = [];
        private cardIdArr:any[] = [];
        private _uid:number;
        public initUI():void{
            this.height = 140;
            this.width = 230;

            var bg:egret.Bitmap = ResUtil.createBitmapByName("role_frame_1_png");
            GameUtil.setSale9Grid(bg,[25,18,32,29],230,138);
            this.addChild(bg);

            var bg1:egret.Bitmap = ResUtil.createBitmapByName("bg_neikuang_2_png");
            GameUtil.setSale9Grid(bg1,[5,5,30,30],205,110);
            bg1.x = 11.5;
            bg1.y = 9;
            this.addChild(bg1);

        }

        public setData(arr:any,uid):void {


            this._uid = uid;
            this.cardArr = [];
            this.cardIdArr = [];
            for (var i:number = 0; i < arr.length; i++){
                var card:MySelfCard  = new MySelfCard();
                card.setCard(arr[i],0.4);
                card.name = arr[i];
                card.x = 12 + i % 10 * 17;
                card.y = Math.floor(i/10) * 40 + 10;
                this.addChild(card);
                this.cardArr.push(card);
                this.cardIdArr.push(arr[i]);
            }
        }

        //插入地主底牌
         public insertDiCards(arr:any,uid:number):void {
             if (uid != this._uid) return;
             var refreshArr:any = this.cardIdArr.concat(arr);
                 refreshArr.sort((a:any,b:any)=> {
                 var num1:number = GameUtil.cardValue(a);
                 var num2:number = GameUtil.cardValue(b);
                 if (num1 > num2) {
                     return -1
                 }else if (num2 == num1) {
                     return 0
                 }else {
                     return 1;
                 }
             });
             for (var i:number = 0; i < this.cardArr.length; i++) {
                 this.cardArr[i].destory();
             }
             this.setData(refreshArr,this._uid);
         }


        //清掉出出去的牌
        public clearOutCards(arr:number[],uid:number):void {

            if (uid != this._uid) return;
            for (var i:number = 0; i < arr.length; i++) {
                if (this.cardIdArr.indexOf(arr[i]) > -1) {
                    var index:number = this.cardIdArr.indexOf(arr[i]);

                    this.cardIdArr.splice(index,1);
                }
            }

            for (var i:number = 0; i < this.cardArr.length; i++) {
                this.cardArr[i].destory();
            }

            this.cardIdArr.sort((a:any,b:any)=> {
                var num1:number = GameUtil.cardValue(a);
                var num2:number = GameUtil.cardValue(b);
                if (num1 > num2) {
                    return -1
                }else if (num2 == num1) {
                    return 0
                }else {
                    return 1;
                }
            })
            this.setData(this.cardIdArr,this._uid);
        }

        public destory():void{

            for (var i:number = 0; i < this.cardArr.length; i++){
                this.cardArr[i].destory();
            }
            uniLib.DisplayUtils.removeFromParent(this);
            this.cardIdArr= [];
            this._uid = null;
        }
    }
}
