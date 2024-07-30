package com.echolynk.echolynkbackend.mappers;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.entity.User;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public interface UserMapper {

    static User toEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getUserId());
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setRole(userDto.getRole());
        user.setTimestamp(userDto.getTimestamp());  // Directly set as String
        return user;
    }

    static UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getId());
        userDto.setUserName(user.getUserName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setRole(user.getRole());
        userDto.setTimestamp(user.getTimestamp());  // Directly set as String
        return userDto;
    }
}
