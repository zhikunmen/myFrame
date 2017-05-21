module PKGame {
	export class GiftAnItem extends BaseVc{
		private _giftId:number;
		private _effectMc:dragonBones.Armature | dragonBones.FastArmature;
		public constructor() {
			super();
		}
		public initUI():void{
		}
		public set giftId(id:number){
			this._giftId=id;
			if(!this._effectMc){
				this._effectMc=uniLib.DisplayUtils.createDragonBonesDisplay("gift_effect_drag_json", "gift_effect_json","gift_effect_png","MovieClip");
				dragonBones.WorldClock.clock.add(this._effectMc);	
				this._effectMc.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE,this.onAnimationEvent,this);			
			}
			this._effectMc.animation.gotoAndStopByFrame("gift"+this._giftId,0);
			this.addChild(this._effectMc.display);
		}
		private onAnimationEvent(){
			this.index++;
			if(this._giftId!=4&&this._giftId!=3) {
				if(this.index == 2){
					if(!this._effectMc)return;
					this._effectMc.animation.stop("gift"+this._giftId);
					this.destory();
					this.index = 0;
				}
			}
			else{
				if(this.index == 1){
					if(!this._effectMc)return;
					this._effectMc.animation.stop("gift"+this._giftId);
					this.destory();
					this.index = 0;
				}
			}
		}
        private index:number = 0;
		public play():void{
			if(this._effectMc == null)return;
			if(!dragonBones.WorldClock.clock.contains(this._effectMc)){
                 dragonBones.WorldClock.clock.add(this._effectMc);
			}
			if(this._giftId!=4&&this._giftId!=3){
				this._effectMc.animation.play("gift"+this._giftId);
			}else{
				this._effectMc.animation.play("gift"+this._giftId);
			}
			var sound = PKtable.PokerTableCard.resSoundGift(this._giftId);
			if(sound != ""){
				uniLib.SoundMgr.instance.playSound(sound);
			}
		}
		public destory():void{
			if(this._effectMc){
				this._effectMc.animation.stop();
				this._effectMc.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE,this.onAnimationEvent,this);
				uniLib.DisplayUtils.destoryDragonBonesArmature(this._effectMc,"gift"+this._giftId);
				if(this._effectMc.display){
					this.removeChild(this._effectMc.display);
				}
			}
			this._effectMc = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}