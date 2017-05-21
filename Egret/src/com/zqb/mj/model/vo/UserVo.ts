module PKGame {
	export class UserVo {
		public  ip:string;
		public  uid:number;		
		public  seatId:number;
	    public  gender:string;
		public  points: number;//积分
		public  diamond: number;//钻石
		public  headUrl:string;
		public  nickName:string;
		public  remainder:number;
		/**是否在线 */
		public  onlineState:number;
		/**是否准备 */
		public  bReady:number = 0
		/**当前手牌(便于控制手牌数量) */
		public  handCardNum:number = 0;
		public isOwer:number  = 0; //是否是房主 0 不是1 是
		public constructor(info:Cmd.UserBaseInfo) {
			this.setdata(info);
		}
		public setdata(info:Cmd.UserBaseInfo):void{
			this.uid = info.uid;
			this.seatId = info.seatId;
			this.points = info.points;
			this.gender = info.gender;
			this.bReady = info.bReady;
			this.diamond = info.diamond;		
			this.headUrl = info.headurl;
			this.nickName = info.nickname;		
			this.remainder = info.points;
			this.onlineState = info.onlineState;
			this.isOwer = info.isOwner;
			this.handCardNum = info.handCardNum;
			if(info.handCardNum){
				this.handCardNum = info.handCardNum;
			}
			else{
				this.handCardNum = 0;
			}
		}
		public  getGender():number{
			var sex:number;
			if(this.gender=="男"){
				sex=0;
			}else{
				sex=1;
			}
			return sex;
		}
	}
}