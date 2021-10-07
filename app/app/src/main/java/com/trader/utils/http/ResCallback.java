package com.trader.utils.http;

import com.trader.utils.http.OhException;

public interface ResCallback{

    //请求成功回调事件处理
    void onSuccess(Object responseObj);

    //请求失败回调事件处理
    void onFailure(OhException failuer);
}