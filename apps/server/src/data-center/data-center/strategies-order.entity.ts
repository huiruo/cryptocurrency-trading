import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('strategies_order')
export class StrategiesOrder {
  @PrimaryGeneratedColumn({ comment: 'ID', }) id?: number;
  @Column({ comment: 'userId', }) userId: number;
  @Column({ comment: 'strategyId', }) strategyId: string;
  @Column({ comment: 'symbol', }) symbol: string;
  @Column({ comment: 'price', }) price: string;
  @Column({ comment: 'quantity', }) quantity: string;
  @Column({ comment: 'profit_ratio', }) profit_ratio: string;
  @Column({ comment: 'cost_price', }) cost_price: string;
  @Column({ comment: 'profit_amount', }) profit_amount: number;
  @Column({ comment: 'is_running', }) is_running: boolean;
  @Column('bigint', { comment: 'updatedAt', }) updatedAt?: number;
  @Column('bigint', { comment: 'createdAt', }) createdAt?: number;
}
