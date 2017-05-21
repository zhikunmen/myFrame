/**
 * 结算面板
 */
module PKGame {
    import Tween = egret.Tween;
    export class LotteryVc extends BaseVc {

        private startBtn:GameButton;
        private _node:egret.DisplayObjectContainer;
        private _bgMovie:dragonBones.Armature;

        public initUI():void{

            this._node = new egret.DisplayObjectContainer();
            this.addChild(this._node);
            // this._bgMovie = uniLib.DisplayUtils.createDragonBonesDisplay("paodekuai_effect_ske_json", "paodekuai_effect_tex_json", "paodekuai_effect_tex_png", "MovieClip");
            // dragonBones.WorldClock.clock.add(this._bgMovie);

        }

        //游戏准备开始
        private onStart():void {
            this.dispose();

            if (uniLib.Global.debugLevel >= 1) {
                var gameVc = GameUtil.getViewByName(PKMediator.NAME)._gameVc;
                gameVc.showGmPanel();
            }else {
                 RepManager.ins.ReadyStartPokerCmd_C();
            }
           
        }

        public setData(data:any):void {
            if (!data) return;

            var isWin:boolean = PKGame.RoomInfo.getInstance().selfIsWin(data);

            if (isWin) {

                var bg:egret.Bitmap = ResUtil.createBitmapByName("jiesuan_win_bg_png");
                this._node.addChild(bg);
                GameUtil.setContainerCenter(bg);
                bg.y = 300;
                var labelBg:egret.Bitmap = ResUtil.createBitmapByName("pdk_win_title_png");
                this._node.addChild(labelBg);
                GameUtil.setContainerCenter(labelBg);
                labelBg.y = bg.y-labelBg.height + 30;

            }else  {
                var bg:egret.Bitmap = ResUtil.createBitmapByName("jiesuan_lose_bg_png");
                this._node.addChild(bg);
                GameUtil.setContainerCenter(bg);
                bg.y = 300;

                var labelBg:egret.Bitmap = ResUtil.createBitmapByName("pdk_lose_title_png");
                this._node.addChild(labelBg);
                GameUtil.setContainerCenter(labelBg);
                labelBg.y = bg.y-labelBg.height + 30;

            }

            this.startBtn = new GameButton(["pdk_star_png","pdk_star_press_png"]);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
            this._node.addChild(this.startBtn);
            GameUtil.setContainerCenter(this.startBtn);
            this.startBtn.y = bg.y + bg.height - 89;

            for (var i: number = 0; i < data.length; i++) {
                var icon: string = "";
                var ptxt: egret.TextField = new egret.TextField;
                var aTxt: egret.TextField = new egret.TextField;

                if(data[i].uid == uniLib.UserInfo.uid && data[i].winType==1){
                    uniLib.SoundMgr.instance.playSound(SoundConsts.WIN);
                }
                else{
                    uniLib.SoundMgr.instance.playSound(SoundConsts.LOSE);
                }
                if (data[i].uid == PKGame.MyUserInfo.getInstance().userId) {
                    aTxt.textColor = 0xfdf1a0;
                    ptxt.textColor = 0xfdf1a0;
                }else {
                    aTxt.textColor = 0xe1e1de;
                    ptxt.textColor = 0xe1e1de;
                }

                if (data[i].winType == 1) {

                    icon = "+";
                } else {
                    icon = "-";
                }

                ptxt.text = data[i]["nickname"];
                ptxt.size = 24;
                this._node.addChild(ptxt);
                GameUtil.setContainerCenter(ptxt);
                ptxt.x = ptxt.x - 50;
                ptxt.y = bg.y + 52 + 58 * i;

                aTxt.text = icon + Math.abs(data[i].totalReward);
                aTxt.size = 24;
                this._node.addChild(aTxt);
                GameUtil.setContainerCenter(aTxt);
                aTxt.x = ptxt.x + ptxt.width + 50;
                aTxt.y = ptxt.y
            }

            // this._bgMovie.animation.play("xingxing");
            // this._node.addChild(this._bgMovie.display);

            this._node.alpha = 0;
            egret.Tween.get(this._node).to({alpha: 1},1000).call(()=>{
                this.removeTween();
            },this);
        }


        private removeTween():void {

            egret.Tween.removeTweens(this._node);
        }

        public dispose():void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
            if (this._node.numChildren) {
                DisplayUtils.removeAllChildren(this._node);
            }
            // if (this._bgMovie) {
            //
            // }
           this.removeTween();
        }


        public destory() {
            super.destory();
            this.dispose();

            // if (this._bgMovie) {
            //     GameUtil.removeDragonBone(this._bgMovie);
            //     this._bgMovie = null;
            // }
        }

    }
}
