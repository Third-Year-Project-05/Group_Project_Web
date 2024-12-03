package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.InvitationRequest;
import com.echolynk.echolynkbackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-invitation")
    public ResponseEntity<String> sendInvitation(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String roomId = request.get("roomId");
            emailService.sendInvitationEmail(email, roomId);
            return ResponseEntity.ok("Invitation sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send invitation: " + e.getMessage());
        }
    }
}

