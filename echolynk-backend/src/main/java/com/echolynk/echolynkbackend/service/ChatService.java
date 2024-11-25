package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.ChatroomDto;
import com.echolynk.echolynkbackend.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public List<ChatroomDto> getAllChatrooms(String userId) {
        return chatRepository.getAllChatrooms( userId);
    }


}
