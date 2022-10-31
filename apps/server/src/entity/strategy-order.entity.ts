import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('strategy_order')
export class StrategyOrder {
  @PrimaryGeneratedColumn({ comment: 'ID', }) id?: number;
  @Column({ comment: 'symbol', }) symbol: string;
  @Column({ comment: 'price', }) price: string;
  @Column({ comment: 'side', }) side: number;
  @Column({ comment: 'orderType', }) orderType: number;
  @Column({ comment: 'leverage', }) leverage: number;

  @Column({ comment: 'entryPrice', }) entryPrice: string;
  @Column({ comment: 'sellingPrice', }) sellingPrice: string;
  @Column('bigint', { comment: 'sellingTime', }) sellingTime: number;

  @Column({ comment: 'qty', }) qty: string;
  @Column({ comment: 'quoteQty', }) quoteQty: string;
  @Column({ comment: 'sellingQty', }) sellingQty: string;
  @Column({ comment: 'sellingQuoteQty', }) sellingQuoteQty: string;

  @Column({ comment: 'profit', }) profit: number;
  @Column({ comment: 'profitRate', }) profitRate: string;
  @Column({ comment: 'realizedProfit', }) realizedProfit: number;
  @Column({ comment: 'realizedProfitRate', }) realizedProfitRate: string;
  @Column({ comment: '手续费', }) free: number;

  @Column({ comment: '止盈止损方式', }) stopType: number;
  @Column({ comment: 'stopProfit', }) stopProfit: string;
  @Column({ comment: 'stopLoss', }) stopLoss: string;
  @Column({ comment: 'stopProfitPrice', }) stopProfitPrice: string;
  @Column({ comment: 'stopLossPrice', }) stopLossPrice: string;

  @Column({ comment: 'note', }) note: string;
  @Column({ comment: 'klineShots', }) klineShots?: string;

  @Column({ comment: 'is_running', }) is_running: boolean;
  @Column({ comment: 'userId', }) userId: number;
  @Column({ comment: 'strategyId', }) strategyId: string;
  @Column('bigint', { comment: 'time', }) time: number;
  @Column('bigint', { comment: 'updatedAt', }) updatedAt: number;
  @Column('bigint', { comment: 'createdAt', }) createdAt?: number;
}
