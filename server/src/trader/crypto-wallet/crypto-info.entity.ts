import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallet_info')
export class WalletInfo {
    /**
     * 主键
     */
    @PrimaryGeneratedColumn({
        comment: 'ID'
    })
    id: number;

    @Column({
        comment: 'accountType'
    })
    accountType: string;

    @Column({
        comment: 'updateTime'
    })
    updateTime: number;

    @Column({
        comment: 'canTrade'
    })
    canTrade: boolean;

    @Column({
        comment: 'canWithdraw'
    })
    canWithdraw: boolean;

    @Column({
        comment: 'canDeposit'
    })
    canDeposit: boolean;

    @Column({
        comment: 'makerCommission'
    })
    makerCommission: number;

    @Column({
        comment: 'takerCommission'
    })
    takerCommission: number;

    @Column({
        comment: 'buyerCommission'
    })
    buyerCommission: number;

    @Column({
        comment: 'sellerCommission'
    })
    sellerCommission: number;
}