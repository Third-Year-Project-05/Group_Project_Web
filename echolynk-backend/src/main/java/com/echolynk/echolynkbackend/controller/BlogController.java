package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.BlogDto;
import com.echolynk.echolynkbackend.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping("/blog")
    public ResponseEntity<?> createBlog(@RequestBody BlogDto blogDto) {
        try {
            String blogId = blogService.createBlog(blogDto);
            return ResponseEntity.ok("Blog created with ID: " + blogId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating blog: " + e.getMessage());
        }
    }
}
