package com.echolynk.echolynkbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogDto {
    private int id;
    private String title;
    private String content;
    private String author;
    private String date;

}
