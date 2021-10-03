package com.trader.service;

import com.trader.entity.User;

//***业务层
public interface UserService {
    User login(User user);
    void register(User user);
}
