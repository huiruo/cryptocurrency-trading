import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coin_dev_member')
export class CoinDevMember {
  @PrimaryGeneratedColumn({
    comment: 'ID',
  })
  id: number;

  @Column({
    comment: 'code',
  })
  code: string;

  @Column({
    comment: 'name',
  })
  name: string;

  @Column({
    comment: 'title',
  })
  title: string;

  @Column({
    comment: 'headimg',
  })
  headimg: string;

  @Column({
    comment: 'twitterlink',
  })
  twitterlink: string;

  @Column({
    comment: 'linkinLink',
  })
  linkinLink: string;

  @Column('mediumtext', { comment: 'description' })
  description: string;

  @Column({
    comment: 'isfounder',
  })
  isfounder: number;
}
