import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('spot_order')
export class SpotOrder {
  @PrimaryGeneratedColumn({ comment: 'ID', }) id?: number;
  @Column({ comment: 'userId', }) userId: number;
  @Column({ comment: 'strategyId', }) strategyId?: string;
  @Column({ comment: 'orderId', }) orderId: number;
  @Column({ comment: 'symbol', }) symbol: string;
  @Column({ comment: 'price', }) price: string;
  @Column({ comment: 'qty', }) qty: string;
  @Column({ comment: 'quoteQty', }) quoteQty: string;
  @Column({ comment: 'commission', }) commission: string;
  @Column({ comment: 'commissionAsset', }) commissionAsset: string;
  @Column({ comment: 'isBuyer', }) isBuyer: boolean;
  @Column({ comment: 'isMaker', }) isMaker: boolean;
  @Column({ comment: 'isBestMatch', }) isBestMatch: boolean;
  @Column({ comment: 'time', }) time: number;
  @Column('bigint', { comment: 'updatedAt', }) updatedAt?: number;
  @Column('bigint', { comment: 'createdAt', }) createdAt?: number;
}
