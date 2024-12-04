package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.GameDto;
import com.echolynk.echolynkbackend.dto.QuestionDto;
import com.echolynk.echolynkbackend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    //get the questions
    @GetMapping("/getQuestions")
        public ResponseEntity<?> getAllQuestions() {
            try {
                List<QuestionDto> questions = gameService.getAllQuestions();
                return ResponseEntity.ok(questions);
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error getting questions: " + e.getMessage());
        }
    }

    @GetMapping("/with-questions")
    public ResponseEntity<?> getAllGamesWithQuestions() {
        try {
            List<Map<String, Object>> gamesWithQuestions = gameService.getAllGamesWithQuestions();
            return ResponseEntity.ok(gamesWithQuestions);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting games with questions: " + e.getMessage());
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

    @GetMapping("getquestions/{gameId}")
    public ResponseEntity<?> getQuestionsForGame(@PathVariable String gameId) {
        try {
            List<QuestionDto> questions = gameService.getQuestionsForGame(gameId); // Use gameId, not id
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting questions for game: " + e.getMessage());
        }
    }


    @GetMapping("/getGameCount")
    public ResponseEntity<?> getGameCount() {
        try {
            int gameCount = gameService.getGameCount();
            return ResponseEntity.ok(gameCount);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error getting game count: " + e.getMessage());
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
