package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.entity.User;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.concurrent.ExecutionException;

@Repository
public class UserRepository {

    @Autowired
    private Firestore firestore;

    public void saveUser(User user) {
        try {
            firestore.collection("users").document(user.getId()).set(user).get();
        } catch (InterruptedException | ExecutionException e) {
            // Handle the exception
            throw new RuntimeException("Error saving user to Firestore", e);
        }
    }

    public User getUserByEmail(String email) {
        try {
            var query = firestore.collection("users").whereEqualTo("email", email).get();
            var querySnapshot = query.get();
            if (querySnapshot.isEmpty()) {
                return null;
            }
            QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
            return document.toObject(User.class);
        } catch (InterruptedException | ExecutionException e) {
            // Handle the exception
            throw new RuntimeException("Error retrieving user from Firestore", e);
        }
    }
}
