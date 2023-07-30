import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('profit_statistics')
export class ProfitStatistics {
  @PrimaryGeneratedColumn({ comment: 'ID' }) id?: number
  @Column({ comment: 'userId' }) userId: number
  @Column({ comment: 'profit' }) profit: number
  @Column({ comment: 'profitRate' }) profitRate: string
  @Column({ comment: 'amount' }) amount: string
  @Column({ comment: 'time' }) time: string
  @Column('bigint', { comment: 'updatedAt' }) updatedAt?: number
  @Column('bigint', { comment: 'createdAt' }) createdAt?: number
}
