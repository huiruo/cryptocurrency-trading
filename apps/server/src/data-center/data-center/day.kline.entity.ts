import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('day_kline')
export class DayKline {
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
    comment: 'holders',
  })
  holders: number;

  @Column({
    comment: 'totalSupply',
  })
  totalSupply: number;

  @Column({
    comment: 'marketcappercent',
  })
  marketcappercent: number;

  @Column({
    comment: 'circulationRate',
  })
  circulationRate: number;

  @Column({
    comment: 'turn_over',
  })
  turn_over: number;

  @Column({
    comment: 'ratio',
  })
  ratio: number;

  @Column({
    comment: 'high_week',
  })
  high_week: number;

  @Column({
    comment: 'low_week',
  })
  low_week: number;

  @Column({
    comment: 'open',
  })
  open: number;

  @Column({
    comment: 'price',
  })
  price: number;

  @Column({
    comment: 'high',
  })
  high: number;

  @Column({
    comment: 'low',
  })
  low: number;

  @Column({
    comment: 'amount_day',
  })
  amount_day: number;

  @Column({
    comment: 'vol_24',
  })
  vol_24: number;

  @Column({
    comment: 'vol',
  })
  vol: number;

  @Column({
    comment: 'vol_percent',
  })
  vol_percent: number;

  @Column({
    comment: 'ticker_num',
  })
  ticker_num: number;

  @Column({
    comment: 'change',
  })
  change: number;

  @Column({
    comment: 'change_percent',
  })
  change_percent: number;

  @Column({
    comment: 'updatetime',
  })
  updatetime: number;
}
