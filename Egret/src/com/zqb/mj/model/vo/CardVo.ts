module PKGame {
	export class CardVo {
		public cardId: number;
		public isGoldPai: boolean;

		public get TableInfo(): PKtable.PokerTableCard {
			if (this.tableInfo == null || this.cardId != this.tableInfo.cardId) {
				this.tableInfo = PKtable.PokerTableCard.selectByCardId(this.cardId);
			}
			return this.tableInfo;
		}
		private tableInfo: PKtable.PokerTableCard;

		public get type(): Cmd.PokerCardType { return this.TableInfo.type; }

		constructor(cardId: number = 0, isGoldPai: boolean = false) {
			this.cardId = cardId;
			this.isGoldPai = isGoldPai;
		}
	}
}