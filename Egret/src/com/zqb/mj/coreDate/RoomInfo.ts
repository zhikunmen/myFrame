module PKGame {
	/**
	 *
	 * 房间主要数据
	 *
	 */
	export class RoomInfo {
        private static instance: RoomInfo;	
        public roomId:number ;//房间ID   
		/** 当前出牌操作者ID*/
		public operateId: number;
		/**当前操作类型：叫分、出牌 */
		public operateType: number;
		/**是否要的起 */
		public isCanOperate:boolean = false;
		/**可以叫的分 */
		public opMulti: number[];
        /**操作牌倒计时 */        
        public opCount: number;
        /**出牌倒计时 */
        public outCount:number;
        /**游金倍数 */
        public goldMulti: number;
         /**支付模式 0,房主支付  1，均摊支付 */ 
        public payMode:number = 0;    
         /**玩法 12 全自摸 11半自摸*/
		public playType: number = 0;
		// //打牌类型
		// public outCardSetType:number = 0;
        /**当前的局数 */
        public curNumber: number = 1;  
        /**总共的局数 */
        public totalNumber: number = 1;
		/**
		 * 牌堆剩余牌数
		 */
		private heapCardNum:number = 0;
		/**
		 * 游戏状态，是否开始游戏
		 */
		public isStart:boolean = false;
		/**
		 * 是否显示GM
		 */
		public isShowGMTool:boolean = false;
		/**GM 模式 */
		public GM_Mode:boolean = false;
		/**托管 */
		public host_mode: number = 0;
         /**麻将人数 2或4 */

        public playerNumber: number = 4;
        /**音效音乐等设置信息 */
        public musicSetInfo:Cmd.SetInfo;
		/**房间属性 */
        public props:Cmd.roomPropObj[];
		/** 金牌ID组*/
		public goldenCard: number[] = [];
        /**房间内所有玩家基础信息，包括自己 */
        public userList:PKGame.UserVo[] = [];
        /**广播出牌数据 */
        public OutCard:Cmd.OutCardPokerCmd_Brd;	
        /**
		 * 语音语言：pu普通话，lo龙岩话
		 */
		public languageMode:string = "pu";
		/**
		 * 地主ID
		 */
		public landownerId:number = null;
		/**
		 * 地主底牌
		 */
		public landownerCardSet:number[] = [];

		/**每局详情**/
		public balanceDetail:any[] = [];
		/**总结算数据 */
		public recordInfo:any[] = [];
		/**
		 * 庄家座位ID
		 */
		public landOwnerSeatId:number = -1;
		/**当前已经准备玩家 */
		public readyUsers : number[];
		/**已经叫分的玩家 */
		public stakeUsers:Cmd.StakeSet[] = [];
		/**停服公告倒计时 */
		public leftTime : number;
		/**停服公告描述*/
		public notice : string;
		/**玩家筹码 */
		public chipsSets:any[]=[];
		/**是否支持托管 0为不支持 1为支持*/
		public canHostMode : number = 1;
		/**是否为托管模式 0为正常 1为托管*/
		public isHostMode : number = 0;
		/**房间玩法属性ID 具体值读表(TablePlayTypeList) */
		public playTypeList:number[];

		//叫分数组
		public jiaofenArr:any[] = [];
		/**
		 * 为了过滤多种出牌失败返回情况
		 * 保存所有自己打出去的牌 
		 * */
		public outCardSuccArr:number[] = [];

	    /**倍数 */
		public beiShu:number = 1;

		/**是否为小结算重连**/
		public isXiaoReconnect:boolean = false;

		/**是否是明牌玩法**/
		public isMingPlay:boolean = true;
		/**明牌玩家数组**/

		public mingPlayerArr:any[] = [];

		/**
		 * 底牌数组
		 * **/

		public diPaiArr:any[] =[];
		public constructor() {
		}
        public static getInstance():RoomInfo{
            if(!this.instance) {
                this.instance = new RoomInfo();
            }
            return this.instance;
         }
		 public destory(): void {
		 }
         /**
          *进入房间刷新个人信息
          */
         public setData(data:Cmd.RoomState){
			 this.userList = [];
             this.roomId = data.roomId;  
             this.outCount = data.outCount;
			 this.readyUsers = data.prepareSet;
             this.initRoomProps(data.roomProps);

             this.initUserList(data.userInfoSet);
			 this.playTypeList = data.props;
			 if (this.playTypeList && this.playTypeList.length && this.playTypeList.indexOf(290) > 0) {
				 this.isMingPlay = true;
			 }else {
			 	this.isMingPlay = false;
			 }
			 this.getPlayTypeByList();
			 this.getHostMode();
         }
		 /**
		  * 设置庄家ID和SeatId
		  */
		 public setLandOwnerInfo(landId:number){
			 this.landownerId = landId;
			 this.landOwnerSeatId = this.getSeatNoByUserId(landId);
		 }
		 /**
		  * 设置当前剩余牌数
		  */
		  public setRemainCardNum(num:number){
			  if(this.heapCardNum == num)
			  	return;
			  this.heapCardNum = num;
			  Cmd.dispatch(PKGame.PokerFourFacadeConst.LASTCARD_CHANGE);
		  }

		  //添加叫分玩家
		  public addJiaofenArr(data:any):void {
		  	  var uId:number = data["uid"];
		  	  if (!uId) return;
			  var isHave:boolean = this.jiaofenArr.some((data:any)=>{
				  return data["uid"] == uId;
			  },this);

			  if (this.jiaofenArr.length == 0) {
				  uniLib.SoundMgr.instance.playSound(PKGame.MyUserInfo.getInstance().userSex+ "_jiaofen_"+data["multi"]+"_mp3");
				  this.jiaofenArr.push(data);
			  }
			  if (!isHave) {
			  	uniLib.SoundMgr.instance.playSound(PKGame.MyUserInfo.getInstance().userSex+ "_jiaofen_"+data["multi"]+"_mp3");
			  	this.jiaofenArr.push(data);
			  }
		  }

         /**
		 * 获取房间属性
		 */
		private initRoomProps(list:Cmd.roomPropObj[]){
			if(!list|| list.length<=0)return;
			for(let i:number = 0;i<list.length;i++){
				if(!list[i].value){
					list[i].value = 0;
				}
				if(list[i].id == Cmd.RoomPro.RoomPro_1){
					this.totalNumber = list[i].value;
				}
				if(list[i].id == Cmd.RoomPro.RoomPro_2){
					this.playType = list[i].value;
				}
				if(list[i].id == Cmd.RoomPro.RoomPro_3){
					this.playerNumber = list[i].value;
				}
				if(list[i].id == Cmd.RoomPro.RoomPro_4){
					this.payMode = list[i].value;
				}
				if(list[i].id == Cmd.RoomPro.RoomPro_5){
					this.goldMulti = list[i].value;
				}
				if (list[i].id == 101) {
					this.playType = list[i].value;
				}
			}
		}
         /**
          * 玩家列表初始化
          */
          private initUserList(data:Cmd.UserBaseInfo[]){
              for(let i:number = 0;i<data.length;i++){
                  var user:Cmd.UserBaseInfo = data[i];
                  var vo:PKGame.UserVo = new PKGame.UserVo(user);
                  this.userList.push(vo);
              }
          }
         /**
          * 有新玩家进入
          * 添加或者刷新
          */
          public addUser(vo:PKGame.UserVo){
            for (let i: number = 0; i < this.userList.length; i++) {
				if (this.userList[i].uid == vo.uid) {
					this.userList[i] = vo;
					return;
				}
			}
			 PKGame.RoomInfo.getInstance().chipsSets.push(vo);
			this.userList.push(vo);
          }
        /**
		 *查询玩家 
		 */
		public getUserVoByUid(uid: number): UserVo {
			let test:Cmd.UserBaseInfo = new Cmd.UserBaseInfo;
			test.uid = 111111;
			test.gender = "女";
			test.nickname = "111111";
			var user:UserVo = new UserVo(test);
			for (let i: number = 0; i < this.userList.length; i++) {
				if (this.userList[i].uid == uid) {
					return this.userList[i];
				}
			}
			console.error(">>>>>>不明身份人士混入房间:"+uid);
			return user;
		}
        /**
         * 移除玩家
         */
        public removeUser(uid: number): void {
			for (let i: number = 0; i < this.userList.length; i++) {
				if (this.userList[i].uid == uid) {
					this.userList.splice(i, 0);
					break;
				}
			}
		}
		/**
		 *获取转换位置后的座位值0-2
		 * @param seatId
		 * @return 
		 * 
		 */
		public getSeatNo(seatId: number): number {
			let mySeat:number = RoomInfo.getInstance().getUserVoByUid(uniLib.UserInfo.uid).seatId;
			return (seatId + 3 - mySeat) % 3;
		}
		/**
		 *获取转换位置后的座位值0-2
		 * @param seatId
		 * @return 
		 * 
		 */
		public getSeatNoByUserId(userId: number): number {
			let userVo: UserVo = this.getUserVoByUid(userId);
			if (userVo) {
				var seatId: number = userVo.seatId;
				return this.getSeatNo(seatId);
			}
			return 0;
		}
        /**转换支付中文 */
         public getPayMode():string{
			 if(uniLib.Global.is_sandbox == 1){
				 return "";
			 }
            let txt: string = "半自摸";
			if (this.payMode == 1) {
				txt = "房主支付";
			}
			else if (this.payMode == 2) {
				txt = "均摊支付";
			}
			return txt;
		}
        /**转换中文玩法 */
        public getPlayType(): string {
			if(uniLib.Global.is_sandbox == 1){
				return "";
			}
			let txt: string = "两副牌斗地主";
			return txt;
		}
		/**
		 * 房间内所有玩家UID，不包括自己
		 */
		public getOtherUid():number[]{
			let user:number[] = [];
			for (let i: number = 0; i < this.userList.length; i++) {
				if (this.userList[i].uid != uniLib.UserInfo.uid) {
					user.push(this.userList[i].uid);
				}
			}
			return user;
		}

		/**
		 * 发礼物 不包括fromid
		 */
		public getUidNotSendID(formid: number): number[] {
			let user: number[] = [];
			for (let i = 0; i < this.userList.length; i++) {
				if (this.userList[i].uid != formid) {
					user.push(this.userList[i].uid);
				}
			}
			return user;
		}
		/**所有玩法id 转换desc */
		public getPlayTypeByList():string[]{
		    let str:string[] = [];
			for (let i: number = 0; i < this.playTypeList.length; i++) {
				let name:string = PKtable.TablePlayTypeList.getPlayTypeDes(this.playTypeList[i]);
				str.push(name);
			}
			return str;
		}
		/**判断是否支持托管 */
		private getHostMode(){
            if(ArrayUtil.isInArray(144,this.playTypeList) == true){
				this.canHostMode = 1;
			}
			else{
				this.canHostMode = 0;
			}
		}




		//判断自己是否赢了
		public selfIsWin(data:any[]):boolean {

			for (var i:number = 0; i < data.length; i++) {

				var itemData:any = data[i];

				if (itemData["uid"] == PKGame.MyUserInfo.getInstance().userId &&  itemData["winType"] > 0) {
					return true;
				}
			}

			return false;
		}

		//添加玩家
	}
		export class PlayStyle{
		/**无鬼 */
		public static NoGhost = 111;
		/**白板做鬼 */
		public static WhiteGhost = 112;
		/**翻鬼 */
		public static OneGhost = 113;
		/**二鬼 */
		public static TwoGhost = 114;
	}
}
