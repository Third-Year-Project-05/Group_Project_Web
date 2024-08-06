package com.echolynk.echolynkbackend.mappers;

import com.echolynk.echolynkbackend.dto.BlogDto;
import com.echolynk.echolynkbackend.entity.Blog;
import com.google.cloud.Timestamp;

public class BlogMapper {

    public static Blog dtoToEntity(BlogDto dto) {
        Blog entity = new Blog();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setAuthor(dto.getAuthor());
        entity.setContent(dto.getContent());
        entity.setTimestamp(dto.getTimestamp()); // Directly set the Timestamp object
        return entity;
    }

    public static BlogDto entityToDto(Blog entity) {
        BlogDto dto = new BlogDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setAuthor(entity.getAuthor());
        dto.setContent(entity.getContent());
        dto.setTimestamp(entity.getTimestamp()); // Directly set the Timestamp object
        return dto;
    }
}
