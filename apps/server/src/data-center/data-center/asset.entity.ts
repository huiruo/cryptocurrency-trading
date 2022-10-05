import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('asset')
export class TradeAsset {
  @PrimaryGeneratedColumn({ comment: 'ID', }) id?: number;
  @Column({ comment: 'name', }) name: string;
  @Column({ comment: 'symbol', }) symbol: string;
  @Column({ comment: 'code', }) code: string;
  @Column('bigint', { comment: 'updatedAt', }) updatedAt?: number;
  @Column('bigint', { comment: 'createdAt', }) createdAt?: number;
}