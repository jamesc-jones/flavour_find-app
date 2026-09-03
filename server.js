require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const pino = require('pino');
const pinoHttp = require('pino-http');
const { clerkMiddleware, getAuth } = require('@clerk/express');
const db = require('./database');
const { saveRecipe, unsaveRecipe, getSavedRecipes } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const logger = pino();

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'script-src': ["'self'", 'https://cdn.tailwindcss.com'],
        },
    },
}));
app.use(compression());
app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(clerkMiddleware());

// API Routes
app.get('/api/moods', (req, res) => {
    try {
        const moods = db.getMoods();
        res.json(moods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/recipes/:mood', (req, res) => {
    try {
        const { mood } = req.params;
        const recipes = db.getRecipesByMood(mood);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/recipe/:mood/random', (req, res) => {
    try {
        const { mood } = req.params;
        const recipe = db.getRandomRecipe(mood);
        if (!recipe) {
            return res.status(404).json({ error: 'No recipes found for this mood' });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/user/saved
app.post('/api/user/saved', (req, res) => {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const { recipeId } = req.body;
    const recipeIdInt = Number(recipeId);

    if (
        !Number.isInteger(recipeIdInt) ||
        recipeIdInt <= 0
    ) {
        res.status(400).json({ error: 'recipeId must be a positive integer' });
        return;
    }

    try {
        saveRecipe(userId, recipeIdInt);
        res.status(201).json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save recipe' });
    }
});

// DELETE /api/user/saved/:id
app.delete('/api/user/saved/:id', (req, res) => {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const savedId = Number(req.params.id);

    if (!Number.isInteger(savedId) || savedId <= 0) {
        res.status(400).json({ error: 'Invalid id' });
        return;
    }

    try {
        const result = unsaveRecipe(userId, savedId);

        if (result.changes === 0) {
            res.status(404).json({ error: 'Not found' });
            return;
        }

        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to unsave recipe' });
    }
});

// GET /api/user/saved
app.get('/api/user/saved', (req, res) => {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const recipes = getSavedRecipes(userId);
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch saved recipes' });
    }
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
