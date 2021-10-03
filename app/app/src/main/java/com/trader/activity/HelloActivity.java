package com.trader.activity;
import android.os.Bundle;
import android.view.Window;

import com.trader.R;

public class HelloActivity extends BaseActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_hello);
        init();
    }

    private void init() {
    }
}
