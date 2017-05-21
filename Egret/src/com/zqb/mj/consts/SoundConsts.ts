module PKGame {
	export class SoundConsts {
		public static START:string					= "start_mp3";		//开始游戏
		public static DISCARD:string				= "DiscardSound_mp3";		//开始游戏
		public static DEAL:string					= "DealSound_mp3";		//开始游戏
		public static DRAW:string					= "DrawSound_mp3";		//开始游戏
		public static DICE:string					= "DiceSound_mp3";		//色子摇动
		public static CLICK:string					= "ButtonSound_mp3";		//按钮点击
		public static COUNT_FAN:string				= "CountFanSound_mp3";		//数番
		public static DRAW_OTHER_TURN:string        = "otherTurn_mp3";
		public static DRAW_MY_TURN:string           = "myTurn_mp3";
		public static COMMON:string                 = "common";        //快捷聊天
		public static WIN:string                    = "game_win_mp3";
		public static LOSE:string                   = "game_lose_mp3";
		public static HU_MUSIC:string               = "hu_music_mp3";
		public static BG_MUSIC:string               = "doudizhu_bg_mp3";
		public static LIGHT:string                  = "light_mp3";//闪电落雷声音
		public static Sex:string					= PKGame.MyUserInfo.getInstance().userSex;
		public static Lanaguage:string			    = PKGame.RoomInfo.getInstance().languageMode;

		public constructor() {
		}
	}
}