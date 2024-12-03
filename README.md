# CSDS393 Final Project: BetBuddy

## Overview

**BetBuddy** is a social betting platform where users can create custom betting markets, place bets, and track their betting history. The application allows users to engage in friendly competition on a variety of events, either by participating in existing markets or by creating their own markets for others to bet on. BetBuddy utilizes a modern web application stack with AWS services, React, and a secure authentication mechanism.

## Features

- **User Authentication:** Sign up or log in using email/password or Google OAuth for seamless access.
- **Active Markets:** Browse and bet on live markets created by other users.
- **Custom Market Creation:** Create your own betting markets with customizable options, odds, and closing time.
- **Bet Placement:** Place bets on markets and view potential payouts.
- **User History:** Track your betting history, streaks, and performance.
- **Market Settlement:** Market creators can settle completed markets, distributing winnings to users automatically.
- **Secure Logout:** Logout securely to protect your account information and data.

## Installation

### Prerequisites

- **Node.js** and **npm** are required to run BetBuddy locally.
- You need a local development environment set up (Command Prompt, Terminal, or an IDE like VSCode).

### Steps to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/catherinesupron44/csds393finalproject.git
   cd csds393finalproject
   ```

2. **Install Dependencies**:
   Install required dependencies using npm:
   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the local development server:
   ```bash
   npm run dev
   ```

   The application will now be running locally at `http://localhost:3000`. Open this URL in your browser.

## Usage

### Logging In

Upon entering the application, you will be prompted to log in. You can choose to:

- **Log in via Google OAuth**: This is the preferred login method due to its security and ease of use.
- **Sign Up / Log in with Email and Password**: Create an account with an email and password or use your existing credentials to log in.

### Exploring Active Markets

Once logged in, you can browse active markets from the **Active Markets** tab. Here, you can see ongoing betting opportunities with their respective odds, market names, descriptions, and closing times.

### Placing a Bet

To place a bet:

1. Select a market.
2. Choose the side of the bet you want to wager on.
3. Enter the amount of coins you wish to bet.
4. Click “Place a Bet” to confirm.

You will see your bet appear in the **Active Bets** section.

### Creating and Settle a Custom Market

To create a new market:

1. Go to the **My Markets** section.
2. Click **Create a Market** and fill in the details such as market name, description, sides, odds, and closing time.
3. After the market is created, it will appear in the **Active Markets** section for others to participate in.

To settle a new market:
1. Go to the **My Markets** section.
2. For closed markets, click **Settle the Market**
3. Select the winning side in the popup and confirm.
   Participant's winnings are distributed automatically.

### Checking Your History

You can view all your past and current bets in the **User History** section, accessible from your profile icon.

### Logging Out

Click the **Logout** button in the top-right corner to securely log out of the platform.

## Contact

For any questions or issues, please reach out to mtm162@case.edu.
