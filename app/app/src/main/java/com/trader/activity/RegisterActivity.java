package com.trader.activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import java.util.Properties;
import com.trader.R;

import com.trader.api.HttpRequest;
import com.trader.utils.ProperUtil;
import com.trader.utils.User;
import com.trader.utils.http.OhException;
import com.trader.utils.net.OkHttpException;
import com.trader.utils.http.ReqParams;
//import com.trader.utils.net.ResponseCallback;
import com.trader.utils.http.ResCallback;

public class RegisterActivity extends BaseActivity {
    Button btn_register;
    EditText account, password, confirmPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_register);
        init();
    }

    private void init() {
        btn_register = findViewById(R.id.registerAction);
        account = findViewById(R.id.regAccount);
        password = findViewById(R.id.regPassword);
        confirmPassword = findViewById(R.id.confirmPassword);

        btn_register.setOnClickListener(new View.OnClickListener() {
            Properties properties = ProperUtil.getProperties(getApplicationContext());
            String baseUrl = properties.getProperty("baseUrl");
            @Override
            public void onClick(View view) {
                /*test account
                {
                "account":"12345@qq.com",
                "password":12345,
                }
                * */
                Log.d("baseUrl:",baseUrl);

                String account_str = account.getText().toString();
                String password_str = password.getText().toString();
                String confirm_str = confirmPassword.getText().toString();

                if (account_str == null || account_str.length() == 0) {
                    //Toast.makeText(this, "You clicked Add", Toast.LENGTH_SHORT).show();
                    Toast ts = Toast.makeText(getBaseContext(), "???????????????", Toast.LENGTH_LONG);
                    ts.show();
                    return;
                }
                if (password_str == null || password_str.length() == 0) {
                    Toast.makeText(RegisterActivity.this, "???????????????", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (confirm_str == null || confirm_str.length() == 0) {
                    Toast.makeText(getBaseContext(), "???????????????", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (!password_str.equals(confirm_str)) {
                    Toast.makeText(getBaseContext(), "?????????????????????", Toast.LENGTH_SHORT).show();
                    return;
                }
                Toast.makeText(getBaseContext(),"????????????",Toast.LENGTH_SHORT).show();
                register(account_str,password_str);
            }

            public void register(String account,String password){
                ReqParams params = new ReqParams();
                params.put("account", account);
                params.put("password", password);
                String register_url = baseUrl + "/user/register";
                Log.d("??????a----------------->",register_url);
                Log.d("??????b----------------->",account);
                Log.d("??????c----------------->",password);
                HttpRequest.postRegisterApi(register_url, params, new ResCallback() {
                    @Override
                    public void onSuccess(Object responseObj) {
                        //UserInfo userInfo = (UserInfo) responseObj;
                        //System.out.println(userInfo);
                        //Log.d("????????????",userInfo.toString());
                        User user = (User) responseObj;
                        System.out.println(user);
                        Log.d("????????????", user.toString());
                        Toast.makeText(RegisterActivity.this, "????????????", Toast.LENGTH_SHORT).show();
                        //
                        //Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                        //startActivity(intent);
                        //
                    }

                    @Override
                    public void onFailure(OhException failuer) {
                        //Log.e("TAG", "???????????????" + failuer);
                        if (failuer.getCode() == 4) {
                            Toast.makeText(RegisterActivity.this, "?????????????????????????????????????????????", Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(RegisterActivity.this, "????????????:" + failuer.getMsg(), Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
    }
}
