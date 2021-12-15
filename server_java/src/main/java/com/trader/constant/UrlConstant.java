package com.trader.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UrlConstant {
    /**
     * 欧易
     */
    public static String OKEX_URL;
    /**
     * 币安
     */
    public static String BINANCE_URL;

    @Value("${OKEX_URL}")
    public void setOkexUrl(String okexUrl) {
        OKEX_URL = okexUrl;
    }

    @Value("${BINANCE_URL}")
    public void setBinanceUrl(String binanceUrl) {
         BINANCE_URL = binanceUrl;
    }
}
