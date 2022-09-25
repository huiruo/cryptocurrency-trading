package com.trader.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KeyConstant {

    public static String secret_key;
    public static String api_key;

    @Value("${secret_key}")
    public void setSecret_key(String secretKey) {
        secret_key = secretKey;
    }

    @Value("${api_key}")
    public void setApi_key(String apiKey) {
        api_key = apiKey;
    }
}
