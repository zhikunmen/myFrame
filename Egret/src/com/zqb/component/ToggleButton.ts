module PKGame {
    /**
     *
     * @author 
     *
     */
    export class ToggleButton extends egret.Sprite{
        private normalImage: ui.Image;
        private downImage: ui.Image;
        private _text:string;
        private _label: egret.TextField;
        private _textSize:number = 20;
        private _textColor: number = 0x959595;
        private _strokeColor: number = 0x580a95;
        private _textSelectColor: number = 0xFFFFFF;
        public constructor(normalTexture: string | egret.Texture,downTexture?: string | egret.Texture,text?: string,btnname?:string) {
            super();
            this.touchEnabled = true;
            this.normalImage = new ui.Image(normalTexture);
            this.normalImage.fillMode = egret.BitmapFillMode.SCALE;
            this.addChild(this.normalImage);
            
            if(downTexture) {
                this.downImage = new ui.Image(downTexture);
                this.downImage.fillMode = egret.BitmapFillMode.SCALE;
            }
            this._text = text;
            if(this._text != ""){
                this._label = new egret.TextField();
                this._label.fontFamily = "微软雅黑";
                this._label.text = text;
                this._label.size = 20;
                this._label.width = this.width;
                this._label.textAlign = egret.HorizontalAlign.CENTER;
                this.addChild(this._label);
            }
            
            this.name = btnname;
        }
        public updateSize(w: number = -1,h: number = -1): void {
            if(w != -1) {
                this.width = w;
                this.normalImage.width = w;
                if(this.downImage) {
                    this.downImage.width = w;
                }
            }
            if(h != -1) {
                this.height = h;
                this.normalImage.height = h;
                if(this.downImage) {
                    this.downImage.height = h;
                }
            }
            if(this._label){
                this._label.width = this.width;
                this._label.y = (this.height - this._label.height) / 2;
            }
        }
        public set scale9Grid(value: egret.Rectangle) {
            this.normalImage.scale9Grid = value;
            if(this.downImage) {
                this.downImage.scale9Grid = value;
            }
        }
        
        public set select(value:Boolean){
            if(value){
                if(this.downImage) this.addChildAt(this.downImage,1);
                if(this._label)this.setTextStatus(this._text,this._textSelectColor,this._strokeColor,this._textSize);
            }
            else{
                if(this.downImage && this.downImage.parent) {
                    this.downImage.parent.removeChild(this.downImage);
                }
                if(this._label)this.setTextStatus(this._text,this._textColor,null,this._textSize);
            }
        }
        public setTextColor(textColor: number,selectColor:number,strokeColor: number,size: number){
            this._textColor = textColor;
            this._strokeColor = strokeColor;
            this._textSelectColor = selectColor;
            this._textSize = size;
        }
         /**
         * 设置文字颜色、状态
         */ 
        private setTextStatus(txt:string,textColor: number,strokeColor:number,size:number){
            if(strokeColor != undefined || strokeColor != null){
                this._label.textFlow = <Array<egret.ITextElement>>[
                    { text: txt,style: { "textColor": textColor,"size": size,"strokeColor": strokeColor,"stroke": 1 } }
                ];
            }
            else{
                this._label.text = txt;
                this._label.textFlow = <Array<egret.ITextElement>>[
                    { text: txt,style: { "textColor": textColor,"size": size,"strokeColor": strokeColor,"stroke": 0 } }
                ];
            }
        }
    }
}
