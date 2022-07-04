package com.trader.dao;

import com.trader.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDAO {
    //查询用户
    User findByAccount(String account);
    //注册
    void register(User user);
}
