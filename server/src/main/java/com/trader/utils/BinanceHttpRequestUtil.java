package com.trader.utils;

import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSON;
import com.trader.constant.UrlConstant;
import com.trader.constant.HttpProxyConstant;
import com.trader.constant.KeyConstant;
import com.trader.emun.BinanceApiEnum;
import com.trader.emun.HeaderEnum;

import java.util.HashMap;
import java.util.Map;

public class BinanceHttpRequestUtil {
    /**
     * 授权的post请求
     * @param url
     * @param parameters
     * @return
     */
    public static Object postAuthority(String url,HashMap<String,String> parameters){
        Map<String,String> header=new HashMap<>();
        header.put(HeaderEnum.X_MBX_APIKEY.getValue(), KeyConstant.api_key);
        String resultJson = HttpRequest.post(url+joinQueryParameters(parameters))
                .setHttpProxy(HttpProxyConstant.HOST, HttpProxyConstant.PORT)
                .addHeaders(header)
                .execute()
                .body();
        Object resultObject = JSON.parse(resultJson);
        return resultObject;
    }

    /**
     * 授权的get请求
     * @param url
     * @param parameters
     * @return
     */
    public static Object getAuthority(String url,HashMap<String,String> parameters){
        Map<String,String> header=new HashMap<>();
        header.put(HeaderEnum.X_MBX_APIKEY.getValue(), KeyConstant.api_key);
        String resultJson = HttpRequest.get(url+joinQueryParameters(parameters))
                .setHttpProxy(HttpProxyConstant.HOST, HttpProxyConstant.PORT)
                .addHeaders(header)
                .execute()
                .body();
        Object resultObject = JSON.parse(resultJson);
        return resultObject;
    }

    /**
     * 普通代理的post请求
     * @param url
     * @return
     */
    public static Object post(String url){
        String resultJson = HttpRequest.post(url)
                .setHttpProxy(HttpProxyConstant.HOST, HttpProxyConstant.PORT)
                .execute()
                .body();
        Object resultObject = JSON.parse(resultJson);
        return resultObject;
    }

    /**
     * 普通代理的get请求
     * @param url
     * @return
     */
    public static Object get(String url){
        String resultJson = HttpRequest.get(url)
                .setHttpProxy(HttpProxyConstant.HOST, HttpProxyConstant.PORT)
                .execute()
                .body();
        Object resultObject = JSON.parse(resultJson);
        return resultObject;
    }

    /**
     * 转换参数为字符参数
     * @param parameters
     * @return
     */
    private static String joinQueryParameters(HashMap<String,String> parameters) {
        SignatureUtil signature=new SignatureUtil();
        String timeStamp = getTimeStamp();
        String secretKey = signature.getSignature(timeStamp, KeyConstant.secret_key);
        String urlPath = "?"+timeStamp+"&signature=" + secretKey;
        if (parameters!=null) {
            for (Map.Entry mapElement : parameters.entrySet()) {
                urlPath += "&" + mapElement.getKey() + "=" + mapElement.getValue();
            }
        }
        return urlPath;
    }

    /**
     * 获取服务器时间戳
     * @return
     */
    private static String getTimeStamp() {
        long timestamp = System.currentTimeMillis();
        try {
            String resultJson = HttpRequest.get(UrlConstant.BINANCE_URL+ BinanceApiEnum.TIMESTAMP.getUrl())
                    .setHttpProxy(HttpProxyConstant.HOST, HttpProxyConstant.PORT)
                    .execute()
                    .body();
            Map<String,Long> resultMap = JSON.parseObject(resultJson, Map.class);
            timestamp=resultMap.get("serverTime");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "timestamp=" + timestamp;
    }
}
