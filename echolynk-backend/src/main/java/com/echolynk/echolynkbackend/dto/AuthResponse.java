package com.echolynk.echolynkbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String token;
    private String role;
    private boolean isPremium;

    public AuthResponse(String token, String role, boolean isPremium) {
        this.token = token;
        this.role = role;
        this.isPremium = isPremium;
    }
}
