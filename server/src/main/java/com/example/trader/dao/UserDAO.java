package com.example.trader.dao;

import com.example.trader.entity.User;

public interface UserDAO {
    //查询用户
    User findByAccount(String account);

    void register(User user);

}
