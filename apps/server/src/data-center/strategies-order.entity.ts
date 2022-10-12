import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('strategies_order')
export class StrategiesOrder {
  @PrimaryGeneratedColumn({ comment: 'ID', }) id?: number;
  @Column({ comment: 'userId', }) userId: number;
  @Column({ comment: 'strategyId', }) strategyId: string;
  @Column({ comment: 'symbol', }) symbol: string;
  @Column({ comment: 'price', }) price: string;
  @Column({ comment: 'side', }) side: number;
  @Column({ comment: 'qty', }) qty: string;
  @Column({ comment: 'quoteQty', }) quoteQty: string;
  @Column({ comment: 'sellingQty', }) sellingQty: string;
  @Column({ comment: 'sellingQuoteQty', }) sellingQuoteQty: string;
  @Column({ comment: 'profit', }) profit: number;
  @Column({ comment: 'profitRate', }) profitRate: string;
  @Column({ comment: 'entryPrice', }) entryPrice: string;
  @Column({ comment: 'sellingPrice', }) sellingPrice: string;

  @Column({ comment: 'stopProfit', }) stopProfit: string;
  @Column({ comment: 'stopLoss', }) stopLoss: string;
  @Column({ comment: 'stopProfitPrice', }) stopProfitPrice: string;
  @Column({ comment: 'stopLossPrice', }) stopLossPrice: string;
  @Column({ comment: 'stopType', }) stopType: number;

  @Column({ comment: 'is_running', }) is_running: boolean;
  @Column('bigint', { comment: 'time', }) time: number;
  @Column({ comment: 'realizedProfit', }) realizedProfit: number;
  @Column({ comment: 'realizedProfitRate', }) realizedProfitRate: string;
  @Column('bigint', { comment: 'sellingTime', }) sellingTime: number;
  @Column('bigint', { comment: 'updatedAt', }) updatedAt?: number;
  @Column('bigint', { comment: 'createdAt', }) createdAt?: number;
}
