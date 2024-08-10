package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.BlogDto;
import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.entity.Blog;
import com.echolynk.echolynkbackend.entity.User;
import com.echolynk.echolynkbackend.mappers.BlogMapper;
import com.echolynk.echolynkbackend.mappers.UserMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.cloud.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
public class BlogRepository {

    @Autowired
    private Firestore firestore;
    @Autowired
    private UserRepository userRepository;

    public String saveBlog(BlogDto blogDto) {
        // Generate a unique ID for the blog
        String blogId = UUID.randomUUID().toString();
        blogDto.setId(blogId);

        User author = userRepository.getUserByEmail(blogDto.getEmail());
//        User author = UserMapper.toEntity(authorDto);

        // Map BlogDto to Blog entity
        Blog blog = BlogMapper.dtoToEntity(blogDto, author);

        blog.setTimestamp(Timestamp.now());
        if(blog.getAuthor() != "Admin"){
            blog.setAuthor(author.getUserName());
        }

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

        try {
            // Fetch the existing document
            ApiFuture<DocumentSnapshot> future = blogRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                Blog existingBlog = document.toObject(Blog.class);

                Map<String, Object> updates = new HashMap<>();

                // Compare and update only if content has changed
                if (blogDto.getTitle() != null && !blogDto.getTitle().equals(existingBlog.getTitle())) {
                    updates.put("title", blogDto.getTitle());
                }
                if (blogDto.getContent() != null && !blogDto.getContent().equals(existingBlog.getContent())) {
                    updates.put("content", blogDto.getContent());
                }
                if (blogDto.getAuthor() != null && !blogDto.getAuthor().equals(existingBlog.getAuthor())) {
                    updates.put("author", blogDto.getAuthor());
                }
                if (blogDto.getStatus() != null && !blogDto.getStatus().equals(existingBlog.getStatus())) {
                    updates.put("status", blogDto.getStatus());
                }

                // Always update the timestamp
                updates.put("timestamp", Timestamp.now());

                if (!updates.isEmpty()) {
                    // Update the blog in Firestore
                    ApiFuture<WriteResult> result = blogRef.update(updates);
                    result.get();
                }
            } else {
                throw new RuntimeException("Blog not found with id: " + id);
            }
        } catch (ExecutionException | InterruptedException e) {
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
