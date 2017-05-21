module PKGame {
	export class GameData {
		private static instance: GameData;	
		private _isMyTime: boolean = false;//当前是否轮到我操作
		/**游金需要打出的牌*/
		public goldOutCardSet: number[] = [];
		public _audioPlayMode: boolean = false;//是否开启语音打牌模式
		/**
		 * 待出牌ID 为0时可以出牌 不为零时不可出牌
		 */
		public waitCard:number = 0;		
		/**
		 * 四人中间放置坐标
		 */
		public TempeLocation: number[][] = [
			[uniLib.Global.screenWidth/2, 450],
			[uniLib.Global.screenWidth/2 + 200, 255],
			[uniLib.Global.screenWidth/2 , 125],
			[uniLib.Global.screenWidth/2 - 450, 255]
		];

		public ShortTalkArr = [
			"又断线了，网络怎么这么差啊！",
			"各位，真不好意思，我要离开一会",
			"你的牌打得也忒好了！",
			"下次咱们再玩吧！",
			"不要走，决战到天亮！",
			"快点吧，都等得我花都谢了！"
		];
		/**
		 * 总牌局记录
		 */
		public recordInfo:Cmd.UserRecord[];

		public constructor() {
		}
		public destory(): void {
			GameData.instance = null;
		}
		public static getInstance(): GameData {
            if (!this.instance) {
                this.instance = new GameData();
            }
            return this.instance;
		}

		public get isMyTime(): boolean {
			return this._isMyTime;
		}

		public set isMyTime(b: boolean) {
			this._isMyTime = b;
		}

		public get audioPlayMode(): boolean {
			return this._audioPlayMode;
		}

		public set audioPlayMode(b: boolean) {
			this._audioPlayMode = b;
		}

		/**
		 * 判断是否为金牌
		 */
		public isGoldenCard(cardId: number): boolean {
			var value: boolean = false;
			var goldArr: number[] = PKGame.RoomInfo.getInstance().goldenCard;
			if(PKGame.RoomInfo.getInstance().goldenCard.length<=0)return false;
			for (var i: number = 0; i < goldArr.length; i++) {
				if (PKtable.PokerTableCard.thisIdToCardId(cardId) == PKtable.PokerTableCard.thisIdToCardId(goldArr[i])) {
					value = true;
					return value;
				}
			}
		}

		/**左边用户位置 */
		public static _left_customer_point: number[] = [100, 200];


		/**右边用户位置 */
		public static _right_customer_point: number[] = [1180, 200];

		/**用户位置 */
		public static _user_point: number[] = [640, 700];

	}
}


