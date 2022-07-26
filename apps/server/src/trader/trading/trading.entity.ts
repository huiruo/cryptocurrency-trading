import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mytrades')
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
    orderId: number;

    @Column({
        comment: 'orderListId'
    })
    orderListId: number;

    @Column({
        comment: 'price'
    })
    price: string;
    
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
    // isBuyer: boolean;
    isBuyer: number;

    @Column({
        comment: 'isMaker'
    })
    // isMaker: boolean;
    isMaker: number;

    @Column({
        comment: 'isBestMatch'
    })
    // isBestMatch: boolean;
    isBestMatch: number;
}