package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.repository.UserRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.ListUsersPage;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
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
        user.put("UserName", userDto.getUserName());
        user.put("role", userDto.getRole());
        user.put("phoneNumber", userDto.getPhoneNumber());
        user.put("timestamp", Instant.now().toString());

        ApiFuture<WriteResult> future = firestore.collection("users").document(userRecord.getUid()).set(user);
        future.get();

        return userRecord.getUid();
    }

    public String loginUser(String email, String password) {
        // Firebase Authentication SDK for Java does not directly support login with email and password
        // Authentication is typically handled client-side and ID tokens are verified server-side

        // To authenticate users, use Firebase Authentication SDK client-side and send the ID token to the backend
        // This example assumes you will implement token verification based on the client-side implementation

        // Placeholder for actual login implementation
        try {
            // Retrieve user by email
            UserRecord userRecord = firebaseAuth.getUserByEmail(email);

            // Assuming you handle authentication client-side and send an ID token for verification here

            // Return a sample ID token or response
            return "Sample ID Token"; // Replace with actual token response or other authentication mechanism

        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return null;
        }
    }

    public ArrayList<UserDto> getAllUsers() throws FirebaseAuthException {
        ListUsersPage page = firebaseAuth.listUsers(null);
        ArrayList<UserDto> users = new ArrayList<>();
        for (UserRecord user : page.getValues()) {
            UserDto userDto = new UserDto();
            userDto.setUserId(user.getUid());
            userDto.setEmail(user.getEmail());  
            userDto.setUserName(user.getDisplayName());
            userDto.setRole(user.getCustomClaims().get("role").toString());
            userDto.setPhoneNumber(user.getPhoneNumber());
            users.add(userDto);
        }
        return users;
    }
}
