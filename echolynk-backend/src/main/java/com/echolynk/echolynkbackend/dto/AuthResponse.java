package com.echolynk.echolynkbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String token;
    private String role;
    private String userId;

    public AuthResponse(String token, String role, String userId) {
        this.token = token;
        this.role = role;
        this.userId = userId;
    }
}
