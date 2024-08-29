package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.service.PayHereService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PayHereService payHereService;

    public PaymentController(PayHereService payHereService) {
        this.payHereService = payHereService;
    }

    @PostMapping("/generate-hash")
    public String generateHash(
            @RequestParam("orderId") String orderId,
            @RequestParam("amount") BigDecimal amount,
            @RequestParam("currency") String currency) {

        String merchantId = "1227963";
        String merchantSecret = "MzIzNTk0MzUwNjI4MDE5OTMxNjMxMjYyOTgzMDE3MjYxODI0NTk1Nw==";
        // Format amount to two decimal places
        String formattedAmount = String.format("%.2f", amount);

        // Generate the inner MD5 hash of the merchant secret and convert to uppercase
        String innerHash = DigestUtils.md5Hex(merchantSecret).toUpperCase();

        // Concatenate all values as in the PHP code
        String dataToHash = merchantId + orderId + formattedAmount + currency + innerHash;

        // Generate the final MD5 hash and convert to uppercase
        String finalHash = DigestUtils.md5Hex(dataToHash).toUpperCase();

//        System.out.println(finalHash);

        return finalHash;
    }

    private final String merchantId = "1227963";
    private final String MERCHANT_SECRET = "MzIzNTk0MzUwNjI4MDE5OTMxNjMxMjYyOTgzMDE3MjYxODI0NTk1Nw==";

    @PostMapping("/notify")
    public ResponseEntity<String> paymentNotification(@RequestParam Map<String, String> params) {
        String orderId = params.get("order_id");
        String payhereAmount = params.get("payhere_amount");
        String payhereCurrency = params.get("payhere_currency");
        String statusCode = params.get("status_code");
        String md5sig = params.get("md5sig");

        try {
            String localMd5sig = generateMd5Signature(merchantId, orderId, payhereAmount, payhereCurrency, statusCode);

            if (localMd5sig.equals(md5sig.toUpperCase()) && "2".equals(statusCode)) {
                // TODO: Update your database as payment success
                payHereService.createPayment(params);
                
                return ResponseEntity.ok("Payment success");
            } else {
                return ResponseEntity.badRequest().body("Payment verification failed");
            }
        } catch (NoSuchAlgorithmException e) {
            return ResponseEntity.status(500).body("Error processing payment notification");
        }
    }

    private String generateMd5Signature(String merchantId, String orderId, String payhereAmount, String payhereCurrency, String statusCode) throws NoSuchAlgorithmException {
        String combinedString = merchantId + orderId + payhereAmount + payhereCurrency + statusCode + md5(MERCHANT_SECRET);
        return md5(combinedString).toUpperCase();
    }

    private String md5(String input) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] messageDigest = md.digest(input.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : messageDigest) {
            String hex = Integer.toHexString(0xFF & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    @GetMapping("/return")
    public ResponseEntity<String> paymentReturn(@RequestParam Map<String, String> params) {
        // Handle return URL after successful payment
        return ResponseEntity.ok("Payment successful");
    }

    @GetMapping("/cancel")
    public ResponseEntity<String> paymentCancel(@RequestParam Map<String, String> params) {
        // Handle cancel URL if the payment is canceled
        return ResponseEntity.ok("Payment canceled");
    }
}
