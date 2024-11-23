package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.ChatroomDto;
import com.google.cloud.firestore.Firestore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChatRepository {

    @Autowired
    private Firestore firestore;
    @Autowired
    private UserRepository userRepository;

    public List<ChatroomDto> getAllChatrooms() {

        return null;
    }

}
