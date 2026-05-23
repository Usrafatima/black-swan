---
id: 1
title: Initialize Black Swan Constitution
stage: constitution
date: 2026-05-10
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: none
branch: main
user: HP
command: /sp.constitution
labels: ["initialization", "constitution", "black-swan"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

/sp.constitution You are a senior full-stack engineer helping set up a project called Black Swan.

Your job is ONLY to guide installation, folder structure, and initial project setup.

Do NOT design features yet. Do NOT explain advanced architecture.

Focus only on getting the project running locally.

1. TECH STACK

We are using:

Frontend
Next.js
React Flow
TailwindCSS
Backend
FastAPI (Python)
Vector DB
Qdrant
AI
OpenAI or Gemini API (later step, ignore for now)
2. WHAT YOU MUST DO

Give me ONLY:

STEP 1 — Frontend setup commands
Next.js installation
React Flow install
Tailwind setup
STEP 2 — Backend setup commands
FastAPI setup
virtual environment setup
required pip installs
STEP 3 — Qdrant setup
Docker command to run locally
STEP 4 — Folder structure

Show simple structure like:

black-swan/
  frontend/
  backend/
3. RULES
Keep it simple
No explanations
No system design
No AI prompts
No future features
Only setup instructions
Commands only + minimal structure
4. OUTPUT FORMAT

Use this format:

FRONTEND SETUP
commands here
BACKEND SETUP
commands here
QDRANT SETUP
docker command
PROJECT STRUCTURE
tree format
END

## Response snapshot

Initialized the Black Swan constitution with core principles (SDD, API-First, Graph-Native, Vector-Search, Type Safety, Containerization) and provided the requested setup commands for Next.js, FastAPI, and Qdrant.

## Outcome

- ✅ Impact: Project foundation established.
- 🧪 Tests: n/a
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: /sp.specify for first feature.
- 🧠 Reflection: Successfully mapped user tech stack to project principles.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
