# Implementation Plan: Black Swan Core Analysis Engine

**Branch**: `001-core-analysis-engine` | **Date**: 2026-05-10 | **Spec**: [specs/001-core-analysis-engine/spec.md](specs/001-core-analysis-engine/spec.md)

## Summary
Building a system architecture simulator that parses natural language into a system graph, identifies scalability risks, simulates failures under load, and performs similarity searches using Qdrant. The technical approach involves a FastAPI backend for processing and Next.js for a node-based graph UI using React Flow.

## Technical Context

**Language/Version**: Python 3.11+, TypeScript  
**Primary Dependencies**: FastAPI, Next.js 14, React Flow, Pydantic v2, OpenAI/Gemini API  
**Storage**: Qdrant (Vector DB), JSON Files (Architecture Storage for MVP)  
**Testing**: pytest (backend), Vitest/Playwright (frontend)  
**Target Platform**: Linux/Docker  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: Analysis in <15s, Similarity search in <3s  
**Constraints**: <1536-dim embeddings, React Flow responsiveness  
**Scale/Scope**: Support graphs up to 50 nodes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Spec-Driven Development**: Spec exists and is referenced.
- [x] **API-First Architecture**: FastAPI backend with defined OpenAPI contract.
- [x] **Graph-Native Interaction**: React Flow selected for frontend.
- [x] **Vector-Search Intelligence**: Qdrant integrated for similarity search.
- [x] **End-to-End Type Safety**: Pydantic and TypeScript used.
- [x] **Container-First Environment**: Docker setup included in Quickstart.

## Project Structure

### Documentation (this feature)

```text
specs/001-core-analysis-engine/
├── plan.md              # This file
├── research.md          # Technology decisions and rationales
├── data-model.md        # Entity definitions and relationships
├── quickstart.md        # Setup and usage instructions
├── contracts/           
│   └── openapi.yaml     # API definitions
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── api/             # FastAPI routes
│   ├── models/          # Pydantic/Data models
│   ├── services/        # AI parsing, Simulation logic
│   └── vector_store/    # Qdrant integration
└── tests/

frontend/
├── src/
│   ├── components/      # React Flow components, UI
│   ├── hooks/           # API hooks
│   ├── store/           # Global state
│   └── types/           # TypeScript definitions
└── tests/
```

**Structure Decision**: Web application (frontend + backend) chosen to separate AI/data processing from the visualization layer.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multi-repo-style (backend/frontend) | Strict separation of concerns | Single-folder structure makes dependency management messy for AI projects |
