package com.echolynk.echolynkbackend.entity;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Payment {

    private int totalCost;
    private String userId;
    private Timestamp paymentDate;
    private int imageCount;
    private int suggestionCount;


    public Payment(){}


}
