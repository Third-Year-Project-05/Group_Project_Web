package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.GameDto;
import com.echolynk.echolynkbackend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/game")
    public ResponseEntity<?> createGame(@RequestBody GameDto gameDto) {
        try {
            String gameId = gameService.createGame(gameDto);
            return ResponseEntity.ok("Game created with ID: " + gameId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating game: " + e.getMessage());
        }
    }
}
