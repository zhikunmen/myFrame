module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class MyUserInfo {
        private static instance: MyUserInfo;
        public userId:number ;//用户id       
        public gender:string;
        public remainder: number;
        public nickName:string;
        public seetId:number;
        public userSex:string;

		public constructor() {
		}
        public static getInstance():MyUserInfo
		{
            if(!this.instance) {
                this.instance = new MyUserInfo();
            }
            return this.instance;
         }
         /**
          * OnLogin_S 后刷新个人信息
          */
         public setData(data:Cmd.UserBaseInfo){
             this.userId = data.uid;
             this.gender = data.gender;
             this.remainder = data.points;
             this.nickName = data.nickname;
             this.seetId = data.seatId;
             this.userSex = data.gender == "男" ? "man":"woman";
         }
	}
}
