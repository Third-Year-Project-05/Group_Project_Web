package com.echolynk.echolynkbackend.entity;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Game {
    private String id;
    private String gameName;
    private String gameDescription;
    private String gameLevel;
    private int rounds;
    private String gameImage;

    // Default constructor
    public Game() {}

    // Parameterized constructor
    public Game(String id, String gameName, String gameDescription, String gameLevel, int rounds, String gameImage) {
        this.id = id;
        this.gameName = gameName;
        this.gameDescription = gameDescription;
        this.gameLevel = gameLevel;
        this.rounds = rounds;
        this.gameImage = gameImage;
    }
}
