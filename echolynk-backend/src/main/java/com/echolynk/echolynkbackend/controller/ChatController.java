package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.BlogDto;
import com.echolynk.echolynkbackend.dto.ChatroomDto;
import com.echolynk.echolynkbackend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/getChatrooms")
    public ResponseEntity<?> getAllChatrooms(@RequestParam String userId) {
        try {
            List<ChatroomDto> chatrooms = (List<ChatroomDto>) chatService.getAllChatrooms( userId);
            return ResponseEntity.ok(chatrooms);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting blogs: " + e.getMessage());
        }
    }


}
