package com.trader.utils.net;

import java.io.File;

/**
 * 描述：回调接口
 */

public interface ResponseByteCallback {

  //请求成功回调事件处理
  void onSuccess(File file);

  //请求失败回调事件处理
  void onFailure(String failureMsg);

}
