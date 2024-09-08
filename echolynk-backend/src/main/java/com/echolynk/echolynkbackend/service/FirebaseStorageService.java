package com.echolynk.echolynkbackend.service;

import com.google.cloud.storage.Blob;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@Service
public class FirebaseStorageService {

    private final StorageClient storageClient;

    public FirebaseStorageService(StorageClient storageClient) {
        this.storageClient = storageClient;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        // Get InputStream from the uploaded file
        InputStream fileInputStream = file.getInputStream();

        // Generate a unique file name
        String fileName = "blog_img/" + file.getOriginalFilename();

        // Upload the file to Firebase Storage
        Blob blob = storageClient.bucket().create(fileName, fileInputStream, file.getContentType());
        fileInputStream.close();
        Map<String, String> metadata = blob.getMetadata();
        String downloadToken = metadata.get("firebaseStorageDownloadTokens");

        // Return the download URL with the token
        return "https://firebasestorage.googleapis.com/v0/b/your-bucket-name/o/"
                + fileName + "?alt=media&token=" + downloadToken;
        // Return the file name or URL
//        return fileName;
    }
}
