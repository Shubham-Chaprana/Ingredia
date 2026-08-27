# Ingredia

AI-powered recipe generation from the ingredients you already have.

## Live Demo

**[Try Ingredia](https://ingredia-frontend.onrender.com)**

## About

Ingredia helps users decide what to cook using the ingredients they already have.

Users can create an account, add ingredients, generate AI-powered recipes, save their recipes, revisit their recipe history, modify ingredients, and generate new recipes.

## Features

- User registration and login
- JWT-based authentication
- Add and remove ingredients
- AI-powered recipe generation using Google Gemini
- Personal recipe history
- View previously generated recipes
- Delete saved recipes
- Generate new recipes using modified ingredients
- API rate limiting
- Responsive and mobile-friendly interface
- PostgreSQL database
- Production deployment

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- Gunicorn

### Database

- PostgreSQL
- Neon

### AI

- Google Gemini API

### Deployment

- Render
- Neon PostgreSQL

## Architecture

```text
React Frontend
      │
      │ REST API
      ▼
Django REST API
      │
      ├──────────────► Google Gemini API
      │
      ▼
PostgreSQL (Neon)
```

## Project Structure

```text
claude-chef/
│
├── backend/
│   ├── api/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── prompts.py
│   │   ├── services.py
│   │   ├── tests.py
│   │   ├── throttles.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── authentication/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── config/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── recipes/
│   │   ├── migrations/
│   │   │   └── 0001_initial.py
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── users/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   └── views.py
│   │
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js
│   │   │   ├── client.js
│   │   │   ├── recipe.js
│   │   │   └── tokenService.js
│   │   │
│   │   ├── auth/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── ClaudeRecipe.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── IngredientsList.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── images/
│   │   │   └── chef-claude-icon.png
│   │   │
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── Main.jsx
│   │   ├── index.css
│   │   └── index.jsx
│   │
│   └── index.html
│
├── .gitignore
└── Readme.md
```

## How It Works

1. The user creates an account or logs in.
2. The user adds the ingredients they have available.
3. The frontend sends the ingredients to the Django REST API.
4. The backend builds a recipe-generation request and sends it to Google Gemini.
5. Gemini generates the recipe.
6. The generated recipe is saved to PostgreSQL.
7. The backend returns the recipe to the frontend.
8. The recipe is displayed to the user and added to their recipe history.
9. Users can revisit previous recipes, modify their ingredients, and generate another recipe.
10. Users can delete recipes from their history.

## Authentication

Ingredia uses JWT authentication through Django REST Framework Simple JWT.

Authentication allows each user to have their own recipe history and ensures that recipe data belongs to the appropriate account.

## API Rate Limiting

The backend uses Django REST Framework throttling to limit requests to important endpoints.

Current limits include:

```text
Recipe generation: 10 requests/hour
Login:              10 requests/minute
Registration:        5 requests/hour
```

This helps prevent excessive requests and unnecessary usage of the Gemini API.

## Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
DB_URL=your_postgresql_connection_string
```

### Frontend

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

For production, configure the frontend API URL to point to the deployed backend.

> **Important:** Never commit `.env` files or API keys to the repository.

## Local Development

### Backend

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Configure the backend environment variables.

Run the database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

### Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Configure the frontend environment variables.

Start the development server:

```bash
npm run dev
```

The frontend will be available at the URL provided by Vite.

## Production Deployment

Ingredia is deployed using:

- **Frontend:** Render
- **Backend:** Render
- **Database:** Neon PostgreSQL

The frontend communicates with the deployed Django REST API. The backend communicates with Google Gemini for recipe generation and PostgreSQL for persistent user and recipe data.

Production environment variables are configured through the deployment platform rather than stored in the repository.

## Future Improvements

- Improve recipe variety and personalization
- Add dietary preferences
- Add cuisine preferences
- Add cooking time and difficulty filters
- Add recipe ratings and favorites
- Improve recipe regeneration and version handling
- Generate images for recipes
- Add ingredient substitution suggestions
- Add caching for repeated requests
- Add improved monitoring and error tracking

## Why Ingredia?

Deciding what to cook can be surprisingly annoying when you already have ingredients sitting in your kitchen.

Ingredia focuses on a simple idea:

> **Tell us what you have. We'll tell you what to cook.**

## License

This project is currently intended for educational and portfolio purposes.
