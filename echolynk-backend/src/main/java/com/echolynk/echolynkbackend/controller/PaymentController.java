package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.service.PayHereService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PayHereService payHereService;

    public PaymentController(PayHereService payHereService) {
        this.payHereService = payHereService;
    }

    @PostMapping("/notify")
    public ResponseEntity<String> paymentNotification(@RequestBody Map<String, String> params) {

        System.out.println(params);

        String paymentId = payHereService.createPayment(params);
        return new ResponseEntity<>(paymentId, HttpStatus.OK);

    }

}
