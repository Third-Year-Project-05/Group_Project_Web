package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
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


    public List<UserDto> getAllUsers() {
        try {
            ApiFuture<QuerySnapshot> query = firestore.collection("users").get();
            QuerySnapshot querySnapshot = query.get();

            List<UserDto> userList = new ArrayList<>();
            if (!querySnapshot.isEmpty()) {
                for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                    UserDto userDto = document.toObject(UserDto.class);
                    userList.add(userDto);
                }
            }
            return userList;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error retrieving users from Firestore", e);
        }
    }
}
