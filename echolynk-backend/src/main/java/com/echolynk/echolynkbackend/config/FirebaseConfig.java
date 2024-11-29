package com.echolynk.echolynkbackend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.cdimascio.dotenv.Dotenv;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    Dotenv dotenv = Dotenv.configure().load();
    String storageBucket = dotenv.get("FIREBASE_STORAGE_BUCKET");

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("src/main/resources/firebase-service-account.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket(storageBucket)
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        return FirebaseApp.getInstance();
    }

    @Bean
    public Firestore firestore() throws IOException {
        return FirestoreClient.getFirestore(firebaseApp());
    }

    @Bean
    public FirebaseAuth firebaseAuth() throws IOException {
        // Ensure FirebaseApp is initialized before creating FirebaseAuth instance
        if (FirebaseApp.getApps().isEmpty()) {
            firebaseApp();
        }
        return FirebaseAuth.getInstance();
    }

    @Bean
    public StorageClient storageClient() throws IOException {
        // Return the initialized StorageClient instance
        return StorageClient.getInstance(firebaseApp());
    }
}
