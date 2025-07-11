# ♟️ Web-Based Chess Game Powered by AI & ML

This repository hosts the source code and research for **a dynamic web-based chess game** developed using modern web technologies, integrated with **Artificial Intelligence (AI)** and **Machine Learning (ML)** techniques for an intelligent, scalable gameplay experience.

> 🔍 *Built as a B.Tech Project at Manipal University Jaipur under the guidance of Ms. Deepti Sharma*

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [AI & ML Integration](#ai--ml-integration)
- [Project Objectives](#project-objectives)
- [Architecture & Design](#architecture--design)
- [Modules & Files](#modules--files)
- [Planned Enhancements](#planned-enhancements)
- [How to Run](#how-to-run)
- [Credits](#credits)
- [License](#license)

---

## 💡 About the Project

This project explores the integration of **Minimax** and **Alpha-Beta Pruning** algorithms for AI-based move prediction in a chess game, combined with a **machine learning layer** that adjusts AI difficulty dynamically based on the player's in-game behavior.

It aims to break the traditional complexity barrier of online chess platforms by offering:
- A clean, responsive web-based interface
- Smart difficulty adjustments based on gameplay analysis
- Minimal setup (no downloads or registrations)

---

## ✨ Key Features

- ♟️ Fully playable chess game in the browser
- 🧠 Intelligent AI opponent using Minimax + Alpha-Beta Pruning
- 📈 Adaptive difficulty using ML (rated 1–10 based on player performance)
- 🎯 Legal move validation, check/checkmate detection
- 🌐 (Planned) WebSocket-based multiplayer support
- ⚙️ Drag-and-drop interface with real-time feedback
- 🔐 Secure, tamper-proof game logic

---

## 🧰 Tech Stack

| Layer        | Tools Used                    |
|-------------|-------------------------------|
| Frontend     | HTML, CSS, JavaScript         |
| AI Logic     | Custom Minimax + Alpha-Beta   |
| ML Rating    | Regression/Classification (JS)|
| Backend *(future)* | Node.js, Python (optional)  |
| Database *(future)* | MongoDB                      |
| Deployment   | GitHub Pages / AWS / Heroku   |

---

## 🧠 AI & ML Integration

### 🔁 Minimax + Alpha-Beta Pruning
- Enables efficient, optimized AI decision-making.
- Dynamically configurable depth for performance.

### 📊 ML-based Difficulty Scaling
- Tracks user moves and assigns a difficulty rating (1–10).
- AI adapts its decision strategy in real-time to match player skill.
- Improves player engagement and learning curve.

---

## 🎯 Project Objectives

- ✅ Create a web-based chess platform accessible via browser.
- ✅ Build an AI opponent that adjusts based on the player’s moves.
- ✅ Enhance accessibility for all user types (keyboard support, readable UI).
- ✅ Explore multiplayer functionality via WebSockets.
- ✅ Follow ethical AI development practices (fair, unbiased gameplay).
- ✅ Uphold strict academic integrity and originality.

---

## 🏗️ Architecture & Design

### Frontend
- Responsive chessboard using CSS Grid.
- Drag-and-drop or keyboard input for moves.
- Visual cues for legal, check, capture, and checkmate states.

### Backend *(planned)*
- Node.js server for multiplayer game state management.
- Python-based ML model integration (optional for difficulty scaling).

### ML Pipeline
- Move data labeled with difficulty metrics.
- Trained model adjusts AI evaluation heuristics in real-time.

---

## 📁 Modules & Files

| File               | Description                                           |
|--------------------|-------------------------------------------------------|
| `index.html`        | Main game interface layout                           |
| `style.css`         | Styling and animations                               |
| `index.js`          | JS logic for the interface and game state            |
| `global.js`         | Handles global events and move highlights            |
| `main.js`           | Core game loop and state transitions                 |
| `commonhelper.js`   | Utility functions (move generation, highlights, etc) |
| `pieces.js`         | Piece definitions and movement logic                 |
| `pieces/`           | Folder with all chess piece assets                   |

---

## 🚀 Planned Enhancements

- 🌍 Multiplayer support via WebSockets
- 🗃️ Save/load games with MongoDB
- 📉 Graph-based skill progression for users
- 🔎 Enhanced ML training from historical games
- 🧪 Puzzle mode with scenario-based challenges

---

## 🧪 How to Run

### Prerequisites:
- A modern web browser (Chrome, Firefox, Edge)
- Optional: Node.js for backend/ML extension (future)

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/web-chess-ai
   cd web-chess-ai
