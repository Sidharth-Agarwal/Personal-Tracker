# Personal Tracker

A comprehensive personal tracking application to monitor and improve various aspects of daily life.

## 🎯 Overview

Personal Tracker is a web application built with React, Vite, and Firebase that helps you track and visualize your daily habits, fitness, nutrition, and productivity metrics.

## 📋 Tracking Modules

### 1. 💪 Workouts (In Progress)
- **Cardio Tracking**: Running, cycling, boxing, walking, etc.
- **Weight Training**: Exercise logs, sets, reps, weights
- **Progress Monitoring**: Visual charts and progress over time
- **Calorie Tracking**: Calories burned per workout
- **Workout History**: View past workouts and patterns
- **Performance Analytics**: Track improvements and personal records

### 2. 🚶 Walking
- Daily step count
- Distance covered
- Active time tracking
- Weekly/Monthly goals
- Streak tracking

### 3. 🍽️ Eating
- Meal logging (breakfast, lunch, dinner, snacks)
- Calorie intake tracking
- Macronutrient breakdown (protein, carbs, fats)
- Water intake monitoring
- Nutrition goals
- Meal history and patterns

### 4. 😴 Sleep
- Sleep duration tracking
- Sleep quality rating
- Bedtime and wake time logs
- Sleep patterns and trends
- Sleep debt calculator
- Weekly sleep analysis

### 5. 📱 Phone Usage
- Daily screen time
- App usage breakdown
- Usage patterns by time of day
- Goal setting for reduced usage
- Productivity vs leisure time ratio

### 6. ✅ Daily Tasks
- Task creation and management
- Priority levels
- Task categories (work, personal, fitness, etc.)
- Completion tracking
- Daily/Weekly task overview
- Productivity metrics

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend/Database**: Firebase (Firestore)
- **Authentication**: Firebase Auth
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Personal-Tracker
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Create a `.env` file in the root directory with your Firebase config

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Run the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 📁 Project Structure

```
Personal-Tracker/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── workouts/
│   │   ├── walking/
│   │   ├── eating/
│   │   ├── sleep/
│   │   ├── phoneUsage/
│   │   └── tasks/
│   ├── contexts/
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx
│   ├── pages/
│   ├── utils/
│   ├── services/
│   │   └── firebase.js
│   ├── styles/
│   ├── App.jsx
│   └── index.jsx
├── public/
├── .env
├── package.json
└── README.md
```

## 🎨 Features

- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Data Visualization**: Charts and graphs for tracking progress
- **Offline Support**: Progressive Web App capabilities
- **Data Export**: Export your data in CSV/JSON format
- **Privacy First**: All data stored securely in your Firebase instance

## 📊 Development Roadmap

- [x] Project setup and structure
- [x] Theme system implementation
- [ ] Firebase integration
- [ ] Authentication system
- [ ] Workouts module ⏳ (Current Focus)
  - [ ] Cardio tracking
  - [ ] Weight training logging
  - [ ] Calorie calculations
  - [ ] Progress charts
- [ ] Walking module
- [ ] Eating module
- [ ] Sleep module
- [ ] Phone usage module
- [ ] Daily tasks module
- [ ] Dashboard overview
- [ ] Analytics and insights

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is private and for personal use.

## 👤 Author

**Sidharth Agarwal**
- Software Engineer
- Email: [Your Email]
- GitHub: [@yourusername]

---

**Note**: This application is designed for personal use to track and improve daily habits and wellness metrics.

# Personal Tracker - Standardized Architecture

## 🏗️ Shared Components & Structure

### **Global File Structure**
```
src/
├── components/
│   ├── shared/                          # 🌟 SHARED ACROSS ALL MODULES
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageHeader.jsx
│   │   │
│   │   ├── forms/
│   │   │   ├── Input.jsx               # Standardized input field
│   │   │   ├── Select.jsx              # Dropdown select
│   │   │   ├── DatePicker.jsx          # Date selection
│   │   │   ├── TimePicker.jsx          # Time selection
│   │   │   ├── NumberInput.jsx         # Number input with +/- buttons
│   │   │   ├── TextArea.jsx            # Text area for notes
│   │   │   └── FormGroup.jsx           # Input wrapper with label
│   │   │
│   │   ├── cards/
│   │   │   ├── StatsCard.jsx           # Display stats (calories, count, etc.)
│   │   │   ├── DataCard.jsx            # Generic card for displaying data
│   │   │   ├── SummaryCard.jsx         # Summary with icon & value
│   │   │   └── ProgressCard.jsx        # Card with progress indicator
│   │   │
│   │   ├── charts/
│   │   │   ├── LineChart.jsx           # Trend over time
│   │   │   ├── BarChart.jsx            # Comparison bars
│   │   │   ├── PieChart.jsx            # Distribution chart
│   │   │   ├── AreaChart.jsx           # Area under curve
│   │   │   └── CalendarHeatmap.jsx     # GitHub-style heatmap
│   │   │
│   │   ├── modals/
│   │   │   ├── Modal.jsx               # Base modal component
│   │   │   ├── ConfirmModal.jsx        # Delete/confirm actions
│   │   │   └── AddEntryModal.jsx       # Generic add entry modal
│   │   │
│   │   ├── filters/
│   │   │   ├── DateRangeFilter.jsx     # Filter by date range
│   │   │   ├── TypeFilter.jsx          # Filter by type/category
│   │   │   └── SearchFilter.jsx        # Search input
│   │   │
│   │   ├── buttons/
│   │   │   ├── Button.jsx              # Primary button
│   │   │   ├── IconButton.jsx          # Icon-only button
│   │   │   ├── FloatingActionButton.jsx # FAB for add actions
│   │   │   └── ToggleButton.jsx        # Toggle between options
│   │   │
│   │   ├── feedback/
│   │   │   ├── Loading.jsx             # Loading spinner
│   │   │   ├── EmptyState.jsx          # No data placeholder
│   │   │   ├── ErrorMessage.jsx        # Error display
│   │   │   └── Toast.jsx               # Success/error toasts
│   │   │
│   │   └── display/
│   │       ├── Badge.jsx               # Category badges
│   │       ├── Chip.jsx                # Removable tags
│   │       ├── ProgressBar.jsx         # Linear progress
│   │       ├── CircularProgress.jsx    # Circular progress
│   │       └── Tooltip.jsx             # Hover tooltips
│   │
│   ├── workouts/                        # Workout-specific components
│   ├── walking/                         # Walking-specific components
│   ├── eating/                          # Eating-specific components
│   ├── sleep/                           # Sleep-specific components
│   ├── phoneUsage/                      # Phone usage-specific components
│   └── tasks/                           # Tasks-specific components
│
├── pages/
│   ├── Dashboard.jsx                    # Main overview dashboard
│   ├── Profile.jsx                      # User profile & settings
│   ├── Workouts.jsx                     # Workouts page
│   ├── Walking.jsx                      # Walking page
│   ├── Eating.jsx                       # Eating page
│   ├── Sleep.jsx                        # Sleep page
│   ├── PhoneUsage.jsx                   # Phone usage page
│   └── Tasks.jsx                        # Tasks page
│
├── contexts/
│   ├── ThemeContext.jsx                 # Theme management
│   ├── AuthContext.jsx                  # Authentication
│   ├── UserProfileContext.jsx           # 🌟 User profile & maintenance calories
│   └── NotificationContext.jsx          # Toast notifications
│
├── services/
│   ├── firebase.js                      # Firebase config
│   ├── authService.js                   # Authentication operations
│   ├── userService.js                   # User profile CRUD
│   ├── workoutService.js                # Workout operations
│   ├── walkingService.js                # Walking operations
│   ├── eatingService.js                 # Eating operations
│   ├── sleepService.js                  # Sleep operations
│   ├── phoneUsageService.js             # Phone usage operations
│   └── taskService.js                   # Task operations
│
├── utils/
│   ├── helpers.js                       # General helpers
│   ├── dateHelpers.js                   # 🌟 Date formatting & calculations
│   ├── calorieCalculator.js             # 🌟 Calorie calculations (shared)
│   ├── chartHelpers.js                  # Chart data formatting
│   └── validators.js                    # Form validation
│
├── constants/
│   ├── metValues.js                     # 🌟 MET values for activities
│   ├── nutritionData.js                 # 🌟 Food nutrition database
│   ├── activityTypes.js                 # 🌟 All activity types
│   └── colors.js                        # Color scheme constants
│
└── hooks/
    ├── useAuth.js                       # Authentication hook
    ├── useUserProfile.js                # 🌟 User profile hook
    ├── useCalorieCalculation.js         # 🌟 Calorie calculation hook
    ├── useChartData.js                  # Chart data formatting hook
    └── useLocalStorage.js               # Local storage hook
```

---

## 👤 User Profile Structure (Firebase)

### **User Profile Schema**
```javascript
users: {
  [userId]: {
    // Basic Info
    email: "sidharth@example.com",
    name: "Sidharth Agarwal",
    createdAt: "timestamp",
    
    // Physical Stats
    profile: {
      age: 22,
      gender: "male",
      height: 175,              // cm
      currentWeight: 75,        // kg
      targetWeight: 70,         // kg
      
      // Activity Level
      activityLevel: "moderate", // sedentary, light, moderate, active, very_active
      
      // Goals
      goals: {
        weightGoal: "lose",     // lose, maintain, gain
        weeklyWeightChange: 0.5, // kg per week
      }
    },
    
    // 🌟 MAINTENANCE CALORIES
    calories: {
      bmr: 1750,                // Basal Metabolic Rate
      tdee: 2450,               // Total Daily Energy Expenditure
      maintenance: 2450,        // Maintenance calories
      target: 2200,             // Target for goal (deficit/surplus)
      
      breakdown: {
        protein: 150,           // grams
        carbs: 250,             // grams
        fats: 70,               // grams
      },
      
      lastCalculated: "timestamp",
      calculationMethod: "mifflin-st-jeor" // or harris-benedict
    },
    
    // Module Settings
    settings: {
      workouts: {
        defaultWeightUnit: "kg",
        defaultDistanceUnit: "km",
        restTimerEnabled: true,
      },
      eating: {
        mealsPerDay: 3,
        trackWater: true,
        waterGoal: 3000,        // ml
      },
      walking: {
        dailyStepGoal: 10000,
        distanceUnit: "km",
      },
      sleep: {
        targetHours: 7.5,
        bedtimeReminder: true,
      }
    },
    
    // Last Updated
    updatedAt: "timestamp"
  }
}
```

---

## 🧮 Standardized Calorie Calculation System

### **utils/calorieCalculator.js** (Shared across modules)

```javascript
// 1. BMR Calculation (Mifflin-St Jeor Equation)
export const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// 2. TDEE Calculation (BMR × Activity Multiplier)
export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,      // Little to no exercise
  light: 1.375,        // Light exercise 1-3 days/week
  moderate: 1.55,      // Moderate exercise 3-5 days/week
  active: 1.725,       // Hard exercise 6-7 days/week
  very_active: 1.9     // Very hard exercise & physical job
};

export const calculateTDEE = (bmr, activityLevel) => {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
};

// 3. Target Calories Based on Goal
export const calculateTargetCalories = (tdee, goal, weeklyChange = 0.5) => {
  // 1 kg of fat = ~7700 calories
  // Daily deficit/surplus = (7700 × weeklyChange) / 7
  const dailyChange = (7700 * weeklyChange) / 7;
  
  if (goal === 'lose') {
    return Math.round(tdee - dailyChange);
  } else if (goal === 'gain') {
    return Math.round(tdee + dailyChange);
  } else {
    return tdee; // maintain
  }
};

// 4. Activity Calories (MET-based)
export const calculateActivityCalories = (metValue, weight, durationMinutes) => {
  return Math.round(metValue * weight * (durationMinutes / 60));
};

// 5. Macronutrient Breakdown
export const calculateMacros = (calories, goal) => {
  let proteinPercent, carbsPercent, fatsPercent;
  
  if (goal === 'lose') {
    proteinPercent = 0.35;  // Higher protein to preserve muscle
    fatsPercent = 0.30;
    carbsPercent = 0.35;
  } else if (goal === 'gain') {
    proteinPercent = 0.30;
    fatsPercent = 0.25;
    carbsPercent = 0.45;    // Higher carbs for energy
  } else {
    proteinPercent = 0.30;
    fatsPercent = 0.30;
    carbsPercent = 0.40;
  }
  
  return {
    protein: Math.round((calories * proteinPercent) / 4),   // 4 cal/gram
    carbs: Math.round((calories * carbsPercent) / 4),       // 4 cal/gram
    fats: Math.round((calories * fatsPercent) / 9),         // 9 cal/gram
  };
};

// 6. Net Calories (for weight loss/gain tracking)
export const calculateNetCalories = (consumed, burned) => {
  return consumed - burned;
};

// 7. Estimated Weight Change
export const estimateWeightChange = (netCalories, days = 7) => {
  // 7700 calories = 1 kg
  return (netCalories * days) / 7700;
};
```

---

## 📊 Shared Data Flow Pattern

### **Standard Module Structure**
```
Each module (Workouts, Walking, Eating) follows this pattern:

1. Dashboard Component
   ├── Summary Cards (calories, count, streak)
   ├── Quick Add Button
   ├── Chart/Graph
   └── Recent History List

2. Add/Edit Modal
   ├── Form Fields
   ├── Calorie Calculator (auto-calculate)
   └── Submit/Cancel Buttons

3. History/List View
   ├── Filter Options
   ├── Date Range Selector
   └── List of Entries (with edit/delete)

4. Stats/Analytics Page
   ├── Detailed Charts
   ├── Trends
   └── Insights
```

---

## 🎯 Standardized Component Props

### **StatsCard.jsx**
```javascript
<StatsCard
  title="Calories Burned"
  value={450}
  unit="kcal"
  icon={<Flame />}
  trend={+12}              // percentage change
  trendDirection="up"      // up, down, neutral
  color="accent"           // accent, success, warning, danger
/>
```

### **DataCard.jsx**
```javascript
<DataCard
  date="2025-11-09"
  type="Cardio"
  title="Boxing Session"
  calories={450}
  duration={45}
  onEdit={() => {}}
  onDelete={() => {}}
/>
```

### **ProgressCard.jsx**
```javascript
<ProgressCard
  label="Daily Calorie Goal"
  current={1800}
  target={2200}
  unit="kcal"
  showPercentage={true}
/>
```

---

## 🔥 Maintenance Calories Dashboard

### **Profile Page - Calorie Section**
```javascript
<CalorieProfile>
  {/* Current Stats */}
  <StatsGrid>
    <StatsCard title="BMR" value={1750} unit="kcal" />
    <StatsCard title="TDEE" value={2450} unit="kcal" />
    <StatsCard title="Target" value={2200} unit="kcal" />
    <StatsCard title="Deficit" value={-250} unit="kcal" />
  </StatsGrid>
  
  {/* Macro Breakdown */}
  <MacroBreakdown>
    <MacroBar label="Protein" value={150} unit="g" percentage={30} />
    <MacroBar label="Carbs" value={250} unit="g" percentage={45} />
    <MacroBar label="Fats" value={70} unit="g" percentage={25} />
  </MacroBreakdown>
  
  {/* Calculator */}
  <RecalculateButton onClick={openCalculator} />
</CalorieProfile>
```

---

## 🎨 Benefits of Standardization

✅ **Reusability**: Same components across all modules
✅ **Consistency**: Uniform UI/UX throughout the app
✅ **Maintainability**: Change once, update everywhere
✅ **Scalability**: Easy to add new modules
✅ **Shared Logic**: Calorie calculations centralized
✅ **Theme Support**: All components respect theme

---

## 🚀 Next Steps

1. **Set up Firebase** and user authentication
2. **Build User Profile Context** with maintenance calories
3. **Create shared components** (forms, cards, charts)
4. **Implement calorie calculator** utilities
5. **Start with Workouts module** using standardized components

Does this standardized architecture work for you?