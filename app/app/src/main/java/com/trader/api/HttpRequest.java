package com.trader.api;
import com.trader.utils.net.RequestMode;
import com.trader.utils.net.RequestParams;
//import com.trader.utils.net.ResponseByteCallback;
import com.trader.utils.net.ResponseCallback;
import com.trader.utils.User;

public class HttpRequest{
    public static void postRegisterApi(String url,RequestParams params, ResponseCallback callback) {
        RequestMode.postRequest(url, params, callback, User.class);
    }
    public static void postLoginApi(String url,RequestParams params, ResponseCallback callback) {
        RequestMode.postRequest(url, params, callback, User.class);
    }
}