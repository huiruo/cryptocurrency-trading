package com.trader.utils;

import java.util.List;

/*
快捷键：
在创建一个javabean时,通过快捷键Alt+Insert 快速生成.
* */
public class User {

    @Override
    public String toString() {
        return "User{" +
                "data=" + data +
                ", code=" + code +
                ", msg='" + msg + '\'' +
                '}';
    }

    private DataBean data;
    private int code;
    private String msg;

    public DataBean getData() {
        return data;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public void setData(DataBean data) {
        this.data = data;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public static class DataBean {
        @Override
        public String toString() {
            return "User{" +
                    "id='" + id + '\'' +
                    ", account='" + account + '\'' +
                    ", password='" + password + '\'' +
                    ", email='" + email + '\'' +
                    '}';
        }

        private String id;
        private String account;
        private String password;
        private String email;

        public String getId() {
            return id;
        }

        public String getAccount() {
            return account;
        }

        public String getPassword() {
            return password;
        }

        public String getEmail() {
            return email;
        }

        public void setId(String id) {
            this.id = id;
        }

        public void setAccount(String account) {
            this.account = account;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
}
