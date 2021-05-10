package com.example.trader.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @RequestMapping("/login")
    //@GetMapping("/login")
    //http://localhost:8089/login
    public String login(){
        return "hello world";
    }
}
