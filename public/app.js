// API base URL
const API_BASE = 'http://localhost:3000/api';

// DOM elements
const moodSelection = document.getElementById('mood-selection');
const recipeDisplay = document.getElementById('recipe-display');
const moodButtons = document.querySelectorAll('.mood-btn');
const newRecipeBtn = document.getElementById('new-recipe-btn');
const backBtn = document.getElementById('back-btn');

// State
let currentMood = null;
let currentRecipe = null;
let shownRecipeIds = [];

// Event listeners
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood');
        selectMood(mood);
    });
});

newRecipeBtn.addEventListener('click', () => {
    if (currentMood) {
        getRandomRecipe(currentMood);
    }
});

backBtn.addEventListener('click', () => {
    showMoodSelection();
});

// Functions
async function selectMood(mood) {
    currentMood = mood;
    shownRecipeIds = [];
    await getRandomRecipe(mood);
}

async function getRandomRecipe(mood) {
    try {
        const response = await fetch(`${API_BASE}/recipe/${mood}/random`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }
        const recipe = await response.json();
        currentRecipe = recipe;
        displayRecipe(recipe, mood);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        alert('Failed to load recipe. Please try again.');
    }
}

function displayRecipe(recipe, mood) {
    // Hide mood selection, show recipe display
    moodSelection.classList.add('hidden');
    recipeDisplay.classList.remove('hidden');

    // Populate recipe data
    document.getElementById('recipe-name').textContent = recipe.name;
    document.getElementById('recipe-mood-badge').textContent = mood;
    document.getElementById('recipe-emoji').textContent = recipe.emoji;
    document.getElementById('recipe-description').textContent = recipe.description;

    // Populate ingredients
    const ingredientsList = document.getElementById('recipe-ingredients');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });

    // Populate instructions
    const instructionsList = document.getElementById('recipe-instructions');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });
}

function showMoodSelection() {
    recipeDisplay.classList.add('hidden');
    moodSelection.classList.remove('hidden');
    currentMood = null;
    currentRecipe = null;
    shownRecipeIds = [];
}
