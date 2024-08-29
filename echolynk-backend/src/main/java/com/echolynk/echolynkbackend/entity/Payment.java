package com.echolynk.echolynkbackend.entity;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Payment {
    private String id;
    private int amount;
    private String userId;
    private Timestamp paymentDate;

    public Payment(){}


}
