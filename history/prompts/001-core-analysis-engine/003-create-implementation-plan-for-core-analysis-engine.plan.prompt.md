---
id: 3
title: Create Implementation Plan for Core Analysis Engine
stage: plan
date: 2026-05-10
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 001-core-analysis-engine
branch: 001-core-analysis-engine
user: HP
command: /sp.plan
labels: ["plan", "architecture", "design", "black-swan"]
links:
  spec: specs/001-core-analysis-engine/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-core-analysis-engine/plan.md
 - specs/001-core-analysis-engine/research.md
 - specs/001-core-analysis-engine/data-model.md
 - specs/001-core-analysis-engine/contracts/openapi.yaml
 - specs/001-core-analysis-engine/quickstart.md
tests:
 - none
---

## Prompt

/sp.plan 🧠 1. SPEC (WHAT WE ARE BUILDING)

We are building an AI system called Black Swan.

It is NOT a chatbot.

It is an AI system architecture simulator that:

takes architecture input
converts it into a graph
analyzes scalability risks
detects bottlenecks
simulates failure under load
finds similar architectures using vector search
⚙️ 2. TECH STACK
Next.js
React Flow
FastAPI (backend)
Qdrant
OpenAI / Gemini (AI logic)
🏗️ 3. BUILD PLAN (STEP BY STEP)
PHASE 1 — SETUP
Create Next.js frontend
Create FastAPI backend
Run Qdrant locally
PHASE 2 — CORE API

Build backend endpoints:

/analyze → architecture risk analysis
/graph → convert system to nodes/edges
/simulate → failure simulation
PHASE 3 — AI ENGINE
parse user architecture text
generate structured system components
detect risks using LLM
create embeddings
PHASE 4 — VECTOR SEARCH
store architecture in Qdrant
compare similar systems
return closest patterns
PHASE 5 — FRONTEND UI
React Flow graph visualization
AI insights panel
failure simulation animation
🚀 FINAL FLOW

User input → AI parsing → graph → risk analysis → Qdrant search → visualization

## Response snapshot

Generated the implementation plan for the Black Swan Core Analysis Engine. This includes a research document with tech choices, a data model for graph and risk entities, an OpenAPI contract for the backend services, and a quickstart guide for setup. The plan adheres to the project constitution's principles.

## Outcome

- ✅ Impact: Comprehensive technical design completed and ready for task breakdown.
- 🧪 Tests: n/a
- 📁 Files: specs/001-core-analysis-engine/plan.md, research.md, data-model.md, contracts/openapi.yaml, quickstart.md
- 🔁 Next prompts: /sp.tasks to generate the implementation task list.
- 🧠 Reflection: Defining the two-pass AI strategy in research was a key decision to ensure modularity and testability of the core engine.

## Evaluation notes (flywheel)

- Failure modes observed: update-agent-context.ps1 script used placeholder values from the plan template instead of the actual derived values.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Ensure the update-agent-context script reads the final plan instead of a draft or template.
