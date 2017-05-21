/**
 * 公共加载
 */
class PublicLoadingView extends egret.Sprite {
    public constructor() {
        super();
        this.init();
    }
    private backgroud_bmp: egret.Bitmap;
    private darkLine_bmp: egret.Bitmap;
    private lightLine_bmp: egret.Bitmap;
    private explain_txf: egret.TextField;
    public static explain: string ="正在加载游戏资源...";
    private _progTxt:egret.TextField;
    private _versionTxt:egret.TextField;
    public init(): void {
        if (!this.backgroud_bmp) {
            this.backgroud_bmp = PKGame.ResUtil.createBitmapByName("loading_jpg");
            this.backgroud_bmp.height=uniLib.Global.screenHeight;
            this.addChild(this.backgroud_bmp);
        }
        
        if (!this.darkLine_bmp) {
            this.darkLine_bmp = PKGame.ResUtil.createBitmapByName("loading_darkLine",315,uniLib.Global.screenHeight - (124*uniLib.ScreenUtils.scaleFactor));
            this.addChild(this.darkLine_bmp);
        }
        if (!this.lightLine_bmp) {
            this.lightLine_bmp = PKGame.ResUtil.createBitmapByName("loading_lightLine",this.darkLine_bmp.x+1,this.darkLine_bmp.y-11);
            this.lightLine_bmp.scale9Grid = new egret.Rectangle(12, 18, 10, 2);
            this.addChild(this.lightLine_bmp);
        }
        if (!this.explain_txf) {
            this.explain_txf = PKGame.ResUtil.createTextFeild(0xD29612,egret.HorizontalAlign.CENTER,"",22,438,uniLib.Global.screenHeight - (99*uniLib.ScreenUtils.scaleFactor),276);
            this.addChild(this.explain_txf);
        }
        if(!this._progTxt){
            this._progTxt = PKGame.ResUtil.createTextFeild(0xE6AC2F,egret.HorizontalAlign.CENTER,"",22,439,uniLib.Global.screenHeight - (148*uniLib.ScreenUtils.scaleFactor),276);
            this.addChild(this._progTxt);
        }
        
    }

    public setProgress(loaded: number, total: number,desc?: string,resourceName?:string,force:boolean=false): void {
        // if(!this._versionTxt){
        //     this._versionTxt=ddzGame.ResUtil.createTextFeild(0x999999,egret.HorizontalAlign.RIGHT,ddzGame.LobbyDataCache.version,22,864,595,250);
        //     this.addChild(this._versionTxt);
        //     this._versionTxt.text=ddzGame.LobbyDataCache.version;
        //  }
       
        if (total && total !=0) {
            var num: number = Math.ceil((loaded / total) * 100);
            if(desc && desc != ""){
                this.explain_txf.text = desc;
            }
            else {
                this.explain_txf.text = PublicLoadingView.explain;
            }
            if(force==false && num > 93){
                num=93;
            }
            var widthX: number =(this.darkLine_bmp.width) * (num / 100)+27;
            this.lightLine_bmp.width = widthX;
            if(this._progTxt){
                this._progTxt.text=num+"%";
            }
        }
        else {
              this.explain_txf.text = desc;
         }
        this.explain_txf.x = (uniLib.Global.screenWidth - this.explain_txf.width) / 2
    }

}