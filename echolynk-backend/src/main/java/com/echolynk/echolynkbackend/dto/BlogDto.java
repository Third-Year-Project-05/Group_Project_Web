package com.echolynk.echolynkbackend.dto;

import com.echolynk.echolynkbackend.entity.User;
import lombok.Getter;
import lombok.Setter;

import com.google.cloud.Timestamp;

@Getter
@Setter
public class BlogDto {
    private String id;
    private String title;
    private String content;
    private String author;
    private Timestamp timestamp;
    private String status;
    private String email;
    private User authorAll;
}
