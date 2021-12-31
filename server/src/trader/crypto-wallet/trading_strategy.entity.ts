import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';

@Entity('trading_strategy')
export class TradingStrategy {
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
        comment: 'quantity'
    })
    quantity: number;

    @Column({
        comment: 'price'
    })
    price: number;

    @Column({
        comment: 'cost_price'
    })
    cost_price: number;

    @Column({
        comment: 'profit_ratio'
    })
    profit_ratio: string;

    @Column({
        comment: 'profit_amount'
    })
    profit_amount: number;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'update_time',
    })
    update_time: Date;

    @Column({
        comment: 'first_order_id'
    })
    first_order_id: number;

    @Column({
        comment: 'first_order_price'
    })
    first_order_price: string;

    @Column({
        comment: 'last_order_id'
    })
    last_order_id: number;

    @Column({
        comment: 'last_order_price'
    })
    last_order_price: string;

    @Column({
        comment: 'is_running'
    })
    is_running: number;
    /*
    @Column({
        comment: 'updateTime'
    })
    updateTime: number;
    */
}