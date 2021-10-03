package com.trader.utils.net;

import android.util.Log;
import java.io.IOException;
import okhttp3.FormBody;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * 描述：日志拦截器
 */

public class RequetInterceptor implements Interceptor {
  /**
   * 这个chain里面包含了request和response，所以你要什么都可以从这里拿
   */
  @Override
  public Response intercept(Chain chain) throws IOException {

    /**
     * 可以添加公共头部参数如token
     */
    Request request = chain.request()
        .newBuilder()
//        .header("TOKEN", token)
//        .header("ID", id)
        .build();

    /**
     * 开始时间
     */
    long startTime = System.currentTimeMillis();
    Log.e("TAG","\n"+"requestUrl=" + request.url());
    String method = request.method();

    if ("POST".equals(method)) {
      try {
        JSONObject jsonObject = new JSONObject();
        if (request.body() instanceof FormBody) {
          FormBody body = (FormBody) request.body();
          for (int i = 0; i < body.size(); i++) {
            jsonObject.put(body.encodedName(i), body.encodedValue(i));
          }
          Log.e("TAG","入参JSON= " + jsonObject.toString());
        }
      } catch (JSONException e) {
        e.printStackTrace();
      }
    }

    Response response = chain.proceed(request);
    /**
     * 这里不能直接使用response.body().string()的方式输出日志
     * 因为response.body().string()之后，response中的流会被关闭，程序会报错，我们需要创建出一个新的response给应用层处理
     */
    ResponseBody responseBody = response.peekBody(1024 * 1024);
    Log.e("TAG","出参JSON=" + responseBody.string());
    long endTime = System.currentTimeMillis();
    long duration = endTime - startTime;
    Log.e("TAG","----------" + "耗时:" + duration + "毫秒----------");
    return response;
  }
}
