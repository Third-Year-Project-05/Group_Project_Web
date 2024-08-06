package com.echolynk.echolynkbackend.service;

import com.echolynk.echolynkbackend.dto.GameDto;
import com.echolynk.echolynkbackend.dto.QuestionDto;
import com.echolynk.echolynkbackend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
