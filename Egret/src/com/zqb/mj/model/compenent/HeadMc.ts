module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class HeadMc extends egret.Sprite{
        private _headUrl: string;
        private _headMc: egret.Bitmap;
        private _headBg:egret.Bitmap;
        private _lixianBg:egret.Bitmap;
        private _width: number;
        private _height: number;
        private _headLoad:HeadLoader;
		public constructor(width:number,height:number) {
            super();
            this._width = width;
            this._height = height;
            this._headBg = ResUtil.createBitmapByName("bg_role_1_png");
            this.addChild(this._headBg);
            this._headMc = ResUtil.createBitmapByName("defaultHead");
            this.addChild(this._headMc);

            this._lixianBg = ResUtil.createBitmapByName("poker_seat_lixian_bg_png");
            this.addChild(this._lixianBg);
            this._lixianBg.visible = false;
		}
        public destory():void{
            ResUtil.removeAllChildren(this);
            ResUtil.removeFromParent(this);
            if(this._headLoad){
                this._headLoad.destroy();
                this._headLoad=null;
            }
            this._headMc=null;
        }
		public set headUrl(url:string){
            if(this._headUrl&&this._headUrl==url){
                return;
            }
            this._headUrl = url;
            this._headMc.texture=ResUtil.createTexture("defaultHead");
            if(!this._headLoad){
                 this._headLoad=new HeadLoader();
            }
            this._headLoad.load(this._headUrl,this.loaded,null,this);
		}
        /**将头像用特定形状的png图片进行遮罩 */
        private setPlayerIconMask(): void {
            let maskTexture: egret.Texture = RES.getRes("mask_head_png");
            let maskImg: egret.Bitmap = new egret.Bitmap();
            this.addChild(maskImg);

            maskImg.texture = maskTexture;
            let iconX = this._headBg.x;
            let iconY = this._headBg.y;
            let iconWidth = this._headBg.width;
            let iconHeight = this._headBg.height;
            let maskX = iconX + iconWidth / 2;
            let maskY = iconY + iconHeight / 2;
            maskImg.anchorOffsetX = maskImg.width / 2;
            maskImg.anchorOffsetY = maskImg.height / 2;
            maskImg.x = maskX;
            maskImg.y = maskY - 6;
            this._headMc.mask = maskImg;
        }

		//玩家是否离线
		public isOnLine(isOnLine:boolean):void {
            this._lixianBg.visible = !isOnLine;
        }

        private loaded(data:egret.BitmapData):void{
            if(!this._headMc){
                this._headMc = new egret.Bitmap(data);
                this.addChild(this._headMc);
            }else{
                this._headMc.bitmapData = data;
            }
            this._headMc.width = this._headMc.height = 100;

            this.setPlayerIconMask();
        }
    }
}
