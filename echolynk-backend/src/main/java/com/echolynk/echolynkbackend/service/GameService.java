package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.GameDto;
import com.echolynk.echolynkbackend.dto.QuestionDto;
import com.echolynk.echolynkbackend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public String createGame(GameDto gameDto) {
        // Save game details and get the game ID
        String gameId = gameRepository.saveGame(gameDto);

        // Save questions associated with the game
        for (QuestionDto question : gameDto.getQuestions()) {
            gameRepository.saveQuestion(gameId, question);
        }

        return gameId;
    }

    public List<GameDto> getAllGames() {
        return gameRepository.getAllGames();
    }

    public GameDto getGame(String id) {
        return gameRepository.getGame(id);
    }

    public List<QuestionDto> getQuestionsForGame(String id) {
        return gameRepository.getQuestionsForGame(id);
    }


    public void updateGame(String id, GameDto gameDto) {
        gameRepository.updateGame(id, gameDto);
    }

    public void deleteGame(String id) {
        gameRepository.deleteGame(id);
    }

    public List<QuestionDto> getAllQuestions() {
        try {
            return gameRepository.getAllQuestions();
        } catch (Exception e) {
            throw new RuntimeException("Error getting questions: " + e.getMessage(), e);
        }
    }

    public List<Map<String, Object>> getAllGamesWithQuestions() {
        List<GameDto> games = gameRepository.getAllGames();
        List<Map<String, Object>> gamesWithQuestions = new ArrayList<>();

        for (GameDto game : games) {
            List<QuestionDto> questions = gameRepository.getQuestionsForGame(game.getId());
            Map<String, Object> gameMap = new HashMap<>();
            gameMap.put("game", game);
            gameMap.put("questions", questions);
            gamesWithQuestions.add(gameMap);
        }

        return gamesWithQuestions;
    }

    public int getGameCount() {
        try {
            return gameRepository.getAllGames().size();
        } catch (Exception e) {
            throw new RuntimeException("Error getting game count: " + e.getMessage(), e);
        }
    }
}
