module PKGame {
	/**
	 * 游戏秘籍
	 */
	export class gameHelpPanel extends BaseVc {
		private _closeBtn:GameButton;
		private _scroll:egret.ScrollView;
		private _txt_left:egret.TextField;
		private _txt_right:egret.TextField;
		public constructor() {
			super();
		}
		public initUI(): void {
			this.touchEnabled = true;
			this.touchChildren = true;
			var bg:egret.Bitmap = ResUtil.createBitmapByName("role_frame_1_png");
			bg.scale9Grid = new egret.Rectangle(18,21,37,22);
			bg.width = 917;
			bg.height = 423;
			bg.x = (uniLib.Global.screenWidth - bg.width)>>1;
			bg.y = (uniLib.Global.screenHeight - bg.height)>>1;
			this.addChild(bg);

			this._scroll = new egret.ScrollView();
            this._scroll.width = 430;
            this._scroll.height = 500;
            this._scroll.x = 180;
            this._scroll.y = 150;
			this.addChild(this._scroll);	
			this._scroll.horizontalScrollPolicy = "off";
			this._scroll.verticalScrollPolicy = "on";	

			var bamboo_left:egret.Bitmap = ResUtil.createBitmapByName("help_bamboo");
			bamboo_left.x = bg.x + 28;
			bamboo_left.y = bg.y + 20;
			this.addChild(bamboo_left);

			var bamboo_right:egret.Bitmap = ResUtil.createBitmapByName("help_bamboo");
			bamboo_right.scaleX = -1;
			bamboo_right.x = bg.x + bg.width - 32;
			bamboo_right.y = bg.y + 20;
			this.addChild(bamboo_right);

			var line:egret.Bitmap = ResUtil.createBitmapByName("help_line_png");
			line.x = bg.x + (bg.width - line.width)/2;
			line.y = bg.y + (bg.height - line.height)/2;
			this.addChild(line);

			this._closeBtn = new GameButton(["btn_exit_1_png","btn_exit_2_png"]);
			this._closeBtn.x = bg.x + bg.width-61;
			this._closeBtn.y = bg.y - 20;
			this.addChild(this._closeBtn);
			this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandle,this);

			var title_left:egret.Bitmap =  ResUtil.createBitmapByName("help_txt2");
			title_left.x = 270;
			title_left.y = 86;
			this.addChild(title_left);

			var title_right:egret.Bitmap =  ResUtil.createBitmapByName("help_txt1");
			title_right.x = 770;
			title_right.y = 86;
			this.addChild(title_right);

			this._txt_left = ResUtil.createTextFeild(0x62626,egret.HorizontalAlign.LEFT,"",24,0,20,430);
			this._txt_left.lineSpacing = 6;

			var ruleStr:string = "";
			if(RES.hasRes("help_4065_txt")){
				ruleStr = RES.getRes("help_4065_txt");
			}
			this._txt_left.textFlow = (new egret.HtmlTextParser).parser(ruleStr);
			this.addChild(this._txt_left);
			this._scroll.setContent(this._txt_left);

			this._txt_right = ResUtil.createTextFeild(0xc25215,egret.HorizontalAlign.CENTER,"",30,685,180,430);
			this._txt_right.height = 300;
			this._txt_right.verticalAlign = egret.VerticalAlign.MIDDLE;
			this._txt_right.lineSpacing = 6;
			this._txt_right.textFlow = (new egret.HtmlTextParser).parser(ruleStr);
			this.addChild(this._txt_right);
			var str:string = "";
			var list:string[] = RoomInfo.getInstance().getPlayTypeByList();
			if(list.length <=0){
				this._txt_right.textFlow = (new egret.HtmlTextParser).parser("房主什么都没选择,你们随意");
				return;
			}

			for(let i = 0;i<list.length;i++){
				str = str+ list[i]+ "  ";
			}

			this._txt_right.textFlow = (new egret.HtmlTextParser).parser(str);
		}
		public destory(): void {
			super.destory();
			if(this._closeBtn){
				this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandle,this);
				this._closeBtn.destory();
			}
			this._closeBtn = null;
			if(this._scroll){
				this._scroll.removeChildren();
			}
			this._scroll = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);			
		}
		private closeHandle(evt: egret.TouchEvent): void {
            this.dispatchEventWith(UIEventConsts.CLOSE);
        }
	}
}
