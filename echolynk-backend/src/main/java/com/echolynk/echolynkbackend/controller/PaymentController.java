package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.service.PayHereService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private final PayHereService payHereService;

    public PaymentController(PayHereService payHereService) {
        this.payHereService = payHereService;
    }


    @PostMapping("/notify")
    public ResponseEntity<String> paymentNotification(@RequestBody Map<String, String> params) {

        System.out.println(params);

        payHereService.createPayment(params);

        return ResponseEntity.ok("Payment success");

    }

}
