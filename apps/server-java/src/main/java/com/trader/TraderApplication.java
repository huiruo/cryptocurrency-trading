package com.trader;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan({"com.trader.dao"})
public class TraderApplication {
    public static void main(String[] args) {
        SpringApplication.run(TraderApplication.class, args);
    }
}
