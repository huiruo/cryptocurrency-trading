import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('wallet')
export class TradeWallet {
  @PrimaryGeneratedColumn({ comment: 'ID' }) id?: number
  @Column({ comment: 'symbol' }) symbol: string
  @Column({ comment: 'balance' }) balance: string
  @Column({ comment: 'address' }) name: string
  @Column('bigint', { comment: 'updatedAt' }) updatedAt?: number
  @Column('bigint', { comment: 'createdAt' }) createdAt?: number
}
