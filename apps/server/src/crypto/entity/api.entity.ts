import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('api')
export class TraderApi {
  @PrimaryGeneratedColumn({ comment: 'ID' }) id?: number
  @Column({ comment: 'userId' }) userId: number
  @Column({ comment: 'name' }) name: string
  @Column({ comment: 'apiKey' }) apiKey: string
  @Column({ comment: 'secretKey' }) secretKey: string
  @Column({ comment: 'markerFree' }) markerFree: string
  @Column({ comment: 'takerFree' }) takerFree: string
  @Column({ comment: 'spotFree' }) spotFree: string
  @Column('bigint', { comment: 'updatedAt' }) updatedAt?: number
  @Column('bigint', { comment: 'createdAt' }) createdAt?: number
}
