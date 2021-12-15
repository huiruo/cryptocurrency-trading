package com.trader.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import com.trader.entity.Result;
import com.trader.entity.User;
import com.trader.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("user")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    //http://localhost:8089/user/test
    @RequestMapping("/test")
    public String test(){
        return "hello world";
    }

    @RequestMapping("/login")
    public Result<User> login(@RequestBody User user, HttpServletRequest request) {
        User entityUser = new User();
        System.out.println("登录------->"+user.getAccount());
        System.out.println("登录------->"+user.getPassword());
        try {
            User userDb = userService.login(user);
            entityUser.setAccount(userDb.getAccount()).setEmail(userDb.getEmail()).setId(userDb.getId());
            //登录成功保存标记:方式1：存在 ServletContext application(暂用服务器资源) 2.Redis: 以userid为标记
            request.getServletContext().setAttribute(userDb.getId(), userDb);
            return new Result<>(entityUser);
        } catch (Exception e) {
            return new Result<>(4, e.getMessage());
        }
    }

    @RequestMapping("register")
    public Result<User> register(@RequestBody User user, HttpServletRequest request) {
        try {
            userService.register(user);
            return new Result<>();
        } catch (Exception e) {
            //return new Result<>(1, e.getMessage());
            return new Result<>(4, e.getMessage());
        }
    }
}
