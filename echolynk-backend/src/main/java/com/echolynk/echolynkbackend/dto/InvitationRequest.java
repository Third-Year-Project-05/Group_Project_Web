package com.echolynk.echolynkbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvitationRequest {
    private String email;
    private String roomId;

}

