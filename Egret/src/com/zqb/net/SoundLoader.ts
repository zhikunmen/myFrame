module PKGame {
	/**
	 *
	 * @author 
	 *
	 */
	export class SoundLoader extends egret.EventDispatcher{
        private _soundType: string;
        public static LOADED: string = "loaded";  
		public constructor(url:string) {
            super();
            this._soundType = url;
            this.load();
		}
		private load():void{
            var loader: egret.URLLoader = new egret.URLLoader();
            //设置加载方式为声音
            loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
            //添加加载完成侦听
            loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
            var url: string = "resource/assets/sound/"+this._soundType;
            var request: egret.URLRequest = new egret.URLRequest(url);
            //开始加载
            loader.load(request);
		}
        private onLoadComplete(event: egret.Event): void {
            var loader: egret.URLLoader = <egret.URLLoader>event.target;
            //获取加载到的 Sound 对象
            var sound: egret.Sound = <egret.Sound>loader.data;
            this.dispatchEventWith(SoundLoader.LOADED,false,{ type: this._soundType,data: sound });
//            var channel: egret.SoundChannel = sound.play(0,1);
//            channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
        }
       
	}
}
