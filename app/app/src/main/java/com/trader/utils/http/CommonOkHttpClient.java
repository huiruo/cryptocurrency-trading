package com.trader.utils.http;

import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;

import okhttp3.Cache;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class CommonOkHttpClient {
    /**
     * 超时时间
     */
    private static final int TIME_OUT = 30;
    private static OkHttpClient mOkHttpClient;

    /**
     * 为我们的Client配置参数，使用静态语句块来配置
     * 只执行一次，运行一开始就开辟了内存，内存放在全局
     */
    static {
        //创建我们Client对象的构建者
        OkHttpClient.Builder okHttpBuilder = new OkHttpClient.Builder();
        okHttpBuilder
                //为构建者设置超时时间
                .connectTimeout(TIME_OUT, TimeUnit.SECONDS)
                .readTimeout(TIME_OUT, TimeUnit.SECONDS)
                .writeTimeout(TIME_OUT, TimeUnit.SECONDS)
                ////websocket轮训间隔(单位:秒)
                .pingInterval(20, TimeUnit.SECONDS)
                //设置缓存
                //.cache(new Cache(cacheDir.getAbsoluteFile(), cacheSize))
                //允许重定向
                .followRedirects(true)
                //设置拦截器
                .addInterceptor(new RequetInterceptor())
                //添加https支持
                .hostnameVerifier(new HostnameVerifier() {
                    @Override
                    public boolean verify(String s, SSLSession sslSession) {
                        return true;
                    }
                }).sslSocketFactory(HttpsUtils.initSSLSocketFactory(), HttpsUtils.initTrustManager());
        mOkHttpClient = okHttpBuilder.build();
    }


    /**
     * 发送具体的HTTP以及Https请求
     */
    public static Call sendRequest(Request request, CommonJsonCallback commonCallback) {
        Call call = mOkHttpClient.newCall(request);
        call.enqueue(commonCallback);
        return call;
    }

    /**
     * GET请求
     */
    public static Call get(Request request, ResposeDataHandle handle) {
        Call call = mOkHttpClient.newCall(request);
        call.enqueue(new CommonJsonCallback(handle));
        return call;
    }

    /**
     * POST请求
     */
    public static Call post(Request request, ResposeDataHandle handle) {
        Call call = mOkHttpClient.newCall(request);
        call.enqueue(new CommonJsonCallback(handle));
        return call;
    }

    /**
     * POST请求图片
     */
    /*
    public static Call downLadImg(Request request, final String imgPath,
                                  final ResponseByteCallback callback) {
        Call call = mOkHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call,final IOException e) {
                Log.e("TAG", "下载图片失败=" + e.getMessage());
                new Handler().post(new Runnable() {
                    @Override
                    public void run() {
                        callback.onFailure(e.getMessage());
                    }
                });
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Log.e("TAG", "下载图片成功=" + response);
                File file = null;
                try {
                    InputStream is = response.body().byteStream();
                    int len = 0;
                    // 文件夹路径
                    String pathUrl =
                            Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator
                                    + "/sgcc/";
                    File filepath = new File(pathUrl);
                    if (!filepath.exists()) {
                        filepath.mkdirs();// 创建文件夹
                    }
                    file = new File(pathUrl, imgPath);

                    FileOutputStream fos = new FileOutputStream(file);

                    byte[] buf = new byte[2048];
                    while ((len = is.read(buf)) != -1) {
                        fos.write(buf, 0, len);
                    }
                    fos.flush();
                    fos.close();
                    is.close();
                    final File finalFile = file;
                    new Handler(Looper.getMainLooper()).post(new Runnable() {
                        @Override
                        public void run() {
                            callback.onSuccess(finalFile);
                        }
                    });
                } catch (final Exception e) {
                    new Handler(Looper.getMainLooper()).post(new Runnable() {
                        @Override
                        public void run() {
                            callback.onFailure(e.getMessage());
                        }
                    });

                }

            }
        });
        return call;
    }
     */
}
