import DisplayUtils = uniLib.DisplayUtils;
import measureText = egret.sys.measureText;
/**
 * Created by iluspan on 17/3/27.
 */

class GameUtil {

    public static red: number = 0xFF0000;
    public static black: number = 0x000000;
    public static white: number = 0xffffff;
    public static green: number = 0x3CB371;

    public static removeArrElement(arr: any[], val): any {

        for (var i: number = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                var index: number = i;
                arr.splice(index, 1);
                return true;
            }
        }

        return false;
    }


    //判断一个数组当中是否存在两个以上的相同的元素
    public static isHaveMoreOneEle(arr: any[], ele: number): boolean {
        var times: number = 0;

        for (var i: number; i < arr.length; i++) {
            if (arr[i] == ele) {
                times++;
            }
        }

        if (times > 2) {
            return true;
        }
        return false;
    }

    //屏幕高宽
    public static stageHeight: number = uniLib.Global.screenHeight;
    public static stageWidth: number = uniLib.Global.screenWidth;

    //判断数组当中是否存在相同的元素
    public static isHaveElemt(arr: any[], ele): boolean {
        var rel: boolean = arr.some((data) => {
            return data == ele
        }, this)
        return rel;
    }


    //随机的范围内容数值
    public static randRange(min: number, max: number): number {
        var num: number = max - min;
        var randomNum: number = Math.floor(Math.random() * num);
        return min + randomNum;
    }

    //设置容器居中对齐
    public static setContainerCenter(container:any, isCard: boolean = false): void {
        if (container) {
            var point:egret.Point = new egret.Point(0,0);
            point.x = (uniLib.Global.screenWidth - container.width) / 2;
            var localPoint:egret.Point = container.parent.globalToLocal(point.x,point.y);
            container.x = localPoint.x;

            if (isCard && localPoint.x < 0) {

                container.x = container.x + 43;

            }
        }
    }


    //设置九宫格
    public static setSale9Grid(bitmap:egret.Bitmap,arr:any[],width:number,height:number):void {
        var rect:egret.Rectangle = new egret.Rectangle(arr[0],arr[1],arr[2],arr[3]);
        bitmap.scale9Grid = rect;
        bitmap.width = width;
        bitmap.height = height;
    }


    //容器中心对称
    public static setStageCenter(container:any):void {
        if (!container) return;

        var point:egret.Point = new egret.Point(0,0);
        point.x = (uniLib.Global.screenWidth - container.width) / 2;
        point.y = (uniLib.Global.screenHeight - container.height) / 2;
        var localPoint:egret.Point = container.parent.globalToLocal(point.x,point.y);
        container.x = localPoint.x;
        container.y = localPoint.y;

    }


    //移除龙骨动画
    public static removeDragonBone(dragon:any):void {
        if (!dragon) return;

        dragon.animation.stop();
        if (dragon.display) {
            DisplayUtils.removeFromParent(dragon.display);
        }
    }

    //拿到对应视图层的引用
    public static getViewByName(name:string):any {
        var vs = PKGame.PokerFourFacede.getInstance().retrieveMediator(name);
        return vs;
    }


    //判断是否是炸弹手牌
    public static isBoodHand(thisId:number):boolean {
        var val:number = PKtable.PokerTableCard.selectByThisId(thisId).point;
        var num:number = 0;
        var allSelCards:any[] = PKGame.CardInfo.getInstance().getHandCardBySeat(0);
        for (var i:number = 0; i < allSelCards.length; i++) {
            var data:any = PKtable.PokerTableCard.selectByThisId(allSelCards[i]).point;
            if (data == val) {
                num = num + 1 ;
            }
        }

        if (num >= 4) {
            return true
        }

        return false;
    }

    //根据位置来设定容器位置
    /**
     *
     * @param node
     * @param seat
     * @param offsetArr 边边位置偏移多少偏移量
     */
    public static setPosBySeat(node:any,seat:number,offsetArr:Object[] = null):void {

        if (!node) return;
        if (seat == 0) {
            var point:egret.Point = new egret.Point(0,0);
            point.x = (uniLib.Global.screenWidth - node.width) / 2;
            point.y = uniLib.Global.screenHeight - node.height;
            var localPoint:egret.Point = node.parent.globalToLocal(point.x,point.y);
            node.x = localPoint.x;
            node.y = localPoint.y;
        }else if (seat == 1) {
            var point:egret.Point = new egret.Point(0,0);
            point.x = uniLib.Global.screenWidth - node.width;
            point.y = (uniLib.Global.screenHeight - node.height) / 2;
            var localPoint:egret.Point = node.parent.globalToLocal(point.x,point.y);
            node.x = localPoint.x;
            node.y = localPoint.y;
        }else if (seat == 2) {

            var point:egret.Point = new egret.Point(0,0);
            point.x = (uniLib.Global.screenWidth - node.width) / 2;
            point.y = node.height;
            var localPoint:egret.Point = node.parent.globalToLocal(point.x,point.y);
            node.x = localPoint.x;
            node.y = localPoint.y;
        }else {
            var point:egret.Point = new egret.Point(0,0);
            point.x = node.width;
            point.y = (uniLib.Global.screenHeight - node.height) / 2;
            var localPoint:egret.Point = node.parent.globalToLocal(point.x,point.y);
            node.x = localPoint.x;
            node.y = localPoint.y;
        }

        if (offsetArr) {
            node.x = node.x + offsetArr[seat]["x"];
            node.y = node.y + offsetArr[seat]["y"];
        }

    }


    //距离中心线的偏移距离
    public static distanceCenterLineX(node:any,distanceX:number,distanceY):void {
        GameUtil.setStageCenter(node);
        node.x = node.x + distanceX;
        node.y = node.y + distanceY;
    }


    //通过thisId来拿具体的牌的值
    public static getCardNum(thisId:number):number {

        var str:string = thisId.toString();
        var num:number;
        var num1:string = str[2];
        var num2:string = str[3];
        if (num2) {
            num = Number(num1 + num2);
        }else {
            num = Number(num1);
        }
        if (num == 20) {
            num = 16;
        }else if (num == 30) {
            num = 17;
        }
        return num;
    }

    //拿到非癞子牌

    public static getNotLaiziCards(arr:any[]):any {
        var result:any[] = [];
        for (var i:number = 0; i < arr.length; i++){
            var thisId:string = arr[i].toString();
            if (Number(thisId[0]) != 3) {
                result.push(arr[i]);
            }
        }

        if (result.length) {
            return result;
        }

        return null;
    }

    //通过uid拿到每局的详情
    public static getFinalDetail(uId:number):any {
        var result:any[] = [];
        var data:any[] = PKGame.RoomInfo.getInstance().balanceDetail;
        for (var i:number = 0; i < data.length; i++) {
            var eleData:any = data[i]["statistics"];
            for (var j:number = 0; j < eleData.length; j++) {
                if (eleData[j]["uid"] == uId) {
                    var obj:any = {};
                    obj.roundNum = GameUtil.juNumArr[i];
                    obj.point = eleData[j]["integral"];
                    result.push(obj);
                }
            }
        }
        return result;
    }

    //局数
    public static juNumArr:string[] = ["第一局","第二局","第三局","第四局","第五局","第六局","第七局","第八局","第九局","第十局","第十一局","第十二局","第十三局","第十四局","十五局","十六局"];

    //判断对象是否为空
    public static isObjectOfNull(obj:Object):boolean {

        if(JSON.stringify(obj) == "{}"){
            return true;
        }

        return false;
    }

    public static cardValue(thisId:number):number {
        var num:number;
        var str = thisId.toString();
        if (str.length == 3) {
            num = Number(str[2]);
        }else if (str.length == 4) {
            num = Number(str[2] + str[3]);
        }

        return num;
    }

    public static getNowTime():any {
        var myData:any = new Date();
        var obj:any = {};
        obj.year = myData.getYear();
    }
    //排序牌型
    public static sortCards(arr:any[]):void {
            if (!arr.length) return;
            arr.sort((a:any,b:any)=> {
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
    }
    //设置容器的位置
    public static setContainerPos(container:any,arr:any,seat:number):void {
        if (!container)return;
        var obj:any = arr[seat];
        if (obj) {
            container.x = obj.x;
            container.y = obj.y;
        }
    }


    public static createAlignBitmapText(fontName: string,text: string,x: number = 0,y: number = 0,width: number = -1,hAlign: string = "left"): ui.AlignBitmapText {
        var tf: ui.AlignBitmapText = new ui.AlignBitmapText();
        if(width != -1) {
            tf.width = width;
        }
        tf.font = RES.getRes(fontName);
        tf.text = text;
        tf.x = x;
        tf.y = y;
        tf.hAlign = hAlign;
        return tf;
    }

    //判断数组中是否存在某个元素
    public static isHaveForArr(arr:any,ele:any):boolean {
        var result:boolean = arr.some((data:any)=>{
            return data == ele;
        })

        if (result) {
            return true;
        }else {
            arr.push(ele);
            return false;

        }


    }

}

