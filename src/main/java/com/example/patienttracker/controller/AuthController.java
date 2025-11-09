package com.example.patienttracker.controller;

import com.example.patienttracker.model.User;
import com.example.patienttracker.model.LoginRequest;
import com.example.patienttracker.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🟢 CREATE ACCOUNT
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        // Check if username or email already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already taken ❌");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use ❌");
        }

        // Save new user
        userRepository.save(user);
        return ResponseEntity.ok("Account created successfully ✅");
    }

    // 🟢 LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {

        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found ❌");
        }

        User user = userOpt.get();

        // Check password
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password ❌");
        }

        return ResponseEntity.ok("Login successful ✅");
    }
}
