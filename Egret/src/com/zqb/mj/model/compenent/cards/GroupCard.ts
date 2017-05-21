module PKGame {
	export class GroupCard extends BaseVc{
		private _flagIcon:egret.Bitmap;
		private _cardMc:egret.DisplayObjectContainer;
		private _type:number;
		private _data:any;
		public constructor() {
			super();
		}
		public initUI():void{
			this._cardMc=new egret.DisplayObjectContainer();
			this.addChild(this._cardMc);
		}
		public set type(num:number){
			this._type=num;
		}
		public get type():number{
			return this._type;
		}
		public set data(vo:any){
			this._data=vo;
		}
		public get data():any{
			return this._data;
		}
		public addCard(card:CardMJ,isTop:boolean=true):void{
			if(isTop){
				this._cardMc.addChild(card);
			}else{
				this._cardMc.addChildAt(card,0);
			}
		}
		public destory():void{
			if(this._cardMc){
				uniLib.DisplayUtils.removeAllChildren(this._cardMc);
				uniLib.DisplayUtils.removeFromParent(this._cardMc);
			}
			this._cardMc=null;
			this._flagIcon=null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
		public getFlagIcon(rotN:number=-1):egret.Bitmap{
			if(rotN==-1){
				return this._flagIcon;
			}
			if(!this._flagIcon){
				this._flagIcon=ResUtil.createBitmapByName("group_flag"+rotN);
				this.addChild(this._flagIcon)
			}else{
				this._flagIcon.texture=ResUtil.createTexture("group_flag"+rotN);
			}
			return this._flagIcon;
		}
		public set flagIcon(bit:egret.Bitmap){
			if(!this._flagIcon){}
			this._flagIcon=bit;
		}

	}
}