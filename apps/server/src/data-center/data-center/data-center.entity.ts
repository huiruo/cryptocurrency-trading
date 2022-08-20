import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('simplify_symbol')
export class SimplifySymbol {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn({
    comment: 'ID',
  })
  id: number;

  @Column({
    comment: 'symbol',
  })
  symbol: string;

  @Column({
    comment: 'baseAsset',
  })
  baseAsset: string;

  @Column({
    comment: 'quoteAsset',
  })
  quoteAsset: string;

  @Column({
    comment: 'code',
  })
  code: string;
}
