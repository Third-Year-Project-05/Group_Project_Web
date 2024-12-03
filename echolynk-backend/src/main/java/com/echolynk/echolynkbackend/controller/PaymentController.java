package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.PaymentDto;
import com.echolynk.echolynkbackend.entity.Payment;
import com.echolynk.echolynkbackend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<PaymentDto>> getAllPayments() {
        List<PaymentDto> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    // get monthly revenue
    @GetMapping("/getMonthlyRevenue")
    public ResponseEntity<Map<String, Double>> getAllPaymentsByMonth() {
        Map<String, Double> payments = paymentService.getMonthlyRevenue();
        return ResponseEntity.ok(payments);
    }

    @PostMapping("/notify")
    public ResponseEntity<String> paymentNotification(@RequestBody Map<String, String> params) {

        System.out.println(params);

        paymentService.createPayment(params);

        return ResponseEntity.ok("Payment success");

    }

}
