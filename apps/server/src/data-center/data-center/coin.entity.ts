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
  rank: number;

  @Column({
    comment: '当前价格',
  })
  price: number;

  @Column({
    comment: '持仓地址',
  })
  holders: number;

  @Column({
    comment: 'maxsupply',
  })
  maxsupply: number;

  @Column({
    comment: '是否无限增发',
  })
  is_infinity_supply: number;

  @Column({
    comment: '流通率',
  })
  circulationRate: number;

  @Column({
    comment: '流通总量',
  })
  supply: number;

  @Column({
    comment: '总市值',
  })
  marketcap: number;

  @Column({
    comment: 'marketcap_total_rnb',
  })
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

  @Column({
    comment: 'ico价格',
  })
  icoprice: number;

  @Column({
    comment: '开盘价格',
  })
  openprice: number;

  @Column({
    comment: '投资回报',
  })
  openprice_percent: number;

  @Column({
    comment: '最高价格',
  })
  his_highest_usd: number;

  @Column({
    comment: '历史最低',
  })
  his_lowest_usd: number;

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

  @Column({
    comment: 'firstblocktime',
  })
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
}
