package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.BlogDto;
import com.echolynk.echolynkbackend.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public String createBlog(BlogDto blogDto) {
        // Save blog details and get the blog ID
        String blogId = blogRepository.saveBlog(blogDto);

        return blogId;
    }
}
