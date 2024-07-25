package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.AuthRequest;
import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

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
    public ResponseEntity<String> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            String token = userService.loginUser(authRequest.getEmail(), authRequest.getPassword());
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Error logging in: " + e.getMessage());
        }
    }
}
