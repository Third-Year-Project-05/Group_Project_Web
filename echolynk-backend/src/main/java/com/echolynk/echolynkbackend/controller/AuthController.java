package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.AuthRequest;
import com.echolynk.echolynkbackend.dto.AuthResponse;
import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.service.AuthService;
import com.echolynk.echolynkbackend.service.UserService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        try {
            String userId = userService.registerUser(userDto);
            return ResponseEntity.ok("User registered with ID: " + userId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error registering user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            AuthResponse authResponse = userService.loginUser(authRequest.getEmail(), authRequest.getPassword());
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(null);
        }
    }

    @PostMapping("/verifyToken")
    public ResponseEntity<?> verifyToken(@RequestBody String idToken) {
        try {
            FirebaseToken decodedToken = authService.verifyIdToken(idToken);
            if (decodedToken != null) {
                return ResponseEntity.ok("Token verified successfully");
            } else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Error verifying token: " + e.getMessage());
        }
    }
}
