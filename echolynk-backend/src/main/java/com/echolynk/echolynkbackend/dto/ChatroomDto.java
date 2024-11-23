package com.echolynk.echolynkbackend.dto;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatroomDto {
    private int id;
    private String lastMessage;
    private String sender;
    private String receiver;
    private Timestamp lastMessageTime;
}
