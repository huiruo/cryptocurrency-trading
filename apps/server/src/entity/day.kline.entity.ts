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
    comment: 'price',
  })
  price: string;

  @Column({
    comment: 'marketcappercent',
  })
  marketcappercent: number;

  @Column({
    comment: 'circulationRate',
  })
  circulationRate: number;


  @Column('bigint', { comment: '持仓地址' })
  holders: number;

  @Column({
    comment: 'updatetime',
  })
  updatetime: number;




  @Column('bigint', { comment: 'maxsupply' })
  totalSupply: number;

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
  high_week: string;

  @Column({
    comment: 'low_week',
  })
  low_week: string;

  @Column({
    comment: 'open',
  })
  open: string;

  @Column({
    comment: 'high',
  })
  high: string;

  @Column({
    comment: 'low',
  })
  low: string;

  @Column({ comment: 'amount_day', })
  amount_day: string;

  @Column({ comment: 'vol_24', })
  vol_24: string;

  @Column({ comment: '成交量', })
  vol: string;

  @Column({ comment: 'vol_percent', })
  vol_percent: number;

  @Column({
    comment: 'ticker_num',
  })
  ticker_num: number;

  @Column({
    comment: 'change',
  })
  change: string;

  @Column({
    comment: 'change_percent',
  })
  change_percent: string;
}
