module ui {
	/**
	 *
	 * @author 
	 *
	 */
	export class Image extends egret.Bitmap{
        private _source: string|egret.Texture = null;
        
        public constructor(source?: string|egret.Texture) {
            super();
            if(source) {
                this.source = source;
            }
		}
		
        public get source(): string|egret.Texture {
            return this._source;
        }

        public set source(value: string|egret.Texture) {
            if(value == this._source) {
                return;
            }
            this._source = value;
            this.parseSource();
        }
		
		/**
         * @private
         * 解析source
         */
        private parseSource(): void {
            var source = this._source;
            if(source && typeof source == "string") {
                ui.ResUtil.getAsset(<string>this._source,this.contentChanged,this);
            }
            else {
                this.$setBitmapData(<egret.Texture>source);
            }
        }
        
        /**
        * @private
        * 资源发生改变
        */
        private contentChanged(data: any,source: any): void {
            if(source !== this._source)
                return;
            if(!egret.is(data,"egret.Texture")) {
                return;
            }
            this.$setBitmapData(data);
            if(data) {
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
            else if(DEBUG) {
                egret.$warn(2301,source);
            }
        }
	}
}
