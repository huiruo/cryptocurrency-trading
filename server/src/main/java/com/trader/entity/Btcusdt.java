package com.trader.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName
public class Btcusdt {
    private String id;
    private String priceChange;      //24h涨跌
    private String priceChangePercent;      //24h涨幅
    private String lastPrice;      //最新价格
    private String lastQty;  //最新成交的数量
    private String bidPrice;  //买一价
    private String bidQty;         //买一价对应的数量
    private String askPrice;  //卖一价
    private String askQty;         //卖一价对应的量
    private String highPrice;   //24h最高价
    private String lowPrice;   //24h最低价
    private String volume;  //24h成交量(USDT)
    private String quoteVolume; //24h成交额(USDT)
    private Date openTime;  //integer($int64)
    private Date closeTime;  //integer($int64)
    private Long count;        //成交笔数
    private String prevClosePrice; //上一个收盘价
    private String openPrice; //开盘价
    private Date createTime; //创建时间
    private Date updateTime; //更新时间
}
