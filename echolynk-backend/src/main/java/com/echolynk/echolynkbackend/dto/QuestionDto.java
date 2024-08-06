package com.echolynk.echolynkbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionDto {

    private String questionImage;
    private List<String> answers;
    private String correctAnswer;
    private int mark;
}
