package com.trader.controller;

import com.trader.constant.UrlConstant;
import com.trader.emun.BinanceApiEnum;
import com.trader.entity.Result;
import com.trader.utils.BinanceHttpRequestUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("userData")
public class WalletController {
    /**
     * 资金账户
     * @return
     */
    @PostMapping("get_funding_asset")
    public Result getUserData(){
        String url= UrlConstant.BINANCE_URL+ BinanceApiEnum.GET_FUNDING_ASSET.getUrl();
        Object resultObject = BinanceHttpRequestUtil.postAuthority(url, null);
        return new Result(resultObject);
    }
    /**
     * 查询用户API Key权限
     * @return
     */
    @PostMapping("api_restrictions")
    public Result getApiRestrictions (){
        String url= UrlConstant.BINANCE_URL+ BinanceApiEnum.API_RESTRICTIONS.getUrl();
        Object resultObject = BinanceHttpRequestUtil.getAuthority(url, null);
        return new Result(resultObject);
    }

}
