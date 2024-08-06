package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.BlogDto;
import com.echolynk.echolynkbackend.entity.Blog;
import com.echolynk.echolynkbackend.mappers.BlogMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.cloud.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

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

        blog.setTimestamp(Timestamp.now());

        // Reference to the Firestore document
        DocumentReference blogRef = firestore.collection("blogs").document(blogId);

        // Save the blog to Firestore
        ApiFuture<WriteResult> result = blogRef.set(blog);

        try {
            result.get();
        } catch (Exception e) {
            throw new RuntimeException("Error saving blog to Firestore: " + e.getMessage(), e);
        }

        return blogId;
    }

    public List<BlogDto> getAllBlogs() {
        try {
            // Query all documents in the "blogs" collection
            ApiFuture<QuerySnapshot> future = firestore.collection("blogs").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            // Convert each document to BlogDto
            return documents.stream()
                    .map(doc -> BlogMapper.entityToDto(Objects.requireNonNull(doc.toObject(Blog.class))))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error getting all blogs from Firestore: " + e.getMessage(), e);
        }
    }


    public BlogDto getBlog(String id) {
        try {
            // Reference to the Firestore document
            DocumentReference blogRef = firestore.collection("blogs").document(id);

            // Get the document
            ApiFuture<DocumentSnapshot> future = blogRef.get();
            DocumentSnapshot document = future.get();

            // Convert the document to BlogDto
            return BlogMapper.entityToDto(Objects.requireNonNull(document.toObject(Blog.class)));
    }
        catch (Exception e) {
            throw new RuntimeException("Error getting blog from Firestore: " + e.getMessage(), e);
        }
    }


    public void updateBlog(String id, BlogDto blogDto) {
        // Reference to the Firestore document
        DocumentReference blogRef = firestore.collection("blogs").document(id);

        // Map BlogDto to Blog entity
        Blog blog = BlogMapper.dtoToEntity(blogDto);

        blog.setTimestamp(Timestamp.now());

        // Update the blog in Firestore
        ApiFuture<WriteResult> result = blogRef.set(blog);

        try {
            result.get();
        } catch (Exception e) {
            throw new RuntimeException("Error updating blog in Firestore: " + e.getMessage(), e);
        }
    }

    public void deleteBlog(String id) {
        // Reference to the Firestore document
        DocumentReference blogRef = firestore.collection("blogs").document(id);

        // Delete the blog from Firestore
        ApiFuture<WriteResult> result = blogRef.delete();

        try {
            result.get();
        } catch (Exception e) {
            throw new RuntimeException("Error deleting blog from Firestore: " + e.getMessage(), e);
        }
    }

}
