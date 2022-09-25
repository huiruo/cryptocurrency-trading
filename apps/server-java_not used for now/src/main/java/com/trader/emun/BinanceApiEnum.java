package com.trader.emun;

public enum BinanceApiEnum {
    HR_24("/api/v3/ticker/24hr","二十四小时价格变动情况"),
    GET_FUNDING_ASSET("/sapi/v1/asset/get-funding-asset","资金账户"),
    API_RESTRICTIONS("/sapi/v1/account/apiRestrictions","查询用户API Key权限"),
    TIMESTAMP("/api/v3/time","服务器时间戳"),
    ;
    private String url;
    private String desc;

    BinanceApiEnum(String url, String desc) {
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
