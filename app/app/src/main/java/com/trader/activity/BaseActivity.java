package com.trader.activity;
import androidx.appcompat.app.AppCompatActivity;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.trader.utils.ForceOfflineReceiver;
import com.trader.utils.NetBroadcastReceiver;


public class BaseActivity extends AppCompatActivity {

    //test 本地广播
    //创建广播接收器类变量
    private ForceOfflineReceiver forceOfflineReceiver;
    //创建本地广播管理器类变量
    private LocalBroadcastManager localBroadcastManager;
    //end

    private NetBroadcastReceiver netBroadcastReceiver;
    private boolean checkNetworkStatusChangeListenerEnable = false;

    public void setCheckNetworkStatusChangeListenerEnable(boolean checkNetworkStatusChangeListenerEnable) {
        this.checkNetworkStatusChangeListenerEnable = checkNetworkStatusChangeListenerEnable;
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityCollector.addActivity(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(super.toString(), "即将被销毁--->onDestroy，做回收工作和最终的资源释放");
        ActivityCollector.removeActivity(this);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        Log.d(super.toString(), "正在重新启动--->onRestart，当当前activity由不可见变成可见时，onRestart就会被调用");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(super.toString(), "可见--->onStart，未出现在前台无法和用户交互，已显示，但看不见");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(super.toString(), "即将停止--->onStop");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(super.toString(), "正在停止--->onPause，紧接着就是onstop,如果快速再回到当前，onResume就会被调用,可以在此方法停止动画但不要做耗时操作，因为onPause必须先执行完，新activity的onResume才会执行");
        Log.d(super.toString(), "本地广播关闭");
        localBroadcastManager.unregisterReceiver(forceOfflineReceiver);
        if (!checkNetworkStatusChangeListenerEnable) {
//            Log.d(super.toString(), "网络监听广播开关广播关闭");
            return;
        }
        Log.d("onPause---->", "unregisterReceiver");
        unregisterReceiver(netBroadcastReceiver);
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(super.toString(), "可见--->onResume，出现在前台和用户交互");
        registerForceOfflineReceiver();
        Log.d(super.toString(), "注册本地广播");
        if (!checkNetworkStatusChangeListenerEnable) {
//            Log.d(super.toString(), "网络监听广播开关广播关闭,不注册广播");
            return;
        }
        registerBroadcastReceiver();
    }

    /**
     * 注册网络状态广播
     */
    private void registerBroadcastReceiver() {
        Log.d(super.toString(), "注册标准广播");
        //注册广播
        netBroadcastReceiver = new NetBroadcastReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction(ConnectivityManager.CONNECTIVITY_ACTION);
        registerReceiver(netBroadcastReceiver, filter);
        //设置监听
        //netBroadcastReceiver.setStatusMonitor(this);
    }

    private void registerForceOfflineReceiver() {
        //广播变量管理器获得本地广播管理器
        localBroadcastManager = LocalBroadcastManager.getInstance(this);
        //动态配置广播接收器action
//        IntentFilter intentFilter = new IntentFilter();
//        intentFilter.addAction("com.booking.LOCAL_BROADCAST");
        IntentFilter intentFilter = new IntentFilter("com.booking.LOCAL_BROADCAST");
        //实例化广播接收器
        forceOfflineReceiver = new ForceOfflineReceiver();
        localBroadcastManager.registerReceiver(forceOfflineReceiver, intentFilter);
    }
}
