package com.echolynk.echolynkbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GameDto {

    private String id;
    private String gameName;
    private String gameDescription;
    private String gameLevel;
    private int rounds;
    private String gameImage;
    private List<QuestionDto> questions;
}
