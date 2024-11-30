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

    public String createPayment(Map<String, String> params) {
        System.out.println(params);
        Payment payment = new Payment();
        String paymentId = UUID.randomUUID().toString();
        payment.setId(paymentId);
        payment.setUserId(params.get("userId"));
//        payment.setAmount(Integer.parseInt(params.get("payhere_amount")));
        payment.setPaymentDate(Timestamp.now());

        DocumentReference paymentRef = firestore.collection("payments").document(paymentId);

        ApiFuture<WriteResult> result = paymentRef.set(payment);

        try {
            result.get();
        } catch (Exception e) {
            throw new RuntimeException("Error saving payment to Firestore: " + e.getMessage(), e);
        }

        return paymentId;
    }
}
