import React, { useState } from 'react';
import './App.css';

type IngredientEnergy = {
  [key: string]: number;
};

type IngredientNutrition = {
  [key: string]: number;
};

// Energy values for each ingredient (kcal/100g)
const INGREDIENT_ENERGY: IngredientEnergy = {
  // Meats
  'Chicken breast': 120,
  'Pork': 263,
  'Beef': 198,
  'Turkey': 148,
  'Tuna': 109,
  'Salmon': 120,
  'Lamb': 282,
  'Duck': 135,
  'Rabbit': 136,
  'Goat': 109,
  'Sardine': 208,
  'Deer': 157,
  'Quail': 134,
  'Goose': 161,
  'Mackerel': 158,
  'Ostrich': 165,
  'Chicken heart': 579.55,
  'Shrimp': 85,
  'Mussel': 86,
  'Cod': 82,
  'Herring': 158,

  // Carbons (in Google Sheet order)
  'Rice': 366,
  'Corn': 365,
  'Barley': 354,
  'Spaghetti': 130,
  'Potato': 69,
  'Oat': 246,
  'Tapioca': 358,
  'Millet': 378,
  'Quinoa': 368,
  'Sorghum': 329,
  'Rye': 338,
  'Buckwheat': 343,
  'Lentils': 352,
  'Chickpeas': 378,
  'Sweet potato': 86,
  'Cassava': 160,

  // Vegetables (in Google Sheet order)
  'Carrot': 41,
  'Peas': 81,
  'Brussel sprouts': 43,
  'Pumpkin': 26,
  'Spinach': 23,
  'Broccoli': 34,
  'Zucchini': 17,
  'Green bean': 31,
  'Cauliflower': 25,
  'Beet': 43,
  'Kale': 35,
  'Cucumber': 15,
  'Squash': 16,
  'Parsnip': 75,
  'Celery': 14,
  'Sweet pepper': 20,
  'Tomato': 18,
  'Eggplant': 25,

  // Others (in Google Sheet order)
  'Egg': 52,
  'Cheese': 371,
  'Plain yogurt': 63,
  'Peanut butter': 590,
  'Strawberry': 32,
  'Blueberry': 57,
  'Chia seed': 486,
  'Flaxseed': 534,
  'Coconut oil': 892,
  'Egg shell': 0
};

// Add protein values for each ingredient (g/100g)
const INGREDIENT_PROTEIN: IngredientNutrition = {
  // Meats (in Google Sheet order)
  'Chicken breast': 22.5,
  'Pork': 16.9,
  'Beef': 19.4,
  'Turkey': 19.7,
  'Tuna': 24.4,
  'Salmon': 20.1,
  'Lamb': 16.6,
  'Duck': 18.3,
  'Rabbit': 20,
  'Goat': 20.6,
  'Sardine': 24.6,
  'Deer': 21.8,
  'Quail': 21.8,
  'Goose': 22.8,
  'Mackerel': 20.1,
  'Ostrich': 20.2,
  'Chicken heart': 59.1,
  'Shrimp': 20.1,
  'Mussel': 11.9,
  'Cod': 17.8,
  'Herring': 18.0,

  // Carbons (in Google Sheet order)
  'Rice': 5.95,
  'Corn': 9.42,
  'Barley': 12.5,
  'Spaghetti': 4.58,
  'Potato': 1.68,
  'Oat': 17.3,
  'Tapioca': 0.19,
  'Millet': 11.0,
  'Quinoa': 14.1,
  'Sorghum': 10.6,
  'Rye': 10.3,
  'Buckwheat': 13.2,
  'Lentils': 24.6,
  'Chickpeas': 20.5,
  'Sweet potato': 1.57,
  'Cassava': 1.36,

  // Vegetables (in Google Sheet order)
  'Carrot': 0.93,
  'Peas': 5.42,
  'Brussel sprouts': 3.38,
  'Pumpkin': 1.0,
  'Spinach': 2.86,
  'Broccoli': 2.82,
  'Zucchini': 1.21,
  'Green bean': 1.83,
  'Cauliflower': 1.92,
  'Beet': 1.61,
  'Kale': 2.92,
  'Cucumber': 0.65,
  'Squash': 1.21,
  'Parsnip': 1.2,
  'Celery': 0.69,
  'Sweet pepper': 0.86,
  'Tomato': 0.88,
  'Eggplant': 0.98,

  // Others (in Google Sheet order)
  'Egg': 10.9,
  'Cheese': 23.2,
  'Plain yogurt': 5.25,
  'Peanut butter': 24.0,
  'Strawberry': 0.67,
  'Blueberry': 0.74,
  'Chia seed': 16.5,
  'Flaxseed': 18.3,
  'Coconut oil': 0.0,
  'Egg shell': 0.0
};

// Add vitamin D values for each ingredient (IU/100g)
const INGREDIENT_VITAMIN_D: IngredientNutrition = {
  // Meats (in Google Sheet order)
  'Chicken breast': 1,
  'Pork': 0,
  'Beef': 0,
  'Turkey': 14,
  'Tuna': 69,
  'Salmon': 0,
  'Lamb': 2,
  'Duck': 3,
  'Rabbit': 0,
  'Goat': 0,
  'Sardine': 193,
  'Deer': 0,
  'Quail': 0,
  'Goose': 0,
  'Mackerel': 366,
  'Ostrich': 0,
  'Chicken heart': 0,
  'Shrimp': 0,
  'Mussel': 0,
  'Cod': 36,
  'Herring': 167,

  // Carbons (in Google Sheet order)
  'Rice': 0,
  'Corn': 0,
  'Barley': 0,
  'Spaghetti': 0,
  'Potato': 0,
  'Oat': 0,
  'Tapioca': 0,
  'Millet': 0,
  'Quinoa': 0,
  'Sorghum': 0,
  'Rye': 0,
  'Buckwheat': 0,
  'Lentils': 0,
  'Chickpeas': 0,
  'Sweet potato': 0,
  'Cassava': 0,

  // Vegetables (in Google Sheet order)
  'Carrot': 0,
  'Peas': 0,
  'Brussel sprouts': 0,
  'Pumpkin': 0,
  'Spinach': 0,
  'Broccoli': 0,
  'Zucchini': 0,
  'Green bean': 0,
  'Cauliflower': 0,
  'Beet': 0,
  'Kale': 0,
  'Cucumber': 0,
  'Squash': 0,
  'Parsnip': 0,
  'Celery': 0,
  'Sweet pepper': 0,
  'Tomato': 0,
  'Eggplant': 0,

  // Others (in Google Sheet order)
  'Egg': 0,
  'Cheese': 22,
  'Plain yogurt': 1,
  'Peanut butter': 0,
  'Strawberry': 0,
  'Blueberry': 0,
  'Chia seed': 0,
  'Flaxseed': 0,
  'Coconut oil': 0,
  'Egg shell': 0
};

// Add fat values for each ingredient (g/100g)
const INGREDIENT_FAT: IngredientNutrition = {
  // Meats (in Google Sheet order)
  'Chicken breast': 2.62,
  'Pork': 21.2,
  'Beef': 12.7,
  'Turkey': 7.66,
  'Tuna': 0.49,
  'Salmon': 3.77,
  'Lamb': 23.4,
  'Duck': 5.95,
  'Rabbit': 5.55,
  'Goat': 2.31,
  'Sardine': 11.4,
  'Deer': 7.13,
  'Quail': 4.53,
  'Goose': 7.13,
  'Mackerel': 7.89,
  'Ostrich': 8.7,
  'Chicken heart': 35.34,
  'Shrimp': 0.51,
  'Mussel': 2.24,
  'Cod': 0.67,
  'Herring': 9.04,

  // Carbons (in Google Sheet order)
  'Rice': 1.42,
  'Corn': 4.74,
  'Barley': 2.3,
  'Spaghetti': 0.63,
  'Potato': 0.1,
  'Oat': 7.03,
  'Tapioca': 0.02,
  'Millet': 4.22,
  'Quinoa': 6.07,
  'Sorghum': 3.46,
  'Rye': 1.63,
  'Buckwheat': 3.4,
  'Lentils': 1.06,
  'Chickpeas': 6.04,
  'Sweet potato': 0.05,
  'Cassava': 0.28,

  // Vegetables (in Google Sheet order)
  'Carrot': 0.24,
  'Peas': 0.4,
  'Brussel sprouts': 0.3,
  'Pumpkin': 0.1,
  'Spinach': 0.39,
  'Broccoli': 0.37,
  'Zucchini': 0.32,
  'Green bean': 0.22,
  'Cauliflower': 0.28,
  'Beet': 0.17,
  'Kale': 1.49,
  'Cucumber': 0.11,
  'Squash': 0.18,
  'Parsnip': 0.3,
  'Celery': 0.17,
  'Sweet pepper': 0.17,
  'Tomato': 0.2,
  'Eggplant': 0.18,

  // Others (in Google Sheet order)
  'Egg': 0.17,
  'Cheese': 29.7,
  'Plain yogurt': 1.55,
  'Peanut butter': 49.9,
  'Strawberry': 0.3,
  'Blueberry': 0.33,
  'Chia seed': 30.7,
  'Flaxseed': 42.2,
  'Coconut oil': 99.1,
  'Egg shell': 0.0
};

// Add water values for each ingredient (g/100g)
const INGREDIENT_WATER: IngredientNutrition = {
  // Meats (in Google Sheet order)
  'Chicken breast': 73.9,
  'Pork': 61.1,
  'Beef': 67.1,
  'Turkey': 72.4,
  'Tuna': 74.0,
  'Salmon': 75.4,
  'Lamb': 59.5,
  'Duck': 73.8,
  'Rabbit': 72.8,
  'Goat': 75.8,
  'Sardine': 59.6,
  'Deer': 71.2,
  'Quail': 70.0,
  'Goose': 68.3,
  'Mackerel': 70.2,
  'Ostrich': 71.1,
  'Chicken heart': 73.6,
  'Shrimp': 78.4,
  'Mussel': 80.6,
  'Cod': 81.2,
  'Herring': 72.0,

  // Carbons (in Google Sheet order)
  'Rice': 11.9,
  'Corn': 10.4,
  'Barley': 9.44,
  'Spaghetti': 68.1,
  'Potato': 81.6,
  'Oat': 6.55,
  'Tapioca': 11.0,
  'Millet': 8.67,
  'Quinoa': 13.3,
  'Sorghum': 12.4,
  'Rye': 10.6,
  'Buckwheat': 9.75,
  'Lentils': 8.26,
  'Chickpeas': 7.68,
  'Sweet potato': 77.3,
  'Cassava': 59.7,

  // Vegetables (in Google Sheet order)
  'Carrot': 88.3,
  'Peas': 78.9,
  'Brussel sprouts': 86.0,
  'Pumpkin': 91.6,
  'Spinach': 91.4,
  'Broccoli': 89.3,
  'Zucchini': 94.8,
  'Green bean': 90.3,
  'Cauliflower': 92.1,
  'Beet': 87.6,
  'Kale': 89.6,
  'Cucumber': 95.2,
  'Squash': 94.6,
  'Parsnip': 79.5,
  'Celery': 95.4,
  'Sweet pepper': 93.9,
  'Tomato': 94.5,
  'Eggplant': 92.3,

  // Others (in Google Sheet order)
  'Egg': 87.6,
  'Cheese': 41.1,
  'Plain yogurt': 85.1,
  'Peanut butter': 1.1,
  'Strawberry': 91.0,
  'Blueberry': 84.2,
  'Chia seed': 5.8,
  'Flaxseed': 6.96,
  'Coconut oil': 0.03,
  'Egg shell': 0.0
};

// Add calcium values for each ingredient (mg/100g)
const INGREDIENT_CALCIUM: IngredientNutrition = {
  // Meats (in Google Sheet order)
  'Chicken breast': 5,
  'Pork': 14,
  'Beef': 12,
  'Turkey': 19,
  'Tuna': 4,
  'Salmon': 11,
  'Lamb': 16,
  'Duck': 11,
  'Rabbit': 13,
  'Goat': 13,
  'Sardine': 382,
  'Deer': 11,
  'Quail': 13,
  'Goose': 13,
  'Mackerel': 23,
  'Ostrich': 7,
  'Chicken heart': 45.45,
  'Shrimp': 64,
  'Mussel': 26,
  'Cod': 16,
  'Herring': 57,

  // Carbons (in Google Sheet order)
  'Rice': 10,
  'Corn': 7,
  'Barley': 33,
  'Spaghetti': 30,
  'Potato': 9,
  'Oat': 58,
  'Tapioca': 20,
  'Millet': 8,
  'Quinoa': 47,
  'Sorghum': 13,
  'Rye': 24,
  'Buckwheat': 18,
  'Lentils': 35,
  'Chickpeas': 57,
  'Sweet potato': 30,
  'Cassava': 16,

  // Vegetables (in Google Sheet order)
  'Carrot': 33,
  'Peas': 25,
  'Brussel sprouts': 42,
  'Pumpkin': 21,
  'Spinach': 99,
  'Broccoli': 47,
  'Zucchini': 16,
  'Green bean': 37,
  'Cauliflower': 22,
  'Beet': 16,
  'Kale': 254,
  'Cucumber': 16,
  'Squash': 15,
  'Parsnip': 36,
  'Celery': 40,
  'Sweet pepper': 10,
  'Tomato': 10,
  'Eggplant': 9,

  // Others (in Google Sheet order)
  'Egg': 7,
  'Cheese': 674,
  'Plain yogurt': 183,
  'Peanut butter': 41,
  'Strawberry': 16,
  'Blueberry': 6,
  'Chia seed': 631,
  'Flaxseed': 255,
  'Coconut oil': 1,
  'Egg shell': 40000
};

// Add phosphorus values for each ingredient (mg/100g)
const INGREDIENT_PHOSPHORUS: IngredientNutrition = {
  // Meats (in Google Sheet order)
  'Chicken breast': 213,
  'Pork': 175,
  'Beef': 175,
  'Turkey': 200,
  'Tuna': 278,
  'Salmon': 283,
  'Lamb': 157,
  'Duck': 203,
  'Rabbit': 213,
  'Goat': 180,
  'Sardine': 490,
  'Deer': 252,
  'Quail': 307,
  'Goose': 312,
  'Mackerel': 125,
  'Ostrich': 199,
  'Chicken heart': 670.45,
  'Shrimp': 214,
  'Mussel': 197,
  'Cod': 203,
  'Herring': 236,

  // Carbons (in Google Sheet order)
  'Rice': 98,
  'Corn': 210,
  'Barley': 264,
  'Spaghetti': 108,
  'Potato': 62,
  'Oat': 734,
  'Tapioca': 7,
  'Millet': 285,
  'Quinoa': 457,
  'Sorghum': 289,
  'Rye': 332,
  'Buckwheat': 347,
  'Lentils': 281,
  'Chickpeas': 252,
  'Sweet potato': 47,
  'Cassava': 27,

  // Vegetables (in Google Sheet order)
  'Carrot': 35,
  'Peas': 108,
  'Brussel sprouts': 69,
  'Pumpkin': 44,
  'Spinach': 49,
  'Broccoli': 66,
  'Zucchini': 38,
  'Green bean': 38,
  'Cauliflower': 44,
  'Beet': 40,
  'Kale': 55,
  'Cucumber': 24,
  'Squash': 38,
  'Parsnip': 71,
  'Celery': 24,
  'Sweet pepper': 20,
  'Tomato': 24,
  'Eggplant': 24,

  // Others (in Google Sheet order)
  'Egg': 15,
  'Cheese': 451,
  'Plain yogurt': 144,
  'Peanut butter': 317,
  'Strawberry': 24,
  'Blueberry': 12,
  'Chia seed': 860,
  'Flaxseed': 642,
  'Coconut oil': 1,
  'Egg shell': 0
};

const INGREDIENTS = {
  meats: [
    'Chicken breast', 'Pork', 'Beef', 'Turkey', 'Tuna', 'Salmon', 'Lamb', 'Duck', 'Rabbit', 'Goat', 'Sardine', 'Deer', 'Quail', 'Goose', 'Mackerel',
    'Ostrich', 'Chicken heart', 'Shrimp', 'Mussel', 'Cod', 'Herring'
  ],
  carbons: [
    'Rice', 'Corn', 'Barley', 'Spaghetti', 'Potato', 'Oat', 'Tapioca', 'Millet', 'Quinoa',
    'Sorghum', 'Rye', 'Buckwheat', 'Lentils', 'Chickpeas', 'Sweet potato', 'Cassava'
  ],
  vegetables: [
    'Carrot', 'Peas', 'Brussel sprouts', 'Pumpkin', 'Spinach', 'Broccoli', 'Zucchini', 'Green bean',
    'Cauliflower', 'Beet', 'Kale', 'Cucumber', 'Squash', 'Parsnip', 'Celery',
    'Sweet pepper', 'Tomato', 'Eggplant'
  ],
  others: [
    'Egg', 'Cheese', 'Plain yogurt', 'Peanut butter', 'Strawberry', 'Blueberry', 'Chia seed', 'Flaxseed', 'Coconut oil', 'Egg shell'
  ],
  all: [
    // All ingredients combined in the same order as Google Sheet
    'Chicken breast', 'Pork', 'Beef', 'Turkey', 'Tuna', 'Salmon', 'Lamb', 'Duck', 'Rabbit', 'Goat', 'Sardine', 'Deer', 'Quail', 'Goose', 'Mackerel',
    'Ostrich', 'Chicken heart', 'Shrimp', 'Mussel', 'Cod', 'Herring',
    'Rice', 'Corn', 'Barley', 'Spaghetti', 'Potato', 'Oat', 'Tapioca', 'Millet', 'Quinoa',
    'Sorghum', 'Rye', 'Buckwheat', 'Lentils', 'Chickpeas', 'Sweet potato', 'Cassava',
    'Carrot', 'Peas', 'Brussel sprouts', 'Pumpkin', 'Spinach', 'Broccoli', 'Zucchini', 'Green bean',
    'Cauliflower', 'Beet', 'Kale', 'Cucumber', 'Squash', 'Parsnip', 'Celery',
    'Sweet pepper', 'Tomato', 'Eggplant',
    'Egg', 'Cheese', 'Plain yogurt', 'Peanut butter', 'Strawberry', 'Blueberry', 'Chia seed', 'Flaxseed', 'Coconut oil', 'Egg shell'
  ]
};

// Add simple recipe suggestions with advantages
const SIMPLE_SUGGESTIONS = {
  dog: [
    { 
      meats: ["Mackerel", "Sardine"], 
      carbons: ["Oat", "Quinoa"], 
      vegetables: ["Spinach"], 
      others: ["Cheese"],
      advantage: "Optimal Protein & High Vitamin D"
    },
    { 
      meats: ["Chicken heart", "Turkey"], 
      carbons: ["Lentils"], 
      vegetables: ["Kale", "Peas"], 
      others: ["Chia seed", "Flaxseed"],
      advantage: "Max Protein & Healthy Fats"
    },
    { 
      meats: ["Herring", "Tuna"], 
      carbons: ["Chickpeas", "Buckwheat"], 
      vegetables: ["Broccoli"], 
      others: ["Cheese", "Plain yogurt"],
      advantage: "High Vitamin D & Balanced"
    },
    { 
      meats: ["Sardine", "Chicken heart"], 
      carbons: ["Oat"], 
      vegetables: ["Spinach", "Kale"], 
      others: ["Peanut butter"],
      advantage: "Protein Rich & Vitamin D"
    },
    { 
      meats: ["Mackerel", "Turkey", "Cod"], 
      carbons: ["Quinoa"], 
      vegetables: ["Peas"], 
      others: ["Chia seed", "Cheese"],
      advantage: "Triple Protein & Vitamin D"
    }
  ],
  cat: [
    { 
      meats: ["Tuna", "Sardine"], 
      carbons: ["Lentils"], 
      vegetables: ["Spinach"], 
      others: ["Cheese", "Flaxseed"],
      advantage: "High Protein & Vitamin D"
    },
    { 
      meats: ["Mackerel", "Chicken heart"], 
      carbons: ["Chickpeas", "Oat"], 
      vegetables: ["Kale"], 
      others: ["Peanut butter"],
      advantage: "Max Protein & Fat Balance"
    },
    { 
      meats: ["Herring", "Turkey"], 
      carbons: ["Quinoa"], 
      vegetables: ["Peas", "Broccoli"], 
      others: ["Cheese", "Chia seed"],
      advantage: "Vitamin D Rich & Complete"
    },
    { 
      meats: ["Sardine", "Tuna", "Cod"], 
      carbons: ["Lentils"], 
      vegetables: ["Spinach"], 
      others: ["Flaxseed"],
      advantage: "Triple Fish & Optimal Ratios"
    },
    { 
      meats: ["Chicken heart", "Mackerel"], 
      carbons: ["Oat", "Buckwheat"], 
      vegetables: ["Kale"], 
      others: ["Cheese", "Peanut butter"],
      advantage: "Organ Meat & High Fat"
    }
  ]
};

const GROUPS = ['meats', 'carbons', 'vegetables', 'others'] as const;
type Group = typeof GROUPS[number];

// Cooking method calorie adjustments
const COOKING_METHOD_MULTIPLIERS = {
  'pan-fried': 0.8,   // calories * 0.8
  'steamed': 1.0,     // calories * 1 (no change)
  'oven': 0.95        // calories * 0.95
};

const calculateNutritionalValues = (ingredientAmounts: { [key: string]: number }) => {
  // Calculate total weight of all ingredients
  const totalWeight = Object.values(ingredientAmounts).reduce((sum, amount) => sum + amount, 0);
  
  // Calculate total protein, fat, vitamin D, calcium, and phosphorus from ingredients
  let totalProtein = 0;
  let totalFat = 0;
  let totalVitaminD = 0;
  let totalCalcium = 0;
  let totalPhosphorus = 0;
  let totalWaterWeight = 0;
  
  Object.entries(ingredientAmounts).forEach(([ingredient, amount]) => {
    const proteinPer100g = INGREDIENT_PROTEIN[ingredient];
    const fatPer100g = INGREDIENT_FAT[ingredient];
    const vitaminDPer100g = INGREDIENT_VITAMIN_D[ingredient];
    const calciumPer100g = INGREDIENT_CALCIUM[ingredient];
    const phosphorusPer100g = INGREDIENT_PHOSPHORUS[ingredient];
    const waterPer100g = INGREDIENT_WATER[ingredient];
    
    totalProtein += (proteinPer100g * amount) / 100;
    totalFat += (fatPer100g * amount) / 100;
    totalVitaminD += (vitaminDPer100g * amount) / 100;
    totalCalcium += (calciumPer100g * amount) / 100;
    totalPhosphorus += (phosphorusPer100g * amount) / 100;
    totalWaterWeight += (waterPer100g * amount) / 100;
  });

  // Calculate dry matter weight
  const dryMatterWeight = totalWeight - totalWaterWeight;

  // Calculate target values based on dry matter weight
  const targetProtein = dryMatterWeight * 0.30; // 30% of dry matter
  const targetFat = dryMatterWeight * 0.17; // 17% of dry matter
  const targetVitaminD = (totalWeight * 0.586) / 100; // 0.586 IU per 100g

  // Calculate moisture content
  const moistureContent = (totalWaterWeight / totalWeight) * 100;

  return {
    totalWeight,
    totalProtein,
    totalFat,
    totalVitaminD,
    totalCalcium,
    totalPhosphorus,
    targetProtein,
    targetFat,
    targetVitaminD,
    moistureContent,
    dryMatterWeight
  };
};

const calculateOptimalAmounts = (
  ingredients: string[],
  categoryCalories: number,

) => {
  if (ingredients.length === 1) {
    // If only one ingredient, use simple calorie-based calculation
    const energyPer100g = INGREDIENT_ENERGY[ingredients[0]];
    const amount = (categoryCalories / energyPer100g) * 100;
    return { [ingredients[0]]: Math.round(amount) };
  }

  // Calculate nutritional values per 100g for each ingredient
  const ingredientNutrition = ingredients.map(ingredient => ({
    name: ingredient,
    energy: INGREDIENT_ENERGY[ingredient],
    protein: INGREDIENT_PROTEIN[ingredient],
    fat: INGREDIENT_FAT[ingredient],
    vitaminD: INGREDIENT_VITAMIN_D[ingredient],
    calcium: INGREDIENT_CALCIUM[ingredient],
    phosphorus: INGREDIENT_PHOSPHORUS[ingredient],
    water: INGREDIENT_WATER[ingredient]
  }));

  let bestCombination = null;
  let maxTargetsMet = -1;

  if (ingredients.length === 2) {
    // For two ingredients, try multiple distributions
    const distributions = [
      [0.3, 0.7],
      [0.7, 0.3],
      [0.9, 0.1],
      [0.5, 0.5],
      [0.1, 0.9],
      [0.2, 0.8],  // Added more distributions to try
      [0.8, 0.2],
      [0.4, 0.6],
      [0.6, 0.4]
    ];

    distributions.forEach(distribution => {
      const amounts: { [key: string]: number } = {};
      let totalAmount = 0;

      // Calculate amounts based on distribution
      ingredients.forEach((ingredient, index) => {
        const amount = (categoryCalories * distribution[index]) / 
                      INGREDIENT_ENERGY[ingredient] * 100;
        amounts[ingredient] = amount;
        totalAmount += amount;
      });

      // Calculate nutritional values
      let totalProtein = 0;
      let totalFat = 0;
      let totalVitaminD = 0;
      let totalCalcium = 0;
      let totalPhosphorus = 0;
      let totalWater = 0;

      Object.entries(amounts).forEach(([ingredient, amount]) => {
        const nutrition = ingredientNutrition.find(n => n.name === ingredient);
        if (nutrition) {
          totalProtein += (nutrition.protein * amount) / 100;
          totalFat += (nutrition.fat * amount) / 100;
          totalVitaminD += (nutrition.vitaminD * amount) / 100;
          totalCalcium += (nutrition.calcium * amount) / 100;
          totalPhosphorus += (nutrition.phosphorus * amount) / 100;
          totalWater += (nutrition.water * amount) / 100;
        }
      });

      const dryMatter = totalAmount - totalWater;
      const proteinRatio = totalProtein / dryMatter;
      const fatRatio = totalFat / dryMatter;
      const vitaminDRatio = totalVitaminD / totalAmount;
      const calciumPhosphorusRatio = totalCalcium / totalPhosphorus;

      // Count how many targets are met (considering 80-120% range as acceptable)
      let targetsMet = 0;
      
      // Protein scoring (20 points)
      if (proteinRatio >= 0.24 && proteinRatio <= 0.36) targetsMet += 20;
      else if (proteinRatio >= 0.20 && proteinRatio <= 0.40) targetsMet += 10;
      else if (proteinRatio >= 0.15 && proteinRatio <= 0.45) targetsMet += 5;

      // Fat scoring (30 points) - Increased importance
      if (fatRatio >= 0.136 && fatRatio <= 0.204) targetsMet += 30;
      else if (fatRatio >= 0.12 && fatRatio <= 0.22) targetsMet += 20;
      else if (fatRatio >= 0.10 && fatRatio <= 0.24) targetsMet += 10;

      // Vitamin D scoring (10 points)
      if (Math.abs(vitaminDRatio - 0.0059) <= 0.001) targetsMet += 10;
      else if (Math.abs(vitaminDRatio - 0.0059) <= 0.002) targetsMet += 5;

      // Calcium to Phosphorus ratio scoring (30 points)
      if (calciumPhosphorusRatio >= 1.1 && calciumPhosphorusRatio <= 1.2) targetsMet += 30;
      else if ((calciumPhosphorusRatio >= 0.9 && calciumPhosphorusRatio <= 1.1) || 
               (calciumPhosphorusRatio >= 1.2 && calciumPhosphorusRatio <= 1.5)) targetsMet += 20;

      if (targetsMet > maxTargetsMet) {
        maxTargetsMet = targetsMet;
        bestCombination = amounts;
      }
    });
  } else if (ingredients.length === 3) {
    // For three ingredients, try multiple distributions
    type Distribution = [number, number, number];
    const distributions: Distribution[] = [
      [0.6, 0.2, 0.2],  // Original case 1
      [0.2, 0.6, 0.2],  // Original case 2
      [0.2, 0.2, 0.6],  // Original case 3
      [0.4, 0.4, 0.2],  // New case 1
      [0.4, 0.2, 0.4],  // New case 2
      [0.2, 0.4, 0.4],  // New case 3
      [0.8, 0.1, 0.1],  // New case 4
      [0.1, 0.8, 0.1],  // New case 5
      [0.1, 0.1, 0.8]   // New case 6
    ];

    distributions.forEach((distribution: Distribution) => {
      const amounts: { [key: string]: number } = {};
      let totalAmount = 0;

      // Calculate amounts based on distribution
      ingredients.forEach((ingredient, index) => {
        const ratio = distribution[index];
        const amount = (categoryCalories * ratio) / 
                      INGREDIENT_ENERGY[ingredient] * 100;
        amounts[ingredient] = amount;
        totalAmount += amount;
      });

      // Calculate nutritional values
      let totalProtein = 0;
      let totalFat = 0;
      let totalVitaminD = 0;
      let totalCalcium = 0;
      let totalPhosphorus = 0;
      let totalWater = 0;

      Object.entries(amounts).forEach(([ingredient, amount]) => {
        const nutrition = ingredientNutrition.find(n => n.name === ingredient);
        if (nutrition) {
          totalProtein += (nutrition.protein * amount) / 100;
          totalFat += (nutrition.fat * amount) / 100;
          totalVitaminD += (nutrition.vitaminD * amount) / 100;
          totalCalcium += (nutrition.calcium * amount) / 100;
          totalPhosphorus += (nutrition.phosphorus * amount) / 100;
          totalWater += (nutrition.water * amount) / 100;
        }
      });

      const dryMatter = totalAmount - totalWater;
      const proteinRatio = totalProtein / dryMatter;
      const fatRatio = totalFat / dryMatter;
      const vitaminDRatio = totalVitaminD / totalAmount;
      const calciumPhosphorusRatio = totalCalcium / totalPhosphorus;

      // Count how many targets are met (considering 80-120% range as acceptable)
      let targetsMet = 0;
      if (proteinRatio >= 0.24 && proteinRatio <= 0.36) targetsMet += 30; // Protein is most important
      if (fatRatio >= 0.136 && fatRatio <= 0.204) targetsMet += 20;      // Fat is second
      if (Math.abs(vitaminDRatio - 0.0059) <= 0.001) targetsMet += 10;   // Vitamin D is least important
      if (calciumPhosphorusRatio >= 1.1 && calciumPhosphorusRatio <= 1.2) targetsMet += 30; // Ca:P ratio
      else if ((calciumPhosphorusRatio >= 0.9 && calciumPhosphorusRatio <= 1.1) || 
               (calciumPhosphorusRatio >= 1.2 && calciumPhosphorusRatio <= 1.5)) targetsMet += 20;

      if (targetsMet > maxTargetsMet) {
        maxTargetsMet = targetsMet;
        bestCombination = amounts;
      }
    });
  }

  // Round the amounts to whole numbers
  return Object.fromEntries(
    Object.entries(bestCombination || {}).map(([ingredient, amount]) => [
      ingredient,
      Math.round(amount as number)
    ])
  );
};

const calculateIngredientAmounts = (calories: number, selectedIngredients: { [K in Group]: string[] }) => {
  const allocations = {
    meats: calories * 0.5,
    carbons: calories * 0.2,
    vegetables: calories * 0.15,
    others: calories * 0.15
  };

  const amounts: { [key: string]: number } = {};
  let totalDryMatter = 0;

  // First pass: calculate initial amounts and total dry matter
  GROUPS.forEach(group => {
    const groupCalories = allocations[group];
    const ingredients = selectedIngredients[group];
    
    if (ingredients.length > 0) {
      const caloriesPerIngredient = groupCalories / ingredients.length;
      
      ingredients.forEach(ingredient => {
        const energyPer100g = INGREDIENT_ENERGY[ingredient];
        const amount = (caloriesPerIngredient / energyPer100g) * 100;
        amounts[ingredient] = Math.round(amount);
        totalDryMatter += amount * (1 - INGREDIENT_WATER[ingredient] / 100);
      });
    }
  });

  // Second pass: optimize amounts for categories with multiple ingredients
  GROUPS.forEach(group => {
    const ingredients = selectedIngredients[group];
    if (ingredients.length > 1) {
      const optimizedAmounts = calculateOptimalAmounts(
        ingredients,
        allocations[group],

      );
      Object.assign(amounts, optimizedAmounts);
    }
  });

  return amounts;
};

function App() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [loadingDuration, setLoadingDuration] = useState(0);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<'cat' | 'dog'>('dog');
  const [age, setAge] = useState<'0-4months' | '4-12months' | '1-5year' | '5-10year' | '10-15year' | '15-20year'>('1-5year');
  const [neutered, setNeutered] = useState<'yes' | 'no'>('no');
  const [weight, setWeight] = useState('');
  const [cookingMethod, setCookingMethod] = useState<'pan-fried' | 'steamed' | 'oven'>('steamed');
  const [selected, setSelected] = useState<{ [K in Group]: string[] }>({
    meats: [],
    carbons: [],
    vegetables: [],
    others: [],
  });
  const [cookingAdvice, setCookingAdvice] = useState<string>('');
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState<boolean>(false);

  const isSelectionValid = GROUPS.every(
    (group) => selected[group].length >= 1 && selected[group].length <= 3
  );

  const isWeightValid = () => {
    const weightNum = parseFloat(weight);
    return !isNaN(weightNum) && weightNum > 0;
  };

  const isFormValid = isSelectionValid && isWeightValid();

  // Backend API function (secure)
  const callBackendAPI = async (ingredients: string[], cookingMethod: string, petType: string) => {
    setIsLoadingAdvice(true);
    setCookingAdvice('');
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      
      if (!backendUrl) {
        throw new Error('Backend URL not configured');
      }
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          cookingMethod,
          petType
        })
      });
      
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setCookingAdvice(data.advice);
      } else {
        setCookingAdvice(data.message || '收到回應但格式不正確，請稍後再試。');
      }
      
    } catch (error) {
      setCookingAdvice('抱歉，無法獲取烹飪建議。請稍後再試。');
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  const handleGetCookingAdvice = () => {
    const allSelectedIngredients = [
      ...selected.meats,
      ...selected.carbons,
      ...selected.vegetables,
      ...selected.others
    ];
    
    callBackendAPI(allSelectedIngredients, cookingMethod, petType);
  };

  const handleSelect = (group: Group, item: string) => {
    setSelected((prev) => {
      const groupSelected = prev[group];
      if (groupSelected.includes(item)) {
        return { ...prev, [group]: groupSelected.filter((i) => i !== item) };
      } else if (groupSelected.length < 3) {
        return { ...prev, [group]: [...groupSelected, item] };
      }
      return prev;
    });
  };

  const handleRecipeSelect = (recipe: any) => {
    setSelected({
      meats: recipe.meats,
      carbons: recipe.carbons,
      vegetables: recipe.vegetables,
      others: recipe.others
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setLoadingDuration(0);
    
    // Simulate loading for 5 seconds
    const interval = setInterval(() => {
      setLoadingDuration(prev => {
        if (prev >= 5) {
          clearInterval(interval);
    setStep('result');
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  if (step === 'loading') {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <h2>準備中...</h2>
          <div className="loading-message">
            <p>{petName}的食譜正在準備中，請稍候...</p>
            <div className="loading-timer">
              <span>剩餘時間：{5 - loadingDuration} 秒</span>
            </div>
          </div>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    let baseCalories = null;
    let adjustedCalories = null;
    const weightNum = parseFloat(weight);
    if (!isNaN(weightNum) && weightNum > 0) {
      // Calculate RER (Resting Energy Requirement)
      const rer = Math.round(70 * Math.pow(weightNum, 0.75));
      
      // Calculate age and life stage multiplier
      let lifeStageMultiplier = 1;
      
      if (petType === 'dog') {
        if (age === '0-4months') {
          lifeStageMultiplier = 3;
        } else if (age === '4-12months') {
          lifeStageMultiplier = 2;
        } else {
          // For adult dogs (1+ years)
          lifeStageMultiplier = neutered === 'yes' ? 1.6 : 1.8;
        }
      } else if (petType === 'cat') {
        if (age === '0-4months' || age === '4-12months') {
          lifeStageMultiplier = 2.5;
        } else {
          // For adult cats (1+ years)
          lifeStageMultiplier = neutered === 'yes' ? 1.2 : 1.4;
        }
      }
      
      baseCalories = Math.round(rer * lifeStageMultiplier);
      adjustedCalories = Math.round(baseCalories * COOKING_METHOD_MULTIPLIERS[cookingMethod]);
    }

    const allocations = adjustedCalories
      ? {
          meats: Math.round(adjustedCalories * 0.5),
          carbons: Math.round(adjustedCalories * 0.2),
          vegetables: Math.round(adjustedCalories * 0.15),
          others: Math.round(adjustedCalories * 0.15),
        }
      : { meats: 0, carbons: 0, vegetables: 0, others: 0 };

    const ingredientAmounts = adjustedCalories ? calculateIngredientAmounts(adjustedCalories, selected) : {};

    return (
      <div className="result-container">
        <h2>結果</h2>
        <div className="pet-info">
          <h3>寵物資訊：</h3>
          <ul>
            <li><strong>名稱：</strong>{petName}</li>
            <li><strong>類型：</strong>{petType === 'dog' ? '狗' : '貓'}</li>
            <li><strong>年齡：</strong>{age}</li>
            <li><strong>結紮狀態：</strong>{neutered === 'yes' ? '是' : '否'}</li>
            <li><strong>體重：</strong>{weight} kg</li>
            <li><strong>烹飪方式：</strong>{cookingMethod === 'pan-fried' ? '煎炒' : cookingMethod === 'steamed' ? '蒸煮' : '烤箱'}</li>
          </ul>
        </div>
        {adjustedCalories !== null && (
          <>
            <p>建議每日所需熱量：<strong>{baseCalories}</strong> kcal</p>
            <div className="calorie-breakdown">
              <h3>熱量分配：</h3>
              <ul>
                <li>Meats: {allocations.meats} kcal (50%)</li>
                <li>Carbohydrates: {allocations.carbons} kcal (20%)</li>
                <li>Vegetables: {allocations.vegetables} kcal (15%)</li>
                <li>Others: {allocations.others} kcal (15%)</li>
              </ul>
            </div>
            <div className="ingredient-amounts">
              <h3>所需食材份量：</h3>
              <ul>
                {GROUPS.map((group) =>
                  selected[group].map((item) => (
                    <li key={group + item}>
                      {item}: {ingredientAmounts[item]}g
                      <span className="ingredient-calories">
                        ({INGREDIENT_ENERGY[item]} kcal/100g)
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
            {adjustedCalories !== null && (
              <div className="nutritional-analysis">
                <h3>營養分析：</h3>
                {(() => {
                  const nutrition = calculateNutritionalValues(ingredientAmounts);
                  return (
                    <ul>
                      <li>總重量: {Math.round(nutrition.totalWeight)}g</li>
                      <li>
                        蛋白質: {Math.round(nutrition.totalProtein)}g / 目標: {Math.round(nutrition.targetProtein)}g (30% 總DM重量)
                        {(() => {
                          const ratio = nutrition.totalProtein / nutrition.targetProtein;
                          if (ratio < 0.5) return ' (Too less)';
                          if (ratio < 0.8) return ' (A bit less)';
                          if (ratio <= 1.2) return ' (Fit)';
                          if (ratio <= 1.5) return ' (A bit too much)';
                          return ' (Too much)';
                        })()}
                      </li>
                      <li>
                        脂肪: {Math.round(nutrition.totalFat)}g / 目標: {Math.round(nutrition.targetFat)}g (17% 總DM重量)
                        {(() => {
                          const ratio = nutrition.totalFat / nutrition.targetFat;
                          if (ratio < 0.5) return ' (Too less)';
                          if (ratio < 0.8) return ' (A bit less)';
                          if (ratio <= 1.2) return ' (Fit)';
                          if (ratio <= 1.5) return ' (A bit too much)';
                          return ' (Too much)';
                        })()}
                      </li>
                      <li>
                        維生素D: {Math.round(nutrition.totalVitaminD)}IU / 目標: {Math.round(nutrition.targetVitaminD)}IU (0.586IU/100g)
                        {(() => {
                          const ratio = nutrition.totalVitaminD / nutrition.targetVitaminD;
                          if (ratio < 0.5) return ' (Too less)';
                          if (ratio < 0.8) return ' (A bit less)';
                          if (ratio <= 1.2) return ' (Fit)';
                          if (ratio <= 1.5) return ' (A bit too much)';
                          return ' (Too much)';
                        })()}
                      </li>
                      <li>
                        鈣磷比: {(nutrition.totalCalcium / nutrition.totalPhosphorus).toFixed(2)}:1
                        {(() => {
                          const ratio = nutrition.totalCalcium / nutrition.totalPhosphorus;
                          if (ratio >= 1.1 && ratio <= 1.2) return ' (最佳比例)';
                          if ((ratio >= 0.9 && ratio <= 1.1) || (ratio >= 1.2 && ratio <= 1.5)) return ' (可接受)';
                          return ' (需要調整)';
                        })()}
                      </li>                     
                      <li>鈣質: {Math.round(nutrition.totalCalcium)}mg</li>
                      <li>磷質: {Math.round(nutrition.totalPhosphorus)}mg</li>
                      <li>水分含量: {nutrition.moistureContent.toFixed(1)}%</li>
                      <li>乾物質: {Math.round(nutrition.dryMatterWeight)}g</li>
                      <li style={{fontWeight: 'bold', color: '#ff9800'}}>
                        ★★★ 建議蛋殼粉用量: {(() => {
                          const requiredCa = nutrition.totalPhosphorus * 1.2;
                          const extraCa = requiredCa - nutrition.totalCalcium;
                          const eggShellGrams = extraCa > 0 ? (extraCa / 400).toFixed(1) : '0';
                          return eggShellGrams + 'g';
                        })()} (使Ca:P=1.2:1)
                      </li>
                    </ul>
                  );
                })()}
              </div>
            )}
          </>
        )}
        
        <button onClick={() => {
          setStep('form');
          setLoadingDuration(0);
          setPetName('');
          setPetType('dog');
          setAge('1-5year');
          setNeutered('no');
          setWeight('');
          setCookingMethod('steamed');
          setSelected({
            meats: [],
            carbons: [],
            vegetables: [],
            others: [],
          });
        }}>返回</button>
        
        {/* Cooking Advice Section */}
        <div className="cooking-advice-section">
          <h3>AI 烹飪建議：</h3>
          <button 
            onClick={handleGetCookingAdvice}
            disabled={isLoadingAdvice}
            className="cooking-advice-btn"
            style={{
              backgroundColor: isLoadingAdvice ? '#cccccc' : '#000000',
              color: isLoadingAdvice ? '#666666' : '#FFD13A',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '12px',
              cursor: isLoadingAdvice ? 'not-allowed' : 'pointer',
              marginBottom: '15px',
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoadingAdvice ? '獲取建議中...' : '獲取AI烹飪建議'}
          </button>
          
          {cookingAdvice && (
            <div className="cooking-advice-content" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              padding: '15px',
              borderRadius: '12px',
              borderLeft: '4px solid #4CAF50',
              marginTop: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, color: '#000000' }}>
                {cookingAdvice}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <div className="dog-suggestions">
        <h4>Dog Suggestions:</h4>
        <div className="suggestions-list">
          {SIMPLE_SUGGESTIONS.dog.map((recipe, index) => (
            <div key={index} className="suggestion-item">
              <div className="suggestion-advantage">
                {recipe.advantage}
              </div>
              <button 
                className="use-btn"
                onClick={() => handleRecipeSelect(recipe)}
                type="button"
              >
                Use
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="cat-suggestions">
        <h4>Cat Suggestions:</h4>
        <div className="suggestions-list">
          {SIMPLE_SUGGESTIONS.cat.map((recipe, index) => (
            <div key={index} className="suggestion-item">
              <div className="suggestion-advantage">
                {recipe.advantage}
              </div>
              <button 
                className="use-btn"
                onClick={() => handleRecipeSelect(recipe)}
                type="button"
              >
                Use
              </button>
            </div>
          ))}
        </div>
      </div>
      
    <div className="company-icon">
      <img src="/company-icon.jpg" alt="Company Logo" />
    </div>
    <div className="app-container">
      <h2>生成鮮食譜</h2>
      <form onSubmit={handleSubmit} className="pet-form">
        <label>
          1) 寵物名稱：
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="例如：小白"
            required
          />
        </label>
        <label>
          2) 寵物類型：
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value as 'cat' | 'dog')}
            required
          >
            <option value="dog">狗</option>
            <option value="cat">貓</option>
          </select>
        </label>
        <label>
          3) 年齡：
          <select
            value={age}
            onChange={(e) => setAge(e.target.value as '0-4months' | '4-12months' | '1-5year' | '5-10year' | '10-15year' | '15-20year')}
            required
          >
            <option value="0-4months">0-4個月</option>
            <option value="4-12months">4-12個月</option>
            <option value="1-5year">1-5歲</option>
            <option value="5-10year">5-10歲</option>
            <option value="10-15year">10-15歲</option>
            <option value="15-20year">15-20歲</option>
          </select>
        </label>
        <label>
          4) 是否結紮：
          <select
            value={neutered}
            onChange={(e) => setNeutered(e.target.value as 'yes' | 'no')}
            required
          >
            <option value="no">否</option>
            <option value="yes">是</option>
          </select>
        </label>
        <label>
          5) 請輸入寵物體重：
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="例如：5"
            required
          />
          <span className="unit">kg</span>
        </label>
        <label>
          6) 烹飪方式：
          <select
            value={cookingMethod}
            onChange={(e) => setCookingMethod(e.target.value as 'pan-fried' | 'steamed' | 'oven')}
            required
          >
            <option value="steamed">蒸煮</option>
            <option value="pan-fried">煎炒</option>
            <option value="oven">烤箱</option>
          </select>
        </label>
        <div className="ingredient-section">
          <p>7) 請選擇想包含的食材：</p>
          <button 
            type="button"
            className="mobile-suggestions-btn"
            onClick={() => setShowMobileSuggestions(!showMobileSuggestions)}
          >
            {showMobileSuggestions ? '隱藏食譜建議' : '查看食譜建議'}
          </button>
          {GROUPS.map((group) => (
            <div key={group} className="ingredient-group">
              <strong>
                {group === 'meats'
                  ? 'Meats'
                  : group === 'carbons'
                  ? 'Carbohydrates'
                  : group === 'vegetables'
                  ? 'Vegetables'
                  : 'Others'}
              </strong>
              <div className="ingredient-list">
                {INGREDIENTS[group].map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={selected[group].includes(item) ? 'selected' : ''}
                    onClick={() => handleSelect(group, item)}
                    disabled={
                      !selected[group].includes(item) && selected[group].length >= 3
                    }
                  >
                    <img 
                      src={`/icons/${item.toLowerCase().replace(/\s+/g, '-')}.png`} 
                      alt={item}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {showMobileSuggestions && (
            <div className="mobile-suggestions">
              <div className="mobile-suggestion-group">
                <h4>狗狗食譜建議：</h4>
                <div className="mobile-suggestions-list">
                  {SIMPLE_SUGGESTIONS.dog.map((recipe, index) => (
                    <div key={index} className="mobile-suggestion-item">
                      <div className="mobile-suggestion-advantage">
                        {recipe.advantage}
                      </div>
                      <button 
                        className="mobile-use-btn"
                        onClick={() => {
                          handleRecipeSelect(recipe);
                          setShowMobileSuggestions(false);
                        }}
                        type="button"
                      >
                        使用此食譜
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mobile-suggestion-group">
                <h4>貓咪食譜建議：</h4>
                <div className="mobile-suggestions-list">
                  {SIMPLE_SUGGESTIONS.cat.map((recipe, index) => (
                    <div key={index} className="mobile-suggestion-item">
                      <div className="mobile-suggestion-advantage">
                        {recipe.advantage}
                      </div>
                      <button 
                        className="mobile-use-btn"
                        onClick={() => {
                          handleRecipeSelect(recipe);
                          setShowMobileSuggestions(false);
                        }}
                        type="button"
                      >
                        使用此食譜
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {!isSelectionValid && (
          <div style={{ color: 'red', marginBottom: '1em' }}>
            請為每一類選擇1至3種食材
          </div>
        )}
        {!isWeightValid() && weight !== '' && (
          <div style={{ color: 'red', marginBottom: '1em' }}>
            請輸入有效的體重數字
          </div>
        )}
        <button
          type="submit"
          className="submit-btn"
          disabled={!isFormValid}
        >
          提交
        </button>
      </form>
      </div>
    </div>
  );
}

export default App;