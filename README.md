# RPS-Game-Backend

RPS-Game-Backend is a Node.js + Express + Socket.IO server designed to support the RPS-WEB3 game. It serves three main purposes:

1. Generate a unique hash for each Rock-Paper-Scissors (RPS) game contract initiated.
2. Fetch the latest transactions related to the game.
3. Store resolved game results for future reference.

---

## Live Demo

Check out the live demo of [RPS-WEB3](https://rps-web3.onrender.com/)

> It might take the integrated BE a minute to cold start (free tier instance)

---

## Technologies Used

- **Node.js**: A JavaScript runtime for building scalable server-side applications.
- **Express**: A minimal and flexible Node.js web application framework.
- **Socket.IO**: A library for real-time, bidirectional communication between clients and servers.
- **Viem**: A library to interact with the Ethereum blockchain.
- **Drizzle**: ORM to interact with Databases (This project relies on **Turso** as its BaaS).

---

## Features

1. **Generate Game Hash**:

   - When a new RPS game contract is initiated, the server generates a unique salt and provides player 1 hashed move.

2. **Fetch Latest Transactions**:

   - The server fetches and processes the latest transactions related to the game from the Ethereum blockchain.

3. **Store Resolved Game Results**:
   - Once a game is resolved, the server stores the result in a database for future reference and analytics.

---

## Socket Implementation

1. **Player Joining**:

   - Event Triggered whenever a player joins the game

2. **Game Updated**:

   - Event triggered whenever game state changes (Player 2 makes a move, player timeouts the opponent etc)

3. **Storing Results**:
   - When a game is resolved (e.g., a winner is determined), the server stores the game result in a database.

---
