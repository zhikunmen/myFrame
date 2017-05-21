module PKGame {
	export class VoiceDataVo {
		public url:string;
		public nickName:string;
		public time:number;
		public uid:number;
		public status:number;//0未读，1已读
		public text:string;
		public constructor() {
		}
	}
}