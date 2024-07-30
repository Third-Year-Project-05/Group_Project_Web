package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.service.UserService;

import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/users")
	public ResponseEntity<List<UserDto>> getAllUsers() throws FirebaseAuthException {
		 List<UserDto> users = userService.getAllUsers();
		 return ResponseEntity.ok(users);
	}
}
