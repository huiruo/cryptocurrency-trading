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
                    Toast ts = Toast.makeText(getBaseContext(), "请输入账户", Toast.LENGTH_LONG);
                    ts.show();
                    return;
                }
                if (password_str == null || password_str.length() == 0) {
                    Toast.makeText(RegisterActivity.this, "请输入密码", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (confirm_str == null || confirm_str.length() == 0) {
                    Toast.makeText(getBaseContext(), "请确认密码", Toast.LENGTH_SHORT).show();
                    return;
                }
                if (!password_str.equals(confirm_str)) {
                    Toast.makeText(getBaseContext(), "注册密码不一致", Toast.LENGTH_SHORT).show();
                    return;
                }
                Toast.makeText(getBaseContext(),"可以注册",Toast.LENGTH_SHORT).show();
                register(account_str,password_str);
            }

            public void register(String account,String password){
                ReqParams params = new ReqParams();
                params.put("account", account);
                params.put("password", password);
                String register_url = baseUrl + "/user/register";
                Log.d("注册a----------------->",register_url);
                Log.d("注册b----------------->",account);
                Log.d("注册c----------------->",password);
                HttpRequest.postRegisterApi(register_url, params, new ResCallback() {
                    @Override
                    public void onSuccess(Object responseObj) {
                        //UserInfo userInfo = (UserInfo) responseObj;
                        //System.out.println(userInfo);
                        //Log.d("请求返回",userInfo.toString());
                        User user = (User) responseObj;
                        System.out.println(user);
                        Log.d("请求返回", user.toString());
                        Toast.makeText(RegisterActivity.this, "注册成功", Toast.LENGTH_SHORT).show();
                        //
                        //Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                        //startActivity(intent);
                        //
                    }

                    @Override
                    public void onFailure(OhException failuer) {
                        //Log.e("TAG", "注册失败：" + failuer);
                        if (failuer.getCode() == 4) {
                            Toast.makeText(RegisterActivity.this, "账号名已经存在，请更换注册账号", Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(RegisterActivity.this, "注册失败:" + failuer.getMsg(), Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
    }
}
