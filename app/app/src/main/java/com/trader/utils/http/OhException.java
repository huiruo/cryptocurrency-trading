package com.trader.utils.http;

/**
 * 描述：自定义异常类，返回ecode,emsg到业务层
 */
public class OhException extends Exception{

    private static final long serialVersionUID = 1L;

    private int code; //错误码
    private String msg; //错误消息

    public OhException(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
