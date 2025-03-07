# Letter Dash - Mobile App (React Native)

Welcome to **Letter Dash**, a word-guessing game built using **React Native**! The goal of the game is to guess a hidden five-letter word within six attempts, with feedback given for each guess to help you along the way.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)

## Installation

### Prerequisites

- **Node.js**: Ensure that you have [Node.js](https://nodejs.org/) installed on your machine.

  ```bash
  npm install -g expo-cli
  ```

  or

  ```bash
  yarn global add expo-cli
  ```

- **Mondogb**: Have a mongodb Cluster that will take care of storing persistent information for the game
- **Expo CLI**: Install Expo CLI globally using npm or yarn:
- **Android Studio / Expo**: For running the app on an emulator or physical device.

### Steps to run the app

- **Clone a repository**

  ```bash
  git clone https://github.com/justrunis/letter-dash.git
  cd letter-dash
  ```

- **Add .env file to the backend with these values**

  ```bash
  DATABASE_USER=database_user
  DATABASE_PASSWORD=database_password
  JWT_SECRET=jwt_sectret
  ```

- **Start the backend.**

  ```bash
  cd backend
  npm install
  npm start
  ```

- **Add .env file to the frontend with these values**

  ```bash
  EXPO_PUBLIC_API_URL=BACKEND_URL
  ```
  For local development with expo use this URL

  ```bash
  http://10.0.2.2:3000
  ```

- **Open new terminal and start the app.**

  ```bash
  cd app
  npm install
  npm start
  ```

## Usage

### Game Rules:

- **You need to guess a hidden five-letter word within six attempts.**
- **Each guess provides feedback with colors:**
  - **Green:** Correct letter in the correct position.
  - **Yellow:** Correct letter, wrong position.
  - **Gray:** Letter is not part of the word.

## Features:

- **Daily challenges with word-guessing puzzles.**
- **Track your streaks and total correct guesses.**
- **View and manage your profile, achievements, and leaderboard.**

### Navigating the App:

- **Home Screen:** Shows your challenges, tips, and streak information.
- **Daily Game Screen:** Screen where you can play the daily game.
- **Game Screen:** Screen where you can play the game as much as you want.
- **Profile:** Screen where you can view your statistics, including streaks, achievements and total correct guesses.
- **Leaderboard:** Screen that shows the leaderboard of all users that play the daily game.
- **Achievements:** View all achievements that are achievable in the game.

## Tech Stack

- [**React Native:**](https://reactnative.dev/) A framework for building native apps for Android, iOS using React.
- [**Node.Js:**](https://nodejs.org/en) A JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.
- [**Expo:**](https://expo.dev/) A framework and platform used to create universal native apps with React that run on Android, iOS, and the web.
- [**MongoDB:**](https://www.mongodb.com/) Database for storing user data and game progress.

