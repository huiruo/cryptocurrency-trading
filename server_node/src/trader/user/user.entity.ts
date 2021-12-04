import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
    /**
     * 自增主键
     */
    @PrimaryGeneratedColumn({
        comment: '自增ID'
    })
    id: number;

    /**
     * 账户
     */
    @Column({
        comment: '账户'
    })
    account: string;

    /**
     * 密码
     */
    @Column({
        comment: '密码'
    })
    password: string;
}