/**
 * Created by iluspan on 17/3/28.
 */
class RepManager  {

    private static _ins:RepManager;
    public static get ins():RepManager {
        if (this._ins == null) {
            this._ins = new RepManager();
        }
        return this._ins;
    }


    //改变牌型
    public GMDealCardPokerCmd_C(cardSet:any[],uid:number):void {
        var req:Cmd.GMDealCardPokerCmd_C = new Cmd.GMDealCardPokerCmd_C();
        req.cardSet = cardSet;
        req.uid = uid;
        uniLib.NetMgr.tcpSend(req);
    }

    //请求准备
    public ReadyStartPokerCmd_C():void {

        var req:Cmd.ReadyStartPokerCmd_C = new Cmd.ReadyStartPokerCmd_C();
        uniLib.NetMgr.tcpSend(req);
    }

    //请求断线重连
    public EnterPokerCmd_C():void {

        var data: Cmd.EnterPokerCmd_C = new Cmd.EnterPokerCmd_C();
        let roomId = Number(uniLib.BrowersUtils.GetRequest("roomId"));
        let handCardInitId = Number(uniLib.BrowersUtils.GetRequest("handCardInitId"));
        let recordUid = Number(uniLib.BrowersUtils.GetRequest("recordUid"));
        let gameId = Number(uniLib.BrowersUtils.GetRequest("ddzGame"));
        let robotId = Number(uniLib.BrowersUtils.GetRequest("robotId"));
        let robotNum = Number(uniLib.BrowersUtils.GetRequest("robotNum"));
        let subGameType = Number(uniLib.BrowersUtils.GetRequest("subGameType"));
        data.roomId = roomId ? roomId : 0;
        //本地跟测试服的调试
        data.globalRoomId = roomId ? roomId : 111111;
        if (robotId > 0){
            data.robotId = robotId;
        }

        if (robotNum > 0){
            data.robotNum = robotNum;
        }
        if (gameId > 0){
            data.gameId = gameId;
        }

        if(PKGame.DataCache.platParam){
            data.globalRoomId = PKGame.DataCache.platParam.globalRoomId;
            data.roomId = PKGame.DataCache.platParam.roomId;
        }
        uniLib.NetMgr.tcpSend(data);
    }


}
