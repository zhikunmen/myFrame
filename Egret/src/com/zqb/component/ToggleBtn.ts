/**
 * Created by iluspan on 17/5/9.
 */

module PKGame {

    export class ToggleBtn extends BaseVc {
        private callBack:Function = null;
        private _btn1:GameButton;
        private _btn2:GameButton;
        private _text1:egret.TextField;
        private _text2:egret.TextField;
        private _context:any = null;


        constructor(btn1Img:string,btn2Img:string,name:string,lcallBack:Function,context:any,bgImg:string,interval:number = 20,label1:string = null,label2:string = null) {
            super();
            this._context = context;
            this.name = name;
            var bg:egret.Bitmap = ResUtil.createBitmapByName(bgImg);
            this.addChild(bg);
            this._text1 = new egret.TextField();
            if (label1) {
                this._text1.text = label1;
            }else {
                this._text1.text = "开";
            }

            this._text2 = new egret.TextField();
            if (label2) {
                this._text2.text = label2;
            }else {
                this._text2.text = "关";
            }

            this.addChild(this._text2);
            this.addChild(this._text1);

            this._btn1 = new GameButton([btn1Img + "_1_png",btn2Img + "_2_png"]);
            this._btn1.name = "btn1";
            this.addChild(this._btn1);
            this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTapHandler,this);
            this._btn2 = new GameButton([btn2Img + "_1_png",btn2Img + "_2_png"]);
            this._btn2.name = "btn2";
            this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTapHandler,this);
            this.addChild(this._btn2);
            this._btn2.x = this._btn1.width + interval;

        }


        public setTextPos(size:number,color:number,x1:number,x2:number,y:number):void {
            this._text2.size = this._text1.size = size;
            this._text1.textColor = this._text2.textColor = color;
            this._text1.x = x1;
            this._text2.x = x2;
            this._text2.y = this._text1.y = y;
        }

        private onTouchTapHandler(e:egret.TouchEvent):void {
            var name:string = e.target.name;

            if (name == "btn1") {
                this._btn1.visible = true;
                this._btn2.visible = false;

            }else if (name == "btn2") {
                this._btn1.visible = false;
                this._btn2.visible = true;

            }

            if (this.callBack && this._context) {
                this._context.call(this.callBack,this.name);
            }

        }

        destory() {
            this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTapHandler,this);
            this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTapHandler,this);
            this._btn1.destory();
            this._btn2.destory();
            this._btn2 = null;
            this._btn1 = null;
            this._context = null;
            this.callBack = null;
            this._text1 = null;
            this._text2 = null;
        }
    }
}
