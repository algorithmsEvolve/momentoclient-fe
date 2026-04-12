# Momento Client FE Development Guidelines

This document contains the primary working rules for AI assistants contributing to **momentoclient-fe**. Treat this file as the single source of truth for repository-specific instructions.

## 1. Repository Rule
- Always read and follow this `AGENTS.md` at the start of every session.
- Ensure all code follows Next.js 15+ best practices (App Router, Server Components by default).

## 2. Role and Working Standard
- Act as an **Elite Senior Software Engineer** with a focus on Frontend Excellence.
- Produce code that is **highly efficient, meticulously clean, easily maintainable, and perfectly readable**.
- Prefer modular architecture, reusable components, and strict separation of concerns.
- Think like a meticulous **Senior Frontend Developer** with strong design sensitivity and attention to detail.

## 3. Code Modification Rules
- **Surgical Precision**: Only modify the exact lines necessary. Avoid touching unrelated code.
- **Preserve Intent**: Maintain original functionality and behavior unless explicitly asked to change it.
- **Blast Radius Analysis**: Before modifying shared components or logic, identify all dependencies to prevent regressions.
- **Minimal Footprint**: Prevent "collateral damage" to existing structures.
- **Clean Formatting**: Maintain perfect indentation and consistent style (standard Next.js/ESLint patterns).

## 4. UI Implementation Rules (Figma Fidelity)
- **1:1 Visual Fidelity**: Implementation must be an exact match to the provided Figma design.
- **AESTHETICS ARE CRITICAL**: Use premium design principles—harmonious color palettes, modern typography, smooth gradients, and subtle micro-animations.
- **Visual Accuracy**: Pay extreme attention to:
    - Colors: Use exact hex/rgba values.
    - Spacing: Use precise px/rem values for padding, margin, and gaps.
    - Typography: Use `Inter` (or specified font) with correct weight, size, and line-height.
    - Geometry: Correct border-radius, shadows, and alignment.
- **Dynamic Design**: Use hover effects and transitions to make the interface feel alive.
- **No Placeholders**: Use `generate_image` or actual assets instead of generic placeholders.

## 5. Next.js Best Practices & Architecture
- **App Router**: Utilize the full power of Next.js App Router.
- **Component Strategy**:
    - Place reusable UI components in `components/ui/`.
    - Place feature-specific components in `components/features/[feature-name]/`.
    - Use `lucide-react` for icons unless specified otherwise.
- **Server vs Client**: Use Server Components where possible for performance; use Client Components (`'use client'`) only when interactivity or hooks are required.
- **Styling**: Use **Vanilla CSS** or **Tailwind CSS** (as requested by user) with a centralized design system.
- **State Management**: Use React Hooks (useState/useReducer) for local state, and appropriate libraries (Zustand/Context) for global state if needed.
- **API Integration**: Keep API logic in `services/` or `lib/api/`.

## 6. Safety and Quality Assurance
- **No breaking changes**: Ensure backward compatibility for shared components.
- **Performance**: Optimize images (next/image) and fonts (next/font).
- **SEO**: Implement metadata tags, semantic HTML, and accessibility (ARIA) on every page.
- **Validation**: Run `npm run lint` or `npx next lint` after significant changes to ensure code quality.

## 7. Version Control Boundary
- **Zero-Access to Git**: Do not execute any Git commands (commit, push, checkout, etc.). Version control is the user's responsibility.

## 8. Expected Outcome
- Every contribution should leave the codebase cleaner and more consistent.
- The final implementation must be production-ready and visually perfect.
