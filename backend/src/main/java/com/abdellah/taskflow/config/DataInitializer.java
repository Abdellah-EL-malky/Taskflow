package com.abdellah.taskflow.config;

import com.abdellah.taskflow.entity.User;
import com.abdellah.taskflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("demo@taskflow.com")) {
            userRepository.save(User.builder()
                .email("demo@taskflow.com")
                .password(passwordEncoder.encode("demo1234"))
                .name("Demo User")
                .role(User.Role.USER)
                .build());
            System.out.println("✅ Demo user created: demo@taskflow.com / demo1234");
        }
    }
}