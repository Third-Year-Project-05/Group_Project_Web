package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.PaymentDto;
import com.echolynk.echolynkbackend.entity.Payment;
import com.echolynk.echolynkbackend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public void createPayment(Map<String, String> paymentDetails) {
        paymentRepository.createPayment(paymentDetails);

    }

    public List<PaymentDto> getAllPayments() {
        return paymentRepository.getAllPayments();
    }

    // get monthly revenue
    public Map<String, Double> getMonthlyRevenue(){
        return paymentRepository.getMonthlyRevenue();
    }
}

