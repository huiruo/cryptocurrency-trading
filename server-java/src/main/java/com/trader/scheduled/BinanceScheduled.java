package com.trader.scheduled;

import cn.hutool.core.lang.Snowflake;
import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSON;
import com.trader.constant.UrlConstant;
import com.trader.emun.BinanceApiEnum;
import com.trader.entity.Btcusdt;
import com.trader.service.BtcusdtService;
import com.trader.utils.BinanceHttpRequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;

@Component
@EnableScheduling
public class BinanceScheduled {

    @Autowired
    private BtcusdtService btcusdtService;

    @Autowired
    private Snowflake snowflake;


    //@Scheduled(fixedRate = 1000*60*15)
    public void binanceJob(){
        //默认币安
        Object obj = BinanceHttpRequestUtil.get(UrlConstant.BINANCE_URL + BinanceApiEnum.HR_24.getUrl() + "?symbol=BTCUSDT");
        Map resultMap = (Map) obj;
        Btcusdt btcusdt=new Btcusdt();
        String uuid = snowflake.nextIdStr();
        btcusdt.setId(uuid);
        resultMap.forEach((key,value)->{
            try {
                Field declaredField = btcusdt.getClass().getDeclaredField(key.toString());
                declaredField.setAccessible(true);
                String name = declaredField.getName();
                Class<?> classType = declaredField.getType();
                String method = name.substring(0, 1).toUpperCase() + name.substring(1);
                Method method1 = btcusdt.getClass().getMethod("set" + method, classType);
                if (classType.isAssignableFrom(Long.class)){
                    value=Long.parseLong(value.toString());
                }
                method1.invoke(btcusdt,value);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        btcusdt.setCreateTime(new Date());
        btcusdt.setUpdateTime(new Date());
        btcusdtService.save(btcusdt);
    }

}
