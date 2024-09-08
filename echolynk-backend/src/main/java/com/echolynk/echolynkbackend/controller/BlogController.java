package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.BlogDto;
import com.echolynk.echolynkbackend.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/api")
@RestController
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping("/addBlog")
    public ResponseEntity<?> createBlog(        @RequestPart("image") MultipartFile image,
                                                @RequestPart("blogDto") BlogDto blogDto) {
        try {
            String blogId = blogService.createBlog(image, blogDto);
            return ResponseEntity.ok("Blog created with ID: " + blogId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating blog: " + e.getMessage());
        }
    }

    @GetMapping("/getBlog")
    public ResponseEntity<?> getAllBlogs() {
        try {
            List<BlogDto> blogs = (List<BlogDto>) blogService.getAllBlogs();
            return ResponseEntity.ok(blogs);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting blogs: " + e.getMessage());
        }
    }

    @GetMapping("/getBlog/{id}")
    public ResponseEntity<?> getBlog(@PathVariable String id) {
        try {
            BlogDto blog = blogService.getBlog(id);
            return ResponseEntity.ok(blog);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting blog: " + e.getMessage());
        }
    }

    @PutMapping("/updateBlog/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable String id, @RequestBody BlogDto blogDto) {
        try {
            blogService.updateBlog(id, blogDto);
            return ResponseEntity.ok("Blog updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating blog: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteBlog/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable String id) {
        try {
            blogService.deleteBlog(id);
            return ResponseEntity.ok("Blog deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting blog: " + e.getMessage());
        }
    }


}
