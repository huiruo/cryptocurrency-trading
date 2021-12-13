import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('myTrades')
export class MyTrades {
    /**
     * 主键
     */
    @PrimaryGeneratedColumn({
        comment: 'ID'
    })
    id: number;

    @Column({
        comment: 'symbol'
    })
    symbol: string;

    @Column({
        comment: 'orderId'
    })
    orderId: string;

    @Column({
        comment: 'orderListId'
    })
    orderListId: string;

    @Column({
        comment: 'price'
    })
    price: number;
    
    @Column({
        comment: 'qty'
    })
    qty: string;

    @Column({
        comment: 'quoteQty'
    })
    quoteQty: string;

    @Column({
        comment: 'commission'
    })
    commission: string;
    
    @Column({
        comment: 'commissionAsset'
    })
    commissionAsset: string;

    @Column({
        comment: 'time'
    })
    time: number;

    @Column({
        comment: 'isBuyer'
    })
    isBuyer: boolean;

    @Column({
        comment: 'isMaker'
    })
    isMaker: boolean;

    @Column({
        comment: 'isBestMatch'
    })
    isBestMatch: boolean;
}