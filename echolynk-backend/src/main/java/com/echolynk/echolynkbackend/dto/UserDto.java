package com.echolynk.echolynkbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class UserDto {
    private String userId;
    private String email;
    private String password;
    private String userName;
    private String phoneNumber;
    private String role;
    private Timestamp timestamp;
}
