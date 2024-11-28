package com.echolynk.echolynkbackend.entity;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Chatroom {
    private String chatroomId;
    private String lastMessage;
    private String sender;
    private String receiver;
    private Timestamp lastMessageTimestamp;
    private List<String> userIds;
    private String lastMessageSenderId;

    public Chatroom() {}

    public Chatroom(String id, String lastMessage, String sender, String receiver, Timestamp lastMessageTime, List<String> userIds, String lastMessageSenderId) {
        this.chatroomId = id;
        this.lastMessage = lastMessage;
        this.sender = sender;
        this.receiver = receiver;
        this.lastMessageTimestamp = lastMessageTime;
        this.userIds = userIds;
        this.lastMessageSenderId = lastMessageSenderId;
    }


}
