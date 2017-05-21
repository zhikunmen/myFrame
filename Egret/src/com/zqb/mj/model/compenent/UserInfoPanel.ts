module PKGame {
	export class UserInfoPanel extends BaseVc{
		private _nickTxt:egret.TextField;
		private _idTxt:egret.TextField;
		private _diamondTxt:egret.TextField;//钻石
		private _ipTxt:egret.TextField;//ip
		private _scoreTxt:egret.TextField;
		private _data:Cmd.UserBaseInfo;
		private _genderIcon:egret.Bitmap;
		private _headMc:HeadMc;
		private _givingChips:number;
		private  _giftId:number;
		public constructor() {
			super();
		}
		public initUI():void{
			var txtObj:any=DataCache.langObj.uiTxt.PlayerInfoPanel;
			var bg:egret.Bitmap=ResUtil.createBitmapByName("userInfo_bg");
			bg.scale9Grid=new egret.Rectangle(250,110,30,20);
			bg.width=684+13;
			bg.x=-8;
			bg.height=413;
			this.addChild(bg);
			var contentBg:egret.Bitmap=ResUtil.createBitmapByName("userInfo_contentbg",18,180);
			contentBg.scale9Grid=new egret.Rectangle(200,100,16,21);
			contentBg.width=645;
			contentBg.height=200;
			this.addChild(contentBg);
			var headBg:egret.Bitmap=ResUtil.createBitmapByName("userInfo_headbg",32,34);
			headBg.scale9Grid=new egret.Rectangle(15,15,25,25);
			headBg.width=122;
			headBg.height=122;
			this.addChild(headBg);
			var closeBtn:GameButton=new GameButton(["userInfo_close1","userInfo_close2"],null,false);
			closeBtn.x=632;
			closeBtn.y=-10;
			closeBtn.addClickArea(20);
			this.addChild(closeBtn);
			closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseHandle,this);
			var nickLable:egret.TextField=ResUtil.createTextFeild(0x6a7a7e,egret.HorizontalAlign.LEFT,txtObj.nickLabel,28,178,37,90);
			this.addChild(nickLable);
			var idLabel:egret.TextField=ResUtil.createTextFeild(0x6a7a7e,egret.HorizontalAlign.LEFT,txtObj.idLabel,26,183,90,90);
			this.addChild(idLabel);
			var chipsLabel:egret.TextField=ResUtil.createTextFeild(0x6a7a7e,egret.HorizontalAlign.LEFT,txtObj.chipsLabel,26,455,89,90);
			this.addChild(chipsLabel);
			var levelLabel:egret.TextField=ResUtil.createTextFeild(0x6a7a7e,egret.HorizontalAlign.LEFT,txtObj.levelLabel,26,183,131,90);
			this.addChild(levelLabel);
			var scoreLabel:egret.TextField=ResUtil.createTextFeild(0x6a7a7e,egret.HorizontalAlign.LEFT,txtObj.scoreLabel,26,455,131,90);
			this.addChild(scoreLabel);
			this._nickTxt=ResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.LEFT,"",28,260,37,159);
			this._nickTxt.height=26;
			this.addChild(this._nickTxt);
			this._idTxt=ResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.LEFT,"",26,258,90,136);
			this.addChild(this._idTxt);
			this._diamondTxt=ResUtil.createTextFeild(0x18709e,egret.HorizontalAlign.LEFT,"",26,535,90,136);
			this.addChild(this._diamondTxt);
			this._ipTxt=ResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.LEFT,"",26,258,131,200);
			this.addChild(this._ipTxt);
			this._scoreTxt=ResUtil.createTextFeild(0x18709e,egret.HorizontalAlign.LEFT,"",26,535,131,136);
			this.addChild(this._scoreTxt);
			var line:egret.Bitmap=ResUtil.createBitmapByName("userInfo_line",170,72);
			line.width=453;
			this.addChild(line);
			var item:GiftItem;
			var arr:Array<any>=PKtable.TableGift.instance();
			for (var i = 0; i < arr.length; i++) {
				item=new GiftItem();
				item.data=arr[i];
				item.x=23+105*i;
				item.y=228;
				this.addChild(item);
				item.touchEnabled=true;
				item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickGift,this);
			}
			this._headMc = new HeadMc(110,110);
            this._headMc.x = headBg.x+6;
            this._headMc.y = headBg.y+6;
            this.addChild(this._headMc);
		}
		private onCloseHandle(evt:egret.TouchEvent):void{
			this.dispatchEventWith(UIEventConsts.CLOSE);
		}

		private onClickGift(evt:egret.TouchEvent):void{
			var item:GiftItem=evt.currentTarget;
			var userNum:number=1;
			if(this._data == null)return;
			if(this._data.uid==uniLib.UserInfo.uid){
				userNum=RoomInfo.getInstance().userList.length-1;
			}
			if(userNum<=0){
				GameInfo.manage.showMildWarnShow(DataCache.langObj.msgTxt.noOtherPlayer);
				this.dispatchEventWith(UIEventConsts.CLOSE);
				return;
			}
			if(this._data.uid==uniLib.UserInfo.uid){
				var info:Cmd.GiftsInfo=new Cmd.GiftsInfo();
				info.giftsId=item.data.giftId;
				info.toUid=0;
				info.fromUid=this._data.uid;
				info.giftsNum=1;
				this.dispatchEventWith(UIEventConsts.GIFT_SEND,false,info);
			}else{
				var info:Cmd.GiftsInfo=new Cmd.GiftsInfo();
				info.giftsId=item.data.giftId;
				info.toUid=this._data.uid;
				info.fromUid=uniLib.UserInfo.uid;
				info.giftsNum=1;
				this.dispatchEventWith(UIEventConsts.GIFT_SEND,false,info);
			}
		}
		private  onYesHandler():void{
            if(MyUserInfo.getInstance().remainder < this._givingChips) {
                GameInfo.manage.showMildWarnShow(DataCache.langObj.alertTxt.giftFail);
            }else {
				var info:Cmd.GiftsInfo=new Cmd.GiftsInfo();
				info.giftsId=this._giftId;
				info.toUid=this._data.uid;
				info.fromUid=uniLib.UserInfo.uid;
				info.giftsNum=1;
				this.dispatchEventWith(UIEventConsts.GIFT_SEND,false,info);
            }
        }
		public reset():void{
			this._data=null;
			this._idTxt.text="";
			this._nickTxt.text="";
			this._ipTxt.text="";
			this._diamondTxt.text="";
			this._scoreTxt.text="";
			this._headMc.visible=false;
		}
		public setData(rev:Cmd.UserBaseInfo):void{
			this._data=rev;
			var sex:string="female"
				if(rev.gender=="男"){
					sex="male";
				}
			if(!this._genderIcon){
				this._genderIcon=ResUtil.createBitmapByName("userInfo_"+sex,444,41);
				this.addChild(this._genderIcon);
			}else{
				this._genderIcon.texture=ResUtil.createTexture("userInfo_"+sex);
			}
			this._idTxt.text=rev.uid.toString();
			this._nickTxt.text=rev.nickname;
			if(undefined!=rev.ip)this._ipTxt.text=rev.ip;
			if(undefined!=rev.diamond)this._diamondTxt.text=rev.diamond.toString();
			this._scoreTxt.text=rev.points.toString();
			this._headMc.headUrl = rev.headurl;
			this._headMc.visible=true;
		}
		public destory():void{
			if(this._headMc){
				this._headMc.destory();
				this._headMc = null;
			}
			var arr:Array<any>=PKtable.TableGift.instance();
			if(arr){
				for (var i = 0; i < arr.length; i++) {
					var item:GiftItem=new GiftItem();
					item.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickGift,this);
					item.destory();
				}
			}
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._data = null;
			this._idTxt = null;
			this._ipTxt = null;
			this._nickTxt = null;
			this._diamondTxt = null;
			this._genderIcon = null;
		}
	}
	export class GiftItem extends BaseVc{
		private _nameTxt:egret.TextField;
		private _chipsTxt:egret.TextField;
		private _giftIcon:egret.Bitmap;
		private _data:any;
		public constructor() {
			super();
		}
		public initUI():void{
			var bg:egret.Bitmap=ResUtil.createBitmapByName("userInfo_gift_bg2");
			bg.scale9Grid=new egret.Rectangle(33,35,5,70);
			bg.width=109;
			bg.height=139;
			this.addChild(bg);
			this._nameTxt=ResUtil.createTextFeild(0x066576,egret.HorizontalAlign.CENTER,"",20,5,3,100);
			this.addChild(this._nameTxt);
			this._chipsTxt=ResUtil.createTextFeild(0xF9E03B,egret.HorizontalAlign.LEFT,"",20,38,101,94);
			this._chipsTxt.fontFamily="微软雅黑";
			this.addChild(this._chipsTxt);
		}
		public set data(vo:PKtable.TableGift){
			this._nameTxt.text=vo.giftName;
			if(0 == vo.giftCost)
				this._chipsTxt.text="免费";
			else
				this._chipsTxt.text = vo.giftCost + "钻";
			if(!this._giftIcon){
				this._giftIcon=ResUtil.createBitmapByName("userInfo_gift"+vo.giftId,17,20);
				this.addChild(this._giftIcon);
			}
			this._data=vo;
		}
		public get data():PKtable.TableGift{
			return this._data;
		}
		public destory(){
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._data = null;
			this._nameTxt = null;
			this._chipsTxt = null;
		}
	}
}
