package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.entity.User;
import com.echolynk.echolynkbackend.repository.UserRepository;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private FirebaseAuth firebaseAuth;

    @Autowired
    private Firestore firestore;

    @Autowired
    private UserRepository userRepository;

    public List<UserDto> getUserActivities(String startDate, String endDate) {
        return userRepository.findByDateBetween(startDate, endDate);
    }

}
