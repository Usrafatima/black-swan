# Tasks: Black Swan Core Analysis Engine

**Input**: Design documents from `/specs/001-core-analysis-engine/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by phase and user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend directory and initialize Python virtual environment in backend/
- [x] T002 [P] Create frontend directory and initialize Next.js 14 project in frontend/
- [x] T003 Initialize git repository and create .gitignore for Python and Node.js
- [x] T004 [P] Create docker-compose.yml for local Qdrant instance
- [x] T005 Configure environment variables (.env) for OpenAI/Gemini API keys

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T006 [P] Define Pydantic models for Node, Edge, and Risk in backend/src/models/
- [x] T007 Define Architecture model and AnalysisResult schema in backend/src/models/
- [x] T008 [P] Setup FastAPI application and basic routing in backend/src/api/
- [x] T009 [P] Define TypeScript interfaces for Graph nodes/edges and AI results in frontend/src/types/
- [x] T010 Setup API client service in frontend/src/services/api.ts

---

## Phase 3: User Story 1 - Architecture Analysis (Priority: P1) 🎯 MVP

**Goal**: Parse natural language into a system graph and detect risks

**Independent Test**: Submit "Next.js + FastAPI + PostgreSQL" and verify the React Flow graph renders 3 nodes with appropriate edges and risk labels.

### Implementation for User Story 1

- [x] T011 [US1] Implement AI Parsing Service using LLM in backend/src/services/parser.py
- [x] T012 [US1] Implement Risk Analysis Service in backend/src/services/analyzer.py
- [x] T013 [US1] Create `/analyze` POST endpoint in backend/src/api/analyze.py
- [x] T014 [US1] Setup React Flow canvas component in frontend/src/components/GraphCanvas.tsx
- [x] T015 [P] [US1] Create custom Node components for different service types in frontend/src/components/nodes/
- [x] T016 [US1] Implement architecture input form and state management in frontend/src/components/InputForm.tsx
- [x] T017 [US1] Connect frontend input to `/analyze` API and render resulting graph

---

## Phase 4: User Story 2 - System Simulation (Priority: P2)

**Goal**: Simulate load and failure propagation across the graph

**Independent Test**: Trigger a simulation on a graph and verify nodes change color/state based on failure propagation logic.

### Implementation for User Story 2

- [x] T018 [US2] Implement Failure Simulation Engine in backend/src/services/simulator.py
- [x] T019 [US2] Create `/simulate` POST endpoint in backend/src/api/simulate.py
- [x] T020 [US2] Add failure state styles and animations to custom nodes in frontend/src/components/nodes/
- [x] T021 [US2] Implement simulation control panel in frontend/src/components/SimulationControls.tsx
- [x] T022 [US2] Add cascading failure visualization logic using Framer Motion

---

## Phase 5: User Story 3 - Similarity Search (Priority: P3)

**Goal**: Compare architecture with similar patterns in Qdrant

**Independent Test**: Request similarity search for a graph and verify the side panel displays at least 3 relevant architecture snippets.

### Implementation for User Story 3

- [x] T023 [US3] Implement Embedding Generation Service in backend/src/services/embeddings.py
- [x] T024 [US3] Setup Qdrant collection initialization in backend/src/vector_store/qdrant_client.py
- [x] T025 [US3] Implement Similarity Search Service in backend/src/services/search.py
- [x] T026 [US3] Create `/search-similar` POST endpoint in backend/src/api/search.py
- [x] T027 [US3] Create similarity results panel in frontend/src/components/SimilarityPanel.tsx
- [x] T028 [US3] Integrate similarity search results into the main dashboard flow

---

### Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Visual improvements and demo readiness

- [x] T029 Apply futuristic dark theme using TailwindCSS across all components
- [x] T030 [P] Add glowing effects to nodes and animated gradients to edges
- [x] T031 [P] Implement loading skeletons for AI analysis and search phases
- [x] T032 Prepare demo architecture examples in backend/src/data/examples.json
- [x] T033 Run final validation of quickstart.md instructions

---

## Dependencies & Execution Order

1. **Setup (Phase 1)** -> **Foundational (Phase 2)**
2. **Foundational (Phase 2)** blocks all User Stories.
3. **User Story 1 (P1)** is the MVP and should be completed before P2/P3.
4. **User Story 2 (P2)** and **User Story 3 (P3)** can proceed in parallel once P1 core components are stable.
5. **Polish (Phase 6)** follows completion of all functional stories.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
Focus on getting the text-to-graph flow working perfectly. This validates the core value proposition of Black Swan.

### Parallel Opportunities
- Frontend and Backend setup (T001, T002)
- Node components (T015) can be built while backend services (T011, T012) are being implemented.
- Polish tasks (T030, T031) can be handled by a dedicated UI focus after core logic is in place.
