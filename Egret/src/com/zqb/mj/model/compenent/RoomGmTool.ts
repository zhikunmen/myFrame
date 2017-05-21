// gm改牌
module PKGame {
    export class RoomGmTool extends BaseVc{
        public constructor() {
            super();
            this.createScene();
        }
        private btnPanel:egret.Sprite;
        private content: egret.Sprite;
        private cardsGroup:egret.Bitmap[];        
        private selectCard:egret.Bitmap;
        private createScene(){
            this.name = "chat";
            this.content = uniLib.DisplayUtils.createMask(0.5,1280,350, 0x0);
            this.content.name = "chat_bg";
            this.content.touchEnabled = true;
            this.content.touchChildren = true;
            this.addChild(this.content);

            this.btnPanel = uniLib.DisplayUtils.createMask(0.3,1280,200, 0x0);
            this.btnPanel.y = 350;
            this.addChild(this.btnPanel);
            this.cardsGroup = [];
            //键盘响应
            // this.kb = new KeyBoard();
            // this.kb.addEventListener(KeyBoard.onkeydown,this.onKeyDown,this);

            this.initCardGroup();
            this.content.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        }

        private initCardGroup(){
            var group:PKtable.PokerTableCard[] = PKtable.PokerTableCard.instance();
            var cardGroup:number[] = [];
            for(var i=0;i<group.length;i++){
                var card:string = group[i].thisId.toString();
                var thisId = card.substr(1,card.length);
                cardGroup.push(Number(thisId));
            }
        }

        private removeListener(){
            this.content.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
            // this.kb.removeEventListener(KeyBoard.onkeydown,this.onKeyDown,this);
        }

        private touchHandler(e:egret.TouchEvent){
            var name:string = e.target.name;
            if(this.selectCard && this.selectCard.name == name){
                this.setSelectMode(this.selectCard,false);
                this.selectCard = null;
            }
            else if(this.selectCard && this.selectCard.name != name){
                this.setSelectMode(this.selectCard,false);
                this.selectCard = <egret.Bitmap>this.content.getChildByName(name);
                this.setSelectMode(this.selectCard,true);
            }
            else{
                this.selectCard = <egret.Bitmap>this.content.getChildByName(name);
                if(this.selectCard == null)return;
                this.setSelectMode(this.selectCard,true);
                //派发
                var media = PKGame.PokerFourFacede.getInstance().retrieveMediator(PKMediator.NAME);
                var vc = <GameVc>media.getViewComponent();				
                vc.dispatchEventWith(UIEventConsts.GM_SELECT_HEAPCARD, false, this.getSelectCard());
            }
        }
        /**
         * 设置类型按钮
         */
        private row:number = 10;//一行显示按钮
        public setTypeButton(btns:Cmd.KeyValueObj[]){
            this.clearTypeButton();
            let index = 0;
            let rows = Math.ceil(btns.length/this.row);
            for(let j:number = 0;j<rows;j++){
                for(let i:number = 0;i<this.row;i++){
                    let data = btns[index];
                    if(data){
                        let btn:egret.Sprite = this.creatBtn(data);
                        btn.x = 80+i*120;
                        btn.y = 20+j*30;
                    }
                    index++;
                }
            }
        }
        private btnGroup:egret.Sprite[] = [];
        private creatBtn(data:Cmd.KeyValueObj):egret.Sprite{
            let btn:egret.Sprite = uniLib.DisplayUtils.createMask(1,100,25,0xfa8619);
            btn.name =data.id.toString();
            btn.touchEnabled = true;
            this.btnPanel.addChild(btn);
            let txt:egret.TextField = uniLib.DisplayUtils.createTextLabel(0xffffff,egret.HorizontalAlign.CENTER,data.value,16,100,25);
            txt.y = 3;
            btn.addChild(txt);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTypeHandler,this);
            this.btnGroup.push(btn);
            return btn;
        }
        private btnTypeHandler(e:egret.Event){
            let name:string = e.target.name;
            var media = PKGame.PokerFourFacede.getInstance().retrieveMediator(PKMediator.NAME);
            var vc = <GameVc>media.getViewComponent();				
            vc.dispatchEventWith(UIEventConsts.GM_SELECT_CARDS, false, Number(name));
        }
        private clearTypeButton(){
            for(let i:number = 0;i<this.btnGroup.length;i++){
                let btn:egret.Sprite = this.btnGroup[i];
                if(btn){
                     btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTypeHandler,this);
                     uniLib.DisplayUtils.removeAllChildren(btn);
                     uniLib.DisplayUtils.removeFromParent(btn);
                }
            }
            uniLib.DisplayUtils.removeAllChildren(this.btnPanel);
            this.btnGroup = [];
        }
        /**
         * 数组中的数据
         */
        private initWidth:number = 230;
        private initHeight:number = 50;
        public setHeapCard(cardList:number[]){
            this.clearHeapCard();
            if(!cardList && cardList.length <= 0)return;
            //排序
            cardList.sort(function(a: any,b: any): number{
                if(a > b) return 1;
                else if(a == b) return 0;
                return -1;
            });	
            for(let i:number = 0;i<cardList.length;i++){
                let data:PKtable.PokerTableCard = PKtable.PokerTableCard.selectByThisId(cardList[i]);
                let cardName:string = PKtable.PokerTableCard.resPutOut(data.cardId, 0);
                let card:egret.Bitmap=ResUtil.createBitmapByName(cardName);
                card.name = data.thisId+"";
                card.touchEnabled = true;
                if(i < 20){
                    card.x = this.initWidth+40*i;
                    card.y = this.initHeight;
                }
                else if(i >=20 && i<40){
                    card.x = this.initWidth+40*(i-20);
                    card.y = this.initHeight+70;
                }
                else if(i >=40 && i<60){
                    card.x = this.initWidth+40*(i-40);
                    card.y = this.initHeight+70*2;
                }
                else if(i >=60 && i<80){
                    card.x = this.initWidth+40*(i-60);
                    card.y = this.initHeight+70*3;
                }
                else if(i >=80 && i<100){
                    card.x = this.initWidth+40*(i-80);
                    card.y = this.initHeight+70*4;
                }
                else if(i >=100 && i<120){
                    card.x = this.initWidth+40*(i-100);
                    card.y = this.initHeight+70*5;
                }
                else if(i >=120 && i<140){
                    card.x = this.initWidth+40*(i-120);
                    card.y = this.initHeight+70*6;
                }
                else if(i >=140){
                    card.x = this.initWidth+40*(i-140);
                    card.y = this.initHeight+70*7;
                }       
                this.cardsGroup.push(card);      
                this.content.addChild(card);
            }
        }
        private clearHeapCard(){
            for(let i:number = 0;i<this.cardsGroup.length;i++){
                let card:egret.Bitmap = this.cardsGroup[i];
                uniLib.DisplayUtils.removeFromParent(card);
            }
             if(this.selectMode){
                uniLib.DisplayUtils.removeFromParent(this.selectMode);
            }
            this.selectMode = null;
            uniLib.DisplayUtils.removeAllChildren(this.content);
            this.cardsGroup = [];
            this.selectCard = null;
        }
        /**设置选中或者非选中状态 */
        private selectMode:egret.Bitmap;
        private setSelectMode(card:egret.Bitmap,value:boolean){
            if(value){
                this.selectMode = ResUtil.createBitmapByName("GoldIcon2");
                this.selectMode.x = card.x;
                this.selectMode.y = card.y;
                this.content.addChild(this.selectMode);
            }
            else{
                if(this.selectMode){
                    uniLib.DisplayUtils.removeFromParent(this.selectMode);
                }
                this.selectMode = null;
            }
        }
        /**
         * 获取选中牌ID
         */
        private getSelectCard():string{
            if(this.selectCard){
                return this.selectCard.name;
            }
            else{
                return "";
            }
        }
        /**
         * 回车键盘输入
         */
        private onKeyDown(e:egret.Event){
        }
        private onBtnClick(e:egret.TouchEvent){  
        }
        private  createBitmapByName(name: string,x: number = 0,y:number=0): egret.Bitmap {
                var result: egret.Bitmap = new egret.Bitmap();
                var texture: egret.Texture = RES.getRes(name);
                result.texture = texture;
                result.smoothing = true;
                result.x = x;
                result.y = y;
                return result;
        }
        public destory(){
            this.removeListener();
            this.clearHeapCard();
            this.clearTypeButton();
            if(this.content){
                uniLib.DisplayUtils.removeAllChildren(this.content);
                uniLib.DisplayUtils.removeFromParent(this.content);
            }
            this.content = null;
            if(this.btnPanel){
                uniLib.DisplayUtils.removeAllChildren(this.btnPanel);
                uniLib.DisplayUtils.removeFromParent(this.btnPanel);
            }
            this.btnPanel = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);          
        }
    }



    /**
     * 回车按键响应
     */
    export class KeyBoard extends egret.EventDispatcher{
	private inputs = [];
	/**
	 * 同一时刻按下多个键：则返回多个键的字符串数组。
	 */
	public static onkeydown = "KeyBoardonkeydown";
	public static onkeyup = "KeyBoardonkeyup";
	// public static Num_Enter = "num_Enter";
	public static CnterEnter = "Enter";

	public constructor() {
		super();
		this.init();
	}
	private init(){
		var self = this;
		document.onkeydown = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            self.handlekeydown(e);
			if(self.inputs.length > 0){
				//uniLib.Console.log(self.inputs.length)
				self.dispatchEventWith(KeyBoard.onkeydown,true,self.inputs,true);
			} 
		}	
        document.onkeyup = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            self.handlekeyup(e);
			if(self.inputs.length > 0){
				self.dispatchEventWith(KeyBoard.onkeyup,true,self.inputs,true);
			}
        }
		document.onmousedown = function(event){
			self.inputs = [];
		}
	}
	//处理键盘按下对应keycode
	private handlekeydown(e){
        if(e.key == KeyBoard.CnterEnter){
            this.checkInput(KeyBoard.CnterEnter);
        }
	}
	//处理键盘抬起对应keycode
	private handlekeyup(e){
        if(e.key == KeyBoard.CnterEnter){
            this.removeByKey(KeyBoard.CnterEnter);
        }
	}
	//通过key添加
	private checkInput(key){
		let isContain = false;
		for(let i=0; i < this.inputs.length; i++){
			if(this.inputs[i] == key){
				isContain = true;
			}
		}
		if(!isContain){
			this.inputs.push(key);
		}
	}
	//通过key删除
	private removeByKey(key){
		for(let i=0; i < this.inputs.length; i++){
			if(this.inputs[i] == key){
				this.inputs.splice(i,1);
			}
		}
	}
	/**
	 * 判断data字符串数组中是否包含某个字符串
	 */
    public isContain(data,keyCode){
        let isContain = false;
		for(let i=0; i < data.length; i++){
			if(data[i] == keyCode){
				isContain = true;
			}
		}
		return isContain;
    }
}
}