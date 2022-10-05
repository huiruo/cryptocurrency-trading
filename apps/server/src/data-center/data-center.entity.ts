import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coin_code')
export class CoinCode {
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
    comment: 'code',
  })
  code: string;
}