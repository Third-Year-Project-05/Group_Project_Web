package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Map;

@Service
public class PayHereService {

    @Autowired
    private PaymentRepository paymentRepository;

    public void createPayment(Map<String, String> paymentDetails) {
        paymentRepository.createPayment(paymentDetails);

    }
}

