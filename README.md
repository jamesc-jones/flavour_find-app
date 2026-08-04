# Mood-Based Recipe Recommender

A simple web application that recommends recipes based on your current mood. Built with Express, SQLite, and Tailwind CSS.

## Features

- Select from 8 different moods (Happy, Sad, Stressed, Energetic, Cozy, Adventurous, Romantic, Lazy)
- Get a random recipe recommendation based on your selected mood
- View detailed recipe information including ingredients and instructions
- Request a new recipe if you don't like the current one
- Change your mood selection at any time

## Tech Stack

- **Backend**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Frontend**: HTML, JavaScript, Tailwind CSS (via CDN)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

**Note:** If you already have a `recipes.db` file and want to get the new recipes, delete the `recipes.db` file and restart the server. The database will be automatically recreated with all recipes.

## Project Structure

```
.
├── server.js          # Express server and API routes
├── database.js        # SQLite database setup and queries
├── package.json       # Dependencies and scripts
├── recipes.db         # SQLite database (created automatically)
└── public/
    ├── index.html     # Frontend HTML with Tailwind CSS
    └── app.js         # Frontend JavaScript
```

## API Endpoints

- `GET /api/moods` - Get all available moods
- `GET /api/recipes/:mood` - Get all recipes for a specific mood
- `GET /api/recipe/:mood/random` - Get a random recipe for a specific mood

## How It Works

1. The database is automatically initialized with recipes when the server starts
2. Recipes are stored in SQLite with separate tables for moods, recipes, ingredients, and instructions
3. The frontend fetches recipes from the Express API
4. Users can select a mood and get recipe recommendations
5. Users can request new recipes or change their mood selection
