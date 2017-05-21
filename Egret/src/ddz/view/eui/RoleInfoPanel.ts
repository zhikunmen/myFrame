/**
 * Created by iluspan on 17/5/4.
 */

module PKGame {

    export class RoleInfoPanel extends BaseEui {
        //地主icon
        private _iconDizhu:eui.Image;
        //房主ijcon
        private iconFangzhu:eui.Image;
        //玩家头像
        private _roleIcon:eui.Image;
        //玩家名字
        private roleName:eui.Label;
        //玩家积分
        private rolePoints:eui.Label;
        //手牌
        private cardNum:eui.Label;
        private _data:any = null;
        
        constructor() {
            super();
            this.skinName = "RoleInfoPanel";
        }

        init() {

            this._iconDizhu.visible = false;
            this.iconFangzhu.visible = false;
            this.roleName.visible = false;
            this.rolePoints.visible = false;
            this.cardNum.visible = false;
        }


        public updateView(data):void {

            if (this._data) return;
            if (!data) return;
            this._data = data;
            this.roleName.visible = true;
            this.rolePoints.visible = true;
            this.roleName.text = data["name"];
            this.rolePoints.text = "积分:" + data.points;
        }


        //是否为地主
        public setDizhu(is:boolean):void {
            this._iconDizhu.visible = is;
        }

        //是否为房主
        public setFangZhu(is:boolean):void {
            this.iconFangzhu.visible = is;
        }

        //刷新积分
        public updatePoints(num:number):void {
            this.rolePoints.text = "积分:" + num;
        }

        //刷新手牌
        public updateHandCards(num:number):void {
            this.cardNum.text = "x" + num;
        }
    }
}
