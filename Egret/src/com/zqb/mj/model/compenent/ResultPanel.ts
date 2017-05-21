module PKGame {
	export class ResultPanel extends BaseVc{
		private _data:Cmd.FinalScorePokerCmd_Brd;
		private _startBtn:egret.Bitmap;
		private _content:egret.Sprite;
		public constructor() {
			super();
		}
		public destory():void{
			super.destory();
			if(this._startBtn){
				this._startBtn.touchEnabled=false;
				this._startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReady,this);
				this._startBtn=null;
			}
			if(this._content){
				uniLib.DisplayUtils.removeAllChildren(this._content);
				uniLib.DisplayUtils.removeFromParent(this._content);
			}
			this._content = null;
			ResUtil.removeAllChildren(this);
			ResUtil.removeFromParent(this);
			this._data = null;
		}
		public initUI():void{
			this.touchEnabled = true;
			this.touchChildren = true;
			var bg:egret.Bitmap=ResUtil.createBitmapByName("result_bg");
			bg.scale9Grid=new egret.Rectangle(430,120,15,30);
			bg.width= uniLib.Global.screenWidth - 2 * 89;
			bg.height= uniLib.Global.screenHeight - 2*28;	
			this.addChild(bg);
			var titleBg:egret.Bitmap=ResUtil.createBitmapByName("result_title",28,20);
			this.addChild(titleBg);
			this._startBtn=ResUtil.createBitmapByName("result_start",460,590);
			this._startBtn.touchEnabled=true;
			this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReady,this);
			this.addChild(this._startBtn);
			//半自摸
			var roomType:egret.TextField = ResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.CENTER,"半自摸",20,920,35,68);
			roomType.text = RoomInfo.getInstance().getPlayType();
			this.addChild(roomType);	

			this._content = new egret.Sprite;
			this.addChild(this._content);		
		}
		public  setResultData(rev:Cmd.FinalScorePokerCmd_Brd):void{
			this.reset();
			this._data = rev;
			var rewardSet:Cmd.UserRecord[] = rev.recordInfo;
			for(let i:number = 0;i<rewardSet.length;i++){
				let reward:Cmd.UserRecord = rewardSet[i];
				if(reward.uid == uniLib.UserInfo.uid && reward.isWinner!=0){
                	uniLib.SoundMgr.instance.playSound(SoundConsts.WIN);	
				}
				else{
					uniLib.SoundMgr.instance.playSound(SoundConsts.LOSE);	
				}
			}		
			if(PKGame.RoomInfo.getInstance().host_mode)
				egret.setTimeout(this.onReady, this, 4000);
		}
		/**
		 * 每个玩家的结果
		 * 姓名 牌型
		 * 手牌
		 */
		private setHandler(x:number,y:number,cardObj:Cmd.RewardObj):egret.Sprite{
			var panel:egret.Sprite = new egret.Sprite;
			panel.x = x;
			panel.y = y;

			var bg:egret.Bitmap;
			if(cardObj.winType >0){
				bg = ResUtil.createBitmapByName("result_winBg");
			}
			else{
				bg = ResUtil.createBitmapByName("result_loseBg")
			}
			bg.scale9Grid = new egret.Rectangle(14,39,6,22);
			bg.width = 1055;
			bg.height = 122;
			bg.x = 23;
			panel.addChild(bg);

			var cardPanel:egret.Sprite = new egret.Sprite;
			cardPanel.x = 60;
			cardPanel.y = 45;
			panel.addChild(cardPanel);
			
			// this.setCardOrder(cardObj.userCard,0,cardPanel);
			//得分
			var point:ui.AlignBitmapText;
			if(cardObj.totalReward>=0){
				point = this.createAlignBitmapText("win_fnt","",700,40,65,egret.HorizontalAlign.CENTER);
				point.text = "+"+cardObj.totalReward.toString();
			}
			else{
				point = this.createAlignBitmapText("lose_fnt","",700,40,65,egret.HorizontalAlign.CENTER);
				point.text = cardObj.totalReward.toString();
			}		
		    panel.addChild(point);
			return panel;
		}
		/**
		 * 单个玩家手牌排序
		 */
		private setCardOrder(cardObj:Cmd.UserCardObj = null,winCardId:number = 0,cardMc:egret.DisplayObjectContainer = null){
			var cardsArr:Array<number>=[];
			var operateCard:GroupCard;
			var operate:OperatVo = new OperatVo;
			//手牌
			if(!cardObj.handCardSet){
				cardObj.handCardSet = [];
			}
			var handCards: number[] = cardObj.handCardSet;
			for (var i: number = 0; i < handCards.length; i++) {
				let cardId = handCards[i];
				cardsArr.push(cardId);			
			}
			cardsArr.sort(function(a: any,b: any): number{
                if(a > b) return 1;
                else if(a == b) return 0;
                return -1;
            });
			if(winCardId !=0){
				cardsArr.push(winCardId);
			}

			/************************showCards***************************/			
			var card:OutPutCard;
			var initX:number= cardMc.width+4;
			for (var i:number = 0; i < cardsArr.length; i++) {
				card=new OutPutCard();
				card.setCard(0,cardsArr[i],1,true);
				card.x=initX+42*i;
				if(i==cardsArr.length-1 && winCardId!= 0){
					card.x+=8;
				}
				cardMc.addChild(card);
			}
		}	
		
		private onReady():void{
			if(this.hasEventListener(UIEventConsts.READY)){
				// this.removeEventListener(UIEventConsts.READY, this.onResultHandle, this);
				this.reset();
			}
			uniLib.DisplayUtils.removeFromParent(this);
			if(uniLib.Global.debugLevel >=1){
				this.dispatchEventWith(UIEventConsts.SHOW_GM_PANEL);
			}
			else{
				this.dispatchEventWith(UIEventConsts.READY);
			}
		}
		
		public  reset():void{
			this._data = null;
			uniLib.DisplayUtils.removeAllChildren(this._content);
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
		
		private getReward(reward:number){
			var txt:string = "";
			if(reward>=0){
				txt = "+"+reward;
			}else{
				txt = reward+"";
			}
			return txt;
		}
		private getRewardTxt(multiType:number,flower:number):string{	
			return PKtable.TableMahjongMulti.selectNameById(multiType);
		}
	}	
}