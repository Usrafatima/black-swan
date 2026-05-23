# Data Model: Black Swan Core Analysis Engine

## Entities

### Architecture
- `id`: UUID (Primary Key)
- `name`: String (Optional)
- `raw_input`: Text
- `created_at`: DateTime
- `embedding`: Vector(1536) (Stored in Qdrant)

### Node (Component)
- `id`: String (Slug or ID used in React Flow)
- `architecture_id`: UUID (Foreign Key)
- `label`: String (e.g., "PostgreSQL")
- `type`: Enum (frontend, backend, database, cache, queue, storage, other)
- `properties`: JSON (Optional metadata like "version", "replicas")

### Edge (Connection)
- `id`: String
- `architecture_id`: UUID (Foreign Key)
- `source_node_id`: String
- `target_node_id`: String
- `label`: String (Optional, e.g., "gRPC", "HTTPS")

### Risk
- `id`: UUID
- `architecture_id`: UUID
- `severity`: Enum (low, medium, high, critical)
- `category`: Enum (scalability, reliability, bottleneck, security)
- `description`: Text
- `mitigation`: Text (Recommendation)

## Relationships
- An **Architecture** has many **Nodes**.
- An **Architecture** has many **Edges**.
- An **Architecture** has many **Risks**.

## Validation Rules
- `raw_input` MUST NOT be empty.
- Every `Edge` MUST connect two existing `Nodes`.
- Every `Risk` MUST be linked to at least one `Architecture`.
