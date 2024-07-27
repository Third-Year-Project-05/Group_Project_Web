package com.echolynk.echolynkbackend.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final FirebaseAuth firebaseAuth;

    public AuthService(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    public FirebaseToken verifyIdToken(String idToken) {
        try {
            return firebaseAuth.verifyIdToken(idToken);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return null;
        }
    }
}
