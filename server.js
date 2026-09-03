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
const {
    saveRecipe,
    unsaveRecipe,
    getSavedRecipes,
    logMoodHistory,
    getRecentRecipeIdsForMood,
    getMoodHistory,
    addMealPlan,
    removeMealPlan,
    getMealPlan,
    getGroceryList
} = require('./database');

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
    const { mood } = req.params;
    const { isAuthenticated, userId } = getAuth(req);

    let excludeIds = [];
    if (isAuthenticated) {
        excludeIds = getRecentRecipeIdsForMood(userId, mood, 5);
    }

    const recipe = db.getRandomRecipe(mood, excludeIds);
    if (!recipe) {
        res.status(404).json({ error: 'No recipes found for this mood' });
        return;
    }

    if (isAuthenticated) {
        logMoodHistory(userId, mood, recipe.id);
    }

    res.json(recipe);
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

// GET /api/user/mood-history
app.get('/api/user/mood-history', (req, res) => {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const history = getMoodHistory(userId);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch mood history' });
    }
});

// Validation helpers — Task 3.4 meal-plan route section
const DATE_RE_MP = /^\d{4}-\d{2}-\d{2}$/;
function isValidDate(str) {
    if (!DATE_RE_MP.test(str)) return false;
    const [y, m, d] = str.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return (
        date.getUTCFullYear() === y &&
        date.getUTCMonth() === m - 1 &&
        date.getUTCDate() === d
    );
}
const VALID_MEAL_SLOTS = new Set(['breakfast', 'lunch', 'dinner', 'snack']);

// POST /api/user/meal-plan
app.post('/api/user/meal-plan', (req, res) => {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const { recipeId, plannedDate, mealSlot } = req.body;

    const recipeIdInt = parseInt(recipeId, 10);
    const recipeIdNum = Number(recipeId);
    if (!recipeId || !Number.isInteger(recipeIdNum) || recipeIdNum <= 0) {
        res.status(400).json({ error: 'recipeId must be a positive integer' });
        return;
    }
    if (!plannedDate || !isValidDate(plannedDate)) {
        res.status(400).json({ error: 'plannedDate must be a valid YYYY-MM-DD date' });
        return;
    }
    if (!mealSlot || !VALID_MEAL_SLOTS.has(mealSlot)) {
        res.status(400).json({ error: 'mealSlot must be breakfast, lunch, dinner, or snack' });
        return;
    }

    try {
        const result = addMealPlan(userId, recipeIdInt, plannedDate, mealSlot);
        res.status(201).json({ id: result.lastInsertRowid });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add meal plan' });
    }
});

// DELETE /api/user/meal-plan/:id
app.delete('/api/user/meal-plan/:id', (req, res) => {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const mealPlanId = parseInt(req.params.id, 10);
    if (isNaN(mealPlanId) || mealPlanId <= 0) {
        res.status(400).json({ error: 'Invalid id' });
        return;
    }
    try {
        const result = removeMealPlan(userId, mealPlanId);
        if (result.changes === 0) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove meal plan' });
    }
});

// GET /api/user/meal-plan?week=YYYY-MM-DD
app.get('/api/user/meal-plan', (req, res) => {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const weekStart = req.query.week;
    if (!weekStart || !isValidDate(weekStart)) {
        res.status(400).json({ error: 'week must be a valid YYYY-MM-DD date' });
        return;
    }
    try {
        const plan = getMealPlan(userId, weekStart);
        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch meal plan' });
    }
});

// GET /api/user/grocery-list?week=YYYY-MM-DD
app.get('/api/user/grocery-list', (req, res) => {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const weekStart = req.query.week;
    if (!weekStart || !isValidDate(weekStart)) {
        res.status(400).json({ error: 'week must be a valid YYYY-MM-DD date' });
        return;
    }
    try {
        const items = getGroceryList(userId, weekStart);
        res.json({ items });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate grocery list' });
    }
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
