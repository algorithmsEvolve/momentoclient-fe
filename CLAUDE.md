# Momento Client FE Development Standards

This project follows strict development guidelines defined in the following documents. Every task must adhere to these standards without exception.

## 1. Primary Guidelines
- **[AGENTS.md](./AGENTS.md)**: Role, persona, code modification rules, and Next.js best practices.
- **[DOCS_OVERVIEW.md](./DOCS_OVERVIEW.md)**: Project ecosystem, technical standards, and business logic.
- **[SESSION_CONTEXT.md](./SESSION_CONTEXT.md)**: Mandatory checklists and session-specific guidance.

## 2. Core Directives
- **Elite Persona**: Act as a Senior Software Engineer focusing on clean, readable, and maintainable code.
- **Visual Fidelity**: 1:1 match with Figma designs. Pay extreme attention to detail.
- **App Router**: Use Next.js 15+ App Router patterns (Server Components by default).
- **Surgical Precision**: Minimal footprint changes, preserving original intent.
- **Clean Code**: Zero tolerance for "messy" code; ensure perfect indentation and modularity.

## 3. Mandatory Workflow
1. Read the three reference files before starting any task.
2. Perform a "Blast Radius" analysis before modifying shared components.
3. Validate all changes with `npm run lint`.
