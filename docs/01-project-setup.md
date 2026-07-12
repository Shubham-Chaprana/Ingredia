# Project Setup

## Objective

The goal of this project is to build a production-style AI recipe assistant using a React frontend and a Django REST backend.

Instead of directly calling an AI model from the frontend, all requests are routed through the backend. This keeps API keys secure and allows features like authentication, chat history, and rate limiting to be implemented later.

---

## Tech Stack

### Frontend

- React
- Vite
- Fetch API

### Backend

- Django
- Django REST Framework
- Google Gemini API
- Python

---

## Project Structure

```text
claude-chef/
│
├── frontend/
│
├── backend/
│
├── docs/
│
├── .gitignore
│
└── README.md
```

---

## Why a Monorepo?

Instead of keeping the frontend and backend in separate repositories, both are maintained inside a single repository.

Advantages:

- Easier version control
- Easier deployment
- Frontend and backend evolve together
- Simpler project organization

---

## Why Separate Frontend and Backend?

The frontend is responsible for the user interface.

The backend is responsible for:

- Authentication
- Business logic
- Database operations
- AI communication
- Security

This architecture keeps sensitive information (such as API keys) off the client.

---

## Development Workflow

Frontend:

```bash
npm run dev
```

Backend:

```bash
python manage.py runserver
```

Both servers run independently and communicate through REST APIs.