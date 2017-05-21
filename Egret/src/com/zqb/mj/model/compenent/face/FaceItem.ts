module PKGame {
	/**
	 * 动画 聊天id：11-118
	 */
	export class FaceItem extends BaseVc {
        private faceGroup:egret.Bitmap[];
        private faceBgGroup:egret.Bitmap[];
        private _scroll: egret.ScrollView;
        private _facePanel: egret.Sprite;
        public constructor() {
			super();
		}
        public initUI():void{
            // var bg:egret.Bitmap = ResUtil.createBitmapByName("face_bg");
            // bg.x = 5;
            // this.addChild(bg);
            this._scroll = new egret.ScrollView();
            this.addChild(this._scroll);
            this._scroll.verticalScrollPolicy = "on";
            this._scroll.horizontalScrollPolicy = "off";
            this._scroll.width = 360;
            this._scroll.height = 475;
            this.faceGroup = [];
            this.faceBgGroup = [];
            this._facePanel = new egret.Sprite();
            this.addChild(this._facePanel);
            for(var i:number = 1;i<=18;i++){
                this.creatFaceItem(i);
            }
            this._scroll.setContent(this._facePanel);
        }

        private creatFaceItem(index:number){
            var itemBg = ResUtil.createBitmapByName("faceBg");
            this._facePanel.addChild(itemBg);
            itemBg.touchEnabled = true;
            var faceBg:egret.Bitmap = ResUtil.createBitmapByName("face_select");
            faceBg.name = "short_facebg";
            faceBg.visible = false;
             this._facePanel.addChild(faceBg);
            var face:egret.Bitmap = ResUtil.createBitmapByName("face"+index);
            face.name = "short_"+index;
            face.touchEnabled = true;
            face.x = 15 + Math.floor(((index - 1) % 3)) * 116;
            face.y =  Math.floor(((index - 1) / 3)) * 107;
            faceBg.x = face.x;
            faceBg.y = face.y;
            itemBg.x = faceBg.x;
            itemBg.y = faceBg.y;
            this._facePanel.addChild(face);
            this.faceGroup.push(face);
            this.faceBgGroup.push(faceBg);
            face.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onFaceBegin,this);
            face.addEventListener(egret.TouchEvent.TOUCH_END,this.onFaceEnd,this);
            face.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFaceClick,this);
            face.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onFaceEnd,this);
        }
        private onFaceClick(e:egret.TouchEvent){
            var name:string = e.target.name;
            var id:string = "1"+name.slice(6,name.length);
            this.dispatchEventWith(UIEventConsts.SEND_COMMON_CHAT,false,id);
            var index:number = Number(name.slice(6,name.length));
            this.faceBgGroup[index-1].visible= false;
        }
        private onFaceBegin(e:egret.TouchEvent){
           var name:string = e.target.name;
           var index:number = Number(name.slice(6,name.length));
           this.faceBgGroup[index-1].visible= true;
        }

        private onFaceEnd(e:egret.TouchEvent){
           var name:string = e.target.name;
           var index:number = Number(name.slice(6,name.length));
           this.faceBgGroup[index-1].visible= false;
        }
        public destory():void{
             for(var i:number = 0;i<this.faceGroup.length;i++){
                var face = this.faceGroup[i];
                face.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onFaceBegin,this);
                face.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onFaceClick,this);
                face.removeEventListener(egret.TouchEvent.TOUCH_END,this.onFaceEnd,this);
             }
             uniLib.DisplayUtils.removeAllChildren(this);
             uniLib.DisplayUtils.removeFromParent(this);
             this.faceGroup = [];
             this.faceBgGroup = [];
        }
    }
}