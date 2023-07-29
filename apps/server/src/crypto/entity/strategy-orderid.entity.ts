import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('strategy_orderid')
export class StrategyOrderId {
  @PrimaryGeneratedColumn({ comment: 'ID' }) id?: number
  @Column({ comment: 'strategyId' }) strategyId: string
  @Column({ comment: 'userId' }) userId: number
  @Column({ comment: 'orderId' }) orderId: number
  @Column('bigint', { comment: 'updatedAt' }) updatedAt?: number
  @Column('bigint', { comment: 'createdAt' }) createdAt?: number
}
