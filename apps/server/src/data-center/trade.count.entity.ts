import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('trade_count')
export class TradeCount {
  @PrimaryGeneratedColumn({ comment: 'ID', }) id?: number;
  @Column({ comment: 'userId', }) userId: number;
  @Column({ comment: 'totalProfit', }) totalProfit: number;
  @Column({ comment: 'profitRate', }) profitRate: string;
  @Column({ comment: 'totalAmount', }) totalAmount: string;
  @Column({ comment: 'time', }) time: string;
  @Column('bigint', { comment: 'updatedAt', }) updatedAt?: number;
  @Column('bigint', { comment: 'createdAt', }) createdAt?: number;
}
