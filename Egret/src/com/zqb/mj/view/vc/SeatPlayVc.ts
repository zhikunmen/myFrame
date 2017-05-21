module PKGame {
	import LeavePokerCmd_Brd = Cmd.LeavePokerCmd_Brd;
	export class SeatPlayVc extends BaseVc {
		private _chatBtn: GameButton;
		private _seatMc:egret.DisplayObjectContainer;
		private _seatArr:Array<SeatPlayer>;
		private _readyIconArr:Array<egret.Bitmap>;
		private _stakeIconArr:Array<egret.Bitmap>;
		public constructor() {
			super();
		}

		public destory():void{
			super.destory();
			this.removeGiftItems();
			this._giftArr=null;

			if (this._chatBtn) {
				this._chatBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortChat, this);
				this._chatBtn.destory();
				this._chatBtn = null;
			}
			let seatPlayer:SeatPlayer;
			if(this._seatArr&&this._seatArr.length>0){
				for (let index = 0; index < this._seatArr.length; index++) {
					seatPlayer=this._seatArr[index] as SeatPlayer;
					seatPlayer.destory();
			    }
			}
			if(this._readyIconArr){
				for (let i = 0; i < 3; i++) {
					ResUtil.removeFromParent(this._readyIconArr[i]);
				}
			}
			if(this._stakeIconArr){
				for (let i = 0; i < 3; i++) {
					ResUtil.removeFromParent(this._stakeIconArr[i]);
				}
			}
			this.removeSeat();
			this._seatMc = null;
			this._readyIconArr=null;
			this._seatArr=null;


		}

		public initUI():void{
			this._chatBtn = new GameButton(["Lobby_liaotian_1_png", "Lobby_liaotian_2_png"]);
			this._chatBtn.name = "short_btn";
			this._chatBtn.x = uniLib.Global.screenWidth - this._chatBtn.width;
			this._chatBtn.y = uniLib.Global.screenHeight - 350+ this._chatBtn.height;
			this._chatBtn.touchEnabled = true;
			this.addChild(this._chatBtn);
			this._chatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortChat, this);
			this._seatMc=new egret.DisplayObjectContainer();
			this.addChild(this._seatMc);
			this._seatArr=[];
			this._readyIconArr=[];
			this._stakeIconArr = [];

			let readyIcon:egret.Bitmap;
			let mingPaiIcon:egret.Bitmap;
			var pointArr1:Array<egret.Point>=[
				new egret.Point((uniLib.Global.screenWidth - 1136) / 2 + 510, 575),
			new egret.Point((uniLib.Global.screenWidth-1136)/2 + 905,275),
			new egret.Point((uniLib.Global.screenWidth-1136)/2 + 515,73),
			new egret.Point((uniLib.Global.screenWidth-1136)/2 + 128,275)];
			var pointArr2:Array<egret.Point>=[new egret.Point((uniLib.Global.screenWidth-1136)/2 + 510,475),
			new egret.Point((uniLib.Global.screenWidth-1136)/2 + 905,275),
			new egret.Point((uniLib.Global.screenWidth-1136)/2 + 515,73),
			new egret.Point((uniLib.Global.screenWidth-1136)/2 + 128,275)];
			for (let i = 0; i < 3; i++) {

				readyIcon=ResUtil.createBitmapByName("label_ready_png");
				this.addChild(readyIcon);
				var seatId:number = i;
				if (seatId == 2) {
					seatId = 3;
				}
				GameUtil.setPosBySeat(readyIcon,seatId,PKGame.CardInfo.getInstance().readyLabelOffsetArr);
				readyIcon.visible=false;
				this._readyIconArr.push(readyIcon);
			}
			let stakeIcon:egret.Bitmap;
			for (let i = 0; i < 3; i++) {
				stakeIcon=ResUtil.createBitmapByName("");
				this.addChild(stakeIcon);

				stakeIcon.visible=false;
				this._stakeIconArr.push(stakeIcon);
			}
		}
		public  initSeat():void{
			this.removeSeat();
			let userList:Array<UserVo>=RoomInfo.getInstance().userList;
			for (let i:number = 0; i < userList.length; i++) {
				this.addOnePlay(userList[i]);
			}
		}
		public refreshStake(data:Cmd.StakeSet[]){
			if(!data || data.length <= 0) return;
			for(let i:number = 0; i<data.length;i++){
				this.showStake(data[i]);
			}
		}
		/**
		 * 已准备玩家数据刷新
		 */
		public refreshPlayerReady(players:number[]){
			if(!players || players.length <= 0)return;
			for (let i:number = 0; i < players.length; i++) {
				this.showReady(players[i]);
			}
		}
		private  removeSeat():void{
			let len:number=this._seatMc.numChildren;
			let seatPlay:SeatPlayer;
			for (let i:number = 0; i < len; i++) {
				seatPlay=this._seatMc.removeChildAt(0)  as SeatPlayer;
				seatPlay.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.showUseInfo,this);
				this._seatArr.push(seatPlay);
			}
			this.resetReady();
		}

		private onShortChat() {

			PKGame.PublicManage.getInstance().showMildWarnShow("系统暂未开放");
			return;
			var mediator =GameUtil.getViewByName(PKMediator.NAME);
			mediator.showChatPanel();
		}
		/**
		 *移除玩家 
		 * @param uid
		 */		
		public  removePlayer(uid:number):void{
			let seatPlay:SeatPlayer;
			seatPlay=this._seatMc.getChildByName("seat"+uid) as SeatPlayer;
			if(seatPlay){
				this._readyIconArr[seatPlay.seatId].visible=false;
				// this._mingPaiIconArr[seatPlay.seatId].visible = false;
				if(seatPlay&&seatPlay.parent){
					this._seatMc.removeChild(seatPlay);
					seatPlay.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.showUseInfo,this);
					this._seatArr.push(seatPlay);
				}
			}
			
		}
		private addOnePlay(vo:UserVo):void{
			
			this.removePlayer(vo.uid);
			let seat:number=RoomInfo.getInstance().getSeatNo(vo.seatId);
			if(isNaN(seat))return;
			let seatPlay:SeatPlayer;
			if(this._seatArr.length>0){
				seatPlay=this._seatArr[0];
				this._seatArr.splice(0,1);
			}else{
				seatPlay=new SeatPlayer();
			}
			seatPlay.name="seat"+vo.uid;
			seatPlay.updateData(vo);
			seatPlay.updateStatus(vo.onlineState);
			seatPlay.seatId=seat;
			this._seatMc.addChild(seatPlay);
			var seatId:number = seat;
			if (seatId === 2) {
				seatId = 3;
			}
			let point:egret.Point=PositionData.seatPosArr[seatId];
			seatPlay.x=point.x;
			seatPlay.y=point.y;
			seatPlay.setPositionView(seat);
			seatPlay.touchEnabled=true;
			seatPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showUseInfo,this);
			if(vo.bReady){
				this.showReady(vo.uid);
			}
		}
		private showUseInfo(evt:egret.TouchEvent):void{
			let seatPlay:SeatPlayer=evt.currentTarget as SeatPlayer;
			this.dispatchEventWith(UIEventConsts.SHOW_USER_INFO,false,seatPlay.data.uid);
		}
		private getPlayByUserId(uid:number):SeatPlayer{
			let seatPlayer:SeatPlayer=this._seatMc.getChildByName("seat"+uid) as SeatPlayer;
			return seatPlayer;
		}
		/**
		 * 其他玩家进入游戏
		 */
		public  addSeatPlayer(vo:UserVo):void{
			this.addOnePlay(vo);
		}
		public  reset():void{
			let len:number=this._seatMc.numChildren;
			let seatPlayer:SeatPlayer;
			for (var index = 0; index < len; index++) {
				seatPlayer=this._seatMc.getChildAt(index) as SeatPlayer;
				seatPlayer.reset();
			}
		}
		public updatePlayers(arr:any):void{
			let seatPlayer:SeatPlayer;
			for (let index = 0; index < arr.length; index++) {
				seatPlayer=this.getPlayByUserId(arr[index].uid);
				seatPlayer.updataChips(arr[index].points);
			}
		}
		private _giftArr:GiftAnItem[];
		private _index:number = 0;
		public  showGift(vo:Cmd.SendGiftPokerCmd_Brd):void{
			this._giftArr = [];
			let sendSeatId:number=RoomInfo.getInstance().getSeatNoByUserId(vo.gift.fromUid);
			let seatPlay:SeatPlayer=this.getPlayByUserId(vo.gift.fromUid);
			if(!seatPlay){
				return;
			}
			let toUser:number[] = [];
			if(vo.gift.toUid == 0){
				//群发
				toUser = RoomInfo.getInstance().getUidNotSendID(vo.gift.fromUid);
			}
			else{
				toUser = [vo.gift.toUid];
			}
			if(toUser.length<=0)return;
			this._index = egret.setTimeout(()=>{this.countTime();}, null, 2500);
			for (let i: number = 0; i < toUser.length; i++) {
				this.sendGift(vo.gift.giftsId,toUser[i],sendSeatId);
			}
		}
		private sendGift(giftId:number,toUid:number,fromSeat:number){
			let giftItem:GiftAnItem;
			let point:egret.Point;
			let seatId:number;
			giftItem=new GiftAnItem();
			giftItem.giftId=giftId;
			//接收者
			seatId=RoomInfo.getInstance().getSeatNoByUserId(toUid);
			point=PositionData.seatPosArr[seatId];
			giftItem.x=PositionData.seatPosArr[fromSeat].x+48;
			giftItem.y=(PositionData.seatPosArr[fromSeat].y+46)*uniLib.ScreenUtils.scaleFactor;
			this._giftArr.push(giftItem);
			GameInfo.topLayer.addChild(giftItem);
			egret.Tween.get(giftItem).to({x:point.x+48,y:(point.y+46)*uniLib.ScreenUtils.scaleFactor},400,egret.Ease.circOut).call(this.giftMoveEnd,this,[giftItem])
		}
		private countTime(){
			egret.clearTimeout(this._index);
			this.removeGiftItems();
			this._index = 0;
		}
		private removeGiftItems():void{
			if(!this._giftArr){
				return;
			}
			for (let i:number = 0; i < this._giftArr.length; i++) {
				let gift:GiftAnItem = this._giftArr[i];
				if(gift){
					gift.destory();
					uniLib.DisplayUtils.removeFromParent(gift);
				}
			}
			this._giftArr=[];
		}
		private giftMoveEnd(giftItem:GiftAnItem):void{
			egret.Tween.removeTweens(giftItem);
			giftItem.play();
		}
		private showReady(userId:number):void{
			let seatId:number=RoomInfo.getInstance().getSeatNoByUserId(userId);
			if(isNaN(seatId))return;
			if(!PKGame.RoomInfo.getInstance().isStart){
				this._readyIconArr[seatId].visible=true;
			}
		}





		public resetReady():void{
			for (var i = 0; i < 3; i++) {
				this._readyIconArr[i].visible=false;
			}
		}
		/**
		 * 显示叫分
		 */
		private showStake(data:Cmd.StakeSet){
			let seatId:number=RoomInfo.getInstance().getSeatNoByUserId(data.uid);
			if(isNaN(seatId))return;
			var icon:egret.Bitmap = this._stakeIconArr[seatId];
			icon.texture = ResUtil.createTexture("label_jiaofen_"+data.multi + "_png");
			icon.visible = true;
			if (seatId == 2) {
				seatId = 3;
			}
			GameUtil.setPosBySeat(icon,seatId,PKGame.CardInfo.getInstance().readyLabelOffsetArr);
		}
	    public resetStake():void{
			for (var i = 0; i < 3; i++) {
				this._stakeIconArr[i].visible=false;
			}
		}
		public setRole(){
			var users = RoomInfo.getInstance().userList;
			for (var i = 0; i < users.length; i++) {
				var user:UserVo = users[i];
				let seatPlay:SeatPlayer=this.getPlayByUserId(user.uid);
				if(user.uid == RoomInfo.getInstance().landownerId){
					seatPlay.setRole(user.getGender(),true);
				}
				else{
					seatPlay.setRole(user.getGender(),false);
				}
			}
		}
		public resetRole(){
			var users = RoomInfo.getInstance().userList;
			for (var i = 0; i < users.length; i++) {
				var user:UserVo = users[i];
				let seatPlay:SeatPlayer=this.getPlayByUserId(user.uid);
				seatPlay.resetRole();
			}
		}
		/**
		 * 默认
		 *  //0正常 1暂时离开 2 断线
		 *  1正常
		 *  0离线
		 *  2网络差
		 *  3离开
		 *  4电话中
		 *  5托管中
		 */
		public updateStatus(userId: number, value: Cmd.OnlineState){
			let seatPlay:SeatPlayer=this.getPlayByUserId(userId);
			if(seatPlay){
				seatPlay.updateStatus(value);
			}
		}
		/**玩家积分改变，飘字 */
		public floatPoint(data:Cmd.ChangePointPokerCmd_Brd){
			let seatPlay:SeatPlayer=this.getPlayByUserId(data.uid);
			if(seatPlay){
				// seatPlay.floatClear(data.points);
			}
		}
		/**
		 * 刷新手牌数量
		 */
		public updateCardNum(uid:number){

			let seatPlay:SeatPlayer=this.getPlayByUserId(uid);
			let seatId = RoomInfo.getInstance().getSeatNoByUserId(uid);
			let count = CardInfo.getInstance().userHandCount[seatId];
			if (count == undefined) return;

			if(seatPlay){
				seatPlay.updateCardNum(count);
			}
		}
		/**
		 * 更新发牌动画的手牌数量
		 * **/

		public updateFaCardsNum(num:number):void {

			for (var i:number = 0; i < PKGame.RoomInfo.getInstance().userList.length; i++) {
				if (PKGame.RoomInfo.getInstance().userList[i]["uid"] != PKGame.MyUserInfo.getInstance().userId) {
					var uId:number = PKGame.RoomInfo.getInstance().userList[i]["uid"];
					let seatPlay:SeatPlayer=this.getPlayByUserId(uId);
					let seatId = RoomInfo.getInstance().getSeatNoByUserId(uId);
					let count = num;
					if(seatPlay){
						if (PKGame.RoomInfo.getInstance().diPaiArr.length) {
							if (uId == PKGame.RoomInfo.getInstance().landownerId) {
								count = 20;
							}else {
								count == 17;
							}
						}
						seatPlay.updateCardNum(count);
					}

				}
			}
		}
		//设置明牌标签
		public setMingPaiLabel(uid:number):void{

			var seatPlay:SeatPlayer = this.getPlayByUserId(uid);
			var seat:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(uid);
			if (seatPlay) {
				console.log("================第"+seat+"位置明牌=====================");
				seatPlay.setMingPaiLabel(uid);
			}


		}

		//设置头像明牌标签
		public setRoleMingLabel(uid:number):void {

			var seatPlay:SeatPlayer = this.getPlayByUserId(uid);
			if (seatPlay) {
				seatPlay.setRoleMingLabel(uid);
			}

		}

		//重置明牌标签
		public resetMingPaiLabel():void {
			for (var i:number =0; i < PKGame.RoomInfo.getInstance().userList.length; i++) {
				var seatPlay:SeatPlayer = this.getPlayByUserId(PKGame.RoomInfo.getInstance().userList[i]["uid"]);
				if (seatPlay) {
					seatPlay.resetMingPaiLabel();
				}

			}
		}

		/*
		 * 初始发牌
		 */
		public resetCardNum(){
			var list = RoomInfo.getInstance().userList;
			for(let i = 0;i<list.length;i++){
				let vo:UserVo = list[i];
				this.updateCardNum(vo.uid);
			}
		}
	}
}