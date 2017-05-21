/// <reference path="table/gameList.ts" />
/// <reference path="table/PokerTableCard.ts" />
/// <reference path="table/TableGift.ts" />
/// <reference path="table/TableGoodsConfig.ts" />
/// <reference path="table/TableRoomCostConfig.ts" />
/// <reference path="table/TableServerReturnCode.ts" />
/// <reference path="table/TableShopConfig.ts" />
/// <reference path="table/TableVoice.ts" />
/// <reference path="table/TablePlayTypeList.ts" />
/// <reference path="table/TableMahjongMulti.ts" />

// 对自动生成的表格代码的扩展

/**
 * 表格加载后立刻从引擎资源缓存中删除，避免占内存
 */
function loadTable(key: string): any {
    var res = RES.getRes(key);
    // RES.destroyRes(key);
    return res;
}


//////////////////////////////////////////////////////////////////////////////////////////
// TableCard
declare module PKtable {
    module PokerTableCard {
        var $instance: PKtable.PokerTableCard[];
        function instance(): PKtable.PokerTableCard[];
        /**
         * 得到cardId符合的第一张牌
         */
        function selectByCardId(cardId: number): PKtable.PokerTableCard;
        /**
         * 得到thisid符合的牌
         */
        function selectByThisId(thisid: number): PKtable.PokerTableCard;
        /**
         * 从thisid得到对应的cardId
         */
        function thisIdToCardId(thisid: number): number;
        /**
         * 从cardId得到type类型
         */
        function cardIdToType(cardId: number): Cmd.PokerCardType;
        /**
         * 从thisid得到type类型
         */
        function thisIdToType(thisid: number): Cmd.PokerCardType;
        /**从thisId得到icon */
        function thisIdToIcon(thisid: number): number;
        function resOpen(cardId:number):string;
        function resNormal(cardId: number): string;
        function resPutOut(cardId: number, seatId: number): string;
        function resWin(cardId: number): string;
        function resSound(cardId: number, female: number): string;
        function resSoundAction(type: Cmd.PokerCardType, female: number): string;
        function resSoundGift(giftId: number): string;
    }
}

PKtable.PokerTableCard.instance = function (): PKtable.PokerTableCard[] {
    if (PKtable.PokerTableCard.$instance == null) {
        PKtable.PokerTableCard.$instance = loadTable("DizhuCard_json");
    }
    return PKtable.PokerTableCard.$instance;
}

PKtable.PokerTableCard.selectByCardId = function (cardId: number): PKtable.PokerTableCard {
    // console.error(table);
    for (let item of PKtable.PokerTableCard.instance()) {
        if (item.cardId == cardId) {
            return item;
        }
    }
}
PKtable.PokerTableCard.selectByThisId = function (thisid: number): PKtable.PokerTableCard {
    for (let item of PKtable.PokerTableCard.instance()) {
        if (item.thisId == thisid) {
            return item;
        }
    }
}

PKtable.PokerTableCard.thisIdToCardId = function (thisid: number): number {
    return Math.floor(thisid * 0.1);
}
PKtable.PokerTableCard.cardIdToType = function (cardId: number): Cmd.PokerCardType {
    return Math.floor(cardId * 0.1);
}
PKtable.PokerTableCard.thisIdToType = function (thisid: number): Cmd.PokerCardType {
    return Math.floor(thisid * 0.01);
}
PKtable.PokerTableCard.thisIdToIcon = function (thisid: number): number {

    let item:PKtable.PokerTableCard = PKtable.PokerTableCard.selectByThisId(thisid);
    if(item && item.icon){
        return item.icon;
    }
    return 0;
}

PKtable.PokerTableCard.resNormal = function (cardId: number): string {
    var str:string = cardId.toString();
    var name:string;
    if (str.length == 3) {
        name = "Poker_" + str.charAt(1) + "_0" + str.charAt(2);
    }else if (str.length == 4) {
        name  = "Poker_" + str.charAt(1) + "_" + str.charAt(2) + str.charAt(3);
    }
    // var icon:number = table.PokerTableCard.thisIdToIcon(cardId);
    // if(icon != 0){
    //     str = icon.toString();
    // }
    // else{
    //     str = cardId.toString();
    // }

    // var name:string = "Poker_" + str.charAt(0) + "_" + str.substr(1,str.length);
    return name;
}
PKtable.PokerTableCard.resPutOut = function (cardId: number, seatId: number): string {
    var str:string;
    var icon:number = PKtable.PokerTableCard.thisIdToIcon(cardId);
    if(icon != 0){
        str = icon.toString();
    }
    else{
        str = cardId.toString();
    }
    return "PutOutCard" + seatId + "_" + str.charAt(0) + "_" + str.charAt(1);
}
PKtable.PokerTableCard.resWin = function (cardId: number): string {
    var str:string;
    var icon:number = PKtable.PokerTableCard.thisIdToIcon(cardId);
    if(icon != 0){
        str = icon.toString();
    }
    else{
        str = cardId.toString();
    }
    return "WinCard0_" + str.charAt(0) + "_" + str.charAt(1);
}
PKtable.PokerTableCard.resOpen = function (cardId: number): string {
    var str:string;
    var icon:number = PKtable.PokerTableCard.thisIdToIcon(cardId);
    if(icon != 0){
        str = icon.toString();
    }
    else{
        str = cardId.toString();
    }
    return "OpenCard0_" + str.charAt(0) + "_" + str.charAt(1);
}
PKtable.PokerTableCard.resSound = function (thisId: number, female: number): string {
    var icon:number = PKtable.PokerTableCard.thisIdToIcon(thisId);
    if(icon == 0){
        //如果icon为0 取cardId
        icon = PKtable.PokerTableCard.thisIdToCardId(thisId);
    }
    var sound:string = "voice_" + PKGame.RoomInfo.getInstance().languageMode + "_" + female + "_" + icon + "_mp3";
    if(RES.hasRes(sound)){
        return sound;
    }
    return "";
}
PKtable.PokerTableCard.resSoundAction = function (type: Cmd.PokerCardType, female: number): string {
    var sound:string = "action_" + PKGame.RoomInfo.getInstance().languageMode + "_" + female.toString() + type.toString() + "_mp3";
    if(RES.hasRes(sound)){
        return sound;
    }
    return "";
}
PKtable.PokerTableCard.resSoundGift = function (giftId: number): string {
    var sound:string = "GiftSound" + giftId + "_mp3";
    if(RES.hasRes(sound)){
        return sound;
    }
    return "";
}

//////////////////////////////////////////////////////////////////////////////////////////
//TableMahjongMulti
declare module PKtable {
    module TableMahjongMulti {
        var $instance: PKtable.TableMahjongMulti[];
        function instance(): PKtable.TableMahjongMulti[];
        function selectNameById(num: number): string;
        function selectBaohuById(num : number):number;
        function selectCartoonById(num:number):string;
        function selectTypeById(num: number): string;
        function selectItemById(num: number): PKtable.TableMahjongMulti;
    }
}

PKtable.TableMahjongMulti.instance = function(): PKtable.TableMahjongMulti[] {
    if (PKtable.TableMahjongMulti.$instance == null) {
        PKtable.TableMahjongMulti.$instance = loadTable("TableMahjongMulti_json");
    }
    return PKtable.TableMahjongMulti.$instance;
}

PKtable.TableMahjongMulti.selectNameById = function(num: number): string {
    for (var item of PKtable.TableMahjongMulti.instance()) {
        if (item.id == num　&& item.gameId == uniLib.Global.gameId) {
            return item.name;
        }
    }
    return "";
}

PKtable.TableMahjongMulti.selectBaohuById = function(num:number):number{
    for (var item of PKtable.TableMahjongMulti.instance()) {
        if (item.id == num &&　item.gameId == uniLib.Global.gameId) {
            return item.baohu;
        }
    }
    return 0;
}

PKtable.TableMahjongMulti.selectCartoonById = function(num:number):string{
    for (var item of PKtable.TableMahjongMulti.instance()) {
        if (item.id == num && item.gameId == uniLib.Global.gameId) {
            return item.cartoon;
        }
    }
    return "";
}

PKtable.TableMahjongMulti.selectItemById = function(num:number):PKtable.TableMahjongMulti{
    for (var item of PKtable.TableMahjongMulti.instance()) {
        if (item.id == num && item.gameId == uniLib.Global.gameId) {
            return item;
        }
    }
    return null;
}


//////////////////////////////////////////////////////////////////////////////////////////
// TableGift
declare module PKtable {
    module TableGift {
        var $instance: PKtable.TableGift[];
        function instance(): PKtable.TableGift[];
    }
}

PKtable.TableGift.instance = function (): PKtable.TableGift[] {
    if (PKtable.TableGift.$instance == null) {
        PKtable.TableGift.$instance = loadTable("TableGift_json");
    }
    return PKtable.TableGift.$instance;
}


//////////////////////////////////////////////////////////////////////////////////////////
// TableGoodsConfig
declare module PKtable {
    module TableGoodsConfig {
        var $instance: PKtable.TableGoodsConfig[];
        function instance(): PKtable.TableGoodsConfig[];
    }
}

PKtable.TableGoodsConfig.instance = function (): PKtable.TableGoodsConfig[] {
    if (PKtable.TableGoodsConfig.$instance == null) {
        PKtable.TableGoodsConfig.$instance = loadTable("TableGoodsConfig_json");
    }
    return PKtable.TableGoodsConfig.$instance;
}


//////////////////////////////////////////////////////////////////////////////////////////
// TableRoomCostConfig
declare module PKtable {
    module TableRoomCostConfig {
        var $instance: PKtable.TableRoomCostConfig[];
        function instance(): PKtable.TableRoomCostConfig[];
    }
}

PKtable.TableRoomCostConfig.instance = function (): PKtable.TableRoomCostConfig[] {
    if (PKtable.TableRoomCostConfig.$instance == null) {
        PKtable.TableRoomCostConfig.$instance = loadTable("TableRoomCostConfig_json");
    }
    return PKtable.TableRoomCostConfig.$instance;
}


//////////////////////////////////////////////////////////////////////////////////////////
// TableServerReturnCode
declare module PKtable {
    module TableServerReturnCode {
        var $instance: PKtable.TableServerReturnCode[];
        function instance(): PKtable.TableServerReturnCode[];
    }
}

PKtable.TableServerReturnCode.instance = function (): PKtable.TableServerReturnCode[] {
    if (PKtable.TableServerReturnCode.$instance == null) {
        PKtable.TableServerReturnCode.$instance = loadTable("TableServerReturnCode_json");
    }
    return PKtable.TableServerReturnCode.$instance;
}


//////////////////////////////////////////////////////////////////////////////////////////
// TableShopConfig
declare module PKtable {
    module TableShopConfig {
        var $instance: PKtable.TableShopConfig[];
        function instance(): PKtable.TableShopConfig[];
    }
}

PKtable.TableShopConfig.instance = function (): PKtable.TableShopConfig[] {
    if (PKtable.TableShopConfig.$instance == null) {
        PKtable.TableShopConfig.$instance = loadTable("TableShopConfig_json");
    }
    return PKtable.TableShopConfig.$instance;
}


//////////////////////////////////////////////////////////////////////////////////////////
// TableVoice
declare module PKtable {
    module TableVoice {
        var $instance: PKtable.TableVoice[];
        function instance(): PKtable.TableVoice[];
        function select(text: string): number;
    }
}

PKtable.TableVoice.instance = function (): PKtable.TableVoice[] {
    if (PKtable.TableVoice.$instance == null) {
        PKtable.TableVoice.$instance = loadTable("TableVoice_json");
    }
    return PKtable.TableVoice.$instance;
}

PKtable.TableVoice.select = function (text: string): number {
    for (var item of PKtable.TableVoice.instance()) {
        if (item.text == text) {
            return item.cardId;
        }
    }
    return 0;
}
//TablePlayTypeList
declare module PKtable {
    module TablePlayTypeList {
        var $instance: PKtable.TablePlayTypeList[];
        function instance(): PKtable.TablePlayTypeList[];
        function getPlayTypeDes(id: number): string;
    }
}

PKtable.TablePlayTypeList.instance = function (): PKtable.TablePlayTypeList[] {
    if (PKtable.TablePlayTypeList.$instance == null) {
        PKtable.TablePlayTypeList.$instance = loadTable("TablePlayTypeList_json");
    }
    return PKtable.TablePlayTypeList.$instance;
}

PKtable.TablePlayTypeList.getPlayTypeDes = function (id: number): string {
    for (var item of PKtable.TablePlayTypeList.instance()) {
        if (item.id == id) {
            return item.desc;
        }
    }
    return "";
}
