import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coin_addition')
export class CoinAddition {
  @PrimaryGeneratedColumn({
    comment: 'ID',
  })
  id: number;

  @Column({
    comment: 'code',
  })
  code: string;

  @Column({
    comment: 'symbol',
  })
  symbol: string;

  @Column({
    comment: 'siteurl',
  })
  siteurl: string;

  @Column({
    comment: 'coindesc',
  })
  coindesc: string;

  @Column({
    comment: 'codelink',
  })
  codelink: string;

  @Column({
    comment: 'logo',
  })
  logo: string;

  @Column({
    comment: 'telegramlink',
  })
  telegramlink: string;

  @Column({
    comment: 'facebook',
  })
  facebook: string;

  @Column({
    comment: 'twitter',
  })
  twitter: string;

  @Column({
    comment: 'explorer',
  })
  explorer: string;

  @Column({
    comment: 'redditlink',
  })
  redditlink: string;

  @Column({
    comment: 'biyong',
  })
  biyong: string;

  @Column({
    comment: 'white_paper',
  })
  white_paper: string;

  @Column({
    comment: 'difftime',
  })
  difftime: number;

  @Column({
    comment: 'supportoptions',
  })
  supportoptions: number;

  @Column({
    comment: 'is_refresh',
  })
  is_refresh: number;

  @Column({
    comment: 'not_public',
  })
  not_public: number;

  @Column({
    comment: 'btccorrelation',
  })
  btccorrelation: number;

  @Column({
    comment: 'updatetime',
  })
  updatetime: number;
}
