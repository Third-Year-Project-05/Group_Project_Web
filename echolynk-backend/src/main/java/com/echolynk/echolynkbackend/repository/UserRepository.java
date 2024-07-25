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
        firestore.collection("users").document(user.getId()).set(user);
    }

    public User getUserByEmail(String email) throws ExecutionException, InterruptedException {
        var query = firestore.collection("users").whereEqualTo("email", email).get();
        var querySnapshot = query.get();
        if (querySnapshot.isEmpty()) {
            return null;
        }
        QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
        return document.toObject(User.class);
    }
}
