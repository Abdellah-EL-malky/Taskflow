# TaskFlow — Task Management API

A full-stack task management application built with **Spring Boot** and **React**.

## Tech Stack

**Backend:** Java 17 · Spring Boot 3 · Spring Security · JWT · JPA / Hibernate · PostgreSQL  
**Frontend:** React 18 · Vite · Tailwind CSS · Axios · React Router

## Features

- JWT authentication (register / login)
- Full CRUD on tasks
- Filter by status (TODO / IN_PROGRESS / DONE) and priority (LOW / MEDIUM / HIGH)
- Role-based access (USER / ADMIN)
- Responsive dark UI

## Getting Started

### Backend

```bash
cd backend
mvn spring-boot:run
# Runs on http://localhost:8080
# H2 console: http://localhost:8080/h2-console
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register |
| POST | /api/auth/login | No | Login |
| GET | /api/tasks | Yes | Get tasks (filter: ?status=TODO&priority=HIGH) |
| POST | /api/tasks | Yes | Create task |
| PUT | /api/tasks/:id | Yes | Update task |
| DELETE | /api/tasks/:id | Yes | Delete task |


