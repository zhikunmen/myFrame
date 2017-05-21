module PKGame {
	export class UIEventConsts {
		/**退出房间 */
		public static  EXIT_GAME :string="exit_game";//退出房间
		/**显示庄家 */
		public static  SHOW_BANKER :string="SHOW_BANKER";//显示庄家
		/**打牌 */
		public static  ACTION_DISCARD :string="action_discard";//打牌
		/**取消操作 */
		public static  ACTION_CANCEL :string="action_cancel";//取消操作
		//明牌
		public static ACTION_MINGPAI:string = "action_mingpai";
		/**胡牌 */
		public static  ACTION_WIN :string="action_win";//胡牌
		/**听牌 */
		public static  ACTION_READYHAND :string="action_readyhand";//听牌
		/**吃 */
		public static  ACTION_CHOW :string="action_chow";//吃
		/**开始吃牌 */
		public static  ACTION_BEGIN_CHOW :string = "action_begin_chow";
		/**取消吃牌  取消杠牌通用 */
		public static  ACTION_STOP_CHOW:string = "action_stop_chow";
		/**开始杠  暗杠多种情况使用 */
		public static  ACTION_BEGIN_KONG:string = "action_begin_kong";
		/**托管 */
		public static  ACTION_TRUSTEESHIP :string="action_trusteeship";//托管
		/**托管 */
		public static  ACTION_RECORD :string="action_record";//托管
		/**开始听牌-选择听的牌 */
		public static  START_READYHAND :string="start_readyhand";//开始听牌--选择听的牌
		/**开始听牌-选择听的牌 */
		public static  ARROW_READYHAND :string="arrow_readyhand";//开始听牌--选择听的牌
		/**取消听牌 */
		public static  STOP_ARROW_READYHAND :string="stop_arrow_readyhand";//取消听牌
		/**取消听牌 */
		public static  STOP_READYHAND :string="stop_readyhand";//取消听牌
		/**准备 */
		public static  READY :string="ready";//准备
		/**
		 * 显示GM界面
		 */
		public static SHOW_GM_PANEL:string = "show_gm_panel";
		/**
		 * 关闭GM界面
		 */
		public static REMOVE_GM_PANEL:string = "remove_gm_panel";
		/**获取积分榜数据 */
		public static  GET_SCORE_DATA :string="GET_SCORE_DATA";//获取积分榜数据
		public static SHOW_USER_INFO:string="SHOW_USER_INFO";
		public static GIFT_SEND:string="GIFT_SEND";
		public static CLOSE:string="CLOSE";
		public static DESTORY:string="DESTORY";
		/**显示设置 */
		public static  SHOW_SETTING :string="SHOW_SETTING";//显示设置
		/** 显示游戏秘籍 */
		public static  SHOW_HELP :string="SHOW_HELP";//显示设置
		/**显示停服公告 */
		public static  SHOW_STOP_SERVICE :string="SHOW_STOP_SERVICE";//显示设置
		/**显示GM */
		public static  SHOW_GM_TOOL :string="SHOW_GM_TOOL";
		/** 请求切换房间人数*/
		public static  REQUEST_CHANGE_USERNUM :string = "request_change_usernum";
		/**同意切换房间人数 */
		public static AGREE_CHANGE_USERNUM: string = "agree_change_usernum";
		/**显示快捷聊天 表情 */
		public static  SHOW_SHORT_CHAT :string="SHOW_SHORT_CHAT";//显示快捷聊天 表情
		/**申请叫分 */
		public static  ACTION_STAKE :string = "action_stake";
		/**申请操作 */
		public static  ACTION_OPERATE:string = "action_operate";//操作
		public static DISMISS_GAME:string="DISMISS_GAME";
		public static DISMISS_BACK:string="DISMISS_BACK";
		public static SHARE_GAME:string="share_game";
		/**录音时间到 */
		public static RECORD_TIME_OUT:string="RECORD_TIME_OUT";//录音时间到
		/**录音取消 */
		public static RECORD_CANCEL:string="RECORD_CANCEL";//录音取消
		/**发送录音 */
		public static SEND_RECORD:string="SEND_RECORD";//发送录音
		/**表情，快捷语音 */
		public static SEND_COMMON_CHAT:string = "send_common_chat";//表情，快捷语音
		/**输入聊天 */
		public static SEND_COMMON_TALK:string = "send_common_talk";//输入聊天
		public static SEND_CHAT_RECORD:string = "send_chat_record";

		/**手牌选中 */
		public static GM_SELECT_HANDCARD:string = "gm_select_handcard";
		/**牌堆选中 */
		public static GM_SELECT_HEAPCARD:string = "gm_select_heapcard";
		/**批量换牌 */
		public static GM_SELECT_CARDS:string = "gm_select_cards";
		/**删除听牌 */
		public static REMOVE_READYHAND:string  = "remove_readyhand";
		/**托管操作 */
		public static  ACTION_HOST :string = "action_host";//托管
		/**模拟出牌成功 */
		public static  USER_DODISCARD :string = "user_dodiscard";
		/** 模拟出牌失败*/
		public static  USER_DODISCARD_FAIL :string = "user_dodiscard_fail";
		//重置手牌
		public static RESET_HANDS_CARD:string = "reset_hands_card";

		public constructor() {
		}
	}
}