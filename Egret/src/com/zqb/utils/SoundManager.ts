module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class SoundManager {
        private _soundRes: any = {};
        private _curSounds: Array<egret.SoundChannel> = [];
        private static _instance: SoundManager;
		public constructor() {
		}
		public static  get instance():SoundManager{
		    if(!this._instance){
                this._instance = new SoundManager();
		    }
            return this._instance;
		}
		public playSound(soundType:string):void{
            var sound: egret.Sound;
            if(this._soundRes[soundType]){
                sound = this._soundRes[soundType];
                this.play(sound);
            }else{
                var loader: SoundLoader = new SoundLoader(soundType);
                loader.addEventListener(SoundLoader.LOADED,this.onSoundLoaded,this);
            }
		}
		public stopSound():void{
            var len: number = this._curSounds.length;
            var channel: egret.SoundChannel 
            for(var i = 0;i < len;i++){
                channel = this._curSounds[0];
                channel.stop();
                channel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
                this._curSounds.splice(0,1);
            }
		}
		private play(sound:egret.Sound):void{
            var channel: egret.SoundChannel = sound.play(0,1);
            channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
            this._curSounds.push(channel);
		}
		private startPlay(evt:egret.TouchEvent):void{
		    var sound:egret.Sound=evt.data;
            var channel: egret.SoundChannel = sound.play(0,1);
            channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
            this._curSounds.push(channel);
		}
        private onSoundComplete(evt: egret.Event): void {
            var channel: egret.SoundChannel = evt.currentTarget;
            channel.stop();
            channel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
            var index: number = this._curSounds.indexOf(channel);
            this._curSounds.splice(index,1);
        }
        private onSoundLoaded(evt:egret.Event):void{
            evt.currentTarget.removeEventListener(SoundLoader.LOADED,this.onSoundLoaded,this);
            var sound: egret.Sound = evt.data.data;
            this._soundRes[evt.data.type] = sound;
            this.play(sound);
        }
	}
}
