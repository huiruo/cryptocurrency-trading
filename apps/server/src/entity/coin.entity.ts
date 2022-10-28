import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coin')
export class Coin {
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
    comment: 'name_zh',
  })
  name_zh: string;

  @Column({
    comment: '排名',
  })
  ranked: number;

  @Column({
    comment: '当前价格',
  })
  // price: number;
  price: string;

  @Column('bigint', { comment: '持仓地址' })
  holders: number;

  @Column('bigint', { comment: 'maxsupply' })
  maxsupply: number;

  @Column({
    comment: '是否无限增发',
  })
  is_infinity_supply: number;

  @Column({
    comment: '流通率',
  })
  circulationRate: number;

  @Column('bigint', { comment: '流通总量' })
  supply: number;

  @Column('bigint', { comment: '总市值' })
  marketcap: number;

  @Column('bigint', { comment: '总市值人民币' })
  marketcap_total_rnb: number;

  @Column({
    comment: '流通占全球市值',
  })
  marketcappercent: number;

  @Column({
    comment: '是否合约',
  })
  supportfutures: number;

  @Column({
    comment: 'supportetf',
  })
  supportetf: number;

  @Column({
    comment: 'supportspots',
  })
  supportspots: number;

  @Column({
    comment: 'haslongshort',
  })
  haslongshort: number;

  // @Column('double', { comment: 'ico价格' })
  // icoprice: number;
  @Column({ comment: 'ico价格' })
  icoprice: string;

  // @Column('double', { comment: '开盘价格' })
  @Column({ comment: '开盘价格' })
  // openprice: number;
  openprice: string;


  @Column({
    comment: '投资回报',
  })
  openprice_percent: number;

  @Column({
    comment: '最高价格',
  })
  // his_highest_usd: number;
  his_highest_usd: string;

  @Column({
    comment: '历史最低',
  })
  // his_lowest_usd: number;
  his_lowest_usd: string;

  @Column({
    comment: '高点',
  })
  his_highprice_time: string;

  @Column({
    comment: '低点',
  })
  his_lowprice_time: string;

  @Column({
    comment: 'prooftype',
  })
  prooftype: string;

  @Column({
    comment: 'allot_name',
  })
  allot_name: string;

  @Column({
    comment: 'allot_value',
  })
  allot_value: string;

  @Column({
    comment: 'rateRemark',
  })
  rateRemark: string;

  @Column({
    comment: '公链',
  })
  publicchain: string;

  @Column({
    comment: 'miningstate',
  })
  miningstate: string;

  @Column({
    comment: 'blockreward',
  })
  blockreward: string;

  @Column('bigint', { comment: 'firstblocktime' })
  firstblocktime: number;

  @Column({
    comment: 'blockspleed',
  })
  blockspleed: string;

  @Column({
    comment: 'halvetime',
  })
  halvetime: string;

  @Column({
    comment: 'halvereward',
  })
  halvereward: string;

  @Column({
    comment: 'online_time',
  })
  online_time: string;

  @Column({
    comment: 'exchange_listcount',
  })
  exchange_listcount: string;

  @Column({
    comment: '图标',
  })
  logo_small: string;

  @Column({
    comment: 'updatetime',
  })
  updatetime: number;

  /* kline data start*/
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
  /* kline data end*/
}
