module PKGame {
	import DragonBones = dragonBones.DragonBones;
	/**
	 *动画跟结算面板
	 */
	export class ActionEffectMc extends BaseVc {

		private _facePanel:egret.Sprite[];
		private _quickTalkPanel:egret.Sprite[];
		private _talkPanel:egret.Sprite[];
		public paixingMovie:dragonBones.Armature;

		public  showHandCardNode:ShowHandCardVc;

		//保单警报
		private _baodan0:dragonBones.Armature;
		private _baodan1:dragonBones.Armature;

		private _baodan3:dragonBones.Armature;


		private _yaobuqiLabel:egret.Bitmap;

		public constructor() {
			super();
		}
		public initUI():void{
			//按座位添加
			this._facePanel = [];
			for(var i:number = 0;i<4;i++){
				var panel = new egret.Sprite;
				this._facePanel.push(panel);
				this.addChild(panel);
			}

			this._quickTalkPanel = [];
			for(var i:number = 0;i<4;i++){
				var panel = new egret.Sprite;
				this._quickTalkPanel.push(panel);
				this.addChild(panel);
			}

			this._talkPanel = [];
			for(var i:number = 0;i<4;i++){
				var panel = new egret.Sprite;
				this._talkPanel.push(panel);
				this.addChild(panel);
			}

			this.showHandCardNode = new ShowHandCardVc();
			this.addChild(this.showHandCardNode);

			//初始化牌型动画
			this.paixingMovie = uniLib.DisplayUtils.createDragonBonesDisplay("doudizhu_paixing_effect_ske_json", "doudizhu_paixing_effect_tex_json", "doudizhu_paixing_effect_tex_png", "MovieClip");
			dragonBones.WorldClock.clock.add(this.paixingMovie);
			this.paixingMovie.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onAnimationComplete, this);

			//报单动画
			this._baodan0 = uniLib.DisplayUtils.createDragonBonesDisplay("doudizhu_jingbao_effect_ske_json", "doudizhu_jingbao_effect_tex_json", "doudizhu_jingbao_effect_tex_png", "MovieClip");
			dragonBones.WorldClock.clock.add(this._baodan0);
			this.addChild(this._baodan0.display);
			this._baodan1 = uniLib.DisplayUtils.createDragonBonesDisplay("doudizhu_jingbao_effect_ske_json", "doudizhu_jingbao_effect_tex_json", "doudizhu_jingbao_effect_tex_png", "MovieClip");
			dragonBones.WorldClock.clock.add(this._baodan1);
			this.addChild(this._baodan1.display);

			this._baodan3 = uniLib.DisplayUtils.createDragonBonesDisplay("doudizhu_jingbao_effect_ske_json", "doudizhu_jingbao_effect_tex_json", "doudizhu_jingbao_effect_tex_png", "MovieClip");
			dragonBones.WorldClock.clock.add(this._baodan3);
			this.addChild(this._baodan3.display);

            GameUtil.setContainerPos(this._baodan0.display,PKGame.PositionData.getInstance().jingBaoPosArr,0);
			GameUtil.setContainerPos(this._baodan1.display,PKGame.PositionData.getInstance().jingBaoPosArr,1);
			GameUtil.setContainerPos(this._baodan3.display,PKGame.PositionData.getInstance().jingBaoPosArr,2);

			this._yaobuqiLabel = ResUtil.createBitmapByName("passhint");

			this.addChild(this._yaobuqiLabel);

			GameUtil.setPosBySeat(this._yaobuqiLabel,0);
			this._yaobuqiLabel.y = this._yaobuqiLabel.y - 100;

			this._yaobuqiLabel.visible = false;
		}

		/**
		 *
		 * 播放报单动画
		 * @param seat 位置
		 * @param type 保单类型，1，报单，2，报双
		 */
		public showBaoDanEffect(seat:number):void {


		    if (seat == 2) {
		    	seat = 3;
			}
			if (seat == 0) {
				GameUtil.removeDragonBone(this._baodan0);
				this._baodan0.animation.play("jingbaoqi");
				this.addChild(this._baodan0.display);

				// if (type == 1) {
				// 	this._baodanImg0.texture = RES.getRes("pdk_baodan_png");
				// }else if (type == 2) {
				// 	this._baodanImg0.texture = RES.getRes("pdk_baoshuang_png");
				// }
			}else if (seat == 1) {
				GameUtil.removeDragonBone(this._baodan1);
				this._baodan1.animation.play("jingbaoqi");
				this.addChild(this._baodan1.display);
				// if (type == 1) {
				// 	this._baodanImg1.texture = RES.getRes("pdk_baodan_png");
				// }else if (type == 2) {
				// 	this._baodanImg1.texture = RES.getRes("pdk_baoshuang_png");
				// }
			}else if (seat == 3){
				GameUtil.removeDragonBone(this._baodan3);
				this._baodan3.animation.play("jingbaoqi");
				this.addChild(this._baodan3.display);
				// if (type == 1) {
				// 	this._baodanImg3.texture = RES.getRes("pdk_baodan_png");
				// }else if (type == 2) {
				// 	this._baodanImg3.texture = RES.getRes("pdk_baoshuang_png");
				// }
			}

		}


		public isPassCards(ispass:boolean):void {
			this._yaobuqiLabel.visible = ispass;
		}

		public resetBaoDanView():void {
            //
			// this._baodanImg0.texture = RES.getRes("");
			// this._baodanImg1.texture = RES.getRes("");
			// this._baodanImg3.texture = RES.getRes("");

			GameUtil.removeDragonBone(this._baodan0);
			GameUtil.removeDragonBone(this._baodan1);
			GameUtil.removeDragonBone(this._baodan3);
		}

		private onAnimationComplete(e:dragonBones.AnimationEvent):void {
			DisplayUtils.removeFromParent(e.currentTarget);
			// GameUtil.removeDragonBone(e.currentTarget);
		}


		//播放牌型动画
		public PlayPaixingEffect(type:number,seat:number):void{
			if (!type) return;
			var name:string = null;
			if (type == 1) {

				return;
			}else if (type == 2) {
				name = null;
				return;
			}else if (type == 3) {
				name = "sanzhang";
			}else if (type == 4) {
				name = "sandaiyi";
			}else if (type == 5) {
				name = "sandaiyidui";

			}else if (type == 6) {
				name = "danshun";

			}else if (type == 7) {
				name = "shuangshun";

			}else if (type == 8) {
				name = "sanshun";

			}else if (type == 9) {
				name = "feijidaichibang";

			}else if (type == 10) {
				name = "sidaier";
			}else if (type == 11) {
				name = "zhadan";
			}else if (type == 12) {
				name = "huojian";
			}else if (type == 13) {
				name = "chuntian";
			}else if (type == 14) {
				name = "fanchun";
			}
			if (name) {
				this.paixingMovie.animation.play(name,1);
				this.addChild(this.paixingMovie.display);
				this.paixingMovie.display.y = uniLib.Global.screenHeight / 2;
				this.paixingMovie.display.x = uniLib.Global.screenWidth / 2;

			}

		}





		public clearEffect(){
			this.showHandCardNode.dispose();
		}
		private _time_100:uniLib.TimerBase;

		/**
		 * 通用聊天
		 */
		public showCommonChat(uid:number,commonId:string){
			var seatId:number=RoomInfo.getInstance().getSeatNoByUserId(uid);
			var gender:number = RoomInfo.getInstance().getUserVoByUid(uid).getGender();

			GameUtil.setPosBySeat(this._facePanel[seatId],seatId,PKGame.CardInfo.getInstance().chatImgArr);
			GameUtil.setPosBySeat(this._quickTalkPanel[seatId],seatId,PKGame.CardInfo.getInstance().chatTextArr);
			var id:string;
			if(commonId.charAt(0) == "1"){
				//11-118 表情
			    id = commonId.substr(1,commonId.length-1);
				var face:egret.Bitmap = ResUtil.createBitmapByName("face"+id);
				this._facePanel[seatId].addChild(face);
				var duration: number = 250;                                      //耗时，毫秒。 2000=2秒完成
				var waited: number = 0;                                           //下个动画等待时间 如果不循环，设置为0
				var locY = face.y;
				egret.Tween.get(face).wait(2000).call(this.showCompelete,this,[face,seatId]);
				egret.Tween.get(face, { loop: true }).to({ y: locY - 22 }, duration, egret.Ease.sineIn).wait(waited).
                to({ y: locY }, duration, egret.Ease.sineIn);
			}
			else if(commonId.charAt(0) == "2"){
				//20-25 快捷聊天 
				id = commonId.substr(1,commonId.length-1);
				uniLib.SoundMgr.instance.playSound(SoundConsts.COMMON+"_"+gender+"_"+id+"_mp3");
				this.creatChatPop(seatId,PKGame.GameData.getInstance().ShortTalkArr[id],this._quickTalkPanel[seatId]);		
				egret.Tween.get(this._quickTalkPanel[seatId]).wait(3000).call(this.quickTalkCompelete,this,[this._quickTalkPanel[seatId],seatId]);		
			}
		}
		public showCommonTalk(uid:number,content:string){
            var seatId:number=RoomInfo.getInstance().getSeatNoByUserId(uid);
			switch(seatId){
				case 0:
				    this._talkPanel[seatId].x = PositionData.seatPosArr[seatId].x+100;
					this._talkPanel[seatId].y = PositionData.seatPosArr[seatId].y*uniLib.ScreenUtils.scaleFactor;
					break;
				case 1:
			        this._talkPanel[seatId].x = PositionData.seatPosArr[seatId].x - 180;
					this._talkPanel[seatId].y = PositionData.seatPosArr[seatId].y*uniLib.ScreenUtils.scaleFactor;
					break;
				case 2:
				    this._talkPanel[seatId].x = PositionData.seatPosArr[seatId].x-180;
					this._talkPanel[seatId].y = PositionData.seatPosArr[seatId].y*uniLib.ScreenUtils.scaleFactor;
					break;
				case 3:
			        this._talkPanel[seatId].x = PositionData.seatPosArr[seatId].x+100;
					this._talkPanel[seatId].y = PositionData.seatPosArr[seatId].y*uniLib.ScreenUtils.scaleFactor;
					break;	
				default:
					break;
			}
			this.creatChatPop(seatId,content,this._talkPanel[seatId]);		
			egret.Tween.get(this._quickTalkPanel[seatId]).wait(3000).call(this.talkCompelete,this,[this._talkPanel[seatId],seatId]);	
		}
		private showCompelete(param,seatId){
			if(param){
				egret.Tween.removeTweens(param);
			}
			uniLib.DisplayUtils.removeAllChildren(this._facePanel[seatId]);
		}

		private quickTalkCompelete(param,seatId){
			if(param){
				egret.Tween.removeTweens(param);
			}
			uniLib.DisplayUtils.removeAllChildren(this._quickTalkPanel[seatId]);
		}

		private talkCompelete(param,seatId){
			if(param){
				egret.Tween.removeTweens(param);
			}
			uniLib.DisplayUtils.removeAllChildren(this._talkPanel[seatId]);
		}
		public creatChatPop(seat:number,str:string,parent:egret.Sprite){
			var pop:egret.Bitmap = ResUtil.createBitmapByName("chat_pop");
			pop.scale9Grid = new egret.Rectangle(28,33,13,5);
			pop.width = 245;
			parent.addChild(pop);


			var talk:egret.TextField = ResUtil.createTextFeild(0x163b41,egret.HorizontalAlign.LEFT,"",28,35,10,210,false,4);
			talk.text = str;
			parent.addChild(talk);
			pop.height = 10+talk.height+20;


		}
		public destory():void{
			super.destory();
			egret.Tween.removeTweens(this);
			if(this._time_100){
				this._time_100.stop();
			}
			this._time_100 = null;

			for(var i:number = 0;i<4;i++){
				var panel = this._facePanel[i];
				uniLib.DisplayUtils.removeAllChildren(panel);
			    uniLib.DisplayUtils.removeFromParent(panel);
				panel = null;
			}
			this._facePanel = null;
			for(var i:number = 0;i<4;i++){
				var panel = this._quickTalkPanel[i];
				uniLib.DisplayUtils.removeAllChildren(panel);
			    uniLib.DisplayUtils.removeFromParent(panel);
				panel = null;
			}
			this._quickTalkPanel = null;
			for(var i:number = 0;i<4;i++){
				var panel = this._talkPanel[i];
				uniLib.DisplayUtils.removeAllChildren(panel);
			    uniLib.DisplayUtils.removeFromParent(panel);
				panel = null;
			}
			this._talkPanel = null;

			if (this.paixingMovie) {
				GameUtil.removeDragonBone(this.paixingMovie);
				this.paixingMovie = null;
			}

			if (this._baodan0) {
				GameUtil.removeDragonBone(this._baodan0);
				this._baodan0 = null;
			}
			if (this._baodan1) {
				GameUtil.removeDragonBone(this._baodan1);
				this._baodan1 = null;
			}

			if (this._baodan3) {
				GameUtil.removeDragonBone(this._baodan3);
				this._baodan3 = null;
			}
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}		
	}
}
