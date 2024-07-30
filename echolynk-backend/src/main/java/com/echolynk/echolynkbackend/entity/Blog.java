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

    public Blog() {}

    public Blog(String id, String title, String author, String content, Timestamp timestamp) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
    }
}
