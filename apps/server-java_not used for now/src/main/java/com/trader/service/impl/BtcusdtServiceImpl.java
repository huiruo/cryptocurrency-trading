package com.trader.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.trader.dao.BtcusdtDao;
import com.trader.entity.Btcusdt;
import com.trader.service.BtcusdtService;
import org.springframework.stereotype.Service;

@Service
public class BtcusdtServiceImpl extends ServiceImpl<BtcusdtDao, Btcusdt> implements BtcusdtService {
}
