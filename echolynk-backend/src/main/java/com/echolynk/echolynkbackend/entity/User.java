package com.echolynk.echolynkbackend.entity;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class User {
    private String id;
    private String userName;
    private String email;
    private String password;
    private String phoneNumber;
    private String role;
    private Timestamp timestamp;
    private boolean isPremium;
    private Timestamp premiumExpirationDate;

    public User() {
    }

    public User(String id, String userName, String email, String password, String phoneNumber, String role, Timestamp timestamp,boolean isPremium, Timestamp premiumExpirationDate) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.timestamp = timestamp;
        this.isPremium = isPremium;
        this.premiumExpirationDate = premiumExpirationDate;
    }
}
