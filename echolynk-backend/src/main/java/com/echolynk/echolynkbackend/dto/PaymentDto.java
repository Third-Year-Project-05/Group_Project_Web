package com.echolynk.echolynkbackend.dto;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDto {
    private int totalCost;
    private String userId;
    private Timestamp paymentDate;
    private int imageCount;
    private int suggestionCount;
}
