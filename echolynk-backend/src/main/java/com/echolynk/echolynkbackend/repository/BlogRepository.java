package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.BlogDto;
import com.echolynk.echolynkbackend.entity.Blog;
import com.echolynk.echolynkbackend.mappers.BlogMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class BlogRepository {

    @Autowired
    private Firestore firestore;

    public String saveBlog(BlogDto blogDto) {
        // Generate a unique ID for the blog
        String blogId = UUID.randomUUID().toString();
        blogDto.setId(blogId);

        // Map BlogDto to Blog entity
        Blog blog = BlogMapper.dtoToEntity(blogDto);

        // Set the timestamp to the server time
        blog.setTimestamp(Timestamp.now());

        // Reference to the Firestore document
        DocumentReference blogRef = firestore.collection("blogs").document(blogId);

        // Save the blog to Firestore
        ApiFuture<WriteResult> result = blogRef.set(blog);

        try {
            // Wait for the operation to complete
            result.get();
        } catch (Exception e) {
            // Handle exceptions (e.g., log error)
            throw new RuntimeException("Error saving blog to Firestore: " + e.getMessage(), e);
        }

        return blogId;
    }
}
