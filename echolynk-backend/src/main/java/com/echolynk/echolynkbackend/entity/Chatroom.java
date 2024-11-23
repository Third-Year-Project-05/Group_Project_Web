package com.echolynk.echolynkbackend.entity;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Chatroom {
    private int id;
    private String lastMessage;
    private String sender;
    private String receiver;
    private Timestamp lastMessageTime;

    public Chatroom() {}

    public Chatroom(int id, String lastMessage, String sender, String receiver, Timestamp lastMessageTime) {
        this.id = id;
        this.lastMessage = lastMessage;
        this.sender = sender;
        this.receiver = receiver;
        this.lastMessageTime = lastMessageTime;

    }


}
