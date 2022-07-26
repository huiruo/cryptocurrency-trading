import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crypto_wallet')
export class CryptoWallet {
    /**
     * 主键
     */
    @PrimaryGeneratedColumn({
        comment: 'ID'
    })
    id: string;

    @Column({
        comment: 'asset'
    })
    asset: string;

    @Column({
        comment: 'free'
    })
    free: string;

    @Column({
        comment: 'locked'
    })
    locked: string;

    @Column({
        comment: 'updateTime'
    })
    updateTime: number;
}