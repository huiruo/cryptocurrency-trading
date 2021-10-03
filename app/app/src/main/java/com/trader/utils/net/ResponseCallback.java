package com.trader.utils.net;

/**
 * 描述：回调接口
 */

public interface ResponseCallback {

  //请求成功回调事件处理
  void onSuccess(Object responseObj);

  //请求失败回调事件处理
  void onFailure(OkHttpException failuer);

}
