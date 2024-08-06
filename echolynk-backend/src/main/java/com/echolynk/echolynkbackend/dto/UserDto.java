package com.echolynk.echolynkbackend.dto;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

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
    private boolean isPremium;
    private Timestamp premiumExpirationDate;
}
