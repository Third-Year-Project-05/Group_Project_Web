package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.GameDto;
import com.echolynk.echolynkbackend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/getGame")
    public ResponseEntity<?> getAllGames() {
        try {
            List<GameDto> games = (List<GameDto>) gameService.getAllGames();
            return ResponseEntity.ok(games);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting games: " + e.getMessage());
        }
    }

    @GetMapping("/getGame/{id}")
    public ResponseEntity<?> getGame(@PathVariable String id) {
        try {
            GameDto game = gameService.getGame(id);
            return ResponseEntity.ok(game);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting game: " + e.getMessage());
        }
    }

    @PutMapping("/updateGame/{id}")
    public ResponseEntity<?> updateGame(@PathVariable String id, @RequestBody GameDto gameDto) {
        try {
            gameService.updateGame(id, gameDto);
            return ResponseEntity.ok("Game updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating game: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteGame/{id}")
    public ResponseEntity<?> deleteGame(@PathVariable String id) {
        try {
            gameService.deleteGame(id);
            return ResponseEntity.ok("Game deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting game: " + e.getMessage());
        }
    }

}
