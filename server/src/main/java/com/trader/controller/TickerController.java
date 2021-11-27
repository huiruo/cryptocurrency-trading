package com.trader.controller;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class TestController {
    @GetMapping("ttttt")
    public Map tess(){
        Map map=new HashMap();

//        String ff = HttpUtil.get("https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker");

        String result2 = HttpRequest.get("https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker")
                .setHttpProxy("127.0.0.1", 7890)
//                .body(json)
                .execute()
                .body();

        return map;
    }
}
