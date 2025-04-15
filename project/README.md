---

# 🩺 ThinkBot – Idea Validation Tool

ThinkBot is an intelligent idea validation assistant built with FastAPI (Python) and React (TypeScript). It evaluates startup or project ideas across multiple business factors using an AI model (LLaMA via Fireworks API) and provides a validation score, recommendations, and competitor analysis powered by vector search.

---

## 📂 Project Structure


```
project/
├── .bolt/                  # Configuration files for Bolt framework
├── backend/                # Backend services and APIs
├── src/                    # Source code for frontend components
├── .gitignore              # Specifies files to ignore in Git
├── components.json         # Configuration for UI components
├── eslint.config.js        # ESLint configuration
├── index.html              # Main HTML file
├── package-lock.json       # Auto-generated for locking dependencies
├── package.json            # Project metadata and dependencies
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.app.json       # TypeScript configuration for the app
├── tsconfig.json           # Base TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration for Node.js
└── vite.config.ts          # Vite configuration file

```

---

## 🚀 Features

🧠 AI-Powered Idea Validation 
Submit your idea and receive a score based on originality, feasibility, innovation, and more.

🏢 Competitor Search with ChromaDB
Uses Fireworks embeddings to fetch and compare similar products.

📋 Detailed Scoring
Rates ideas across 11 attributes like Market Demand, Innovation, Scalability, and Financial Viability.

📈 Strategic Recommendations
AI provides suggestions to improve user engagement, market research, and technical performance.

💬 Multi-Mode Interaction
Switch between an analytical dashboard and an interactive chat assistant.
---

## 🛠️ Technology Stack

| Component              | Technology Used         |
|------------------------|-------------------------|
| Backend Framework      | Fast (Python)           |
| Frontend Templates     | HTML, CSS, React        |
| Vector Database        | ChromoDB                |
| AI/LLM Integration     | LLaMA API (FireWorksAI) |
| API Middleware         | Fast API                |
| Deployment/Hosting     | Localhost (no cloud)    |

---

## 💻 How to Run the Project

### 🔧 Prerequisites

🔧 Prerequisites
   - Python 3.9+

   - Node.js and npm

Make sure you have Python 3.x installed. Then, clone the repository and install dependencies.

1. Clone the repository:
   git clone https://github.com/Vignesh0410/ThinkBot.git
   cd ThinkBot/project

------------------------------------
📦 Backend Setup (FastAPI)
------------------------------------

Requirements:
- fastapi
- uvicorn
- python-dotenv
- fireworks-ai (LLM)
- chromadb
- tqdm
- requests

Install dependencies:
  pip install -r backend/requirements.txt

Run the server:
  uvicorn sercer:app --reload

Server runs at:
  http://127.0.0.1:8000

------------------------------------
🌐 Frontend Setup (React + Vite)
------------------------------------

Requirements:
- react
- react-dom
- typescript
- vite
- tailwindcss
- shadcn/ui
- lucide-react
- axios
- zod

Install dependencies:
  cd frontend
  npm install

Start frontend:
  npm run dev

App runs at:
  http://localhost:5173




---

## 🤖 How It Works

1. User submits idea input via React frontend.

2. Backend uses LLaMA via Fireworks API to:

   - Score across 11 key metrics.

   - Recommend improvements.

   - Search similar ideas from ChromaDB.

3. Frontend displays:

   - Final validation score.

   - Per-metric scores.

   - 3 tailored recommendations.

---
🚀 Future Enhancements
📊 Graph-based score visualizations

🧾 PDF export of validation reports

🗣️ Voice input and multilingual support

🧠 Integration with external market datasets

📱 Mobile-optimized version
---

👨‍💼 Use Cases
🚀 Startup founders seeking early validation

📈 Incubators analyzing business proposals

💼 Investors screening ideas

🧪 Students/innovators developing product concepts
---


## 📌 Note

- This is a prototype for educational and demonstration purposes only.
- And does not replace expert business advice.






