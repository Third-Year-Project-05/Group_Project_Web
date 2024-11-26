package com.echolynk.echolynkbackend.dto;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatroomDto {
    private String chatroomId;
    private String lastMessage;
    private String sender;
    private String receiver;
    private Timestamp lastMessageTimestamp;
    private List<String> userIds;
    private String lastMessageSenderId;
}
