# Multi-Database School Management System

This project demonstrates a school management system using both PostgreSQL and MongoDB databases running in Docker containers. It includes sample data and CRUD operation examples for both databases.

## Project Structure

```
.
├── docker-compose.yaml          # Docker services configuration
├── init-scripts/               # PostgreSQL initialization scripts
│   └── 01-init.sql            # Initial schema and data for PostgreSQL
├── mongo-init-scripts/         # MongoDB initialization scripts
│   └── init-mongo.js          # Initial data for MongoDB
├── postgres.md                # PostgreSQL CRUD examples
└── mongo.md                   # MongoDB CRUD examples
```

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone this repository
2. Start the containers:
   ```bash
   docker compose up -d
   ```
3. Verify both containers are running:
   ```bash
   docker ps
   ```

## Database Access

### PostgreSQL
- **Host**: localhost
- **Port**: 5432
- **Database**: school_db
- **Username**: teacher
- **Password**: password123

Connect using:
```bash
docker exec -it postgres-demo psql -U teacher -d school_db
```

### MongoDB
- **Host**: localhost
- **Port**: 27017
- **Database**: school_db_mongo
- **Username**: mongoadmin
- **Password**: password123

Connect using:
```bash
docker exec -it mongo-demo mongosh -u mongoadmin -p password123 --authenticationDatabase admin school_db_mongo
```

## Data Model

Both databases contain the following collections/tables:
- students
- courses
- enrollments

### Sample Data
- 5 students
- 5 courses
- 10 enrollments

## Usage Examples

- See `postgres.md` for PostgreSQL CRUD operation examples
- See `mongo.md` for MongoDB CRUD operation examples

## Stopping the Services

To stop and remove the containers:
```bash
docker compose down
```

To stop and remove the containers along with the volumes (this will delete all data):
```bash
docker compose down -v
```
