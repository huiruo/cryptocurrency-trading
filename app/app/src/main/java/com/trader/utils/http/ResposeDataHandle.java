package com.trader.utils.http;

import com.trader.utils.http.ResCallback;
/**
 * 描述：封装回调接口和要转换的实体对象
 */

public class ResposeDataHandle {

    public ResCallback mListener = null;
    public Class<?> mClass = null;

    public ResposeDataHandle(ResCallback listener) {
        this.mListener = listener;
    }

    public ResposeDataHandle(ResCallback listener, Class<?> clazz) {
        this.mListener = listener;
        this.mClass = clazz;
    }

}
