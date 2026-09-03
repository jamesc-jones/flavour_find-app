const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'recipes.db');
const db = new Database(dbPath);

// Initialize database
function initDatabase() {
    db.pragma('foreign_keys = ON');

    // Create tables
    db.exec(`
        CREATE TABLE IF NOT EXISTS moods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            emoji TEXT
        );

        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mood_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            emoji TEXT,
            description TEXT,
            FOREIGN KEY (mood_id) REFERENCES moods(id)
        );

        CREATE TABLE IF NOT EXISTS ingredients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            recipe_id INTEGER NOT NULL,
            ingredient TEXT NOT NULL,
            order_index INTEGER,
            FOREIGN KEY (recipe_id) REFERENCES recipes(id)
        );

        CREATE TABLE IF NOT EXISTS instructions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            recipe_id INTEGER NOT NULL,
            instruction TEXT NOT NULL,
            step_number INTEGER,
            FOREIGN KEY (recipe_id) REFERENCES recipes(id)
        );

        CREATE TABLE IF NOT EXISTS user_saved_recipes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          recipe_id INTEGER NOT NULL,
          saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, recipe_id),
          FOREIGN KEY (recipe_id) REFERENCES recipes(id)
        );

        CREATE TABLE IF NOT EXISTS mood_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          mood TEXT NOT NULL,
          recipe_id INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Check if database is already populated
    const recipeCount = db.prepare('SELECT COUNT(*) as count FROM recipes').get();
    if (recipeCount.count === 0) {
        populateDatabase();
    }
}

function populateDatabase() {
    const insertMood = db.prepare('INSERT INTO moods (name, emoji) VALUES (?, ?)');
    const insertRecipe = db.prepare('INSERT INTO recipes (mood_id, name, emoji, description) VALUES (?, ?, ?, ?)');
    const insertIngredient = db.prepare('INSERT INTO ingredients (recipe_id, ingredient, order_index) VALUES (?, ?, ?)');
    const insertInstruction = db.prepare('INSERT INTO instructions (recipe_id, instruction, step_number) VALUES (?, ?, ?)');

    const transaction = db.transaction((recipesData) => {
        for (const [moodName, recipes] of Object.entries(recipesData)) {
            const moodEmoji = getMoodEmoji(moodName);
            const moodResult = insertMood.run(moodName, moodEmoji);
            const moodId = moodResult.lastInsertRowid;

            for (const recipe of recipes) {
                const recipeResult = insertRecipe.run(
                    moodId,
                    recipe.name,
                    recipe.emoji,
                    recipe.description
                );
                const recipeId = recipeResult.lastInsertRowid;

                recipe.ingredients.forEach((ingredient, index) => {
                    insertIngredient.run(recipeId, ingredient, index);
                });

                recipe.instructions.forEach((instruction, index) => {
                    insertInstruction.run(recipeId, instruction, index + 1);
                });
            }
        }
    });

    transaction(getRecipesData());
}

function getMoodEmoji(mood) {
    const emojis = {
        happy: '😊',
        sad: '😢',
        stressed: '😰',
        energetic: '⚡',
        cozy: '🛋️',
        adventurous: '🌍',
        romantic: '💕',
        lazy: '😴'
    };
    return emojis[mood] || '🍳';
}

function getRecipesData() {
    return {
        happy: [
            {
                name: "Rainbow Pasta Salad",
                emoji: "🌈",
                description: "A vibrant, colorful pasta salad that's as cheerful as your mood! Packed with fresh vegetables and a zesty dressing.",
                ingredients: [
                    "2 cups cooked pasta (rotini or penne)",
                    "1 cup cherry tomatoes, halved",
                    "1 bell pepper (red, yellow, or orange), diced",
                    "1/2 cup carrots, shredded",
                    "1/2 cup purple cabbage, shredded",
                    "1/4 cup red onion, diced",
                    "1/4 cup feta cheese, crumbled",
                    "2 tbsp olive oil",
                    "1 tbsp lemon juice",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Cook pasta according to package directions, then let cool",
                    "In a large bowl, combine all vegetables",
                    "Add cooled pasta to the vegetables",
                    "Whisk together olive oil, lemon juice, salt, and pepper",
                    "Pour dressing over pasta and vegetables, toss to combine",
                    "Top with crumbled feta cheese",
                    "Chill for 30 minutes before serving"
                ]
            },
            {
                name: "Sunshine Smoothie Bowl",
                emoji: "☀️",
                description: "A bright and energizing smoothie bowl topped with fresh fruits that will keep your happy mood going!",
                ingredients: [
                    "2 frozen bananas",
                    "1 cup frozen mango",
                    "1/2 cup Greek yogurt",
                    "1/4 cup orange juice",
                    "1 tbsp honey",
                    "Fresh berries for topping",
                    "Granola for topping",
                    "Coconut flakes for topping"
                ],
                instructions: [
                    "Blend frozen bananas, mango, yogurt, orange juice, and honey until smooth",
                    "Pour into a bowl",
                    "Arrange fresh berries, granola, and coconut flakes on top in a decorative pattern",
                    "Serve immediately and enjoy!"
                ]
            },
            {
                name: "Unicorn Toast with Edible Glitter",
                emoji: "🦄",
                description: "Magical toast that's almost too pretty to eat! Swirled with colorful cream cheese and topped with edible glitter - pure joy on bread!",
                ingredients: [
                    "4 slices thick brioche or white bread",
                    "8 oz cream cheese, softened",
                    "2 tbsp honey",
                    "Food coloring (pink, purple, blue, yellow)",
                    "Edible glitter or sprinkles",
                    "Fresh berries for garnish"
                ],
                instructions: [
                    "Toast bread until golden and crispy",
                    "Mix cream cheese with honey until smooth",
                    "Divide cream cheese into 4 small bowls",
                    "Add different food coloring to each bowl and mix",
                    "Using a butter knife, swirl the colored cream cheeses together on each toast slice",
                    "Sprinkle with edible glitter or colorful sprinkles",
                    "Garnish with fresh berries",
                    "Take a photo before devouring this magical creation!"
                ]
            },
            {
                name: "Bubble Waffle Ice Cream Cone",
                emoji: "🧇",
                description: "Hong Kong-style bubble waffles shaped into a cone and filled with ice cream - a playful, Instagram-worthy treat that screams happiness!",
                ingredients: [
                    "1 cup all-purpose flour",
                    "1 tsp baking powder",
                    "2 eggs",
                    "1/2 cup sugar",
                    "1/2 cup milk",
                    "2 tbsp melted butter",
                    "1 tsp vanilla extract",
                    "Tapioca pearls (optional)",
                    "Vanilla ice cream",
                    "Chocolate sauce",
                    "Rainbow sprinkles"
                ],
                instructions: [
                    "Mix flour and baking powder in a bowl",
                    "Whisk eggs, sugar, milk, butter, and vanilla in another bowl",
                    "Combine wet and dry ingredients until smooth",
                    "Add tapioca pearls if using",
                    "Pour into bubble waffle maker and cook until golden",
                    "While warm, shape into a cone and let cool slightly",
                    "Fill with scoops of vanilla ice cream",
                    "Drizzle with chocolate sauce and top with rainbow sprinkles",
                    "Enjoy this whimsical treat!"
                ]
            }
        ],
        sad: [
            {
                name: "Comforting Chicken Soup",
                emoji: "🍲",
                description: "A warm, hearty chicken soup that's like a hug in a bowl. Perfect for lifting your spirits.",
                ingredients: [
                    "2 chicken breasts, cooked and shredded",
                    "6 cups chicken broth",
                    "1 cup carrots, sliced",
                    "1 cup celery, sliced",
                    "1/2 cup onion, diced",
                    "2 cloves garlic, minced",
                    "1 cup egg noodles",
                    "1 tsp dried thyme",
                    "Salt and pepper to taste",
                    "Fresh parsley for garnish"
                ],
                instructions: [
                    "In a large pot, sauté onion and garlic until fragrant",
                    "Add carrots and celery, cook for 5 minutes",
                    "Pour in chicken broth and bring to a boil",
                    "Add egg noodles and cook according to package directions",
                    "Add shredded chicken and thyme",
                    "Season with salt and pepper",
                    "Simmer for 10 minutes",
                    "Garnish with fresh parsley and serve hot"
                ]
            },
            {
                name: "Warm Chocolate Chip Cookies",
                emoji: "🍪",
                description: "Freshly baked cookies that are guaranteed to bring a smile. The smell alone will make you feel better!",
                ingredients: [
                    "2 1/4 cups all-purpose flour",
                    "1 tsp baking soda",
                    "1 cup butter, softened",
                    "3/4 cup granulated sugar",
                    "3/4 cup brown sugar",
                    "2 large eggs",
                    "2 tsp vanilla extract",
                    "2 cups chocolate chips"
                ],
                instructions: [
                    "Preheat oven to 375°F (190°C)",
                    "Mix flour and baking soda in a bowl",
                    "Cream butter and both sugars until fluffy",
                    "Beat in eggs and vanilla",
                    "Gradually mix in flour mixture",
                    "Stir in chocolate chips",
                    "Drop rounded tablespoons onto ungreased baking sheets",
                    "Bake for 9-11 minutes until golden brown",
                    "Let cool slightly before enjoying warm"
                ]
            },
            {
                name: "Grandma's Matzo Ball Soup",
                emoji: "🥣",
                description: "A healing, traditional soup that feels like being wrapped in a warm blanket. The matzo balls are light as clouds and the broth is pure comfort.",
                ingredients: [
                    "4 eggs",
                    "1/4 cup schmaltz (chicken fat) or vegetable oil",
                    "1 cup matzo meal",
                    "1/4 cup seltzer water",
                    "1 tsp salt",
                    "8 cups chicken broth",
                    "2 carrots, sliced",
                    "2 celery stalks, sliced",
                    "Fresh dill for garnish"
                ],
                instructions: [
                    "Beat eggs with schmaltz or oil",
                    "Stir in matzo meal, seltzer, and salt",
                    "Cover and refrigerate for 30 minutes",
                    "Bring chicken broth to a boil in a large pot",
                    "Add carrots and celery, reduce to simmer",
                    "Wet hands and form matzo mixture into 1-inch balls",
                    "Drop matzo balls into simmering broth",
                    "Cover and cook for 20-25 minutes until fluffy",
                    "Ladle into bowls, garnish with fresh dill",
                    "Let the warmth and memories comfort you"
                ]
            },
            {
                name: "Mashed Potato Volcano with Gravy Lava",
                emoji: "🌋",
                description: "A playful take on comfort food - creamy mashed potatoes shaped like a volcano with rich gravy flowing down the sides. Sometimes you need food that makes you smile!",
                ingredients: [
                    "4 large russet potatoes, peeled and cubed",
                    "1/2 cup butter",
                    "1/2 cup warm milk",
                    "Salt and pepper to taste",
                    "2 cups beef or chicken gravy",
                    "Shredded cheese for 'lava' (optional)",
                    "Chives for garnish"
                ],
                instructions: [
                    "Boil potatoes until fork-tender, about 20 minutes",
                    "Drain and return to pot",
                    "Mash with butter and warm milk until creamy",
                    "Season with salt and pepper",
                    "On a plate, shape mashed potatoes into a volcano with a crater in the center",
                    "Heat gravy until warm",
                    "Pour gravy into the crater and let it flow down the sides",
                    "Top with shredded cheese if desired",
                    "Garnish with chives",
                    "Enjoy this comforting, playful dish!"
                ]
            }
        ],
        stressed: [
            {
                name: "Meditation Bowl (Buddha Bowl)",
                emoji: "🧘",
                description: "A balanced, zen-like bowl that helps calm your mind. Simple, nutritious, and stress-free to prepare.",
                ingredients: [
                    "1 cup cooked quinoa",
                    "1/2 cup chickpeas, roasted",
                    "1 cup mixed greens",
                    "1/2 avocado, sliced",
                    "1/2 cup cucumber, sliced",
                    "1/4 cup shredded carrots",
                    "2 tbsp tahini",
                    "1 tbsp lemon juice",
                    "1 tbsp water",
                    "Salt to taste"
                ],
                instructions: [
                    "Arrange quinoa as the base in a bowl",
                    "Add greens, then arrange vegetables in sections",
                    "Top with roasted chickpeas and avocado",
                    "Whisk together tahini, lemon juice, water, and salt for dressing",
                    "Drizzle dressing over the bowl",
                    "Take a deep breath and enjoy mindfully"
                ]
            },
            {
                name: "Lavender Honey Tea & Toast",
                emoji: "🍵",
                description: "A calming combination of herbal tea and simple toast. Sometimes the simplest things are the most soothing.",
                ingredients: [
                    "2 lavender tea bags",
                    "2 cups hot water",
                    "2 tbsp honey",
                    "2 slices whole grain bread",
                    "Butter or avocado",
                    "A pinch of sea salt"
                ],
                instructions: [
                    "Steep lavender tea in hot water for 5 minutes",
                    "Stir in honey while tea is still warm",
                    "Toast bread until golden",
                    "Spread with butter or mashed avocado",
                    "Sprinkle with sea salt",
                    "Sip tea slowly and enjoy toast mindfully"
                ]
            },
            {
                name: "Matcha Zen Parfait",
                emoji: "🍃",
                description: "A layered parfait with matcha-infused yogurt, chia pudding, and fresh fruit. The matcha's L-theanine promotes calmness and focus.",
                ingredients: [
                    "1 cup Greek yogurt",
                    "1 tsp matcha powder",
                    "2 tbsp honey",
                    "1/2 cup chia seeds",
                    "1 cup coconut milk",
                    "1 tsp vanilla extract",
                    "Fresh mango, sliced",
                    "Fresh kiwi, sliced",
                    "Granola for crunch"
                ],
                instructions: [
                    "Mix chia seeds with coconut milk and vanilla, let sit overnight or 4 hours",
                    "Whisk matcha powder with a little hot water until smooth",
                    "Mix matcha with yogurt and honey",
                    "In a glass, layer: chia pudding, matcha yogurt, fresh fruit",
                    "Repeat layers until glass is full",
                    "Top with granola for texture",
                    "Take deep breaths and enjoy mindfully",
                    "Let the calm wash over you"
                ]
            },
            {
                name: "Miso-Glazed Eggplant with Jasmine Rice",
                emoji: "🍆",
                description: "Umami-rich miso glaze on tender eggplant served over fragrant jasmine rice. Simple, nourishing, and deeply satisfying - a stress-relieving meal.",
                ingredients: [
                    "2 Japanese eggplants, halved lengthwise",
                    "3 tbsp white miso paste",
                    "2 tbsp mirin",
                    "1 tbsp rice vinegar",
                    "1 tbsp sesame oil",
                    "1 cup jasmine rice",
                    "1 1/4 cups water",
                    "Sesame seeds for garnish",
                    "Scallions, sliced"
                ],
                instructions: [
                    "Preheat oven to 400°F (200°C)",
                    "Score eggplant flesh in a diamond pattern",
                    "Mix miso, mirin, rice vinegar, and sesame oil",
                    "Brush miso glaze generously on eggplant",
                    "Roast for 25-30 minutes until tender",
                    "Cook jasmine rice according to package directions",
                    "Place rice in a bowl, top with eggplant",
                    "Drizzle remaining glaze, garnish with sesame seeds and scallions",
                    "Eat slowly and savor each bite"
                ]
            }
        ],
        energetic: [
            {
                name: "Power Protein Smoothie",
                emoji: "💪",
                description: "An energizing smoothie packed with protein and nutrients to fuel your active day!",
                ingredients: [
                    "1 banana",
                    "1 cup spinach",
                    "1/2 cup Greek yogurt",
                    "1 scoop protein powder (optional)",
                    "1 tbsp almond butter",
                    "1 cup almond milk",
                    "1/2 cup frozen berries",
                    "1 tbsp chia seeds",
                    "Ice cubes"
                ],
                instructions: [
                    "Add all ingredients to a blender",
                    "Blend on high until smooth and creamy",
                    "Pour into a glass",
                    "Add more ice if you prefer it colder",
                    "Drink immediately for maximum energy boost!"
                ]
            },
            {
                name: "Energizing Quinoa Power Bowl",
                emoji: "⚡",
                description: "A nutrient-dense bowl that will keep you going strong all day long!",
                ingredients: [
                    "1 cup cooked quinoa",
                    "1/2 cup black beans",
                    "1/2 cup corn",
                    "1/2 bell pepper, diced",
                    "1/4 cup red onion, diced",
                    "1/4 cup cilantro, chopped",
                    "1 tbsp olive oil",
                    "1 tbsp lime juice",
                    "Salt and pepper to taste",
                    "Hot sauce (optional)"
                ],
                instructions: [
                    "Combine quinoa, black beans, and corn in a bowl",
                    "Add bell pepper and red onion",
                    "Whisk together olive oil, lime juice, salt, and pepper",
                    "Pour dressing over the bowl and toss",
                    "Garnish with cilantro",
                    "Add hot sauce if you want an extra kick",
                    "Enjoy your power meal!"
                ]
            },
            {
                name: "Turmeric Golden Milk Energy Balls",
                emoji: "⚡",
                description: "No-bake energy balls packed with turmeric, dates, and nuts. Perfect for a quick energy boost without the crash!",
                ingredients: [
                    "1 cup pitted dates",
                    "1/2 cup almonds",
                    "1/2 cup cashews",
                    "2 tbsp turmeric powder",
                    "1 tsp ground ginger",
                    "1/2 tsp black pepper (enhances turmeric absorption)",
                    "2 tbsp coconut oil",
                    "1/4 cup shredded coconut",
                    "Pinch of salt"
                ],
                instructions: [
                    "Soak dates in warm water for 10 minutes, then drain",
                    "In a food processor, pulse almonds and cashews until coarsely ground",
                    "Add dates, turmeric, ginger, black pepper, coconut oil, and salt",
                    "Process until mixture forms a sticky dough",
                    "Roll into 1-inch balls",
                    "Roll balls in shredded coconut",
                    "Refrigerate for 30 minutes to firm up",
                    "Store in fridge and grab one whenever you need energy!"
                ]
            },
            {
                name: "Beetroot & Goat Cheese Power Salad",
                emoji: "💥",
                description: "A vibrant, nutrient-packed salad with roasted beets, creamy goat cheese, and walnuts. The natural nitrates in beets boost energy and endurance!",
                ingredients: [
                    "3 medium beets, roasted and cubed",
                    "4 cups mixed greens (arugula, spinach, kale)",
                    "4 oz goat cheese, crumbled",
                    "1/2 cup walnuts, toasted",
                    "1/4 cup red onion, thinly sliced",
                    "2 tbsp olive oil",
                    "1 tbsp balsamic vinegar",
                    "1 tsp Dijon mustard",
                    "1 tsp honey",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Preheat oven to 400°F (200°C)",
                    "Wrap beets in foil and roast for 45-60 minutes until tender",
                    "Let cool, then peel and cube",
                    "Whisk together olive oil, balsamic, mustard, and honey for dressing",
                    "Toss greens with dressing",
                    "Arrange beets, goat cheese, walnuts, and red onion on top",
                    "Season with salt and pepper",
                    "Enjoy this energizing, beautiful salad!"
                ]
            }
        ],
        cozy: [
            {
                name: "Creamy Mac and Cheese",
                emoji: "🧀",
                description: "The ultimate comfort food. Rich, creamy, and absolutely indulgent - perfect for a cozy evening.",
                ingredients: [
                    "2 cups elbow macaroni",
                    "2 cups shredded cheddar cheese",
                    "1 cup milk",
                    "2 tbsp butter",
                    "2 tbsp all-purpose flour",
                    "1/2 tsp salt",
                    "1/4 tsp black pepper",
                    "1/4 tsp paprika",
                    "Breadcrumbs for topping (optional)"
                ],
                instructions: [
                    "Cook macaroni according to package directions, drain",
                    "In a saucepan, melt butter over medium heat",
                    "Whisk in flour and cook for 1 minute",
                    "Gradually whisk in milk until smooth",
                    "Cook until thickened, about 5 minutes",
                    "Remove from heat and stir in cheese until melted",
                    "Season with salt, pepper, and paprika",
                    "Combine cheese sauce with cooked macaroni",
                    "Top with breadcrumbs if desired and serve warm"
                ]
            },
            {
                name: "Warm Apple Cinnamon Oatmeal",
                emoji: "🍎",
                description: "A warm, spiced bowl of oatmeal that feels like a cozy blanket for your soul.",
                ingredients: [
                    "1 cup rolled oats",
                    "2 cups milk or water",
                    "1 apple, diced",
                    "2 tbsp brown sugar",
                    "1 tsp cinnamon",
                    "1/4 tsp nutmeg",
                    "1/4 cup walnuts, chopped",
                    "1 tbsp butter",
                    "Pinch of salt"
                ],
                instructions: [
                    "In a saucepan, combine oats, milk, and salt",
                    "Bring to a boil, then reduce heat and simmer",
                    "Stir in diced apple, cinnamon, and nutmeg",
                    "Cook for 5-7 minutes until creamy",
                    "Stir in brown sugar and butter",
                    "Top with chopped walnuts",
                    "Serve warm and enjoy the cozy feeling"
                ]
            },
            {
                name: "Swiss Raclette Night",
                emoji: "🧀",
                description: "Melted raclette cheese over potatoes, pickles, and cured meats. The ultimate cozy, communal comfort food that warms both body and soul.",
                ingredients: [
                    "1 lb raclette cheese (or Gruyère)",
                    "1.5 lbs small potatoes, boiled",
                    "Cornichons (small pickles)",
                    "Pickled onions",
                    "Cured meats (prosciutto, salami)",
                    "Crusty bread",
                    "Dry white wine (optional)"
                ],
                instructions: [
                    "Boil potatoes until tender, keep warm",
                    "Slice raclette cheese into individual portions",
                    "Arrange potatoes, pickles, onions, and meats on plates",
                    "Melt cheese under broiler or in raclette machine until bubbly and golden",
                    "Scrape melted cheese over potatoes and accompaniments",
                    "Serve with crusty bread and wine",
                    "Repeat until completely satisfied and cozy",
                    "This is best enjoyed slowly with good company"
                ]
            },
            {
                name: "Butternut Squash & Sage Risotto",
                emoji: "🎃",
                description: "Creamy, velvety risotto with roasted butternut squash and fragrant sage. The slow stirring is meditative, and the result is pure comfort.",
                ingredients: [
                    "1.5 cups Arborio rice",
                    "4 cups warm vegetable or chicken broth",
                    "2 cups butternut squash, cubed and roasted",
                    "1/2 cup white wine",
                    "1 onion, diced",
                    "3 cloves garlic, minced",
                    "2 tbsp butter",
                    "1/4 cup Parmesan cheese, grated",
                    "Fresh sage leaves",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Roast butternut squash at 400°F (200°C) for 25 minutes until tender",
                    "Heat broth in a separate pot and keep warm",
                    "In a large pan, sauté onion and garlic in butter until soft",
                    "Add rice and toast for 2 minutes",
                    "Add wine and stir until absorbed",
                    "Add warm broth one ladle at a time, stirring constantly",
                    "Continue until rice is creamy and al dente (about 20 minutes)",
                    "Stir in roasted squash, Parmesan, and torn sage leaves",
                    "Season with salt and pepper",
                    "Serve immediately in warm bowls - pure coziness!"
                ]
            }
        ],
        adventurous: [
            {
                name: "Spicy Thai Green Curry",
                emoji: "🌶️",
                description: "An exotic, flavorful curry that will take your taste buds on an adventure!",
                ingredients: [
                    "1 lb chicken or tofu, cubed",
                    "2 tbsp green curry paste",
                    "1 can coconut milk",
                    "1 eggplant, cubed",
                    "1 bell pepper, sliced",
                    "1/2 cup bamboo shoots",
                    "2 tbsp fish sauce (or soy sauce)",
                    "1 tbsp brown sugar",
                    "1/4 cup Thai basil leaves",
                    "Jasmine rice for serving"
                ],
                instructions: [
                    "Heat a large pan and add curry paste, cook for 1 minute",
                    "Add half the coconut milk and stir until fragrant",
                    "Add chicken/tofu and cook until done",
                    "Add remaining coconut milk, eggplant, bell pepper, and bamboo shoots",
                    "Simmer for 10 minutes until vegetables are tender",
                    "Stir in fish sauce and brown sugar",
                    "Garnish with Thai basil",
                    "Serve over jasmine rice"
                ]
            },
            {
                name: "Korean Bibimbap",
                emoji: "🍚",
                description: "A colorful Korean rice bowl that's an adventure for your palate with its mix of flavors and textures!",
                ingredients: [
                    "2 cups cooked rice",
                    "1/2 cup spinach, blanched",
                    "1/2 cup bean sprouts, blanched",
                    "1 carrot, julienned and sautéed",
                    "1/2 cup mushrooms, sautéed",
                    "1/2 lb ground beef, cooked",
                    "2 eggs, fried",
                    "2 tbsp gochujang (Korean chili paste)",
                    "1 tbsp sesame oil",
                    "1 tbsp soy sauce",
                    "Sesame seeds for garnish"
                ],
                instructions: [
                    "Arrange rice in a bowl",
                    "Place vegetables in sections around the rice",
                    "Add cooked beef in the center",
                    "Top with a fried egg",
                    "Mix gochujang with sesame oil and soy sauce",
                    "Drizzle sauce over everything",
                    "Mix everything together before eating",
                    "Garnish with sesame seeds"
                ]
            },
            {
                name: "Ethiopian Doro Wat with Injera",
                emoji: "🌶️",
                description: "Ethiopia's national dish - a spicy, complex chicken stew with hard-boiled eggs, served with sourdough injera bread. A true culinary adventure!",
                ingredients: [
                    "2 lbs chicken thighs",
                    "3 large onions, finely chopped",
                    "4 tbsp berbere spice mix",
                    "2 tbsp niter kibbeh (spiced butter) or regular butter",
                    "4 cloves garlic, minced",
                    "1 inch fresh ginger, grated",
                    "1/2 cup red wine",
                    "4 hard-boiled eggs",
                    "1 cup chicken broth",
                    "Injera bread (or use naan/flatbread)",
                    "Salt to taste"
                ],
                instructions: [
                    "Sauté onions in butter until deep brown (15-20 minutes)",
                    "Add berbere, garlic, and ginger, cook for 2 minutes",
                    "Add chicken and brown on all sides",
                    "Pour in wine and broth, bring to a boil",
                    "Reduce heat, cover, and simmer for 45 minutes",
                    "Add hard-boiled eggs and cook 15 more minutes",
                    "Season with salt",
                    "Serve on injera bread - tear off pieces to scoop up the stew",
                    "Experience the complex, spicy flavors of Ethiopia!"
                ]
            },
            {
                name: "Peruvian Ceviche with Sweet Potato",
                emoji: "🐟",
                description: "Fresh fish 'cooked' in citrus juice with red onions, cilantro, and ají peppers. Served with sweet potato and corn - a bright, zingy adventure!",
                ingredients: [
                    "1 lb fresh white fish (sea bass, snapper, or tilapia), cubed",
                    "1 cup fresh lime juice",
                    "1 red onion, thinly sliced",
                    "1-2 ají amarillo peppers (or jalapeño), minced",
                    "1/2 cup cilantro, chopped",
                    "1 sweet potato, boiled and sliced",
                    "1 ear of corn, boiled and cut into rounds",
                    "Salt to taste",
                    "Lettuce leaves for serving"
                ],
                instructions: [
                    "Place fish in a glass bowl, cover with lime juice",
                    "Marinate for 15-20 minutes until fish turns opaque",
                    "Drain most of the lime juice (leaving a little)",
                    "Mix in red onion, ají pepper, and cilantro",
                    "Season with salt",
                    "Arrange lettuce leaves on plates",
                    "Place ceviche on lettuce, serve with sweet potato and corn",
                    "Enjoy this fresh, tangy, and adventurous dish immediately!"
                ]
            }
        ],
        romantic: [
            {
                name: "Chocolate Fondue for Two",
                emoji: "🍫",
                description: "A decadent, shareable dessert that's perfect for a romantic evening together.",
                ingredients: [
                    "8 oz dark chocolate, chopped",
                    "1/2 cup heavy cream",
                    "2 tbsp butter",
                    "1 tsp vanilla extract",
                    "Fresh strawberries",
                    "Banana slices",
                    "Marshmallows",
                    "Pound cake cubes"
                ],
                instructions: [
                    "Heat cream in a fondue pot or double boiler",
                    "Add chocolate and stir until melted and smooth",
                    "Stir in butter and vanilla",
                    "Keep warm over low heat",
                    "Arrange fruits, marshmallows, and cake on a platter",
                    "Dip and enjoy together!"
                ]
            },
            {
                name: "Herb-Crusted Salmon with Roasted Vegetables",
                emoji: "🐟",
                description: "An elegant, restaurant-quality dish that's perfect for a romantic dinner at home.",
                ingredients: [
                    "2 salmon fillets",
                    "2 tbsp fresh dill, chopped",
                    "2 tbsp fresh parsley, chopped",
                    "1 lemon, zested and juiced",
                    "2 tbsp olive oil",
                    "1 lb asparagus",
                    "1 cup cherry tomatoes",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Preheat oven to 400°F (200°C)",
                    "Mix herbs, lemon zest, and 1 tbsp olive oil",
                    "Coat salmon with herb mixture",
                    "Place salmon on a baking sheet",
                    "Toss asparagus and tomatoes with remaining olive oil, salt, and pepper",
                    "Arrange vegetables around salmon",
                    "Bake for 15-20 minutes until salmon is cooked",
                    "Drizzle with lemon juice before serving"
                ]
            },
            {
                name: "Strawberry Rose Panna Cotta",
                emoji: "🌹",
                description: "Silky, elegant panna cotta infused with rose water and topped with fresh strawberries. A sophisticated, romantic dessert that's surprisingly easy to make.",
                ingredients: [
                    "2 cups heavy cream",
                    "1/2 cup sugar",
                    "2 tsp unflavored gelatin",
                    "2 tbsp cold water",
                    "1 tsp rose water",
                    "1 cup fresh strawberries, sliced",
                    "1 tbsp honey",
                    "Edible rose petals for garnish (optional)"
                ],
                instructions: [
                    "Sprinkle gelatin over cold water, let bloom for 5 minutes",
                    "Heat cream and sugar in a saucepan until sugar dissolves",
                    "Remove from heat, stir in bloomed gelatin until dissolved",
                    "Add rose water and stir",
                    "Pour into 4 ramekins or glasses",
                    "Chill for at least 4 hours until set",
                    "Toss strawberries with honey",
                    "Top panna cotta with strawberries and rose petals",
                    "Serve chilled - elegant and romantic!"
                ]
            },
            {
                name: "Beef Wellington for Two",
                emoji: "🥩",
                description: "Tender beef fillet wrapped in mushroom duxelles and puff pastry. An impressive, romantic dish that's worth the effort - perfect for special occasions!",
                ingredients: [
                    "2 beef fillets (6 oz each)",
                    "1 sheet puff pastry",
                    "8 oz mushrooms, finely chopped",
                    "2 tbsp butter",
                    "2 cloves garlic, minced",
                    "2 tbsp Dijon mustard",
                    "4 slices prosciutto",
                    "1 egg, beaten",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "Sear beef fillets on all sides, let cool",
                    "Sauté mushrooms and garlic in butter until dry",
                    "Season fillets, brush with mustard",
                    "Lay prosciutto on plastic wrap, spread with mushroom duxelles",
                    "Place fillets on top, wrap tightly, chill 30 minutes",
                    "Wrap each fillet in puff pastry, seal edges",
                    "Brush with beaten egg",
                    "Bake at 400°F (200°C) for 20-25 minutes until golden",
                    "Rest 5 minutes, slice, and serve - pure romance on a plate!"
                ]
            }
        ],
        lazy: [
            {
                name: "5-Minute Quesadilla",
                emoji: "🌮",
                description: "The ultimate lazy meal - quick, easy, and delicious with minimal effort!",
                ingredients: [
                    "2 large flour tortillas",
                    "1 cup shredded cheese (cheddar or Mexican blend)",
                    "1/4 cup black beans (canned)",
                    "Salsa for dipping",
                    "Sour cream for dipping (optional)"
                ],
                instructions: [
                    "Place one tortilla in a non-stick pan over medium heat",
                    "Sprinkle cheese and black beans on half the tortilla",
                    "Fold the other half over",
                    "Cook for 2-3 minutes until golden",
                    "Flip and cook the other side",
                    "Cut into wedges and serve with salsa and sour cream",
                    "Done in 5 minutes!"
                ]
            },
            {
                name: "Instant Ramen Upgrade",
                emoji: "🍜",
                description: "Transform basic ramen into something special with just a few additions - perfect for when you don't want to cook!",
                ingredients: [
                    "1 package instant ramen",
                    "1 soft-boiled egg",
                    "1 green onion, sliced",
                    "1/2 cup frozen vegetables",
                    "1 tsp sesame oil",
                    "Soy sauce to taste",
                    "Sriracha (optional)"
                ],
                instructions: [
                    "Cook ramen according to package directions",
                    "Add frozen vegetables in the last minute of cooking",
                    "Transfer to a bowl",
                    "Top with soft-boiled egg (halved)",
                    "Drizzle with sesame oil and soy sauce",
                    "Garnish with green onions",
                    "Add sriracha if you like it spicy",
                    "Enjoy your upgraded lazy meal!"
                ]
            },
            {
                name: "Microwave Mug Mac and Cheese",
                emoji: "☕",
                description: "Real mac and cheese in 5 minutes using just a mug and microwave. No pots, no cleanup, maximum laziness, maximum comfort!",
                ingredients: [
                    "1/3 cup elbow macaroni",
                    "1/3 cup water",
                    "2 tbsp milk",
                    "1/4 cup shredded cheddar cheese",
                    "1 tbsp cream cheese",
                    "Pinch of salt",
                    "Pinch of paprika"
                ],
                instructions: [
                    "Combine macaroni and water in a large microwave-safe mug",
                    "Microwave on high for 2 minutes, stir",
                    "Microwave another 1-2 minutes until pasta is cooked",
                    "Stir in milk, cheeses, salt, and paprika",
                    "Microwave 30 seconds more until cheese is melted",
                    "Stir well and let sit 1 minute",
                    "Enjoy directly from the mug - zero dishes!"
                ]
            },
            {
                name: "No-Cook Caprese Pasta Salad",
                emoji: "🍅",
                description: "Use leftover pasta, fresh mozzarella, tomatoes, and basil. Toss with olive oil - done in 2 minutes, zero cooking required!",
                ingredients: [
                    "2 cups cooked pasta (any shape, cold)",
                    "8 oz fresh mozzarella, cubed",
                    "1 cup cherry tomatoes, halved",
                    "1/4 cup fresh basil, torn",
                    "3 tbsp olive oil",
                    "1 tbsp balsamic vinegar",
                    "Salt and pepper to taste"
                ],
                instructions: [
                    "If you have leftover pasta, use it cold",
                    "If not, cook pasta, drain, and let cool completely",
                    "Toss pasta with mozzarella and tomatoes",
                    "Drizzle with olive oil and balsamic",
                    "Add basil, salt, and pepper",
                    "Toss gently and serve",
                    "The ultimate lazy, no-cook meal that still tastes amazing!"
                ]
            }
        ]
    };
}

// Database functions
function getMoods() {
    return db.prepare('SELECT * FROM moods').all();
}

function getRecipesByMood(moodName) {
    const mood = db.prepare('SELECT id FROM moods WHERE name = ?').get(moodName);
    if (!mood) return [];

    const recipes = db.prepare(`
        SELECT id, name, emoji, description 
        FROM recipes 
        WHERE mood_id = ?
    `).all(mood.id);

    return recipes.map(recipe => {
        const ingredients = db.prepare(`
            SELECT ingredient 
            FROM ingredients 
            WHERE recipe_id = ? 
            ORDER BY order_index
        `).all(recipe.id).map(row => row.ingredient);

        const instructions = db.prepare(`
            SELECT instruction 
            FROM instructions 
            WHERE recipe_id = ? 
            ORDER BY step_number
        `).all(recipe.id).map(row => row.instruction);

        return {
            id: recipe.id,
            name: recipe.name,
            emoji: recipe.emoji,
            description: recipe.description,
            ingredients,
            instructions
        };
    });
}

function getRandomRecipe(moodName, excludeIds = []) {
    const recipes = getRecipesByMood(moodName);
    if (recipes.length === 0) return null;

    const available = excludeIds.length > 0
        ? recipes.filter(r => !excludeIds.includes(r.id))
        : recipes;

    const pool = available.length > 0 ? available : recipes;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

function logMoodHistory(userId, mood, recipeId) {
    const stmt = db.prepare(`
        INSERT INTO mood_history (user_id, mood, recipe_id)
        VALUES (?, ?, ?)
    `);
    return stmt.run(userId, mood, recipeId);
}

function getRecentRecipeIdsForMood(userId, mood, limit = 5) {
    const stmt = db.prepare(`
        SELECT recipe_id FROM mood_history
        WHERE user_id = ? AND mood = ? AND recipe_id IS NOT NULL
        ORDER BY created_at DESC
        LIMIT ?
    `);
    return stmt.all(userId, mood, limit).map(row => row.recipe_id);
}

function getMoodHistory(userId) {
    const stmt = db.prepare(`
        SELECT mh.id, mh.mood, mh.recipe_id, r.name as recipe_name,
               r.emoji as recipe_emoji, mh.created_at
        FROM mood_history mh
        LEFT JOIN recipes r ON mh.recipe_id = r.id
        WHERE mh.user_id = ?
        ORDER BY mh.created_at DESC
        LIMIT 50
    `);
    return stmt.all(userId);
}

function saveRecipe(userId, recipeId) {
    const stmt = db.prepare(`
        INSERT OR IGNORE INTO user_saved_recipes (user_id, recipe_id)
        VALUES (?, ?)
    `);
    return stmt.run(userId, recipeId);
}

function unsaveRecipe(userId, savedId) {
    const stmt = db.prepare(`
        DELETE FROM user_saved_recipes
        WHERE id = ? AND user_id = ?
    `);
    return stmt.run(savedId, userId);
}

function getSavedRecipes(userId) {
    const stmt = db.prepare(`
        SELECT usr.id as saved_id, r.id, r.name, r.emoji, r.description,
               usr.saved_at
        FROM user_saved_recipes usr
        JOIN recipes r ON usr.recipe_id = r.id
        WHERE usr.user_id = ?
        ORDER BY usr.saved_at DESC
    `);
    return stmt.all(userId);
}

// Initialize database on module load
initDatabase();

module.exports = {
    getMoods,
    getRecipesByMood,
    getRandomRecipe,
    saveRecipe,
    unsaveRecipe,
    getSavedRecipes,
    logMoodHistory,
    getRecentRecipeIdsForMood,
    getMoodHistory
};
