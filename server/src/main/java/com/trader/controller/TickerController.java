package com.trader.controller;

import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSON;
import com.trader.constant.ApiUrlConstant;
import com.trader.emun.BinanceApiEnum;
import com.trader.emun.OkexApiEnum;
import com.trader.entity.Result;
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
                String okexResult = HttpRequest.get(ApiUrlConstant.OKEX_URL+ OkexApiEnum.TICKER.getValue()+symbol+"/ticker")
                        .setHttpProxy("127.0.0.1", 7890)
//                .body(json)
                        .execute()
                        .body();
                resultMap = JSON.parseObject(okexResult, Map.class);
                break;
            default:
                //默认币安
                String binanceResult = HttpRequest.get(ApiUrlConstant.BINANCE_URL+ BinanceApiEnum.PRICE.getValue()+"?symbol="+symbol)
                        .setHttpProxy("127.0.0.1", 7890)
//                .body(json)
                        .execute()
                        .body();
                resultMap = JSON.parseObject(binanceResult, Map.class);
                break;
        }

        return new Result(resultMap);
    }
}
