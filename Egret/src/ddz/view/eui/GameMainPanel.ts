

module PKGame {
	export class GameMainPanel extends BaseEui{


		//出牌按钮容器
		private _chupaiBtn:eui.Button;
		//返回大厅等按钮容器
		private commonBtnNode:eui.Group;
		//邀请好友按钮
		private _inviteButton:eui.Button;
		//解散房间按钮
		private _dissolveButton:eui.Button;
		//返回大厅按钮
		private _backToTingButton:eui.Button;
		//准备标签
		private labelReady2:eui.Image;
		private labelReady1:eui.Image;
		private labelReady0:eui.Image;

		//聊天按钮
		private _chatButton:eui.Button;
		//明牌标签
		private label_mingpai_1:eui.Image;
		private label_mingpai_2:eui.Image;


		//玩家自己的积分
		private userPoints:eui.Label;
		//玩家自己名字
		private userName:eui.Label;
		//玩家自己头像
		private _userIcon:eui.Image;
		//房间id
		private roomId:eui.Label;
		//局数
		private duijuNum:eui.Label;
		//设置按钮
		private _setButton:eui.Button;
		//帮助按钮
		private _helpButton:eui.Button;
		//底牌文字
		private dipaiLabel:eui.Button;
		//倍数
		private _labelBeishu:eui.Label;
		//低分
		private _labelDifen:eui.Label;

		//房主icon
		private iconSelfFangzhu:eui.Image;
		//地主icon
		private iconSefdizhu:eui.Image;



		public constructor() {
			super();
			this.skinName = "GameMainPanel";
		}


		//初始化
		init() {

		}


		//进入房间界面刷新
		public enterRoom(data:any):void {

			// this.commonBtnNode.visible = true;
			// this.roomId.text = "房间号:" + data["roomId"];
			// this.duijuNum.text = "对局数:";
            //
			// this.userName.text = ddzGame.MyUserInfo.getInstance().nickName;
			// this.userPoints.text = ddzGame.MyUserInfo.getInstance().remainder.toString();
			// this.labelReady0.visible = true;
			// for (var i:number = 0; i < ddzGame.RoomInfo.getInstance().userList.length; i++) {
			// 	var uData:any = ddzGame.RoomInfo.getInstance().userList[i];
			// 	if (uData["uid"] != ddzGame.MyUserInfo.getInstance().userId) {
			// 		var seatId:number = ddzGame.RoomInfo.getInstance().getSeatNoByUserId(uData["uid"]);
			// 		if (seatId == 1) {
			// 			this._player1.updateView(uData);
			// 			this.labelReady1.visible = true;
			// 		}else if (seatId == 2) {
			// 			this._player2.updateView(uData);
			// 			this.labelReady2.visible = true;
			// 		}
			// 	}
			// }
			this.dipaiLabel.visible = true;
		}

		//其他玩家进入房间界面刷新
		public otherPlayerEnter(data:any):void {
			var seatId:number = PKGame.RoomInfo.getInstance().getSeatNoByUserId(data["uid"]);
			// if (seatId == 1) {
			// 	this._player1.updateView(data);
			// 	this.labelReady1.visible = true;
			// }else if (seatId == 2) {
			// 	this._player2.updateView(data);
			// 	this.labelReady2.visible = true;
			// }
		}

		public destroy() {


		}
	}
}
