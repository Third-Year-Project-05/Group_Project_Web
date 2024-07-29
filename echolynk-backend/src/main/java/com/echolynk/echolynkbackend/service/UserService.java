package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.AuthResponse;
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

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserDetails loadUserByUsername(String email) {
        try {
            UserRecord userRecord = firebaseAuth.getUserByEmail(email);
            return new CustomUserDetails(userRecord);
        } catch (FirebaseAuthException e) {
            throw new RuntimeException("User not found", e);
        }
    }

    public String registerUser(UserDto userDto) throws FirebaseAuthException, ExecutionException, InterruptedException {
        if (userDto.getEmail() == null || userDto.getEmail().isEmpty() ||
                userDto.getPassword() == null || userDto.getPassword().isEmpty() ||
                userDto.getUserName() == null || userDto.getUserName().isEmpty()) {
            throw new IllegalArgumentException("Email, password, and userName are required.");
        }

        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(userDto.getEmail())
                .setPassword(passwordEncoder.encode(userDto.getPassword()))
                .setDisplayName(userDto.getUserName());

        UserRecord userRecord = firebaseAuth.createUser(request);

        Map<String, Object> user = new HashMap<>();
        user.put("userId", userRecord.getUid());
        user.put("email", userDto.getEmail());
        user.put("password", passwordEncoder.encode(userDto.getPassword()));
        user.put("userName", userDto.getUserName());
        user.put("role", userDto.getRole());
        user.put("phoneNumber", userDto.getPhoneNumber());
        user.put("timestamp", Instant.now().toString());

        ApiFuture<WriteResult> future = firestore.collection("users").document(userRecord.getUid()).set(user);
        future.get();

        return userRecord.getUid();
    }

    public AuthResponse loginUser(String email, String password) {
        try {
            // Fetch the user record from Firebase Authentication
            UserRecord userRecord = firebaseAuth.getUserByEmail(email);

            // Fetch the user details from Firestore
            Map<String, Object> userMap = firestore.collection("users").document(userRecord.getUid()).get().get().getData();

            if (userMap == null) {
                throw new RuntimeException("User not found");
            }

            // Retrieve the stored hashed password
            String encodedPassword = (String) userMap.get("password");

            if (encodedPassword == null) {
                throw new RuntimeException("Password not found for user");
            }

            // Compare the provided password with the stored hashed password
            if (passwordEncoder.matches(password, encodedPassword)) {
                // Retrieve user role
                String role = (String) userMap.get("role");
                if (role == null) {
                    throw new RuntimeException("User role not found");
                }

                // Generate and return a JWT token if the credentials are valid
                UserDetails userDetails = new CustomUserDetails(userRecord);
                String token = jwtUtil.generateToken(userDetails);

                return new AuthResponse(token, role);
            } else {
                throw new RuntimeException("Invalid password");
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            throw new RuntimeException("Error during login", e);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            throw new RuntimeException("Firebase Authentication error", e);
        }
    }

    public UserDto getOneUser() throws FirebaseAuthException {
        return userRepository.getOneUser();
    }
}
