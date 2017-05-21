module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class PublicManage {
        private static instance: PublicManage;
        private maskMc: egret.Sprite;
        private  showList:Array<MildAlertVC> = [];
		public constructor() {
		}
		public static getInstance():PublicManage{
            if(!PublicManage.instance){
                PublicManage.instance = new PublicManage();
            }
            return PublicManage.instance;
		}
		/**
		 * 轻提示
		 */ 
        public showMildWarnShow(msg:string):void{
            ResUtil.trace("轻度提示：" + msg);
            if(!msg) {
                return
            }
            var alert: MildAlertVC = new MildAlertVC();
            alert.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
            alert.setText(msg);
            this.getContainer().addChild(alert);
            if(this.showList.length > 0) {
                for(var index = 0;index < this.showList.length;index++) {
                    this.showList[index].y -= alert.height;
                }
            }
            this.showList.push(alert);
		}
        private  getContainer():egret.DisplayObjectContainer{
			if(GameInfo.topLayer){
				return GameInfo.topLayer;
			}
 			if (uniLib.SceneMgr.instance.currentScene.topLayer)
			{
				return uniLib.SceneMgr.instance.currentScene.topLayer;
			}
            return uniLib.SceneMgr.instance.currentScene
		}
        private removeStage(evt:egret.Event):void{
            var alert: MildAlertVC = evt.currentTarget as MildAlertVC;
            alert.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
            this.showList.splice(this.showList.indexOf(alert),1);
            alert.destory();
            alert = null;
        }
        public showConfirmPanel(msg: string,btnlables: Array<string>,backFn: Array<Function> = null,title: string = null,backObj:any,countdown: number = 0,needClose:boolean = true): void{
            var _msgTips: MsgBox = new MsgBox(needClose);
            if(!title) {
                title = "";
            }
            _msgTips.setData(title,msg,btnlables,backFn,backObj,countdown);
            _msgTips.x = Math.round((DataCache.defaultWidth - _msgTips.width) / 2);
            _msgTips.y = Math.round((DataCache.defaultHeight* uniLib.ScreenUtils.scaleFactor - _msgTips.height) / 2);
            // GameInfo.topLayer.addChild(_msgTips);
            PopupManager.addPopUp(_msgTips,true);
		}
        
        public showMask():void{
            if(!this.maskMc){
                this.maskMc = new egret.Sprite();
                this.maskMc.graphics.beginFill(0x000000,0.5);
                this.maskMc.graphics.drawRect(0,0,DataCache.defaultWidth,DataCache.defaultHeight);//* uniLib.ScreenUtils.scaleFactor);
                this.maskMc.graphics.endFill();
            }
            GameInfo.topLayer.addChild(this.maskMc);
        }
        public hideMask():void{
            if(this.maskMc) {
                GameInfo.topLayer.removeChild(this.maskMc);
            }
        }
        public showMarket():void{
        }
        public backHall(): void {
        }
	}
}
