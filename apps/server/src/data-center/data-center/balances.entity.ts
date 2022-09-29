import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('balances')
export class Balances {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'ID',
  }) id: number;
  @Column({ comment: 'userId', }) userId: number;
  @Column({
    type: 'varchar',
    name: 'asset',
    nullable: false,
    unique: true,
    comment: 'asset'
  }) asset: string;
  @Column({ comment: 'free', }) free: string;
  @Column({ comment: 'locked', }) locked: string;
  @Column('bigint', { comment: 'updatedAt', }) updatedAt?: number;
  @Column('bigint', { comment: 'createdAt', }) createdAt?: number;
  // @CreateDateColumn({
  //   type: 'int',
  //   name: 'updateTime',
  // })
  // updateTime: number;
}
