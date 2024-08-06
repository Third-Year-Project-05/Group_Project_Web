package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.BlogDto;
import com.echolynk.echolynkbackend.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public String createBlog(BlogDto blogDto) {
        String blogId = blogRepository.saveBlog(blogDto);
        return blogId;
    }

    // Method to get all blogs
    public List<BlogDto> getAllBlogs() {
        return blogRepository.getAllBlogs();
    }

    // Method to get a blog by ID
    public BlogDto getBlog(String id) {
        return blogRepository.getBlog(id);
    }

    // Method to update a blog
    public void updateBlog(String id, BlogDto blogDto) {
        blogRepository.updateBlog(id, blogDto);
    }

    // Method to delete a blog
    public void deleteBlog(String id) {
        blogRepository.deleteBlog(id);
    }
}
