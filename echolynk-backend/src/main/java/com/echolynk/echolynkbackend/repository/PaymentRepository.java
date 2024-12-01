package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.entity.Payment;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Repository
public class PaymentRepository {

    @Autowired
    private Firestore firestore;

    @Autowired
    private PaymentRepository paymentRepository;

    public void createPayment(Map<String, String> params) {
        System.out.println(params);
        Payment payment = new Payment();
        payment.setUserId(params.get("userId"));
        payment.setImageCount(5);
        payment.setSuggestionCount(100);
        payment.setTotalCost(5);
        payment.setPaymentDate(Timestamp.now());

        DocumentReference paymentRef = firestore.collection("payments").document();

        ApiFuture<WriteResult> result = paymentRef.set(payment);

        try {
            result.get();
        } catch (Exception e) {
            throw new RuntimeException("Error saving payment to Firestore: " + e.getMessage(), e);
        }
    }
}
