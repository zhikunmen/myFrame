module PKGame {
	export class CardUtils {
		public constructor() {
		}
		/**
		 * 计算手牌
		 */
		public static  getHandleCards(vo:Cmd.UserCardObj):Array<number>{
			var handleCards:Array<number> = new Array<number>();
			for (var i:number = 0; i < vo.handCardSet.length; i++) 
			{
				if(vo.handCardSet[i]){
					handleCards.push(vo.handCardSet[i]);
				}
			}
			return handleCards;
		}
	}
}