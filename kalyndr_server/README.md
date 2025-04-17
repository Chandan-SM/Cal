# Kalyndr - Backend

Java Spring Boot backend for the Kalyndr calendar application.

## Features

- **RESTful API** - Well-structured endpoints for calendar operations
- **Data Persistence** - Robust data storage and retrieval
- **Authentication** - Secure user authentication and authorization
- **Event Management** - Complete CRUD operations for calendar events
- **User Settings** - Personalized calendar configurations

## Directory Structure

- `/src/main/java/com/chandan/kalyndrApplication` - Main application code
  - `/config` - Application configuration
  - `/controller` - API endpoints
  - `/entity` - Data models
  - `/repository` - Data access layer
  - `KalyndrApplication.java` - Application entry point
- `/src/main/resources` - Configuration files and static resources
- `/src/test` - Test classes

## Development Setup

### Prerequisites
- JDK 11 or higher
- Maven
- Database (MySQL, PostgreSQL, etc.)

### Installation

```bash
# Build with Maven
mvn clean install
```

### Environment Variables

Configure the following variables in `.env` or application properties:

```
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/kalyndr_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=password

# Application Configuration
SERVER_PORT=8080

# Add any other required environment variables
```

### Running the Application

```bash
# Run with Maven
mvn spring-boot:run

# Or run the JAR directly
java -jar target/kalyndrApplication.jar
```

The API will be available at `http://localhost:8080`.

## API Endpoints

### Events
- `GET /api/events` - Retrieve all events
- `GET /api/events/{id}` - Retrieve a specific event
- `POST /api/events` - Create a new event
- `PUT /api/events/{id}` - Update an existing event
- `DELETE /api/events/{id}` - Delete an event

### Users
- `GET /api/users` - Retrieve all users
- `GET /api/users/{id}` - Retrieve a specific user
- `POST /api/users` - Create a new user

## Testing

```bash
# Run tests
mvn test
```

## Building for Production

```bash
# Package the application
mvn clean package

# The JAR file will be created in the target directory
```

## Contributing

Please follow standard Java coding conventions and include appropriate tests for new features.

## Database Schema

The application uses the following core entities:

- **User** - Stores user information
- **Event** - Stores calendar events
- **EventParticipant** - Maps users to events
- **UserSettings** - Stores user preferences