import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('futures_order')
export class FuturesOrder {
  @PrimaryGeneratedColumn({ comment: 'ID', }) id: number;
  @Column({ comment: 'orderId', }) orderId: number;
  @Column({ comment: 'rowId', }) rowId: string;
  @Column({ comment: 'symbol', }) symbol: string;
  @Column({ comment: 'clientOrderId', }) clientOrderId: string;
  @Column({ comment: 'price', }) price: string;
  @Column({ comment: 'origQty', }) origQty: string;
  @Column({ comment: 'executedQty', }) executedQty: string;
  @Column({ comment: 'executedQuoteQty', }) executedQuoteQty: string;
  @Column({ comment: 'status', }) status: string;
  @Column({ comment: 'timeInForce', }) timeInForce: string;
  @Column({ comment: 'type', }) type: string;
  @Column({ comment: 'side', }) side: string;
  @Column({ comment: 'stopPrice', }) stopPrice: string;
  @Column({ comment: 'insertTime', }) insertTime: number;
  @Column({ comment: 'updateTime', }) updateTime: number;
  @Column({ comment: 'delegateMoney', }) delegateMoney: string;
  @Column({ comment: 'avgPrice', }) avgPrice: string;
  @Column({ comment: 'hasDetail', }) hasDetail: number;
  @Column({ comment: 'targetStrategy', }) targetStrategy: number;
  @Column({ comment: 'priceProtect', }) priceProtect: number;
  @Column({ comment: 'reduceOnly', }) reduceOnly: number;
  @Column({ comment: 'workingType', }) workingType: string;
  @Column({ comment: 'origType', }) origType: string;
  @Column({ comment: 'positionSide', }) positionSide: string;
  @Column({ comment: 'activatePrice', }) activatePrice: string;
  @Column({ comment: 'priceRate', }) priceRate: string;
  @Column({ comment: 'closePosition', }) closePosition: number;
  @Column({ comment: 'baseAsset', }) baseAsset: string;
  @Column({ comment: 'quoteAsset', }) quoteAsset: string;
  @Column({ comment: 'marginAsset', }) marginAsset: string;
}
