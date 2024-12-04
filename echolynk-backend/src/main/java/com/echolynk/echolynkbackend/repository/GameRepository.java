package com.echolynk.echolynkbackend.repository;

import com.echolynk.echolynkbackend.dto.GameDto;
import com.echolynk.echolynkbackend.dto.QuestionDto;
import com.echolynk.echolynkbackend.entity.Game;
import com.echolynk.echolynkbackend.mappers.GameMapper;
import com.echolynk.echolynkbackend.mappers.GameMapper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

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

    public List<GameDto> getAllGames() {
        try {
            // Get all games from Firestore
            ApiFuture<QuerySnapshot> future = firestore.collection("games").get();
            return future.get().toObjects(GameDto.class);
        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions (e.g., log error)
            throw new RuntimeException("Error getting games from Firestore: " + e.getMessage(), e);
        }
    }

    public GameDto getGame(String id) {
        try {
            // Get game by ID from Firestore
            DocumentReference gameRef = firestore.collection("games").document(id);
            ApiFuture<DocumentSnapshot> future = gameRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                return document.toObject(GameDto.class);
            } else {
                throw new RuntimeException("Game not found with ID: " + id);
            }
        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions (e.g., log error)
            throw new RuntimeException("Error getting game from Firestore: " + e.getMessage(), e);
        }
    }

   

    public List<QuestionDto> getAllQuestions() {
        try {
            // Get all questions from Firestore
            ApiFuture<QuerySnapshot> future = firestore.collectionGroup("questions").get();
            return future.get().toObjects(QuestionDto.class);
        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions (e.g., log error)
            throw new RuntimeException("Error getting questions from Firestore: " + e.getMessage(), e);
        }
    }


    public void updateGame(String id, GameDto gameDto) {
        try {
            // Update game by ID in Firestore
            DocumentReference gameRef = firestore.collection("games").document(id);
            ApiFuture<WriteResult> future = gameRef.set(gameDto);
            future.get();
        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions (e.g., log error)
            throw new RuntimeException("Error updating game in Firestore: " + e.getMessage(), e);
        }
    }

    public void deleteGame(String id) {
        try {
            // Delete game by ID from Firestore
            DocumentReference gameRef = firestore.collection("games").document(id);
            ApiFuture<WriteResult> future = gameRef.delete();
            future.get();
        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions (e.g., log error)
            throw new RuntimeException("Error deleting game from Firestore: " + e.getMessage(), e);
        }
    }

    public List<QuestionDto> getQuestionsForGame(String gameId) {
        try {
            // Get all questions for a specific game
            ApiFuture<QuerySnapshot> future = firestore.collection("games").document(gameId).collection("questions").get();
            return future.get().toObjects(QuestionDto.class);
        } catch (InterruptedException | ExecutionException e) {
            // Handle exceptions (e.g., log error)
            throw new RuntimeException("Error getting questions from Firestore: " + e.getMessage(), e);
        }
    }


    public Map<GameDto, List<QuestionDto>> getAllGamesWithQuestions() {
        try {
            // Fetch all games
            List<GameDto> games = getAllGames();
            Map<GameDto, List<QuestionDto>> gamesWithQuestions = new HashMap<>();

            // Fetch questions for each game
            for (GameDto game : games) {
                List<QuestionDto> questions = getQuestionsForGame(game.getId());
                gamesWithQuestions.put(game, questions);
            }

            return gamesWithQuestions;
        } catch (Exception e) {
            // Handle exceptions (e.g., log error)
            throw new RuntimeException("Error getting games with questions from Firestore: " + e.getMessage(), e);
        }
    }
}
