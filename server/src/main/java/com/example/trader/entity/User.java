package com.example.trader.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    private String id;
    private String account;
    private String password;
    private String email;
}
