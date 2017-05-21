module PKGame {
	import is = egret.is;
	export class SeatPlayer extends BaseVc {
		private _userVo:UserVo;
		private _seatId:number;
		private _headMc:HeadMc;
		private _host:egret.Bitmap;//托管
		private _signal:egret.Bitmap//信号弱
		private _roleIcon:egret.Bitmap;//地主 农民
		private _nameTxt:egret.TextField;
        private _chipTxt:egret.TextField;
		private _head_blackCard:egret.Bitmap;   //牌背
		private _handCardNum:egret.TextField;//手牌数量
		private _labelBg:egret.Bitmap;
		private _labelBg1:egret.Bitmap;
		private _integration:egret.TextField; //积分
		private _mingPaiImg:egret.Bitmap;//头像明牌标签
		private _mingPaiImg2:egret.Bitmap; //界面明牌标签
		private _timeId:number = -1;
		private _fangzhuImg:egret.Bitmap; //房主


		public constructor() {
			super();
		}
		public destory():void{
			super.destory();
			if(this._headMc){
				this._headMc.destory();
				this._headMc=null;
			}
			ResUtil.removeAllChildren(this);
			ResUtil.removeFromParent(this);

			this._userVo = null;
			this._nameTxt=null;
			this._chipTxt=null;

		}
		public initUI():void{
			this._labelBg = ResUtil.createBitmapByName("bg_neikuang_2_png");
			var rect:egret.Rectangle = new egret.Rectangle(5,5,30,30);
			this._labelBg.scale9Grid = rect;
			this.addChild(this._labelBg);
			this._labelBg.y = 125;
			this._labelBg.height = 31;
			this._labelBg.width = 123;

			this._labelBg1 = ResUtil.createBitmapByName("bg_neikuang_2_png");
			var rect:egret.Rectangle = new egret.Rectangle(5,5,30,30);
			this._labelBg1.scale9Grid = rect;
			this._labelBg1.height = 31;
			this._labelBg1.width = 123;
			this.addChild(this._labelBg1);
			this._labelBg1.y = this._labelBg.y + 5 + this._labelBg.height;

			this._nameTxt=ResUtil.createTextFeild(0xFFFFFF,egret.HorizontalAlign.CENTER,"",26,10,this._labelBg.y + 5,-1);
			this._nameTxt.lineSpacing = 5;
          	this.addChild(this._nameTxt);

			this._integration=ResUtil.createTextFeild(0xFFFFFF,egret.HorizontalAlign.CENTER,"",26,10, this._labelBg1.y+5,-1);
			this.addChild(this._integration);
			this._integration.text = "0";

			this._headMc = new HeadMc(80,80);
            this._headMc.x = 3;
            this._headMc.y = 3;
            this.addChild(this._headMc);

			this._roleIcon = ResUtil.createBitmapByName("icon_dizhu_png");
			this._roleIcon.x = 65;
			this._roleIcon.y = -10;
			this._roleIcon.visible = false;
			this.addChild(this._roleIcon);


			this._signal = ResUtil.createBitmapByName("nosignal");
			this._signal.x = 25;
			this._signal.y = 15;
			this.addChild(this._signal);

			this._host = ResUtil.createBitmapByName("host");
			this._host.x = 10;
			this._host.y = 25;
			this.addChild(this._host);


			this._head_blackCard = ResUtil.createBitmapByName("icon_reside_cards_png");
			this._head_blackCard.x = 30;
			this._head_blackCard.y = this._labelBg1.y +  this._labelBg1.height + 5;
			this.addChild(this._head_blackCard);
			this._handCardNum = ResUtil.createTextFeild(GameUtil.white,egret.HorizontalAlign.RIGHT,"x0",20,-30,this._head_blackCard.y + 10,125);
			this.addChild(this._handCardNum);
			this._mingPaiImg = ResUtil.createBitmapByName("label_mingpai_2_png");
			this.addChild(this._mingPaiImg);
			this._mingPaiImg.x = this.width / 2 - 40;
			this._mingPaiImg.y = - 30;
			this._mingPaiImg2 = ResUtil.createBitmapByName("label_mingpai_png");
			this.addChild(this._mingPaiImg2);
			this._fangzhuImg = ResUtil.createBitmapByName("icon_fangzhu_png");
			this.addChild(this._fangzhuImg);
			this._fangzhuImg.x = 10;
			this._fangzhuImg.y = 70;
			this._fangzhuImg.visible  = false;
			this._mingPaiImg2.visible = false;
			this._mingPaiImg.visible = false;
			this.updateStatus();
		}

		public  updateData(vo:UserVo):void{
			this._userVo=vo;
			if(vo == null)return;
			this._nameTxt.text=vo.nickName;
			this._headMc.headUrl = this._userVo.headUrl;
			this._fangzhuImg.visible = vo.isOwer == 1 ? true : false;
		}



		//设置明牌标签
		public setMingPaiLabel(uid:number):void {

			if (this._mingPaiImg.visible) return;
			this._mingPaiImg2.visible = true;
			this._timeId = egret.setTimeout(()=>{
				this._mingPaiImg2.visible = false;
				this._mingPaiImg.visible = true;

			},this,2000);
		}



		//设置头像明牌标签
		public setRoleMingLabel(uid:number):void {

			this._mingPaiImg2.visible = false;
			this._mingPaiImg.visible = true;
		}

		//重置明牌标签
		public resetMingPaiLabel():void {

			if (this._timeId) {

				egret.clearTimeout(this._timeId);
			}
			this._mingPaiImg.visible = false;
			this._mingPaiImg2.visible = false;
		}


		//第三个位置的视图
		public setPositionView(pos:number):void {

			if (pos == 0) {
				this.hideRoleView();
				this._integration.x = 505;
				this._integration.y = 85;
				this._nameTxt.x =200;
				this._nameTxt.y = 85;
				GameUtil.setPosBySeat(this._mingPaiImg2,0,PKGame.CardInfo.getInstance().mingPaiLabelArr);
			}else if (pos == 1){
				this._integration.x = 10;
				this._integration.y = this._labelBg1.y + 5;
				this._nameTxt.x = 10;
				this._nameTxt.y = this._labelBg.y + 5;
				this.showPlayerView();
				GameUtil.setPosBySeat(this._mingPaiImg2,1,PKGame.CardInfo.getInstance().mingPaiLabelArr);

			}else if (pos == 2) {
				this._integration.x = 10;
				this._integration.y = this._labelBg1.y + 5;
				this._nameTxt.x = 10;
				this._nameTxt.y = this._labelBg.y + 5;
				this.showPlayerView();
				GameUtil.setPosBySeat(this._mingPaiImg2,3,PKGame.CardInfo.getInstance().mingPaiLabelArr);
			}

		}


		//更新积分
		public updataChips(chips:number):void{
			if (chips > 0) {

			}
			this._integration.text = chips.toString();

		}

		/**
		 * 刷新玩家手牌数量
		 */
		public updateCardNum(value:number){

			this._handCardNum.text = "x" + value;

		}
		/**
		 * 是否是地主
		 */
		public setRole(gender:number,isLand:boolean){

			if(isLand){

				this._roleIcon.visible = true
			}else {
				this._roleIcon.visible = false;

			}

		}

		//隐藏自己的一些视图
		private hideRoleView():void {
			// this._chipTxt.visible = false;
			this._labelBg.visible = false;
			this._labelBg1.visible = false;
			this._head_blackCard.visible = false;
			this._handCardNum.visible = false;
		}

		//显示其他玩家视图
		private showPlayerView():void {
			this._labelBg.visible = true;
			this._labelBg1.visible = true;
			// this._chipTxt.visible = true;
			this._head_blackCard.visible = true;
			this._handCardNum.visible = true;

		}
		/**
		 * 还原头像
		 */
		public resetRole(){
			this._roleIcon.visible = false;
		}
		/**
		 * 结算飘字
		 */
		public floatClear(value: number) {
			var accountPanel: egret.Sprite = new egret.Sprite;
			accountPanel.x = 0;
			accountPanel.y = 75;
			accountPanel.alpha = 0;
			var account: ui.AlignBitmapText;
			if (value >= 0) {
				account = this.createAlignBitmapText("winFloat_fnt", "", 0, 0, 120, egret.HorizontalAlign.CENTER);
				account.text = "+" + value;
			}
			else {
				account = this.createAlignBitmapText("loseFloat_fnt", "", 0, 0, 120, egret.HorizontalAlign.CENTER);
				var str: string = value + "";
				account.text = "-" + Number(str.substring(1));
			}
			accountPanel.addChild(account);
			this.addChild(accountPanel);
			var tween: egret.Tween = egret.Tween.get(accountPanel).wait(2500).to({ alpha: 1 }, 100).to({ y: 25 }, 500).wait(1500).to({ y: 5 }, 200).call(this.moveComplete, this, [accountPanel]);
		}
		private moveComplete(account: egret.Sprite) {
        if (account) {
            egret.Tween.removeTweens(account);
            uniLib.DisplayUtils.removeAllChildren(account);
            uniLib.DisplayUtils.removeAllChildren(account);
        }
    }
		/**
		 *  1正常
		 *  0离线
		 *  2网络差
		 *  3离开
		 *  4电话中
		 *  5托管中
		 *  信号状态 true:信号不好 fasle 信号好
		 */
		public updateStatus(value: Cmd.OnlineState = Cmd.OnlineState.OnlineState_Online) {
			switch (value) {
				case Cmd.OnlineState.OnlineState_Online:
					//正常
					this._headMc.isOnLine(true);
					this._signal.visible = false;
					this._host.visible = false;
					break;
				case Cmd.OnlineState.OnlineState_Offline:
					//离线
					this._headMc.isOnLine(false);
					this._signal.visible = false;
					this._host.visible = false;
					break;
				case Cmd.OnlineState.OnlineState_Leave:
					//离开
					this._signal.visible = false;
					this._host.visible = false;
					break;
				case Cmd.OnlineState.OnlineState_Slow:
					//网络差

					this._headMc.isOnLine(true);
					this._signal.visible = true;
					this._host.visible = false;
					break;
				case Cmd.OnlineState.OnlineState_Calling:
					//电话中
					this._headMc.isOnLine(true);
					this._signal.visible = false;
					this._host.visible = false;
					break;
				case Cmd.OnlineState.OnlineState_Hosting:
				    //托管中
					this._signal.visible = false;
					this._host.visible = true;
				    break;
			}
		}
		public reset():void{
		}
		public get seatId():number{
			return this._seatId;
		}
		public set seatId(num:number){
			this._seatId=num;
		}
		public get data():UserVo{
			return this._userVo;
		}
		private createAlignBitmapText(fontName: string,text: string,x: number = 0,y: number = 0,width: number = -1,hAlign: string = "left"): ui.AlignBitmapText {
			var tf: ui.AlignBitmapText = new ui.AlignBitmapText();
			if(width != -1) {
				tf.width = width;
			}
			tf.font = RES.getRes(fontName);
			tf.text = text;
			tf.x = x;
			tf.y = y;
			tf.hAlign = hAlign;
			return tf;
		}
	}
}