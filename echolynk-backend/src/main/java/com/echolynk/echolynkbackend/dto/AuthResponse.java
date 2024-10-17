package com.echolynk.echolynkbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String token;
    private String role;
    private Boolean isPremium = false;
    private String userId;

    public AuthResponse(String token, String role, Boolean isPremium, String userId) {
        this.token = token;
        this.role = role;
        this.isPremium = isPremium;
        this.userId = userId;
    }
}
