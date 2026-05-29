# 🦢 Black Swan: Vector-Powered Infrastructure Intelligence

Black Swan is a high-fidelity architecture analysis and simulation platform that transforms system topologies into strategic intelligence. It goes beyond static diagrams, providing a neural understanding of distributed systems, detecting failure points before they happen, and charting evolutionary paths for scale.

![Project Status](https://img.shields.io/badge/Status-Development-orange)
![Tech Stack](https://img.shields.io/badge/Stack-FastAPI%20%7C%20Next.js%20%7C%20Qdrant-blue)

---

## 🚀 Core Capabilities

- **Neural Topology Analysis**: Parses natural language architecture descriptions into production-grade system graphs using AI.
- **Deep Infrastructure Reasoning**: Automatically detects Single Points of Failure (SPOFs), cascading risks, and scalability bottlenecks.
- **Multi-Dimensional Reliability Scoring**: Evaluates systems across Fault Tolerance, Scalability, Security, and Recovery dimensions.
- **Vector-Driven Evolution Pathing**: Uses Qdrant to recommend optimized architecture patterns based on Traffic Volume, Budget, and Industry context.
- **Dynamic Cascade Simulation**: Propagates failure scenarios through topological dependency chains with targeted mitigation advice.

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Validation**: Pydantic v2
- **Vector Database**: [Qdrant](https://qdrant.tech/) (Semantic Search & Discovery)
- **AI Engine**: Gemini 1.5 Pro / OpenAI (Embeddings & Reasoning)

### Frontend
- **Framework**: Next.js 14/15/16 (TypeScript)
- **Graph Engine**: React Flow
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS 4

---

## 🚦 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Python**: v3.11.0 or higher
- **Docker**: For running the Qdrant vector database

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/black-swan.git
cd black-swan
```

### 2. Infrastructure Setup (Qdrant)

The project uses Qdrant for architectural pattern matching. Start it via Docker:

```bash
docker-compose up -d
```
*This will start Qdrant on `http://localhost:6333`.*

### 3. Backend Configuration

Navigate to the backend directory and set up your environment:

```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
OPENAI_API_KEY=your_openai_key_here
# OR
GOOGLE_API_KEY=your_google_gemini_key_here
QDRANT_HOST=localhost
QDRANT_PORT=
```

**Seed the Vector Database:**
Populate Qdrant with the core architectural library:
```bash
python seed_patterns.py
```

**Start the API:**
```bash
python main.py
```
*API will be available at `http://localhost:8000`.*

### 4. Frontend Configuration

Navigate to the frontend directory:

```bash
cd ../frontend
npm install
```

**Start the Development Server:**
```bash
npm run dev
```
*Frontend will be available at `http://localhost:3000`.*

---

## 🏗 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── api/             # API Endpoints (Analyze, Search, Simulate)
│   │   ├── services/        # Logic Layer (Embeddings, Parser, Simulator)
│   │   ├── vector_store/    # Qdrant Client Configuration
│   │   └── models/          # Pydantic Schemas
│   ├── main.py              # Entry point
│   └── seed_patterns.py     # Database Seeder
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router (Dashboard, Landing)
│   │   ├── components/      # UI Components (GraphCanvas, EvolutionPlanner)
│   │   ├── services/        # API Integration
│   │   └── types/           # TypeScript Definitions
│   └── package.json
└── docker-compose.yml       # Infrastructure Orchestration
```

---

## 🧠 How it Works

1.  **Input**: Enter your architecture (e.g., "A Go microservice connecting to a MongoDB cluster via a RabbitMQ queue").
2.  **Parsing**: The system uses LLMs to convert the text into a `nodes` and `edges` graph.
3.  **Analysis**: The graph is analyzed for structural weaknesses.
4.  **Vector Search**: The architecture is vectorized and compared against a library of "best-practice" patterns in Qdrant.
5.  **Evolution**: The **Strategic Evolution Path** component identifies how to "Step Up" your architecture to meet specific Traffic or Budget goals.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
