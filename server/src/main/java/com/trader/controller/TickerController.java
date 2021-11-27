package com.trader.controller;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson.JSON;
import com.trader.emun.OkexApiEnum;
import com.trader.entity.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/spot/v3/instrument")
public class TickerController {

    @Value("${OKEX_URL}")
    private String OKEX_URL;

    @GetMapping("ticker")
    public Result ticker(){
        String result = HttpRequest.get(OKEX_URL+ OkexApiEnum.TICKER.getValue())
                .setHttpProxy("127.0.0.1", 7890)
//                .body(json)
                .execute()
                .body();
        Map resultMap = JSON.parseObject(result, Map.class);
        return new Result(resultMap);
    }
}
