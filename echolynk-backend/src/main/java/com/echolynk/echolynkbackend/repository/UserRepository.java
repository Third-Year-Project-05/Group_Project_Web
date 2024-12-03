package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
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

    public User getUserByEmail(String email) {
        try {
            ApiFuture<QuerySnapshot> query = firestore.collection("users").whereEqualTo("email", email).get();
            QuerySnapshot querySnapshot = query.get();

//            if (querySnapshot.isEmpty()) {
//                return Optional.empty();
//            }

            QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
            return document.toObject(User.class);
//            return Optional.ofNullable(user);
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
            System.out.println(userList);
            return userList;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error retrieving users from Firestore", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status
            throw new RuntimeException("Error retrieving users from Firestore", e);
        }
    }

    public UserDto getUser(String id) {
        try {
            ApiFuture<QuerySnapshot> query = firestore.collection("users").whereEqualTo("userId", id).get();
            QuerySnapshot querySnapshot = query.get();

            if (querySnapshot.isEmpty()) {
                throw new RuntimeException("User not found with ID: " + id);
            }

            QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
            return document.toObject(UserDto.class);
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error retrieving user from Firestore", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status
            throw new RuntimeException("Error retrieving user from Firestore", e);
        }
    }



    public List<UserDto> getUserBlogs(String id) {
        try {
            ApiFuture<QuerySnapshot> query = firestore.collection("blogs").whereEqualTo("userId", id).get();
            QuerySnapshot querySnapshot = query.get();

            List<UserDto> blogList = new ArrayList<>();
            if (querySnapshot != null && !querySnapshot.isEmpty()) {
                for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                    UserDto blogDto = document.toObject(UserDto.class);
                    if (blogDto != null) {
                        blogList.add(blogDto);
                    }
                }
            }
            return blogList;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error retrieving user blogs from Firestore", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status
            throw new RuntimeException("Error retrieving user blogs from Firestore", e);
        }
    }

    public UserDto updateUser(String id, UserDto userDto) {
        try {
            firestore.collection("users").document(id).set(userDto).get();
            return userDto;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error updating user in Firestore", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status
            throw new RuntimeException("Error updating user in Firestore", e);
        }
    }


    public UserDto updateUserBlog(String id, String blogId, UserDto userDto) {
        try {
            firestore.collection("blogs").document(blogId).set(userDto).get();
            return userDto;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error updating user blog in Firestore", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status
            throw new RuntimeException("Error updating user blog in Firestore", e);
        }
    }

    public UserDto deleteUser(String id) {
        try {
            ApiFuture<QuerySnapshot> query = firestore.collection("users").whereEqualTo("id", id).get();
            QuerySnapshot querySnapshot = query.get();

            if (querySnapshot.isEmpty()) {
                throw new RuntimeException("User not found with ID: " + id);
            }

            QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
            UserDto userDto = document.toObject(UserDto.class);
            document.getReference().delete().get();
            return userDto;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error deleting user from Firestore", e);
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error deleting user from Firestore", e);
        }
    }

    public UserDto deleteUserBlog(String id, String blogId) {
        try {
            ApiFuture<QuerySnapshot> query = firestore.collection("blogs").whereEqualTo("id", blogId).get();
            QuerySnapshot querySnapshot = query.get();

            if (querySnapshot.isEmpty()) {
                throw new RuntimeException("Blog not found with ID: " + blogId);
            }

            QueryDocumentSnapshot document = querySnapshot.getDocuments().get(0);
            UserDto blogDto = document.toObject(UserDto.class);
            document.getReference().delete().get();
            return blogDto;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error deleting user blog from Firestore", e);
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error deleting user blog from Firestore", e);
        }
    }

    public Long getUserCount() {
        try {
            // Get all documents from the "users" collection
            ApiFuture<QuerySnapshot> query = firestore.collection("users").get();
            QuerySnapshot querySnapshot = query.get();

            // Return the size of the query result as the user count
            return (long) querySnapshot.size();
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error retrieving user count from Firestore", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status
            throw new RuntimeException("Error retrieving user count from Firestore", e);
        }
    }

    public List<UserDto> findByDateBetween(String from, String to) {
        CollectionReference usersCollection = firestore.collection("users");

        LocalDate fromDate;
        LocalDate toDate;

        if(from.equals("new")){
            fromDate = LocalDate.now().withDayOfMonth(1);
        }else{
            fromDate = LocalDate.parse(from);
        }

        if( to.equals("today")){
            toDate = LocalDate.now();
        }else{
            toDate = LocalDate.parse(to);
        }
        System.out.println(toDate);
        System.out.println(fromDate);

        Timestamp fromTimestamp = Timestamp.ofTimeSecondsAndNanos(fromDate.atStartOfDay(ZoneId.systemDefault()).toEpochSecond(), 0);
        Timestamp toTimestamp = Timestamp.ofTimeSecondsAndNanos(toDate.atTime(LocalTime.MAX).atZone(ZoneId.systemDefault()).toEpochSecond(), 0);

        try {
            // Apply the date range filter in the Firestore query
            Query query = usersCollection
                    .whereGreaterThanOrEqualTo("timestamp", fromTimestamp)
                    .whereLessThanOrEqualTo("timestamp", toTimestamp);

            System.out.println(fromTimestamp);
            logger.info(String.valueOf(fromTimestamp));

            ApiFuture<QuerySnapshot> querySnapshotFuture = query.get();
            QuerySnapshot querySnapshot = querySnapshotFuture.get();

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

    public void updatePremiumStatus(String userId, boolean isPremium) {
        DocumentReference userRef = firestore.collection("users").document(userId);

        ApiFuture<WriteResult> future = userRef.update(
                "isPremium", isPremium
        );

        System.out.println(userRef);

        try {
            future.get();
        } catch (Exception e) {
            throw new RuntimeException("Error updating premium status for user: " + userId, e);
        }
    }

    // get new user count monthly
    public Map<String, Long> getUsersCountByMonth() {
        CollectionReference usersCollection = firestore.collection("users");

        try {
            // Fetch all user documents from Firestore
            ApiFuture<QuerySnapshot> query = usersCollection.get();
            QuerySnapshot querySnapshot = query.get();

            // Map to store the count of users for each month
            Map<String, Long> usersCountByMonth = new HashMap<>();

            if (querySnapshot != null && !querySnapshot.isEmpty()) {
                // Iterate through each user document
                for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                    Timestamp timestamp = document.getTimestamp("timestamp");
                    if (timestamp != null) {
                        // Convert Firestore Timestamp to LocalDate
                        LocalDate registrationDate = timestamp.toDate()
                                .toInstant()
                                .atZone(ZoneId.systemDefault())
                                .toLocalDate();

                        // Get the month as a string (e.g., "January 2024")
                        String month = registrationDate.format(DateTimeFormatter.ofPattern("MMMM yyyy"));

                        // Increment the count for the corresponding month
                        usersCountByMonth.put(month, usersCountByMonth.getOrDefault(month, 0L) + 1);
                    }
                }
            }

            return usersCountByMonth;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error retrieving users from Firestore", e);
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error retrieving users from Firestore", e);
        }
    }


}

