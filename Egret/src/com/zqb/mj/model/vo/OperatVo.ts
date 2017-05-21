module PKGame {
	export class OperatVo {
		public uid:number;             //碰牌玩家
		public thisId:number;          //碰牌ID
		public cardSet: number[];	   //碰杠吃数据，不包括thisId
		public fromId:number;          //点碰玩家
		public fromSeatId:number;      //点碰玩家座位
		public seatId:number;          //碰牌玩家座位
		public type:number;            //碰杠type MahjongOpCardType
		public constructor() {
		}
	}
}