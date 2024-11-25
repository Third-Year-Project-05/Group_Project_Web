package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.ChatroomDto;
import com.echolynk.echolynkbackend.entity.Blog;
import com.echolynk.echolynkbackend.entity.Chatroom;
import com.echolynk.echolynkbackend.mappers.BlogMapper;
import com.echolynk.echolynkbackend.mappers.ChatroomMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Repository
public class ChatRepository {

    @Autowired
    private Firestore firestore;
    @Autowired
    private UserRepository userRepository;

    public List<ChatroomDto> getAllChatrooms(String userId) {
        try {
            // Query documents in the "chatrooms" collection where UserIds array contains the given userId
            ApiFuture<QuerySnapshot> future = firestore.collection("chatrooms")

                    .get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            System.out.println(documents);

            // Convert each document to ChatroomDto
            return documents.stream()
                    .filter(doc -> {
                        List<String> userIds = (List<String>) doc.get("userIds");
                        return userIds != null && userIds.contains(userId);
                    })
                    .map(doc -> ChatroomMapper.entityToDto(Objects.requireNonNull(doc.toObject(Chatroom.class))))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error getting chatrooms for user " + userId + " from Firestore: " + e.getMessage(), e);
        }
    }


}
