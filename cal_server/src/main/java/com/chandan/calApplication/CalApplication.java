package com.chandan.calApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class CalApplication {

    public static void main(String[] args) {
        // Load environment variables from .env file
        Dotenv dotenv = Dotenv.load();
        
        // Set the environment variables to System properties
        System.setProperty("dbName", dotenv.get("DB_NAME"));
        System.setProperty("dbUsername", dotenv.get("DB_USERNAME"));
        System.setProperty("dbUserPassword", dotenv.get("DB_USER_PASSWORD"));
        System.setProperty("dbHost", dotenv.get("DB_HOST"));
        System.setProperty("dbPort", dotenv.get("DB_PORT"));

        // Start the Spring Boot application
        SpringApplication.run(CalApplication.class, args);
    }
}
