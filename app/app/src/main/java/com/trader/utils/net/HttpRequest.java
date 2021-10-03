package com.trader.utils.net;

import com.trader.utils.UserInfo;
import java.io.File;
import java.util.List;

/**
 * 描述：所有的请求接口
 */
public class HttpRequest {


  /**
   * @param params 入参
   * @param callback 回调接口
   */
  public static void getBannerApi(RequestParams params, ResponseCallback callback) {
    RequestMode.getRequest("https://www.wanandroid.com/banner/json", params, callback, null);
  }

  /**
   * @param params 入参
   * @param callback 回调接口
   */
  public static void postLoginApi(RequestParams params, ResponseCallback callback) {
    RequestMode.postRequest("https://www.wanandroid.com/user/login", params, callback, UserInfo.class);
  }

  /**
   * 下载图片 Get方式
   * @param params 入参
   * @param imgPath 存储地址
   * @param callback 回调接口
   */
  public static void getImgApi(RequestParams params,String imgPath, ResponseByteCallback callback) {
    RequestMode.getLoadImg("http://p0.meituan.net/165.220/movie/7f32684e28253f39fe2002868a1f3c95373851.jpg",params,imgPath,callback);
  }

  /**
   * 下载图片 Post方式
   * @param params 入参
   * @param imgPath 存储地址
   * @param callback 回调接口
   */
  public static void postImgApi(RequestParams params,String imgPath, ResponseByteCallback callback) {
    RequestMode.postLoadImg("url地址",params,imgPath,callback);
  }

  /**
   * 图文混合上传服务器
   * @param params
   * @param files
   * @param callback
   */
  public static void postMultipartApi(RequestParams params, List<File> files, ResponseCallback callback) {
    RequestMode.postMultipart("url地址", params, files, callback, null);
  }

}
