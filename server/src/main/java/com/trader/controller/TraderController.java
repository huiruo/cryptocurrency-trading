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
public class TraderController {
    @Autowired
    private UserService userService;

    @RequestMapping("/buy")
    public Result<User> login(@RequestBody User user, HttpServletRequest request) {
        User entityUser = new User();
        System.out.println("登录------->");
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
}
