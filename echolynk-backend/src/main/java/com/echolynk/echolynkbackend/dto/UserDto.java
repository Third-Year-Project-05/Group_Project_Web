package com.echolynk.echolynkbackend.dto;

import com.google.cloud.Timestamp;
import com.google.firebase.database.PropertyName;
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
//    private boolean isPremium;
    private Timestamp premiumExpirationDate;

    @PropertyName("isPremium")
    private boolean isPremium;

    @PropertyName("isPremium")
    public boolean getIsPremium() {
        return isPremium;
    }

    @PropertyName("isPremium")
    public void setIsPremium(boolean isPremium) {
        this.isPremium = isPremium;
    }
}
