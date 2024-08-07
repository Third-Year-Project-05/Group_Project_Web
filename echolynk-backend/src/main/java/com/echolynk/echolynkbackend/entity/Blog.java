package com.echolynk.echolynkbackend.entity;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Blog {

    private String id;
    private String title;
    private String author;
    private String content;
    private Timestamp timestamp;
    private String status;

    public Blog() {}

    public Blog(String id, String title, String author, String content, Timestamp timestamp, String status) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
        this.status = status;
    }
}
