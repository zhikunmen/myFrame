module PKGame {
	export class StartEffectMc extends BaseVc {
		private _bg:egret.Bitmap
		private _armature:dragonBones.FastArmature | dragonBones.Armature;
		public constructor() {
			super();
		}
		public destory():void{
			super.destory();
			if(this._armature){
				dragonBones.WorldClock.clock.remove(this._armature);
				this._armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onEffectOver, this);
				if(this._armature.display){
					ResUtil.removeFromParent(this._armature.display);
				}
			}
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._armature=null;
			this._bg = null;
		}
		public initUI():void{
			this._bg = ResUtil.createBitmapByName("startEffect_bg_png");
			this._bg.width = 1136;
			this.addChild(this._bg);
		}
		public play():void{
			this.visible=true;
			if(!this._armature){
				this._armature = uniLib.DisplayUtils.createDragonBonesDisplay("star_effect_drag_json", "star_effect");
				this._armature.display.x = (DataCache.defaultWidth - this._armature.display.width) / 2;
				this._armature.display.y = (DataCache.defaultHeight - this._armature.display.height) / 2-15;
				this.addChild(this._armature.display);
			}
			if(!dragonBones.WorldClock.clock.contains(this._armature)){
                 dragonBones.WorldClock.clock.add(this._armature);
			}
			this._armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onEffectOver, this);
			this._armature.animation.play();
			this._bg.height = 0;
			this._bg.y = DataCache.defaultHeight / 2;
			this._bg.alpha = 1;
			egret.Tween.get(this._bg).to({ height: 178, y: (DataCache.defaultHeight - 178) / 2 }, 250).wait(710).to({ alpha: 0 }, 250);
		}
		private onEffectOver():void{
			if(this._armature){
				this._armature.animation.stop();			
				this._armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onEffectOver, this);
				dragonBones.WorldClock.clock.remove(this._armature);
				if(this._armature.display){
					ResUtil.removeFromParent(this._armature.display);
				}
			}
			this._armature = null;
			this.hide();
		}
		private hide():void{
			this.visible=false;
		}
	}
}