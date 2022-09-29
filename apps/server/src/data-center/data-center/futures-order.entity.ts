import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('futures_order')
export class FuturesOrder {
  @PrimaryGeneratedColumn({ comment: 'ID', }) id?: number;
  @Column({ comment: 'userId', }) userId: number;
  @Column({ comment: 'strategyId', }) strategyId?: string;
  @Column({ comment: 'orderId', }) orderId: number;
  @Column({ comment: 'symbol', }) symbol: string;
  @Column({ comment: 'status', }) status: string;
  @Column({ comment: 'clientOrderId', }) clientOrderId: string;
  @Column({ comment: 'price', }) price: string;
  @Column({ comment: 'avgPrice', }) avgPrice: string;
  @Column({ comment: 'origQty', }) origQty: string;
  @Column({ comment: 'executedQty', }) executedQty: string;
  @Column({ comment: 'cumQuote', }) cumQuote: string;
  @Column({ comment: 'timeInForce', }) timeInForce: string;
  @Column({ comment: 'type', }) type: string;
  // @Column({ comment: 'reduceOnly', }) reduceOnly: number;
  @Column({ comment: 'reduceOnly', }) reduceOnly: boolean;
  // @Column({ comment: 'closePosition', }) closePosition: number;
  @Column({ comment: 'closePosition', }) closePosition: boolean;
  @Column({ comment: 'side', }) side: string;
  @Column({ comment: 'positionSide', }) positionSide: string;
  @Column({ comment: 'stopPrice', }) stopPrice: string;
  @Column({ comment: 'workingType', }) workingType: string;
  // @Column({ comment: 'priceProtect', }) priceProtect: number;
  @Column({ comment: 'priceProtect', }) priceProtect: boolean;
  @Column({ comment: 'origType', }) origType: string;
  @Column({ comment: 'time', }) time: number;
  // @Column('bigint', { comment: 'updateTime', }) updateTime: number;
  @Column('bigint', { comment: 'updateTime', }) updateTime?: number;
  @Column('bigint', { comment: 'updatedAt', }) updatedAt?: number;
  @Column('bigint', { comment: 'createdAt', }) createdAt?: number;
}
