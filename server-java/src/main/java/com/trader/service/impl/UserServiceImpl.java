package com.trader.service.impl;

import com.trader.dao.UserDAO;
import com.trader.entity.User;
//import org.springframework.beans.factory.annotation.Autowired;
import com.trader.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    /*
    * 可以尝试把@Autowired注解换成@Resource注解，这两个注解实现的功能是一样的，只是来源于不同的包而已:
    @Autowired来源于Spring的包，
    @Resource来源于java自带的包.
    * */
//    @Autowired
    @Resource
//    @Autowired
    private UserDAO userDAO;

    @Override
    public User login(User user) {
        User userDb = userDAO.findByAccount(user.getAccount());
        if (userDb != null) {
            if (userDb.getPassword().equals(user.getPassword())) {
                return userDb;
            } else {
                throw new RuntimeException("密码错误");
            }
        } else {
            throw new RuntimeException("用户名不存在");
        }
    }

    @Override
    public void register(User user) {
        if (userDAO.findByAccount(user.getAccount()) == null) {
            //注册
            userDAO.register(user);
        } else {
            throw new RuntimeException("用户名已存在");
        }
    }
}
