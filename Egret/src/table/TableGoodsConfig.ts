﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
module PKtable {
	/**
	 * FILE: 道具与商城.xlsx SHEET: 道具
	 */
	export class TableGoodsConfig {
		/**
		 * 序号
		 */
		id: number;
		/**
		 * ID
		 */
		goodId: number;
		/**
		 * 物品名称
		 */
		goodName: string;
		/**
		 * 物品类型
		 */
		goodType: number;
		/**
		 * 物品介绍
		 */
		goodDesc: string;
		/**
		 * 物品icon
		 */
		goodIcon: string;
		/**
		 * 显示
		 */
		isShow: number;
		/**
		 * 使用方式
		 */
		useType: string;
		/**
		 * 礼包配置
		 */
		giftGoods: TableGoodsConfig.GiftGoodsItem[];
		/**
		 * 出售价格
		 */
		price: number;

		GetType(): string { return 'table.TableGoodsConfig'; }
	}
	export module TableGoodsConfig {
		export class GiftGoodsItem {
			goodId: number;
			goodNbr: number;
		}
	}
}
