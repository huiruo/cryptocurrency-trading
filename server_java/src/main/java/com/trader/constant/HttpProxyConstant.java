package com.trader.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class HttpProxyConstant {
    /**
     * 代理ip
     */
    public static String HOST;
    /**
     * 代理端口
     */
    public static int PORT;

    @Value("${host}")
    public void setHost(String host){
        HOST=host;
    }
    @Value("${port}")
    public void setPort(int port){
        PORT=port;
    }
}
