package com.trader.emun;

import lombok.Data;

public enum OkexApiEnum {
    TICKER("TICKER","/api/spot/v3/instruments/BTC-USDT/ticker"),
    FFF("FFF","")
    ;
    private String url;
    private String value;

    OkexApiEnum(String url, String value) {
        this.url=url;
        this.value=value;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
