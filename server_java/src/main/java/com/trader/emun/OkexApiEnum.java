package com.trader.emun;

import lombok.Data;

public enum OkexApiEnum {
    TICKER("/api/spot/v3/instruments/","欧易二十四小时价格变动情况"),

    ;
    private String url;
    private String desc;

    OkexApiEnum(String url, String desc) {
        this.url = url;
        this.desc = desc;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
