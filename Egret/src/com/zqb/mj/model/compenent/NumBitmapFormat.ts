module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class NumBitmapFormat extends egret.Sprite{
        private  _defaultAsstes:string = "num";
        private  _width:number;
        private _height: number;
        private _align: number;
        public static LEFT: number = 1;
        public static MIDDLE: number = 2;
        public static RIGHT: number = 3;
        private  _numMc:egret.Sprite;
        private _value: number;
        private _hideZero: boolean;
        private _spacing:number=-1;
        public constructor(w: number,h: number,align: number = NumBitmapFormat.LEFT,asstes: string = null,hideZero:boolean=true) {
            super();
            this._width = w;
            this._height = h;
            this._align = align;
            this._hideZero = hideZero;
            if(asstes) {
                this._defaultAsstes = asstes;
            }
            this.init();
		}
        private  init():void{
            this._numMc=new egret.Sprite();
            this.addChild(this._numMc);
        }
        public set spacing(space:number){
            this._spacing=space;
        }
        public  set value(num:number) {
            this._value = num;
            this.clear();
            if(num==0&&this._hideZero){
                return;
            }
            var str: string=ResUtil.currencyFormat(num);
            var numberMc:egret.Bitmap;
            var char: string;
            for(var i=0;i<str.length;i++){
                char = str.charAt(i);
                if(char==","){
                    char = "10";
                }
                numberMc = ResUtil.createBitmapByName(this._defaultAsstes + char);
                if(this._numMc.width + numberMc.width > this._width) {
                    break;
                }
                if(char == "10" && this._defaultAsstes=="num") {
                    numberMc.y = 12;
                }
                numberMc.x = this._numMc.width > 0 ? this._numMc.width+this._spacing : this._numMc.width;
                this._numMc.addChild(numberMc);
            }
            switch(this._align) {
                case NumBitmapFormat.LEFT:
                    this._numMc.x = 0;
                    break;
                case NumBitmapFormat.MIDDLE:
                    this._numMc.x = Math.round((this._width - this._numMc.width) / 2);
                    break;
                case NumBitmapFormat.RIGHT:
                    this._numMc.x = this._width - this._numMc.width;
                    break;
                default:
                    break;
            }
        }
        public get value():number{
            return this._value;
        }
        private  clear(): void {
            var len: number = this._numMc.numChildren;
            for(var i = 0;i < len;i++) {
                this._numMc.removeChildAt(0);
            }
        }
        private getNumblerF(char: string): number {
            var frame: number = 1;
            if(char == ",") {
                frame = 12;
            } else {
                frame = Number(char) + 1;
            }
            return frame;
        }
        public  destory(): void {
            this._numMc.parent.removeChild(this._numMc);
            this._numMc = null;
            this.clear();
            uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
        }
	
	}
}
