package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.repository.UserRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private FirebaseAuth firebaseAuth;

    @Autowired
    private Firestore firestore;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        // Implement this method if needed to load user details
        return null;
    }

    public String registerUser(UserDto userDto) throws FirebaseAuthException, ExecutionException, InterruptedException {
        // Check if all required fields are present
        if (userDto.getEmail() == null || userDto.getEmail().isEmpty() ||
                userDto.getPassword() == null || userDto.getPassword().isEmpty() ||
                userDto.getUserName() == null || userDto.getUserName().isEmpty()) {
            throw new IllegalArgumentException("Email, password, and userName are required.");
        }

        // Register user with Firebase Authentication
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(userDto.getEmail())
                .setPassword(passwordEncoder.encode(userDto.getPassword()))
                .setDisplayName(userDto.getUserName());

        UserRecord userRecord = firebaseAuth.createUser(request);

        // Save user to Firestore
        Map<String, Object> user = new HashMap<>();
        user.put("userId", userRecord.getUid());
        user.put("email", userDto.getEmail());
        user.put("userName", userDto.getUserName());
        user.put("role", userDto.getRole());
        user.put("phoneNumber", userDto.getPhoneNumber());
        user.put("timestamp", Instant.now().toString());

        ApiFuture<WriteResult> future = firestore.collection("users").document(userRecord.getUid()).set(user);
        future.get();

        return userRecord.getUid();
    }

    public String loginUser(String email, String password) {
        try {
            // Retrieve user by email
            UserRecord userRecord = firebaseAuth.getUserByEmail(email);

            // Return a sample ID token or response
            return "Sample ID Token";

        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return null;
        }
    }

}
