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