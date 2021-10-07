package com.trader.api;

//import com.trader.utils.net.RequestMode;
import com.trader.utils.http.RequestMode;
//import com.trader.utils.net.RequestParams;
import com.trader.utils.http.ResCallback;
import com.trader.utils.http.ReqParams;
//import com.trader.utils.net.ResponseCallback;
import com.trader.utils.User;

public class HttpRequest{
    public static void postRegisterApi(String url, ReqParams params, ResCallback callback) {
        RequestMode.postRequest(url, params, callback, User.class);
    }
    public static void postLoginApi(String url,ReqParams params, ResCallback callback) {
        RequestMode.postRequest(url, params, callback, User.class);
    }
}