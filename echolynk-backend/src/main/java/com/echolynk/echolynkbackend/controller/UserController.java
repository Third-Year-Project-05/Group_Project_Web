package com.echolynk.echolynkbackend.controller;

import com.echolynk.echolynkbackend.dto.UserDto;
import com.echolynk.echolynkbackend.service.UserService;

import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

	@GetMapping("/user/{id}")
	public ResponseEntity<UserDto> getUser(String id) throws FirebaseAuthException {
		UserDto user = userService.getUser(id);
		return ResponseEntity.ok(user);
	}

	@GetMapping("/user/{id}/blogs")
	public ResponseEntity<List<UserDto>> getUserBlogs(String id) throws FirebaseAuthException {
		List<UserDto> blogs = userService.getUserBlogs(id);
		return ResponseEntity.ok(blogs);
	}

	@PutMapping("/user/{id}")
	public ResponseEntity<UserDto> updateUser(String id, UserDto userDto) throws FirebaseAuthException {
		UserDto user = userService.updateUser(id, userDto);
		return ResponseEntity.ok(user);
	}

	@PutMapping("/user/{id}/blogs/{blogId}")
	public ResponseEntity<UserDto> updateUserBlog(String id, String blogId, UserDto userDto) throws FirebaseAuthException {
		UserDto user = userService.updateUserBlog(id, blogId, userDto);
		return ResponseEntity.ok(user);
	}

	@DeleteMapping("/user/{id}")
	public ResponseEntity<UserDto> deleteUser(String id) throws FirebaseAuthException {
		UserDto user = userService.deleteUser(id);
		return ResponseEntity.ok(user);
	}

	@DeleteMapping("/user/{id}/blogs/{blogId}")
	public ResponseEntity<UserDto> deleteUserBlog(String id, String blogId) throws FirebaseAuthException {
		UserDto user = userService.deleteUserBlog(id, blogId);
		return ResponseEntity.ok(user);
	}

	@GetMapping("/userCount")
	public ResponseEntity<Long> getUserCount() {
		Long count = userService.getUserCount();
		return ResponseEntity.ok(count);
	}
}
