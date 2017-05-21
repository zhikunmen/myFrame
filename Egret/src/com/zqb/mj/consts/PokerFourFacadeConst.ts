module PKGame {
	export class PokerFourFacadeConst {
		public static STARTUP:  string = "PK_STARTUP";
		public static SEND_DATA:  string = "sendData"; 
		/**销毁 */
		public static  DESTORY: string									         = "DESTORY";
		/**结束游戏 */
		public static EXIT_GAME:string                                           = "exitGame";
		/**删除gm面板 */
		public static  GM_DELETE: string                                         = "gm_delete";
		/**GM请求牌堆 */
		public static  GM_HEAP_CARD: string                                      = "gm_heap_card";
		/**GM换牌 */
		public static  GM_CHANGE_CARD: string                                    = "gm_change_card";
		/**
		 * 进入房间
		 */
		public static  USER_ENTER_ROOM: string									 = "user_enter_room";
		/**玩家进入 */                                
		public static  PLAYER_ENTER_ROOM: string                                 = "player_enter_room";
		/**玩家离开 */
		public static  PLAYER_LEFT: string                                       = "player_left";
		/**玩家重连 */
		public static  PLAYER_CONNECT:string                                     = "player_connect";
		/**玩家离线 */
		public static  PLAYER_DISCONNECT:string                                  = "player_disconnect";
		/**用户信息数据 */
        public static  USERINFO_DATA: string									 = "USERINFO_DATA";
		/**送礼 */
		public static  UPDATA_USER_DATA: string									 = "updata_user_data";
		/**接收到表情 */
		public static  RECEIVE_FACE: string										 = "receive_face";
		/**送礼通知 */
		public static  SEND_GIFTS_NOTICE: string								 = "send_gifts_notice";
		/**
		 * 聊天记录
		 */
		public static NOTIFY_CHAT_RECORD:string                                  = "notify_chat_record";
		public static VOICE_NOTICE:string                                        = "voice_notice";
		/**
		 * 通用聊天ID接收
		 */
		public static NOTIFY_COMMON_CHAT:string                                  = "notify_common_chat";		
		/**
		 * ***************************************************游戏逻辑**************************************************************
		 */
		/**重连 */
		public static  RELOGIN: string                                           = "relogin";
		/**游戏开始 */
		public static  GAME_START: string                                        = "game_start";
		/**定地主 */
		public static  GAME_SET_LANDOWNER:string                                 = "game_set_landowner";
		/**开始发牌 */
		public static  SEND_CARDS: string                                        = "send_cards";
		/**
		 * 操作通知
		 */
		public static GAME_NOTIFY_OPERATE:string                                 = "game_notify_operate";
		/**叫分广播 */
		public static GAME_NOTIFY_STAKE:string                                   = "game_notify_stake";         
		/**
		 * 自己手牌有变化的时候派发
		 */
		public static SELF_HANDCARD_CHANGE: string                               = "self_handCard_change";	
		/**
		 * 打牌通知
		 */
		public static  DISCARD_NOTICE: string                                   ="discard_notice";//打牌通知
		/**剩余牌数量变化了 */
		public static  LASTCARD_CHANGE: string                                  ="lastcard_change";
		/**显示动作 */	
	    public static  SHOW_ACTION: string									    ="show_action";
		/**删除动作 */
		public static  REMOVE_ACTION: string									="remove_action";
		/**通知玩家手牌是否可以操作 */
		public static  NOTICE_CARD_ENABLE:string                                = "notice_card_enable";
		/**
		 * 出牌返回 刷新胡牌数据
		 */
		public static SELF_DISCARD_NOTICE:string                            = "self_discard_notice";	
	    /**
		 * 定庄
		 */
		public static NOTIFY_EAST_LOCATION:string                          ="notify_east_location";
		/**
		 * 对手ip相同广播
		 */
		public static NOTIFY_SAME_IP:string                                = "notify_same_ip";
		/**
		 * 出牌失败 stepcard处理
		 * 出牌成功 刷新手牌
		 */
		public static OUT_CARD_REFRESH:string                               = "out_card_refresh";
		/**结算通知 */
		public static  RESULT_NOTICE: string                                    ="result_notice";
		/**准备通知 */
		public static  READY_NOTICE: string                                     ="ready_notice";
		/**准备返回，清理桌面 */
		public static  RESET_TABLE: string                                      ="reset_table";
		/**删除结束面板 */
		public static  RESET_RESULT_PANEL:string                            = "reset_result_panel";
		/**结束 */
		public static  TOTAL_RECORD_DATA: string					        ="TOTAL_RECORD_DATA";
		/**其他玩家请求解散 */
		public static  DISS_REQUEST_NOTICE: string							="DISS_REQUEST_NOTICE";
		/**解散成功 */
		public static  DISS_RESULT_NOTICE: string							="DISS_RESULT_NOTICE";
		/**解散通知 */
		public static  DISS_NOTICE: string									="DISS_NOTICE";
		/**玩家在线状态更新 */
		public static  NOTIFY_ONLINE_STATE:string                           = "notify_online_state";
		/**玩家积分通知 */
		public static  NOTIFY_POINT_CHANGE:string                           = "notify_poing_change";
        /**停服通知 */
		public static  STOP_SREVICE_NOTICE: string						    ="stop_service_notice";
		/**托管通知 */
		public static  NOTIFY_HOST: string								    ="notify_host";
		/**请求切换房间人数返回 */
		public static  CHANGE_USERNUM_BACK: string = "change_usernum_back";
		/**其他玩家请求切换房间 */
		public static  CHANGE_USERNUM_NOTICE: string = "change_usernum_notice";
		/**显示提前开局按钮 */
		public static SHOW_CHANGE_BTN: string = "show_change_btn";

		/**最后的结算**/
		public static FINAL_GAME_ACCOUNTS:string = "final_game_accounts";
		/**打牌通知**/
		public static OUT_CARDS_RESULT:string = "out_cards_result";

		/**要不起通知 */
		public static IS_SELF_PASS_CARDS:string = "is_self_pass_Cards";
		/**明牌-S */
		public static RESPONSE_MINGPAI_SEND:string = "response_mingpai_send";


		/**
		 * 明牌广播
		 */

		public static MINGPAI_GUANGBO:string = "mingpai_guangbo";

		public constructor() {
		}
	}
}