package com.trader.controller;

import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSON;
import com.trader.constant.UrlConstant;
import com.trader.emun.BinanceApiEnum;
import com.trader.emun.OkexApiEnum;
import com.trader.entity.Result;
import com.trader.utils.BinanceHttpRequestUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("ticker")
public class TickerController {

    /*
    获取24小时行情
    */
    @GetMapping("24hr")
    public Result ticker(String platform,String symbol){
        Map resultMap=new HashMap();
        switch (platform){
            case "okex":
                //欧易
                Object obj = BinanceHttpRequestUtil.get(UrlConstant.OKEX_URL+ OkexApiEnum.TICKER.getUrl()+symbol+"/ticker");
                resultMap = (Map) obj;
                break;
            default:
                //默认币安
                Object binanceObj = BinanceHttpRequestUtil.get(UrlConstant.BINANCE_URL+ BinanceApiEnum.HR_24.getUrl()+"?symbol="+symbol);
                resultMap = (Map) binanceObj;
                break;
        }

        return new Result(resultMap);
    }
}
