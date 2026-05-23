---
id: 2
title: Create Core Analysis Engine Specification
stage: spec
date: 2026-05-10
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 001-core-analysis-engine
branch: 001-core-analysis-engine
user: HP
command: /sp.specify
labels: ["spec", "core-engine", "black-swan"]
links:
  spec: specs/001-core-analysis-engine/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-core-analysis-engine/spec.md
 - specs/001-core-analysis-engine/checklists/requirements.md
tests:
 - none
---

## Prompt

/sp.specify You are a Senior Full-Stack System Architect + AI Engineer. You are helping build a project called Black Swan, an AI-powered system architecture simulator. Your job is to help design and implement the system step-by-step with clean, production-style thinking. 1. PROJECT OVERVIEW Black Swan is NOT a chatbot. It is an AI system architecture analysis tool that: takes software architecture input converts it into a graph analyzes scalability risks detects bottlenecks and failure points simulates system breakdown under load compares similar architectures using vector search 2. TECH STACK We are using: Next.js React Flow TailwindCSS (UI styling) FastAPI (Python backend) Qdrant OpenAI / Gemini API (for reasoning + embeddings) 3. CORE SYSTEM GOAL The system must: INPUT: User provides architecture like: “Next.js + Node.js + PostgreSQL + Redis for 2M users” OUTPUT: Return structured analysis: system graph (nodes + edges) scalability risks bottlenecks failure points missing components optional cost estimation 4. WHAT YOU MUST HELP BUILD You will guide step-by-step: A. Backend API /analyze endpoint /simulate endpoint /search-similar endpoint B. AI Processing Layer architecture parsing risk analysis embedding generation C. Qdrant Integration store architecture embeddings similarity search D. Frontend Integration graph rendering data format (React Flow) API connection structure 5. OUTPUT RULES When responding: Be concise but technical Provide code when needed Prefer production-style structure Avoid long explanations unless asked Always think in modular system design 6. DATA FORMAT (IMPORTANT) Always return structured JSON like: { "nodes": [], "edges": [], "risks": [], "bottlenecks": [], "failures": [], "recommendations": [] } 7. THINKING STYLE Act like: “A senior engineer designing a real-world distributed system observability tool” Focus on: scalability latency reliability cost efficiency system failure behavior 8. IMPORTANT RESTRICTIONS Do NOT add unrelated features Do NOT design UI unless asked Do NOT add marketing ideas Stick to system + engineering logic only

## Response snapshot

Created the feature specification for the Black Swan Core Analysis Engine. Defined user stories for analysis, simulation, and similarity search. Established functional requirements and measurable success criteria. Validated the spec with a quality checklist.

## Outcome

- ✅ Impact: Feature requirements solidified and testable.
- 🧪 Tests: n/a
- 📁 Files: specs/001-core-analysis-engine/spec.md, specs/001-core-analysis-engine/checklists/requirements.md
- 🔁 Next prompts: /sp.plan to design the technical architecture.
- 🧠 Reflection: The detailed project overview provided by the user allowed for a high-quality initial spec with minimal clarifications.

## Evaluation notes (flywheel)

- Failure modes observed: PowerShell script for feature creation had issues with long argument strings.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Improve PowerShell script argument handling (use -File with care or pass desc via temp file).
