package com.echolynk.echolynkbackend.entity;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class Blog {

    private String id;
    private String title;
    private String author;
    private String content;
    private Timestamp timestamp;
    private String status;
    private String email;
    private User authorAll;
    private String imageUrl;

    public Blog() {}

    public Blog(String id, String title, String author, String content, Timestamp timestamp, String status, String email, User authorAll, String imageUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
        this.status = status;
        this.email = email;
        this.authorAll = authorAll;
        this.imageUrl = imageUrl;
    }
}
