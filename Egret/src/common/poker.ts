﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: poker.proto

module Cmd {
	/**
	 * 玩家在线状态
	 */
	export enum OnlineState {
		/**
		 * 离线
		 */
		OnlineState_Offline = 0,
		/**
		 * 在线
		 */
		OnlineState_Online = 1,
		/**
		 * 网络差
		 */
		OnlineState_Slow = 2,
		/**
		 * 离开,切后台
		 */
		OnlineState_Leave = 3,
		/**
		 * 电话中
		 */
		OnlineState_Calling = 4,
		/**
		 * 托管状态
		 */
		OnlineState_Hosting = 5
	}
	export enum PokerCardType {
		PokerCardType_None = 0,
		/**
		 * 桃
		 */
		PokerCardType_hearts = 1,
		/**
		 * 心
		 */
		PokerCardType_spades = 2,
		/**
		 * 梅花
		 */
		PokerCardType_clubs = 3,
		/**
		 * 方片
		 */
		PokerCardType_diamonds = 4
	}
	export enum RoomPro {
		/**
		 * 离线
		 */
		RoomPro_0 = 0,
		/**
		 * 房间局数
		 */
		RoomPro_1 = 1,
		/**
		 * 游戏玩法
		 */
		RoomPro_2 = 2,
		/**
		 * 人数模式
		 */
		RoomPro_3 = 3,
		/**
		 * 支付模式
		 */
		RoomPro_4 = 4,
		/**
		 * 游金倍数
		 */
		RoomPro_5 = 5,
		/**
		 * 支持托管
		 */
		RoomPro_6 = 6
	}
	/**
	 * 基本牌型
	 */
	export enum MultiType {
		/**
		 * 单张
		 */
		PokerMultiType_Single = 1,
		/**
		 * 对子
		 */
		PokerMultiType_Apairs = 2,
		/**
		 * 三条
		 */
		PokerMultiType_Triple = 3,
		/**
		 * 三带一个
		 */
		PokerMultiType_TripleBySingle = 4,
		/**
		 * 三带一对
		 */
		PokerMultiType_TripleByApairs = 5,
		/**
		 * 单顺
		 */
		PokerMultiType_Straight = 6,
		/**
		 * 连对
		 */
		PokerMultiType_ApairsAfterApairs = 7,
		/**
		 * 三顺
		 */
		PokerMultiType_Plane = 8,
		/**
		 * 飞机带翅膀
		 */
		PokerMultiType_PlaneByWings = 9,
		/**
		 * 四带二 --  5555 ＋ 3 ＋ 8 或 4444 ＋ 55 ＋ 77
		 */
		PokerMultiType_QuadraByX = 10,
		/**
		 * 炸弹
		 */
		PokerMultiType_Boom = 11,
		/**
		 * 火箭
		 */
		PokerMultiType_KingBoom = 12
	}
	/**
	 * +
	 */
	export class GiftsInfo {
		/**
		 * 发送玩家Id
		 */
		fromUid: number;
		/**
		 * 接收玩家Id
		 */
		toUid: number;
		/**
		 * 礼物Id
		 */
		giftsId: number;
		/**
		 * 礼物数量
		 */
		giftsNum: number;
		GetType(): string { return 'Cmd.GiftsInfo'; }
	}
	/**
	 * +
	 */
	export class PropInfo {
		/**
		 * 类型 1 购买自用 2 购买送人
		 */
		purchaseType: number;
		/**
		 * 道具Id
		 */
		propId: number;
		/**
		 * 购买玩家Id
		 */
		sendId: number;
		/**
		 * 接收玩家Id 送人时才有值
		 */
		revcId: number;
		GetType(): string { return 'Cmd.PropInfo'; }
	}
	/**
	 * +
	 */
	export class UserGifts {
		uid: number;
		charm: number;
		nickname: string;
		GetType(): string { return 'Cmd.UserGifts'; }
	}
	/**
	 * +
	 */
	export class UserProp {
		/**
		 * 玩家id
		 */
		uid: number;
		/**
		 * 玩家积分
		 */
		points: number;
		/**
		 * vip卡有效期
		 */
		vipCardEffect: number;
		/**
		 * 双倍卡有效期
		 */
		doubleCardEffect: number;
		GetType(): string { return 'Cmd.UserProp'; }
	}
	export class SetInfo {
		/**
		 * 音效 false:关 true:开
		 */
		sound: boolean;
		/**
		 * 音乐 false:关 true:开
		 */
		music: boolean;
		/**
		 * 音控 false:关 true:开
		 */
		control: boolean;
		/**
		 * 方言 1:普能话 2:龙岩话
		 */
		dialect: number;
		GetType(): string { return 'Cmd.SetInfo'; }
	}
	/**
	 * 房间属性
	 */
	export class roomPropObj {
		/**
		 * 1:房间局数 3:人数模式 4:支付模式 5:游金倍数 101:鬼牌模式(0无鬼 1 2) 102:打捆(金华)
		 */
		id: number;
		value: number;
		GetType(): string { return 'Cmd.roomPropObj'; }
	}
	/**
	 *  -------------------  Enter -------------------------- //
	 *  进入房间
	 */
	export class EnterPokerCmd_C {
		roomId: number;
		/**
		 * 全局唯一房间id
		 */
		globalRoomId: number;
		/**
		 * 游戏id
		 */
		gameId: number;
		robotId: number;
		robotNum: number;
		GetType(): string { return 'Cmd.EnterPokerCmd_C'; }
	}
	export class EnterPokerCmd_S {
		resultCode: number;
		desc: string;
		roomState: RoomState;
		GetType(): string { return 'Cmd.EnterPokerCmd_S'; }
	}
	export class RoomState {
		/**
		 * 出牌倒计时
		 */
		outCount: number;
		roomId: number;
		/**
		 * 玩家基础信息
		 */
		userInfoSet: UserBaseInfo[];
		/**
		 * 所有已准备玩家uid
		 */
		prepareSet: number[];
		/**
		 * 音效音乐等设置信息
		 */
		setInfo: SetInfo;
		/**
		 * 房间属性,带kv属性的
		 */
		roomProps: roomPropObj[];
		/**
		 * 玩法属性,只是开关类型的
		 */
		props: number[];
		GetType(): string { return 'Cmd.RoomState'; }
	}
	export class UserBaseInfo {
		uid: number;
		headurl: string;
		nickname: string;
		/**
		 * 性别
		 */
		gender: string;
		/**
		 * 钻石
		 */
		diamond: number;
		/**
		 * 积分
		 */
		points: number;
		seatId: number;
		ip: string;
		/**
		 * 在线状态OnlineState
		 */
		onlineState: number;
		/**
		 * 准备状态
		 */
		bReady: number;
		/**
		 * 手牌数量
		 */
		handCardNum: number;
		/**
		 * 是否房主 1:是 0:不是
		 */
		isOwner: number;
		GetType(): string { return 'Cmd.UserBaseInfo'; }
	}
	export class ReConnectPokerCmd_S {
		/**
		 * 手牌thisid
		 */
		handCard: UserCardObj;
		/**
		 * 当前游戏局数
		 */
		curGameNbr: number;
		roomId: number;
		/**
		 * 地主id
		 */
		landownerId: number;
		/**
		 * 当前操作的玩家
		 */
		curOpUid: number;
		/**
		 * 最新出的牌
		 */
		newOutCard: NewOutCardObj;
		/**
		 * 是否明牌 true/false
		 */
		showCard: boolean;
		/**
		 * 其他玩家的明牌
		 */
		othersShowCard: UserCardObj[];
		/**
		 * 地主底牌
		 */
		landownerCardSet: number[];
		/**
		 * 底分
		 */
		baseMulti: number;
		/**
		 * 倍数
		 */
		mutil: number;
		GetType(): string { return 'Cmd.ReConnectPokerCmd_S'; }
	}
	export class NewOutCardObj {
		uid: number;
		outCardSet: number[];
		GetType(): string { return 'Cmd.NewOutCardObj'; }
	}
	/**
	 * 进入房间的广播
	 */
	export class EnterPokerCmd_Brd {
		/**
		 * optional 	bool 			isFirst 			= 2; 	// 是否是第一次进入
		 */
		userInfo: UserBaseInfo;
		GetType(): string { return 'Cmd.EnterPokerCmd_Brd'; }
	}
	/**
	 * 离开房间
	 */
	export class LeavePokerCmd_C {
		/**
		 * 离开状态 0 返回大厅 1 暂时离开 2 断线
		 */
		state: number;
		GetType(): string { return 'Cmd.LeavePokerCmd_C'; }
	}
	export class LeavePokerCmd_S {
		resultCode: number;
		GetType(): string { return 'Cmd.LeavePokerCmd_S'; }
	}
	export class LeavePokerCmd_Brd {
		uid: number;
		state: number;
		GetType(): string { return 'Cmd.LeavePokerCmd_Brd'; }
	}
	/**
	 * Echo应答,服务器探测玩家是否活着
	 */
	export class ServerEchoPokerCmd_SC {
		/**
		 * echo标志
		 */
		id: number;
		/**
		 * echo描述,原封不动返回
		 */
		desc: string;
		GetType(): string { return 'Cmd.ServerEchoPokerCmd_SC'; }
	}
	/**
	 * 在线状态
	 */
	export class OnlineStatePokerCmd_Brd {
		uid: number;
		/**
		 * 在线状态0断线,1在线,2离开,3,网络差OnlineState
		 */
		state: number;
		GetType(): string { return 'Cmd.OnlineStatePokerCmd_Brd'; }
	}
	/**
	 *  -------------------  Ready -------------------------- //
	 *  请求准备
	 */
	export class ReadyStartPokerCmd_C {
		GetType(): string { return 'Cmd.ReadyStartPokerCmd_C'; }
	}
	export class ReadyStartPokerCmd_S {
		resultCode: number;
		desc: string;
		GetType(): string { return 'Cmd.ReadyStartPokerCmd_S'; }
	}
	export class ReadyStartPokerCmd_Brd {
		uid: number;
		/**
		 * 已经准备好的玩家
		 */
		readyUserSet: number[];
		GetType(): string { return 'Cmd.ReadyStartPokerCmd_Brd'; }
	}
	/**
	 *  -------------------  Go -------------------------- //
	 *  游戏开始广播
	 */
	export class StartPokerCmd_Brd {
		/**
		 * 当前游戏局数
		 */
		curGameNbr: number;
		roomId: number;
		/**
		 * 第一次明牌倒计时
		 */
		showCardTime: number;
		GetType(): string { return 'Cmd.StartPokerCmd_Brd'; }
	}
	/**
	 * 叫分
	 */
	export class StakePokerCmd_C {
		/**
		 * 分
		 */
		multi: number;
		GetType(): string { return 'Cmd.StakePokerCmd_C'; }
	}
	export class StakePokerCmd_S {
		resultCode: number;
		GetType(): string { return 'Cmd.StakePokerCmd_S'; }
	}
	/**
	 * 广播叫分
	 */
	export class StakePokerCmd_Brd {
		stakeSet: StakeSet[];
		GetType(): string { return 'Cmd.StakePokerCmd_Brd'; }
	}
	export class StakeSet {
		uid: number;
		multi: number;
		GetType(): string { return 'Cmd.StakeSet'; }
	}
	/**
	 * 广播地住
	 */
	export class SetLandownerPokerCmd_Brd {
		landownerId: number;
		/**
		 * 底牌
		 */
		landownerCardSet: number[];
		/**
		 * 第三次明牌倒计时
		 */
		showCardTime: number;
		/**
		 * 房间底分
		 */
		baseMulti: number;
		GetType(): string { return 'Cmd.SetLandownerPokerCmd_Brd'; }
	}
	/**
	 * 操作广播
	 */
	export class OperatorPokerCmd_Brd {
		/**
		 * 1叫分操作,2打牌操作
		 */
		opType: number;
		/**
		 * 当前操作玩家id
		 */
		uid: number;
		/**
		 * 当前操作时间
		 */
		sec: number;
		/**
		 * 当前还可以叫的分
		 */
		opMulti: number[];
		GetType(): string { return 'Cmd.OperatorPokerCmd_Brd'; }
	}
	export class OperatorPokerCmd_S {
		/**
		 * 提示是否要的起(1要的起，2要不起)
		 */
		opType: number;
		/**
		 * 1 - 按钮全亮, 2 - 只亮“不出”按钮, 3 - 只暗“不出”按钮
		 */
		button: number;
		/**
		 * 要不起的倒计时(button=2时会发)
		 */
		sec: number;
		GetType(): string { return 'Cmd.OperatorPokerCmd_S'; }
	}
	export class UserCardObj {
		uid: number;
		/**
		 * 牌数量
		 */
		remainderNum: number;
		handCardSet: number[];
		GetType(): string { return 'Cmd.UserCardObj'; }
	}
	/**
	 * 开局发牌
	 */
	export class SelfCardPokerCmd_S {
		/**
		 * 自己的手牌
		 */
		handCard: UserCardObj;
		/**
		 * 别人的手牌，测试用
		 */
		otherCard: UserCardObj[];
		/**
		 * 	optional	uint32 			sec 				= 3; 	// 叫分倒计时
		 * 	optional	uint64 			stakeUid 			= 5; 	// 从他开始叫分
		 */
		resultCode: number;
		GetType(): string { return 'Cmd.SelfCardPokerCmd_S'; }
	}
	/**
	 * 请求出牌
	 */
	export class OutCardPokerCmd_C {
		/**
		 * 玩家要打出去的牌,如果为空,则为要不起
		 */
		outCardSet: number[];
		GetType(): string { return 'Cmd.OutCardPokerCmd_C'; }
	}
	export class OutCardPokerCmd_S {
		resultCode: number;
		outCardGroup: OutCardObj[];
		GetType(): string { return 'Cmd.OutCardPokerCmd_S'; }
	}
	export class OutCardObj {
		multiType: number;
		outCardSet: number[];
		GetType(): string { return 'Cmd.OutCardObj'; }
	}
	export class OutCardPokerCmd_Brd {
		/**
		 * 出牌这id
		 */
		uid: number;
		/**
		 * 	optional	uint32 			sec 				= 2; 	// 出牌倒计时
		 *  打出的牌（thisid数组）
		 */
		outCardSet: number[];
		/**
		 * 当前玩家打的牌型(对应上面的MultiType枚举)
		 */
		outCardSetType: number;
		/**
		 * 剩余手牌数量
		 */
		remainderNum: number;
		GetType(): string { return 'Cmd.OutCardPokerCmd_Brd'; }
	}
	/**
	 * 请求提示
	 */
	export class TipsPokerCmd_C {
		GetType(): string { return 'Cmd.TipsPokerCmd_C'; }
	}
	export class TipsPokerCmd_S {
		/**
		 * 提示可以打的牌（thisid数组）
		 */
		tipsCardSet: TipsCardGroup[];
		resultCode: number;
		GetType(): string { return 'Cmd.TipsPokerCmd_S'; }
	}
	export class TipsCardGroup {
		thisId: number[];
		GetType(): string { return 'Cmd.TipsCardGroup'; }
	}
	/**
	 * 过
	 */
	export class PassPokerCmd_C {
		GetType(): string { return 'Cmd.PassPokerCmd_C'; }
	}
	export class PassPokerCmd_S {
		resultCode: number;
		GetType(): string { return 'Cmd.PassPokerCmd_S'; }
	}
	/**
	 * 请求明牌
	 */
	export class ShowCardPokerCmd_C {
		GetType(): string { return 'Cmd.ShowCardPokerCmd_C'; }
	}
	export class ShowCardPokerCmd_S {
		resultCode: number;
		GetType(): string { return 'Cmd.ShowCardPokerCmd_S'; }
	}
	export class ShowCardPokerCmd_Brd {
		handCard: UserCardObj;
		GetType(): string { return 'Cmd.ShowCardPokerCmd_Brd'; }
	}
	/**
	 * 请求托管
	 */
	export class HostPokerCmd_C {
		/**
		 * 0不托管，1托管
		 */
		hostType: number;
		GetType(): string { return 'Cmd.HostPokerCmd_C'; }
	}
	export class HostPokerCmd_S {
		resultCode: number;
		GetType(): string { return 'Cmd.HostPokerCmd_S'; }
	}
	export class HostPokerCmd_Brd {
		uid: number;
		/**
		 * 0不托管，1托管
		 */
		hostType: number;
		GetType(): string { return 'Cmd.HostPokerCmd_Brd'; }
	}
	/**
	 * 广播赢牌
	 */
	export class WinRetPokerCmd_Brd {
		rewardSet: RewardObj[];
		/**
		 * 0/1/2 ---&gt; 没有/春天/反春
		 */
		springType: number;
		/**
		 * 地主id
		 */
		landownerId: number;
		GetType(): string { return 'Cmd.WinRetPokerCmd_Brd'; }
	}
	export class RewardObj {
		uid: number;
		nickname: string;
		totalReward: number;
		/**
		 * 输赢类型，1赢，0输
		 */
		winType: number;
		/**
		 * 总局数总输赢
		 */
		points: number;
		/**
		 * 玩家头像
		 */
		headurl: string;
		/**
		 * 玩家手牌
		 */
		userCard: UserCardObj;
		GetType(): string { return 'Cmd.RewardObj'; }
	}
	/**
	 * 总成绩
	 */
	export class FinalScorePokerCmd_C {
		/**
		 * 房间id
		 */
		roomId: number;
		GetType(): string { return 'Cmd.FinalScorePokerCmd_C'; }
	}
	export class FinalScorePokerCmd_S {
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 信息
		 */
		desc: string;
		GetType(): string { return 'Cmd.FinalScorePokerCmd_S'; }
	}
	export class FinalScorePokerCmd_Brd {
		/**
		 * 房间id
		 */
		roomId: number;
		/**
		 * 总成绩数据
		 */
		recordInfo: UserRecord[];
		/**
		 * 1:解散房间	2:正常结束
		 */
		state: number;
		/**
		 * 每局明细
		 */
		detail: DetailData[];
		GetType(): string { return 'Cmd.FinalScorePokerCmd_Brd'; }
	}
	export class UserRecord {
		uid: number;
		headurl: string;
		nickname: string;
		/**
		 * 总成绩
		 */
		totalScore: number;
		/**
		 * 是否房主 1:是 0:不是
		 */
		isOwner: number;
		/**
		 * 是否大赢家 1:是 0:不是
		 */
		isWinner: number;
		/**
		 * 房主小费
		 */
		tip: number;
		GetType(): string { return 'Cmd.UserRecord'; }
	}
	export class DetailData {
		timestamp: number;
		statistics: number;
		GetType(): string { return 'Cmd.DetailData'; }
	}
	/**
	 * GM
	 */
	export class GMDealCardPokerCmd_C {
		cardSet: number[];
		uid: number;
		GetType(): string { return 'Cmd.GMDealCardPokerCmd_C'; }
	}
	export class GMDealCardPokerCmd_S {
		resultCode: number;
		GetType(): string { return 'Cmd.GMDealCardPokerCmd_S'; }
	}
	/**
	 * 这条消息是用来驱动机器人打牌的，服务器专用
	 */
	export class OutCardTrigger_S {
		GetType(): string { return 'Cmd.OutCardTrigger_S'; }
	}
	/**
	 * 送礼
	 */
	export class SendGiftPokerCmd_C {
		/**
		 * 礼物内容
		 */
		gift: GiftsInfo;
		GetType(): string { return 'Cmd.SendGiftPokerCmd_C'; }
	}
	export class SendGiftPokerCmd_S {
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 信息
		 */
		desc: string;
		GetType(): string { return 'Cmd.SendGiftPokerCmd_S'; }
	}
	export class SendGiftPokerCmd_Brd {
		/**
		 * 送礼玩家
		 */
		gift: GiftsInfo;
		GetType(): string { return 'Cmd.SendGiftPokerCmd_Brd'; }
	}
	/**
	 * 请求玩家面板信息
	 */
	export class GetPersonalPanel_C {
		/**
		 * 玩家id
		 */
		uid: number;
		GetType(): string { return 'Cmd.GetPersonalPanel_C'; }
	}
	export class GetPersonalPanel_S {
		/**
		 * 玩家基本信息
		 */
		userInfo: UserBaseInfo;
		GetType(): string { return 'Cmd.GetPersonalPanel_S'; }
	}
	/**
	 * 请求解散房间
	 */
	export class RequestDissolveRoom_C {
		GetType(): string { return 'Cmd.RequestDissolveRoom_C'; }
	}
	export class RequestDissolveRoom_S {
		resultCode: number;
		desc: string;
		/**
		 * 在线玩家人数
		 */
		userNum: number;
		GetType(): string { return 'Cmd.RequestDissolveRoom_S'; }
	}
	export class RequestDissolveRoom_Brd {
		/**
		 * 请求解散房间的玩家uid
		 */
		uid: number;
		/**
		 * 等待倒计时
		 */
		waitTime: number;
		GetType(): string { return 'Cmd.RequestDissolveRoom_Brd'; }
	}
	/**
	 * 回应解散房间
	 */
	export class ReplyDissolveRoom_C {
		/**
		 * 1表示同意
		 */
		isAgree: number;
		GetType(): string { return 'Cmd.ReplyDissolveRoom_C'; }
	}
	export class ReplyDissolveRoom_S {
		resultCode: number;
		desc: string;
		GetType(): string { return 'Cmd.ReplyDissolveRoom_S'; }
	}
	export class ReplyDissolveRoom_Brd {
		uid: number;
		/**
		 * 1表示同意
		 */
		isAgree: number;
		GetType(): string { return 'Cmd.ReplyDissolveRoom_Brd'; }
	}
	/**
	 * 成功解散房间
	 */
	export class SuccessDissolveRoom_Brd {
		/**
		 * 所有同意解散的玩家昵称
		 */
		agreeUsers: string[];
		/**
		 * 所有不同意解散的玩家称
		 */
		disagreeUsers: string[];
		/**
		 * 是否解散成功
		 */
		bOk: boolean;
		GetType(): string { return 'Cmd.SuccessDissolveRoom_Brd'; }
	}
	/**
	 * 语音聊天
	 */
	export class VoiceChat_C {
		/**
		 * 语音时长
		 */
		time: string;
		/**
		 * 对应文字
		 */
		words: string;
		/**
		 * 对应地址
		 */
		url: string;
		GetType(): string { return 'Cmd.VoiceChat_C'; }
	}
	export class VoiceChat_S {
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 信息
		 */
		desc: string;
		GetType(): string { return 'Cmd.VoiceChat_S'; }
	}
	export class VoiceChat_Brd {
		/**
		 * 语音时长
		 */
		time: string;
		/**
		 * 对应文字
		 */
		words: string;
		/**
		 * 对应地址
		 */
		url: string;
		/**
		 * 房间id
		 */
		roomId: number;
		/**
		 * 发送语音的玩家id
		 */
		uid: number;
		GetType(): string { return 'Cmd.VoiceChat_Brd'; }
	}
	export class VoiceObj {
		/**
		 * 语音时长
		 */
		time: string;
		/**
		 * 对应文字
		 */
		words: string;
		/**
		 * 对应地址
		 */
		url: string;
		/**
		 * 发送聊天的玩家id
		 */
		uid: number;
		/**
		 * 发送聊天时的时间
		 */
		timestamp: string;
		GetType(): string { return 'Cmd.VoiceObj'; }
	}
	/**
	 * 语音记录
	 */
	export class VoiceChatRecord_C {
		GetType(): string { return 'Cmd.VoiceChatRecord_C'; }
	}
	export class VoiceChatRecord_S {
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 信息
		 */
		desc: string;
		/**
		 * 语音记录
		 */
		records: VoiceObj[];
		GetType(): string { return 'Cmd.VoiceChatRecord_S'; }
	}
	export class CommonChat_C {
		/**
		 * 语音id
		 */
		voiceId: number;
		/**
		 * 文字聊天内容
		 */
		words: string;
		GetType(): string { return 'Cmd.CommonChat_C'; }
	}
	export class CommonChat_S {
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 信息
		 */
		desc: string;
		GetType(): string { return 'Cmd.CommonChat_S'; }
	}
	export class CommonChat_Brd {
		/**
		 * 语音id
		 */
		voiceId: number;
		/**
		 * 发送语音的玩家id
		 */
		uid: number;
		/**
		 * 文字聊天内容
		 */
		words: string;
		GetType(): string { return 'Cmd.CommonChat_Brd'; }
	}
	/**
	 * 音效音乐设置
	 */
	export class SoundSet_C {
		/**
		 * 音效音乐等设置信息
		 */
		setInfo: SetInfo;
		GetType(): string { return 'Cmd.SoundSet_C'; }
	}
	/**
	 * ping值广播
	 */
	export class SetPingTimeNullUserPmd_Brd {
		pingmsec: number;
		accid: number;
		GetType(): string { return 'Cmd.SetPingTimeNullUserPmd_Brd'; }
	}
	export class SetSameIpWarn_S {
		sameSet: string[];
		GetType(): string { return 'Cmd.SetSameIpWarn_S'; }
	}
	export class SysMessagePokerCmd_S {
		desc: string;
		/**
		 * 消息级别和位置相关
		 */
		pos: number;
		GetType(): string { return 'Cmd.SysMessagePokerCmd_S'; }
	}
	export class ChangePointPokerCmd_Brd {
		uid: number;
		/**
		 * 倍数
		 */
		multi: number;
		/**
		 * 原因,0表示明牌翻倍,1表示炸弹翻倍,2表示春天,3表示反春
		 */
		reason: number;
		GetType(): string { return 'Cmd.ChangePointPokerCmd_Brd'; }
	}
	export class JsonCompressKey {
		key: string;
		/**
		 * 嵌套描述
		 */
		json: JsonCompressKey[];
		GetType(): string { return 'Cmd.JsonCompressKey'; }
	}
	/**
	 * json压缩约定消息
	 */
	export class JsonCompressNullUserPmd_CS {
		key: string;
		json: JsonCompressKey[];
		/**
		 * 0表示不省略,1表示省略,默认不省略,default省略,{} ,&quot;&quot;,0
		 */
		omit: number;
		/**
		 * 0表示重置,1表示添加
		 */
		add: number;
		/**
		 * 消息列表
		 */
		msglist: string[];
		GetType(): string { return 'Cmd.JsonCompressNullUserPmd_CS'; }
	}
	export class KeyValueObj {
		id: number;
		value: string;
		GetType(): string { return 'Cmd.KeyValueObj'; }
	}
}
