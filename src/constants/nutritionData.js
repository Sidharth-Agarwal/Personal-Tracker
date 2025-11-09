/**
 * Nutrition Data for Eating Module
 * Common foods with calorie and macro information
 */

// Food categories
export const FOOD_CATEGORIES = {
  protein: {
    name: 'Protein',
    icon: '🍗',
    color: '#ef4444',
  },
  carbs: {
    name: 'Carbohydrates',
    icon: '🍞',
    color: '#f59e0b',
  },
  fruits: {
    name: 'Fruits',
    icon: '🍎',
    color: '#10b981',
  },
  vegetables: {
    name: 'Vegetables',
    icon: '🥦',
    color: '#22c55e',
  },
  dairy: {
    name: 'Dairy',
    icon: '🥛',
    color: '#3b82f6',
  },
  fats: {
    name: 'Fats & Oils',
    icon: '🥑',
    color: '#8b5cf6',
  },
  snacks: {
    name: 'Snacks',
    icon: '🍪',
    color: '#ec4899',
  },
  beverages: {
    name: 'Beverages',
    icon: '☕',
    color: '#6366f1',
  },
};

// Common foods database (per 100g unless specified)
export const COMMON_FOODS = {
  // Protein Sources
  chicken_breast: {
    name: 'Chicken Breast',
    category: 'protein',
    serving: '100g',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
  },
  chicken_thigh: {
    name: 'Chicken Thigh',
    category: 'protein',
    serving: '100g',
    calories: 209,
    protein: 26,
    carbs: 0,
    fats: 11,
  },
  eggs: {
    name: 'Eggs',
    category: 'protein',
    serving: '1 large (50g)',
    calories: 72,
    protein: 6,
    carbs: 0.6,
    fats: 5,
  },
  salmon: {
    name: 'Salmon',
    category: 'protein',
    serving: '100g',
    calories: 208,
    protein: 20,
    carbs: 0,
    fats: 13,
  },
  tuna: {
    name: 'Tuna (canned)',
    category: 'protein',
    serving: '100g',
    calories: 116,
    protein: 26,
    carbs: 0,
    fats: 1,
  },
  paneer: {
    name: 'Paneer',
    category: 'protein',
    serving: '100g',
    calories: 265,
    protein: 18,
    carbs: 3,
    fats: 20,
  },
  
  // Carbohydrates
  white_rice: {
    name: 'White Rice (cooked)',
    category: 'carbs',
    serving: '100g',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
  },
  brown_rice: {
    name: 'Brown Rice (cooked)',
    category: 'carbs',
    serving: '100g',
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fats: 0.9,
  },
  roti: {
    name: 'Roti/Chapati',
    category: 'carbs',
    serving: '1 medium (40g)',
    calories: 104,
    protein: 3,
    carbs: 18,
    fats: 2.5,
  },
  oats: {
    name: 'Oats',
    category: 'carbs',
    serving: '100g',
    calories: 389,
    protein: 17,
    carbs: 66,
    fats: 7,
  },
  bread_whole_wheat: {
    name: 'Whole Wheat Bread',
    category: 'carbs',
    serving: '1 slice (30g)',
    calories: 80,
    protein: 4,
    carbs: 14,
    fats: 1,
  },
  pasta: {
    name: 'Pasta (cooked)',
    category: 'carbs',
    serving: '100g',
    calories: 131,
    protein: 5,
    carbs: 25,
    fats: 1.1,
  },
  sweet_potato: {
    name: 'Sweet Potato',
    category: 'carbs',
    serving: '100g',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fats: 0.1,
  },
  
  // Fruits
  banana: {
    name: 'Banana',
    category: 'fruits',
    serving: '1 medium (120g)',
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fats: 0.4,
  },
  apple: {
    name: 'Apple',
    category: 'fruits',
    serving: '1 medium (180g)',
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fats: 0.3,
  },
  mango: {
    name: 'Mango',
    category: 'fruits',
    serving: '100g',
    calories: 60,
    protein: 0.8,
    carbs: 15,
    fats: 0.4,
  },
  orange: {
    name: 'Orange',
    category: 'fruits',
    serving: '1 medium (130g)',
    calories: 62,
    protein: 1.2,
    carbs: 15,
    fats: 0.2,
  },
  
  // Vegetables
  broccoli: {
    name: 'Broccoli',
    category: 'vegetables',
    serving: '100g',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fats: 0.4,
  },
  spinach: {
    name: 'Spinach',
    category: 'vegetables',
    serving: '100g',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
  },
  tomato: {
    name: 'Tomato',
    category: 'vegetables',
    serving: '1 medium (120g)',
    calories: 22,
    protein: 1.1,
    carbs: 4.8,
    fats: 0.2,
  },
  
  // Dairy
  milk_whole: {
    name: 'Whole Milk',
    category: 'dairy',
    serving: '1 cup (240ml)',
    calories: 149,
    protein: 8,
    carbs: 12,
    fats: 8,
  },
  milk_skim: {
    name: 'Skim Milk',
    category: 'dairy',
    serving: '1 cup (240ml)',
    calories: 83,
    protein: 8,
    carbs: 12,
    fats: 0.2,
  },
  yogurt_plain: {
    name: 'Plain Yogurt',
    category: 'dairy',
    serving: '100g',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fats: 0.4,
  },
  greek_yogurt: {
    name: 'Greek Yogurt',
    category: 'dairy',
    serving: '100g',
    calories: 97,
    protein: 9,
    carbs: 4,
    fats: 5,
  },
  
  // Fats & Oils
  olive_oil: {
    name: 'Olive Oil',
    category: 'fats',
    serving: '1 tbsp (15ml)',
    calories: 119,
    protein: 0,
    carbs: 0,
    fats: 14,
  },
  peanut_butter: {
    name: 'Peanut Butter',
    category: 'fats',
    serving: '2 tbsp (32g)',
    calories: 188,
    protein: 8,
    carbs: 7,
    fats: 16,
  },
  almonds: {
    name: 'Almonds',
    category: 'fats',
    serving: '28g (23 nuts)',
    calories: 164,
    protein: 6,
    carbs: 6,
    fats: 14,
  },
  avocado: {
    name: 'Avocado',
    category: 'fats',
    serving: '1/2 medium (68g)',
    calories: 114,
    protein: 1.3,
    carbs: 6,
    fats: 10.5,
  },
  
  // Beverages
  coffee_black: {
    name: 'Black Coffee',
    category: 'beverages',
    serving: '1 cup (240ml)',
    calories: 2,
    protein: 0.3,
    carbs: 0,
    fats: 0,
  },
  tea: {
    name: 'Tea (no sugar)',
    category: 'beverages',
    serving: '1 cup (240ml)',
    calories: 2,
    protein: 0,
    carbs: 0.7,
    fats: 0,
  },
  protein_shake: {
    name: 'Protein Shake',
    category: 'beverages',
    serving: '1 scoop (30g)',
    calories: 120,
    protein: 24,
    carbs: 3,
    fats: 1.5,
  },
};

// Meal types
export const MEAL_TYPES = {
  breakfast: {
    name: 'Breakfast',
    icon: '🌅',
    timeRange: '6:00 - 10:00',
  },
  lunch: {
    name: 'Lunch',
    icon: '🌞',
    timeRange: '12:00 - 14:00',
  },
  dinner: {
    name: 'Dinner',
    icon: '🌙',
    timeRange: '19:00 - 21:00',
  },
  snack: {
    name: 'Snack',
    icon: '🍎',
    timeRange: 'Anytime',
  },
};

// Water intake tracking
export const WATER_INTAKE = {
  glass: { amount: 250, unit: 'ml', label: 'Glass' },
  bottle: { amount: 500, unit: 'ml', label: 'Bottle' },
  liter: { amount: 1000, unit: 'ml', label: 'Liter' },
};

// Daily water goal (ml)
export const DEFAULT_WATER_GOAL = 3000; // 3 liters

/**
 * Get food details by key
 * @param {string} foodKey - Food key
 * @returns {object|null} Food object
 */
export const getFoodDetails = (foodKey) => {
  return COMMON_FOODS[foodKey] || null;
};

/**
 * Get foods by category
 * @param {string} category - Category key
 * @returns {array} Array of food objects
 */
export const getFoodsByCategory = (category) => {
  return Object.entries(COMMON_FOODS)
    .filter(([_, food]) => food.category === category)
    .map(([key, food]) => ({ key, ...food }));
};

/**
 * Search foods by name
 * @param {string} query - Search query
 * @returns {array} Array of matching foods
 */
export const searchFoods = (query) => {
  const lowerQuery = query.toLowerCase();
  return Object.entries(COMMON_FOODS)
    .filter(([_, food]) => food.name.toLowerCase().includes(lowerQuery))
    .map(([key, food]) => ({ key, ...food }));
};

/**
 * Calculate total macros from food items
 * @param {array} foods - Array of food items with quantities
 * @returns {object} Total calories and macros
 */
export const calculateTotalMacros = (foods) => {
  return foods.reduce((total, item) => {
    const food = COMMON_FOODS[item.foodKey];
    const multiplier = item.quantity || 1;
    
    return {
      calories: total.calories + (food.calories * multiplier),
      protein: total.protein + (food.protein * multiplier),
      carbs: total.carbs + (food.carbs * multiplier),
      fats: total.fats + (food.fats * multiplier),
    };
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
};