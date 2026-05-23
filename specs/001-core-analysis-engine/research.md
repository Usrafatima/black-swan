# Research: Black Swan Core Analysis Engine

**Decision**: Use FastAPI with Pydantic v2 for the backend and Next.js 14 (App Router) for the frontend.
**Rationale**: 
- **FastAPI/Pydantic**: Provides high-performance, asynchronous capabilities and automatic OpenAPI generation, which is critical for the "API-First" and "Type Safety" principles.
- **Next.js 14**: Offers Server Components and improved routing, which helps in modularizing the Graph UI and AI insight panels.
- **Qdrant**: Selected for its high-performance vector search and robust Python client, fitting the "Vector-Search Intelligence" principle.
- **React Flow**: The industry standard for node-based UIs in React, allowing for the "Graph-Native" interaction required.

**Decision**: Implement a two-pass AI parsing strategy.
**Rationale**: 
- Pass 1: Extract entities and connections from natural language into a structured JSON graph.
- Pass 2: Perform risk analysis and bottleneck detection on the generated graph.
- This modular approach ensures higher accuracy and allows for independent testing of the parsing vs. analysis logic.

**Decision**: Use `qdrant-client` for vector store interactions.
**Rationale**: Official client ensures full feature support and compatibility with FastAPI's async nature.

**Alternatives Considered**:
- **Flask/Django**: Rejected due to lack of native async support and slower development speed for modern APIs compared to FastAPI.
- **Cytoscape.js**: Rejected in favor of React Flow for better React integration and developer experience in the "Graph-Native" context.
- **Pinecone**: Rejected to favor local development/containerization (Qdrant) per the "Container-First" principle.
