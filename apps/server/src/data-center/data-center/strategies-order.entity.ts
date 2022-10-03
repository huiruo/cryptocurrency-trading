import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('strategies_order')
export class StrategiesOrder {
  @PrimaryGeneratedColumn({ comment: 'ID', }) id?: number;
  @Column({ comment: 'userId', }) userId: number;
  @Column({ comment: 'strategyId', }) strategyId: string;
  @Column({ comment: 'symbol', }) symbol: string;
  @Column({ comment: 'price', }) price: string;
  @Column({ comment: 'qty', }) qty: string;
  @Column({ comment: 'quoteQty', }) quoteQty: string;
  @Column({ comment: 'profit', }) profit: number;
  @Column({ comment: 'profitRate', }) profitRate: string;
  @Column({ comment: 'entryPrice', }) entryPrice: string;
  @Column({ comment: 'sellingPrice', }) sellingPrice: string;
  @Column({ comment: 'is_running', }) is_running: boolean;
  @Column('bigint', { comment: 'updatedAt', }) updatedAt?: number;
  @Column('bigint', { comment: 'createdAt', }) createdAt?: number;
}
