# Quickstart: Black Swan Core Analysis Engine

## Prerequisites
- Docker & Docker Compose
- Python 3.11+
- Node.js 18+

## Setup
1. **Infrastructure**:
   ```bash
   docker run -p 6333:6333 qdrant/qdrant
   ```

2. **Backend**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Usage
1. Open `http://localhost:3000`.
2. Enter an architecture description (e.g., "Next.js + FastAPI + Qdrant").
3. Click **Analyze** to generate the graph and risk report.
4. Click **Simulate Load** to view failure propagation.
5. Click **Find Similar** to query the vector database.
