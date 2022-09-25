package com.trader.emun;

public enum HeaderEnum {
    X_MBX_APIKEY("X-MBX-APIKEY","密钥")
    ;
   private String value;
   private String desc;

    HeaderEnum(String value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
