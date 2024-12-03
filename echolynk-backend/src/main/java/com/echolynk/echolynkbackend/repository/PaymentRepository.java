package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.PaymentDto;
import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.entity.Payment;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import lombok.extern.flogger.Flogger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Repository
public class PaymentRepository {

    private static final Logger logger = LoggerFactory.getLogger(PaymentRepository.class);

    @Autowired
    private Firestore firestore;

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

    // get all payments from db
    public List<PaymentDto> getAllPayments() {
        CollectionReference paymentsCollection = firestore.collection("payments");
        try {
            ApiFuture<QuerySnapshot> query = paymentsCollection.get();
            QuerySnapshot querySnapshot = query.get();

            List<PaymentDto> paymentList = new ArrayList<>();
            if (querySnapshot != null && !querySnapshot.isEmpty()) {
                for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                    PaymentDto paymentDto = document.toObject(PaymentDto.class);
                    if (paymentDto != null) {
                        paymentList.add(paymentDto);
                    }
                }
            }
            return paymentList;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error fetching payments", e);
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error fetching payments", e);
        }
    }

    // get the sum of payments of each month
    public Map<String, Double> getMonthlyRevenue() {
        CollectionReference paymentsCollection = firestore.collection("payments");
        try {
            ApiFuture<QuerySnapshot> query = paymentsCollection.get();
            QuerySnapshot querySnapshot = query.get();

            Map<String, Double> monthlySums = new HashMap<>();
            if (querySnapshot != null && !querySnapshot.isEmpty()) {
                for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                    PaymentDto paymentDto = document.toObject(PaymentDto.class);
                    if (paymentDto != null) {
                        System.out.println(paymentDto.getUserId());
                        System.out.println(paymentDto.getPaymentDate());
                        System.out.println(paymentDto.getImageCount());
                        Timestamp paymentTimestamp = document.getTimestamp("paymentDate");
                        if (paymentTimestamp != null) {
                            LocalDate paymentDate = paymentTimestamp.toDate().toInstant()
                                    .atZone(ZoneId.systemDefault())
                                    .toLocalDate();

                            String month = paymentDate.format(DateTimeFormatter.ofPattern("yyyy-MMMM"));
                            monthlySums.put(month, monthlySums.getOrDefault(month, 0.0) + 5.00);
                            System.out.println(monthlySums.get(month));
                        }
                    }
                }
            }
            System.out.println(monthlySums);
            return monthlySums;
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Error fetching payments", e);
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error fetching payments", e);
        }
    }


}
