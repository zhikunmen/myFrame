module PKGame {
	export class OperateVc extends BaseVc{
		private _curIndex:number;
		private _actMcArr:any[];
		private actionCard:MySelfCard;//提示要碰或者杠的牌
		private _initPoint:egret.Point;
		private _overPanel:egret.Sprite;//流局
		private _actionMcStrArr:Array<string>;
		private _actionMc:egret.DisplayObjectContainer;
		private _chowPanel:ChowCardsPanel;
		public constructor() {
			super();
		}
		public destory():void{
			super.destory();
			if(this.timer_100){
				this.timer_100.stop();
			}
			this.timer_100 = null;
			if(this.actionCard){
				this.actionCard.destory();
			}
			this.actionCard = null;
			if(this._actMcArr){
				var actionObj:any;
				var btn:GameButton 
				for(var i=0;i<this._actMcArr.length;i++){
					actionObj=this._actMcArr[i];
					btn= actionObj.actionMc;
					btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onActionHandle,this);
					btn.touchEnabled=false;
					btn.destory();
				}
				actionObj = 0;
				this._actMcArr=null;
			}
			if(this._overPanel){
				uniLib.DisplayUtils.removeAllChildren(this._overPanel);
				uniLib.DisplayUtils.removeFromParent(this._overPanel);
			}
			this._overPanel = null;
			if(this._actionMc){
				ResUtil.removeAllChildren(this._actionMc);
				ResUtil.removeFromParent(this._actionMc);
			}
			this._actionMc=null;
			if(this._chowPanel){
				this._chowPanel.removeEventListener(UIEventConsts.ACTION_STOP_CHOW,this.onUserOpera,this);
				if(this._chowPanel.hasEventListener(UIEventConsts.ACTION_BEGIN_CHOW)){
					this._chowPanel.removeEventListener(UIEventConsts.ACTION_BEGIN_CHOW,this.onUserOpera,this);
				}
				if(this._chowPanel.hasEventListener(UIEventConsts.ACTION_BEGIN_KONG)){
					this._chowPanel.removeEventListener(UIEventConsts.ACTION_BEGIN_KONG,this.onUserOpera,this);
				}
				uniLib.DisplayUtils.removeAllChildren(this._chowPanel);
				uniLib.DisplayUtils.removeFromParent(this._chowPanel);
			}
			this._chowPanel = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);			
			this._second = 0;
			this._initPoint=null;
			this._actionMcStrArr=null;
		}
		
		public initUI():void{
			this._actMcArr=[];
			var actionObj:any;
			var actionMc:GameButton;
			this._initPoint=new egret.Point((uniLib.Global.screenWidth)/2 , uniLib.Global.screenHeight/2+50);
			//index,0，不叫，1.一分，2.二分，3三分，4不出，5.出牌，6.提示。
			this._actionMcStrArr=["btn_bujiao_","btn_oneScore_","btn_twoScore_","btn_threeScore_","btn_pass_","btn_chupai_","btn_tip_",
			"btn_start_mingpai_","btn_mingpai_"
			];
			for (var i:number = 0; i < this._actionMcStrArr.length; i++) {
				actionMc=new GameButton([this._actionMcStrArr[i]+"1_png",this._actionMcStrArr[i]+"2_png",this._actionMcStrArr
				[i] + "3_png"],null,false);
				actionObj={};
				actionObj.index=i;
				actionObj.actionMc=actionMc;
				actionMc.name="action"+i;
				actionMc.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onActionHandle,this);
				this._actMcArr.push(actionObj);
			}
			this._actionMc=new egret.DisplayObjectContainer();
			this.addChild(this._actionMc);

			this._overPanel = new egret.Sprite;
			this.addChild(this._overPanel);		

			this.timer_100 = new uniLib.TimerBase(100,this.countSecond,this);
			this.timer_100.stop();
		}
		public startGame():void{
			this.removeAction();
			this._second = 0;
			uniLib.DisplayUtils.removeAllChildren(this._overPanel);
		}
		/**
		 * type:1 叫分
		 * type:2 出牌
		 */
		public showAction(type:number,arr:Array<number>):void{

			
			var gap:number = 0;
			if(!arr||arr.length==0){
				return;
			}
			//暂时删除服务器传来10的听牌按钮，如果需要请注释，并在下面addAction中查找吃牌，自行添加素材
			if(arr.length==1 && arr[0] == 10){
				return;
			}
			// uniLib.SoundMgr.instance.playSound(SoundConsts.DRAW_OTHER_TURN);
			let actionArr:Array<any>=[];
			let actionObj:GameButton;
			let showArr:number[] = arr;//显示的按钮，arr为可点按钮
			if(type == 1){
				showArr = [0,1,2,3];
				gap = 185;
			}
			else{
				gap = 200;
			}
			for (let i:number = 0; i < showArr.length; i++) {
				let isEnable:boolean = ArrayUtil.isInArray(showArr[i],arr);
				actionObj = this.addAction(showArr[i],isEnable);
				if(actionObj){
					if(actionArr.indexOf(actionObj)==-1){
						actionArr.push(actionObj);
					}
				}
			}
			this._initPoint.x = (uniLib.Global.screenWidth - actionArr.length * 173)>>1;
			var mc:GameButton;
			for (var j:number =0; j < actionArr.length; j++) {
				mc = actionArr[j].actionMc;
				mc.x = this._initPoint.x + j*gap;
				mc.y = this._initPoint.y;
				this._actionMc.addChild(mc);	
			}

			if(PKGame.RoomInfo.getInstance().host_mode){
				let evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP, false);
				evt.$currentTarget = actionArr[0].actionMc;
				this.onActionHandle(evt);
			}
		}

	
		/**
		 * type:(1要的起，2要不起)
		 * num :(1 - 按钮全亮, 2 - 只亮“不出”按钮, 3 - 只暗“不出”按钮)
		 */
		public setButtonView(type:number,num:number):void {
			// this.removeAction();

			if (type == 1) {
				if (num == 1) {
					for (var i:number = 4; i < 7; i++) {
						var btn:GameButton = this._actMcArr[i].actionMc;
						this._actionMc.addChild(btn);
						GameUtil.setPosBySeat(btn,0,[{"x":0,"y":-250}]);
						btn.x = uniLib.Global.screenWidth / 2 - 270  + (i - 4)*200;
					}

					this.addAction(4,true);
					this.addAction(5,true);
					this.addAction(6,true);

				}else if (num == 2) {
					for (var i:number = 4; i < 7; i++) {
						var btn:GameButton = this._actMcArr[i].actionMc;

						this._actionMc.addChild(btn);
						GameUtil.setPosBySeat(btn,0,[{"x":0,"y":-250}]);
						btn.x = uniLib.Global.screenWidth / 2 - 270  + (i - 4)*200;
					}
					this.addAction(4,true);
					this.addAction(5,false);
					this.addAction(6,false);
				}else if (num == 3) {

					for (var i:number = 4; i < 7; i++) {
						var btn:GameButton = this._actMcArr[i].actionMc;
						this.addAction(5,true);
						this._actionMc.addChild(btn);
						GameUtil.setPosBySeat(btn,0,[{"x":0,"y":-250}]);
						btn.x = uniLib.Global.screenWidth / 2 - 270  + (i - 4)*200;
					}
					this.addAction(4,false);
					this.addAction(5,true);
					this.addAction(6,true);
				}
			}else if (type == 2) {

				if (num == 1) {
					for (var i:number = 4; i < 7; i++) {
						var btn:GameButton = this._actMcArr[i].actionMc;
						this._actionMc.addChild(btn);
						GameUtil.setPosBySeat(btn,0,[{"x":0,"y":-250}]);
						btn.x = uniLib.Global.screenWidth / 2 - 270  + (i - 4)*200;
					}

					this.addAction(4,true);
					this.addAction(5,true);
					this.addAction(6,true);

				}else if (num == 2) {
					for (var i:number = 4; i < 7; i++) {
						var btn:GameButton = this._actMcArr[i].actionMc;

						this._actionMc.addChild(btn);
						GameUtil.setPosBySeat(btn,0,[{"x":0,"y":-250}]);
						btn.x = uniLib.Global.screenWidth / 2 - 270  + (i - 4)*200;
					}
					this.addAction(4,true);
					this.addAction(5,false);
					this.addAction(6,false);
				}else if (num == 3) {

					for (var i:number = 4; i < 7; i++) {
						var btn:GameButton = this._actMcArr[i].actionMc;
						this.addAction(5,true);
						this._actionMc.addChild(btn);
						GameUtil.setPosBySeat(btn,0,[{"x":0,"y":-250}]);
						btn.x = uniLib.Global.screenWidth / 2 - 270  + (i - 4)*200;
					}
					this.addAction(4,false);
					this.addAction(5,true);
					this.addAction(6,true);
				}
		}

		}

		//删除发牌中名牌按钮
		public removeFaMingBtn():void {

			if (this._actionMc.numChildren) {
				for (var i:number = 0; i < this._actionMc.numChildren; i++) {
					var node:any = this._actionMc.getChildAt(i);
					if (node.actionMc &&node.actionMc.name == "action_7") {

						this._actionMc.removeChild(node.actionMc);
					}


				}
			}
		}
		//开始明牌按钮
		//type 1，表示发牌前开始明牌，2，表示发牌后明牌
		public showStartMingPaiBtn(type:number):void {
			// this.removeAction();
			if (type == 1) {
				var btn:GameButton = this._actMcArr[this._actionMcStrArr.length - 2].actionMc;
				this.addAction(this._actionMcStrArr.length - 2,true);
				this._actionMc.addChild(btn);
				GameUtil.setPosBySeat(btn,0,[{"x":0,"y":-250}]);
			}else if (type == 2) {
				var btn:GameButton = this._actMcArr[this._actionMcStrArr.length - 1].actionMc;
				this.addAction(this._actionMcStrArr.length - 1,true);
				this._actionMc.addChild(btn);
				GameUtil.setPosBySeat(btn,0,[{"x":0,"y":-100}]);
			}
		}
		private  addAction(id:number,isEnable:boolean):any{
			let btn:GameButton = this._actMcArr[id].actionMc;
			btn.setEnable(isEnable);
			return this._actMcArr[id];
		}
	
		public  removeAction():void{
			if(this._actionMc){
				PKGame.CardInfo.getInstance().cardTipArr = [];
				PKGame.CardInfo.getInstance().cardTipIndex = 0;
				uniLib.DisplayUtils.removeAllChildren(this._actionMc);
			}
		}



		public setActionVisible(isShow:boolean):void{
			if(this._actionMc){
				this._actionMc.visible = isShow;
			}
		}

		private  dispatch(eventName:string,data:any=null):void{
			this.dispatchEventWith(eventName,false,data);
		}

		private  onActionHandle(evt:egret.TouchEvent):void{
			var actionMc:egret.Bitmap=evt.currentTarget;
			this._curIndex=Number(actionMc.name.slice(6));
			switch(this._curIndex){
				case 0:
					this.dispatch(UIEventConsts.ACTION_STAKE,this._curIndex);
					break;
				case 1:
					this.dispatch(UIEventConsts.ACTION_STAKE,this._curIndex);
					break;
				case 2:
					this.dispatch(UIEventConsts.ACTION_STAKE,this._curIndex);
					break;
				case 3:
					this.dispatch(UIEventConsts.ACTION_STAKE,this._curIndex);
					break;
				case 4://不出
					this.dispatch(UIEventConsts.ACTION_CANCEL,this._curIndex);
					break;
				case 5://出牌
					if (PKGame.CardInfo.getInstance().selectGroup.length) {
						this.dispatch(UIEventConsts.ACTION_DISCARD,this._curIndex);
					}
					break;
				case 6://提示
					this.dispatch(UIEventConsts.ACTION_OPERATE,this._curIndex);
					break;
				case 7: //开始名牌
					this.dispatch(UIEventConsts.ACTION_MINGPAI,this._curIndex);
					break;
				case 8://明牌
					this.dispatch(UIEventConsts.ACTION_MINGPAI,this._curIndex);
					break;

			}
		}
		/**
		 * 流局
		 */		
		private _second:number = 0;
		private timer_100:uniLib.TimerBase;



		private countSecond(){
			this._second++;
			if(this._second >= 20){
				uniLib.DisplayUtils.removeAllChildren(this._overPanel);
				this.timer_100.stop();
				this._second = 0;
			}
		}


		private onUserOpera(evt:egret.Event){
			switch(evt.type){
				case UIEventConsts.ACTION_STOP_CHOW:
					this.setActionVisible(true); 
					break;
				case UIEventConsts.ACTION_BEGIN_CHOW:
					this.dispatch(UIEventConsts.ACTION_CHOW);
					break;
				case UIEventConsts.ACTION_BEGIN_KONG:
					// this.dispatch(UIEventConsts.ACTION_KONG,ddzGame.CardInfo.getInstance().kongThisId);
					break;
			}
		}

	}
}