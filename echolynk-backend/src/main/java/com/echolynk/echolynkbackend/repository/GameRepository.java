package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.GameDto;
import com.echolynk.echolynkbackend.dto.QuestionDto;
import com.echolynk.echolynkbackend.entity.Game;
import com.echolynk.echolynkbackend.mapper.GameMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class GameRepository {

    @Autowired
    private Firestore firestore;

    public String saveGame(GameDto gameDto) {
        // Generate a unique ID for the game
        String gameId = UUID.randomUUID().toString();
        gameDto.setId(gameId);

        // Map GameDto to Game entity
        Game game = GameMapper.dtoToEntity(gameDto);

        DocumentReference gameRef = firestore.collection("games").document(gameId);

        // Save the game to Firestore
        ApiFuture<WriteResult> result = gameRef.set(game);
        return gameId;
    }

    public void saveQuestion(String gameId, QuestionDto questionDto) {
        CollectionReference questionsRef = firestore.collection("games").document(gameId).collection("questions");

        String questionId = UUID.randomUUID().toString();
        DocumentReference questionRef = questionsRef.document(questionId);

        questionRef.set(questionDto);
    }
}
