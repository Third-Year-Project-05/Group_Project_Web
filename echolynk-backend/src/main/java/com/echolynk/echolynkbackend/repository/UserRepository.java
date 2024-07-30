package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Repository
public class UserRepository {

    private static final Logger logger = LoggerFactory.getLogger(UserRepository.class);

    @Autowired
    private Firestore firestore;

    public void saveUser(User user) {
        try {
            firestore.collection("users").document(user.getId()).set(user).get();
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error saving user to Firestore", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status
            throw new RuntimeException("Error saving user to Firestore", e);
        }
    }

    public Optional<User> getUserByEmail(String email) {
        try {
            ApiFuture<QuerySnapshot> query = firestore.collection("users").whereEqualTo("email", email).get();
            QuerySnapshot querySnapshot = query.get();

            if (querySnapshot.isEmpty()) {
                return Optional.empty();
            }

            QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
            User user = document.toObject(User.class);
            return Optional.ofNullable(user);
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error retrieving user from Firestore", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status
            throw new RuntimeException("Error retrieving user from Firestore", e);
        }
    }

    public List<UserDto> getAllUsers() {
        CollectionReference usersCollection = firestore.collection("users");

        try {
            ApiFuture<QuerySnapshot> query = usersCollection.get();
            QuerySnapshot querySnapshot = query.get();

            List<UserDto> userList = new ArrayList<>();
            if (querySnapshot != null && !querySnapshot.isEmpty()) {
                for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                    UserDto userDto = document.toObject(UserDto.class);
                    if (userDto != null) {
                        userList.add(userDto);
                    }
                }
            }
            return userList;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error retrieving users from Firestore", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status
            throw new RuntimeException("Error retrieving users from Firestore", e);
        }
    }
}
