# Letter Dash - Mobile App (React Native)

Welcome to **Letter Dash**, a word-guessing game built using **React Native**! The goal of the game is to guess a hidden five-letter word within six attempts, with feedback given for each guess to help you along the way.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

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
