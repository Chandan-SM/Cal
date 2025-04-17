package com.chandan.kalyndrApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KalyndrApplication {

    public static void main(String[] args) {
        // Load environment variables directly from the system (Render automatically injects them)
        String dbName = System.getenv("DB_NAME");
        String dbUsername = System.getenv("DB_USERNAME");
        String dbUserPassword = System.getenv("DB_USER_PASSWORD");
        String dbHost = System.getenv("DB_HOST");
        String dbPort = System.getenv("DB_PORT");

        // If any of the environment variables are missing, you can log or throw an error to catch issues early
        if (dbName == null || dbUsername == null || dbUserPassword == null || dbHost == null || dbPort == null) {
            System.err.println("Missing one or more environment variables");
            System.exit(1); // Stop the application if required environment variables are not set
        }
        
        // Set the environment variables to System properties
        System.setProperty("dbName", dbName);
        System.setProperty("dbUsername", dbUsername);
        System.setProperty("dbUserPassword", dbUserPassword);
        System.setProperty("dbHost", dbHost);
        System.setProperty("dbPort", dbPort);

        // Start the Spring Boot application
        SpringApplication.run(KalyndrApplication.class, args);
    }
}
