```javaScript
  @PrimaryGeneratedColumn({
    type:'int',
    name:'id',
    comment: 'ID',
  })
  id: number;

  @Column({
    type:'varchar',
    name:'asset',
    nullable:false,
    unique:true,
    length:50,
    comment: 'asset'
  })
  asset: string;

  @Column('tinyint',{
    nullable:false,
    default:()=>0,
    comment: 'locked',
  })
  locked: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable:false,
    name: 'updateTime',
  })
  updateTime: Date;
```