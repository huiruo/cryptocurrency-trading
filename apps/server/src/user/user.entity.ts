import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  id: number

  @Column({
    comment: '2',
  })
  walletAddress: string

  @Column({
    comment: '3',
  })
  nonce: string

  @Column({
    comment: '4',
  })
  login: string

  @Column({
    comment: '5',
  })
  username: string

  @Column({
    comment: '6',
  })
  nickname: string

  @Column({
    comment: '7',
  })
  bio: string

  @Column({
    comment: '8',
  })
  avatar: string

  @Column({
    comment: '9',
  })
  email: string

  // @Column('int', {
  //   comment: '10-datetime',
  // })
  // emailValidatedAt: number

  @Column({
    comment: '11',
  })
  phone: string

  @Column({
    comment: '12',
  })
  jobTitle: string

  @Column({
    comment: '13',
  })
  password: string

  @Column({
    comment: '14',
  })
  planType: string

  @Column({
    comment: '15',
  })
  githubId: number

  @Column({
    comment: '16',
  })
  googleId: string

  // date
  @Column('bigint', {
    comment: '17-datetime',
  })
  deletedAt?: number

  @Column('bigint', {
    comment: '18-datetime',
  })
  createdAt?: number

  @Column('bigint', {
    comment: '19-datetime',
  })
  updatedAt?: number
}
