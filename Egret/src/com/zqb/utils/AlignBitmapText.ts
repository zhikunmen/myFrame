module ui {
	/**
	 *
	 * @author 
	 *
	 */
	export class AlignBitmapText extends egret.Sprite{
        private tf: egret.BitmapText;
        private _hAlign: string = "left";
        public constructor() {
            super();

            this.tf = new egret.BitmapText();
            this.addChild(this.tf);
		}
		
		public set hAlign(value:string){
		    if(this._hAlign != value){
                this._hAlign = value;
                this.updatePos();
		    }
		}
		
		public set font(value:egret.BitmapFont){
            this.tf.font = value;
		}
		
		public get font():egret.BitmapFont{
            return <egret.BitmapFont>this.tf.font;
		}
		
        public set letterSpacing(value:number){
            this.tf.letterSpacing = value;
        }
        
        public set lineSpacing(value:number){
            this.tf.lineSpacing = value;
        }
        
        public set text(value:string){
            this.tf.text = value;
            this.updatePos();
        }
        
        public get text():string{
            return this.tf.text;
        }
		
//        font: Object
//        要使用的字体的名称或用逗号分隔的字体名称列表，类型必须是 BitmapFont
//        letterSpacing: number
//        一个整数，表示字符之间的距量
//        lineSpacing: number
//        一个整数，表示行与行之间的垂直间距量
//        text: string
//        要显示的文本内容


		private updatePos():void{
    		var _x:number = 0;
            switch(this._hAlign){
                case egret.HorizontalAlign.LEFT:
                    _x = 0;
                    break;              
                case egret.HorizontalAlign.RIGHT:
                    _x = this.width - this.tf.width;
                    break;
                case egret.HorizontalAlign.CENTER:
                    _x = this.width / 2 - this.tf.width / 2;
                    break;
                default:
                    _x = 0;
                    break;
		    }
		    
            this.tf.x = _x;
		}
	}
}
