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
    //@GetMapping("/login")
    public String login(){
        return "hello world";
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
