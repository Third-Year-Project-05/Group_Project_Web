package com.echolynk.echolynkbackend.mappers;

import com.echolynk.echolynkbackend.dto.GameDto;
import com.echolynk.echolynkbackend.entity.Game;

public class GameMapper {

    public static Game dtoToEntity(GameDto dto) {
        Game entity = new Game();
        entity.setId(dto.getId());
        entity.setGameName(dto.getGameName());
        entity.setGameDescription(dto.getGameDescription());
        entity.setGameLevel(dto.getGameLevel());
        entity.setRounds(dto.getRounds());
        entity.setGameImage(dto.getGameImage());
        return entity;
    }

    public static GameDto entityToDto(Game entity) {
        GameDto dto = new GameDto();
        dto.setId(entity.getId());
        dto.setGameName(entity.getGameName());
        dto.setGameDescription(entity.getGameDescription());
        dto.setGameLevel(entity.getGameLevel());
        dto.setRounds(entity.getRounds());
        dto.setGameImage(entity.getGameImage());
        return dto;
    }
}
