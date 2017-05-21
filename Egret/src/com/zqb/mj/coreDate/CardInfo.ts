module PKGame {
	/**
	 *
	 * 房间主要数据
	 *
	 */
	export class CardInfo {
		private static instance: CardInfo;
		/**
		 * 所有玩家手牌，按照seatId 0-3排列
		 */
		public allHandCardSet: number[][];
		/**
		 * 所有玩家操作牌
		 */
		public allOpCardSet: OperatVo[][];
		/**
		 * 所有玩家花牌
		 */
		public allFlowerCardSet: number[][];
		/**
		 * 所有玩家打出去的牌
		 */
		public allOutCardSet: number[][];

		/**牌堆数据 */
		public heapCard: number[] = [];
		
		/**杠牌ID */
		public kongThisId: number;
		//最新的出牌的位置
		public outCardSeatId:number;
		
		/**是否听牌数据被刷新 */
		public freshListenData: boolean = false;
		/**其他玩家默认手牌13张 */
		public userHandCount: number[] = [];
		/**当自己为庄家时 第十四张牌的thisId 临时保存点*/
		public bankerThisId: number;
		public selectGroup:number[] = [];

		public cardTipIndex:number = 0;
		public cardTipArr:any[] = [];

		/**
		 * 自己是否明牌
		 */

		public isSelMingPai:boolean = false;

		public constructor() {
			this.initHandCard();
		}
		public static getInstance(): CardInfo {
			if (!this.instance) {
				this.instance = new CardInfo();
			}
			return this.instance;
		}
		/**重连设置所有玩家手牌数 */
		public reloginUserHandCard() {
			let userlist: UserVo[] = RoomInfo.getInstance().userList;
			for (let i: number = 0; i < userlist.length; i++) {
				let vo: UserVo = userlist[i];
				let seat: number = RoomInfo.getInstance().getSeatNoByUserId(vo.uid);
				if (vo.handCardNum) {
					this.userHandCount[seat] = vo.handCardNum;
				}
				else{
					this.userHandCount[seat] = 0;
				}
			}
		}
		public initHandCard() {
			this.allOpCardSet = [[], [], [], []];
			this.allHandCardSet = [[], [], [], []];
			this.allOutCardSet = [[], [], [], []];
			this.allFlowerCardSet = [[], [], [], []];
			this.userHandCount = [];
		}
		public set myCards(vo: Cmd.UserCardObj) {
			this.allHandCardSet[0] = [];
			if (vo.handCardSet) {
				this.allHandCardSet[0] = vo.handCardSet;
			}
			this.allOutCardSet[0] = [];
		}
		/**
		 * 设置其他玩家手牌
		 */
		public setOtherCard(cardList: Cmd.UserCardObj[]) {
			for (let i = 0; i < cardList.length; i++) {
				let uid: number = cardList[i].uid;
				let seat: number = RoomInfo.getInstance().getSeatNoByUserId(uid);
				if (cardList[i].handCardSet)
					this.allHandCardSet[seat] = cardList[i].handCardSet;
			}
		}

		/**
		 * 出牌后 删除玩家手牌
		 */
		public deleteOtherHand(thisId: number, uid: number) {
			let seat: number = RoomInfo.getInstance().getSeatNoByUserId(uid);
			let arr: number[] = this.getHandCardBySeat(seat);
			if (!arr || arr.indexOf(thisId) == -1) return;
			for (let i: number = 0; i < arr.length; i++) {
				if (arr[i] == thisId) {
					arr.splice(i, 1);
					return;
				}
			}
		}
		/**
		 * 根据thisId 添加普通手牌
		 * 过滤已经有的thisId
		 */
		public addOtherCard(thisId: number, uid: number): boolean {
			let seat: number = RoomInfo.getInstance().getSeatNoByUserId(uid);
			let arr: number[] = this.getHandCardBySeat(seat);
			return this.addCard([thisId], arr);
		}
		/**
		 * 获取对应seatId的手牌信息
		 */
		public getHandCardBySeat(seat: number): number[] {
			let handcard: number[] = this.allHandCardSet[seat];
			return handcard;
		}
		/**
		 * 获取对应seatId操作牌信息
		 */
		public getOpCardBySeat(seat: number): OperatVo[] {
			let handcard: OperatVo[] = this.allOpCardSet[seat];
			return handcard;
		}
		/**
		 * 获取对应seatId已出牌信息
		 */
		public getOutCardBySeat(seat: number): number[] {
			let handcard: number[] = this.allOutCardSet[seat];
			return handcard;
		}
		/**
		 * 添加thisId到指定数组
		 * 过滤已经添加的牌，并返回是否有该牌
		 */
		public addCard(cardSet: number[], arr: number[]): boolean {
			let isHave: boolean = false;
			for(let i: number = 0; i < cardSet.length; i++){
				let thisId = cardSet[i];
				isHave = ArrayUtil.isInArray(thisId,arr);
				if(isHave){
				}			    
				else{
					arr.push(thisId);
				}
			}
			return;
		}
		/**
		 * 从指定数组删除thisId
		 */
		public removeCard(thisId: number, arr: number[]){
			for (let i: number = 0; i < arr.length; i++) {
				if (arr[i] == thisId) {
					arr.splice(i, 1);
					return true;
				}
			}
			return false;
		}
		/**
		 * 根据thisId 添加普通手牌
		 * 过滤已经有的thisId
		 */
		public addMyCard(thisId: number, needFresh: boolean = false): boolean {
			let arr: number[] = this.getHandCardBySeat(0);
			let isHave = this.addCard([thisId], arr);
			if (!isHave)
				Cmd.dispatch(PKGame.PokerFourFacadeConst.SELF_HANDCARD_CHANGE, thisId);
			if (needFresh) {
				Cmd.dispatch(PKGame.PokerFourFacadeConst.SELF_HANDCARD_CHANGE);
			}
			return isHave;
		}
		/**
		 * 根据thisId 删除uid手牌
		 */
		public removeMyCard(cardSet: number[]) {
			let arr: number[] = this.getHandCardBySeat(0);
			for (let i: number = 0; i < cardSet.length; i++) {
				let thisId:number = cardSet[i];
				ArrayUtil.removeByValue(arr,thisId);
			}
		}
		/**
		 * 设置对应seatid出牌数据
		 * 如果是自己 增加outcard \ 删除手牌
		 * 如果是其他玩家 增加outcard
		 */
		public discard(uid: number, cardSet: number[]) {
			let seat: number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(uid);
			this.addCard(cardSet, this.getOutCardBySeat(seat));
			this.removeMyCard(cardSet);
			CardInfo.getInstance().selectGroup = [];
			PKGame.CardInfo.getInstance().cardTipArr = [];
			PKGame.CardInfo.getInstance().cardTipIndex = 0;
			Cmd.dispatch(PKGame.PokerFourFacadeConst.SELF_HANDCARD_CHANGE);
		}
		/**
		 * 更新牌堆 
		 * !!!oldCardId:旧手牌 加入牌堆；newCardId:新手牌 从牌堆中删除
		 */
		public updateHeapCard(oldCardId: number, newCardId: number) {
			var cards: number[] = this.heapCard;
			var len: number = cards.length;
			for (var i: number = 0; i < len; i++) {
				if (cards[i] == newCardId) {
					cards.splice(i, 1);
				}
			}
			cards.push(oldCardId);
		}
		/**
		 * GM 更换手牌
		 * !!!oldCardId:旧手牌 从手牌中删除；newCardId:新手牌 添加至新手牌
		 */
		public changeCard(oldCardId: number, newCardId: number) {
			let arr: number[] = this.getHandCardBySeat(0);
			for (let i: number = 0; i < arr.length; i++) {
				if (arr[i] == oldCardId) {
					arr.splice(i, 1);
				}
				arr.push(newCardId);
			}
		}
		/**玩家手牌数量
		 * 
		 * type 0:增加牌
		 *      1:减牌
		 */
		public updateUserHandCount(uid: number, num: number, type: number) {
			let seatId: number = RoomInfo.getInstance().getSeatNoByUserId(uid);
			let count: number = this.userHandCount[seatId];
			if (type == 0) {
				if (count < 14) {
					this.userHandCount[seatId] = count + num;
				}
			}
			else {
				this.userHandCount[seatId] = count - num;
			}
			// console.error("玩家手牌数量："+JSON.stringify(this.userHandCount));
		}
		//四个准备标签偏移量
		public readyLabelOffsetArr:Object[] = [{"x":0,"y":-300},{"x":-200,"y":-100},{"x":0,"y":0},{"x":100,"y":-100}];
		//打牌倒计钟q
		public  _clockOffsetArr:Object[] = [{"y":-uniLib.Global.screenHeight/2,"x":0},{"x":-140,"y":-100},{"x":30,"y":100},{"x":100,"y":-100}];

		//要不起标签
		public NotHaveCardLabelArr:Object[] = [{"y":-uniLib.Global.screenHeight/2,"x":0},{"x":0,"y":0}];

		//叫分标签
		public jiaoFenLabelArr:Object[] = [{"x":0,"y":-uniLib.Global.screenHeight / 2},{"x":-400,"y":-100},{"x":300,"y":-100}];
		//出牌位置
		public outCardArr:Object[] = [{"x":0,"y":-300},{"x":-200,"y":-80},{"x":30,"y":50},{"x":100,"y":-80}];
		//摊牌位置
		public showCardArr:Object[] = [{"x":0,"y":0},{"x":-210,"y":-180},{"x":50,"y":-100},{"x":50,"y":-120}];
		//扣分位置
		public ScoreLabelArr:Object[] = [{"x":130,"y":0},{"x":0,"y":100},{"x":200,"y":0},{"x":0,"y":100},];
		//报单动画位置
		public baoDanEffectArr:Object[] = [{"x":-uniLib.Global.screenWidth/2 + 95,"y":-140},{"x":-150,"y":-100},{"x":-40,"y":80},{"x":95,"y":0}];
		//聊天表情动画位置
		public chatImgArr:Object[] = [{"x":-uniLib.Global.screenWidth/2 + 40,"y":-200},{"x":0,"y":-300},{"x":0,"y":0},{"x":50,"y":-360}];
		//文本聊天位置
		public chatTextArr:Object[] = [{"x":-uniLib.Global.screenWidth/2,"y":-200},{"x":-360,"y":-220},{"x":100,"y":50},{"x":150,"y":-210}];
		//牌型动画播放
		public cardsTypeArr:Object[] = [{"x":0,"y":-300},{"x":-200,"y":-100},{"x":50,"y":200},{"x":300,"y":-100}];
		//玩家位置
		public playerArr:Object[] = [{"x":-500,"y":120},{"x":-30,"y":0},{"x":0,"y":0},{"x":-70,"y":0}];
		//明牌容器位置
		public mingPaiArr:Object[] = [{"x":0,"y":0},{"x":-100,"y":-175},{"x":0,"y":0},{"x":-100,"y":-170}];
		//明牌标签位置
		public mingPaiLabelArr:Object[] = [{"x":0,"y":-250},{"x":-120,"y":0},{"x":0,"y":0},{"x":0,"y":0}];
	}
}
