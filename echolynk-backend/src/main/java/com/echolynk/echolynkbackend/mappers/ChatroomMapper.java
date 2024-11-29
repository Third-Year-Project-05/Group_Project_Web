package com.echolynk.echolynkbackend.mappers;

import com.echolynk.echolynkbackend.dto.ChatroomDto;
import com.echolynk.echolynkbackend.entity.Chatroom;

public class ChatroomMapper {

    public static Chatroom dtoToEntity(ChatroomDto dto) {
        Chatroom entity = new Chatroom();
        entity.setChatroomId(dto.getChatroomId());
        entity.setSender(dto.getSender());
        entity.setReceiver(dto.getReceiver());
        entity.setLastMessage(dto.getLastMessage());
        entity.setLastMessageTimestamp(dto.getLastMessageTimestamp());
        entity.setUserIds(dto.getUserIds());
        entity.setLastMessageSenderId(dto.getLastMessageSenderId());
        return entity;
    }

    public static ChatroomDto entityToDto(Chatroom entity) {
        ChatroomDto dto = new ChatroomDto();
        dto.setChatroomId(entity.getChatroomId());
        dto.setSender(entity.getSender());
        dto.setReceiver(entity.getReceiver());
        dto.setLastMessage(entity.getLastMessage());
        dto.setLastMessageTimestamp(entity.getLastMessageTimestamp());
        dto.setUserIds(entity.getUserIds());
        dto.setLastMessageSenderId(entity.getLastMessageSenderId());
        return dto;
    }
}
