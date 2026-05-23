<!-- 
Sync Impact Report
- Version change: 0.0.0 → 0.1.0
- Modified principles: Initialized core principles for project 'Black Swan'.
- Added sections: Core Principles (SDD, API-First, Graph-Native, Vector-Search, Type Safety, Containerization), Governance.
- Removed sections: None.
- Templates requiring updates: ✅ .specify/templates/plan-template.md, ✅ .specify/templates/spec-template.md, ✅ .specify/templates/tasks-template.md.
- Follow-up TODOs: None.
-->

# Black Swan Constitution

## Core Principles

### I. Spec-Driven Development (SDD)
All development work MUST start with a formal specification (`/specs/<feature>/spec.md`), followed by an implementation plan (`plan.md`) and a task list (`tasks.md`). Implementation only begins after the architect approves the task list.

### II. API-First Architecture
The FastAPI backend serves as the single source of truth for business logic and data. The frontend MUST interact with the backend via well-defined, documented API contracts. No direct database access or logic leakage into the frontend is permitted.

### III. Graph-Native Interaction
The primary user interface leverages React Flow for node-based visualization and interaction. UI components MUST be modular, state-managed, and optimized for performance within a dynamic canvas environment.

### IV. Vector-Search Intelligence
Leveraging Qdrant, the system prioritizes semantic retrieval. All entities and unstructured data SHOULD be considered for vector embeddings to enable similarity-based discovery and AI-driven insights.

### V. End-to-End Type Safety
Rigorous type safety MUST be maintained across the stack. Frontend development uses TypeScript with strict mode. Backend development utilizes Python type hints and Pydantic models for data validation and serialization.

### VI. Container-First Environment
To ensure "run anywhere" consistency, the entire environment—including the Next.js frontend, FastAPI backend, and Qdrant database—MUST be manageable and reproducible via Docker Compose.

## Technology Stack

- **Frontend**: Next.js (TypeScript), React Flow, TailwindCSS
- **Backend**: FastAPI (Python 3.11+), Pydantic
- **Vector DB**: Qdrant
- **DevOps**: Docker, Docker Compose

## Governance

### Amendment Procedure
The constitution is a living document. Amendments may be proposed through a Pull Request. Every amendment MUST include a rationale and a version bump.

### Versioning Policy
- **MAJOR**: Changes that redefine core project identity or remove fundamental principles.
- **MINOR**: Addition of new principles or significant updates to existing ones.
- **PATCH**: Clarifications, formatting, and typo fixes.

### Compliance
All architectural plans (`plan.md`) must include a "Constitution Check" section to verify alignment with these principles.

**Version**: 0.1.0 | **Ratified**: 2026-05-10 | **Last Amended**: 2026-05-10
