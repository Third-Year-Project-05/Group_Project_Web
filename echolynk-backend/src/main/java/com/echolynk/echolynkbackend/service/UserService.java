package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.AuthResponse;
import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.repository.UserRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.json.JSONObject;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private FirebaseAuth firebaseAuth;

    @Autowired
    private Firestore firestore;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RestTemplate restTemplate;

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
                .setPassword(userDto.getPassword())
                .setDisplayName(userDto.getUserName());

        UserRecord userRecord = firebaseAuth.createUser(request);

        Map<String, Object> user = new HashMap<>();
        user.put("userId", userRecord.getUid());
        user.put("email", userDto.getEmail());
        user.put("userName", userDto.getUserName());
        user.put("role", userDto.getRole());
        user.put("phoneNumber", userDto.getPhoneNumber());
        user.put("timestamp", Timestamp.now());

        ApiFuture<WriteResult> future = firestore.collection("users").document(userRecord.getUid()).set(user);
        future.get();

        return userRecord.getUid();
    }

    public AuthResponse loginUser(String email, String password) {
        try {
            // Fetch the user record from Firebase Authentication
            UserRecord firebaseUserRecord = firebaseAuth.getUserByEmail(email);

            // Call Firebase Auth REST API to verify the password
            String verifyPasswordUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEdwe8Wqep4SDmTDe2Ld3t75X8Y_rpnP0";
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Create the request body
            JSONObject requestBody = new JSONObject();
            requestBody.put("email", email);
            requestBody.put("password", password);
            requestBody.put("returnSecureToken", true);

            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody.toString(), headers);
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(verifyPasswordUrl, requestEntity, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                // Fetch the user details from Firestore
                Map<String, Object> userMap = firestore.collection("users").document(firebaseUserRecord.getUid()).get().get().getData();

                if (userMap == null) {
                    throw new RuntimeException("User not found");
                }

                // Retrieve user role
                String role = (String) userMap.get("role");
                if (role == null) {
                    throw new RuntimeException("User role not found");
                }

                // Retrieve user ID
                String userID = (String) userMap.get("userId");
                if (userID == null) {
                    throw new RuntimeException("User ID not found");
                }

                // Generate and return a JWT token if the credentials are valid
                UserDetails userDetails = new CustomUserDetails(firebaseUserRecord);
                String token = jwtUtil.generateToken(userDetails);

                return new AuthResponse(token, role, userID);

            } else {
                throw new RuntimeException("Invalid email or password");
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            throw new RuntimeException("Error during login", e);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            throw new RuntimeException("Firebase Authentication error", e);
        }
    }

    public AuthResponse googleLogin(String token) {
        String url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token;
        ResponseEntity<Map<String, Object>> response = restTemplate.getForEntity(url, (Class<Map<String, Object>>) (Object) Map.class);
        Map<String, Object> body = response.getBody();

        if (body == null || body.get("email") == null) {
            throw new RuntimeException("Invalid Google token");
        }

        String email = (String) body.get("email");
        return handleOAuth2Login(email);
    }

    public AuthResponse facebookLogin(String token) {
        String url = "https://graph.facebook.com/me?access_token=" + token + "&fields=id,name,email";
        ResponseEntity<Map<String, Object>> response = restTemplate.getForEntity(url, (Class<Map<String, Object>>) (Object) Map.class);
        Map<String, Object> body = response.getBody();

        if (body == null || body.get("email") == null) {
            throw new RuntimeException("Invalid Facebook token");
        }

        String email = (String) body.get("email");
        return handleOAuth2Login(email);
    }

    private AuthResponse handleOAuth2Login(String email) {
        try {
            // Check if user exists in Firebase Authentication
            UserRecord userRecord;
            try {
                userRecord = firebaseAuth.getUserByEmail(email);
            } catch (FirebaseAuthException e) {
                // Register new user if not found
                UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
                        .setEmail(email)
                        .setPassword(generateRandomPassword());
                userRecord = firebaseAuth.createUser(createRequest);
            }

            // Fetch or save user details in Firestore
            Map<String, Object> userMap = firestore.collection("users").document(userRecord.getUid()).get().get().getData();
            if (userMap == null) {
                userMap = new HashMap<>();
                userMap.put("email", email);
                userMap.put("role", "Deaf");
                userMap.put("timestamp", Timestamp.now());
                firestore.collection("users").document(userRecord.getUid()).set(userMap).get();
            }

            // Generate JWT token
            UserDetails userDetails = new CustomUserDetails(userRecord);
            String token = jwtUtil.generateToken(userDetails);
            String role = (String) userMap.get("role");

            return new AuthResponse(token, role,userRecord.getUid());
        } catch (FirebaseAuthException | ExecutionException | InterruptedException e) {
            throw new RuntimeException("OAuth2 Login error", e);
        }
    }

    private String generateRandomPassword() {
        // Generate a random password for OAuth2 users
        return UUID.randomUUID().toString().substring(0, 12);
    }

    public List<UserDto> getAllUsers() throws FirebaseAuthException {
        return userRepository.getAllUsers();
    }

    public void integratePremiumAccount(String userId, Timestamp premiumExpirationDate) {
        userRepository.updatePremiumStatus(userId, true, premiumExpirationDate);
    }

    public UserDto getUser(String id) {
        try {
            return userRepository.getUser(id);
        } catch (Exception e) {
            throw new RuntimeException("User not found", e);
        }
    }

    public List<UserDto> getUserBlogs(String id) {
        return userRepository.getUserBlogs(id);
    }

    public UserDto updateUser(String id, UserDto userDto) {
        return userRepository.updateUser(id, userDto);
    }

    public UserDto updateUserBlog(String id, String blogId, UserDto userDto) {
        return userRepository.updateUserBlog(id, blogId, userDto);
    }

    public UserDto deleteUser(String id) {
        return userRepository.deleteUser(id);
    }

    public UserDto deleteUserBlog(String id, String blogId) {
        return userRepository.deleteUserBlog(id, blogId);
    }

    public Long getUserCount() {
        return userRepository.getUserCount();
    }

}
