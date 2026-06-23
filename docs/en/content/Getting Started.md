# Getting Started

<cite>
**Referenced Files in This Document**
- [package.json](file://package.json)
- [README.md](file://README.md)
- [next.config.mjs](file://next.config.mjs)
- [jsconfig.json](file://jsconfig.json)
- [postcss.config.mjs](file://postcss.config.mjs)
- [eslint.config.mjs](file://eslint.config.mjs)
- [app/layout.js](file://app/layout.js)
- [app/(site)/page.js](file://app/(site)/page.js)
- [components/ui/Navbar.js](file://components/ui/Navbar.js)
- [components/ui/Footer.js](file://components/ui/Footer.js)
- [components/features/landing/OpeningSection.js](file://components/features/landing/OpeningSection.js)
- [app/globals.css](file://app/globals.css)
- [AGENTS.md](file://AGENTS.md)
- [.env.example](file://.env.example)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Development Environment Setup](#development-environment-setup)
5. [Project Structure Overview](#project-structure-overview)
6. [Running the Development Server](#running-the-development-server)
7. [Supported Package Managers](#supported-package-managers)
8. [Verification Steps](#verification-steps)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Beginner-Friendly Tips](#beginner-friendly-tips)
11. [Conclusion](#conclusion)

## Introduction
This guide helps you set up and run the Momento Client Frontend locally. It covers prerequisites, installation, development server startup, project structure, and troubleshooting. The project is a Next.js application using the App Router, styled with Tailwind CSS v4, and optimized with Next.js features like next/font and next/image.

## Prerequisites
- Node.js version compatible with Next.js 16.x. The project specifies Next.js 16.2.3; ensure your Node.js version supports it.
- Basic understanding of React and Next.js fundamentals (pages, components, routing).
- Familiarity with the terminal/command prompt.
- Optional but recommended: Understanding of Tailwind CSS and ESLint basics.

**Section sources**
- [package.json:11-20](file://package.json#L11-L20)

## Installation
Follow these steps to install dependencies and prepare your environment:

1. Install dependencies using your preferred package manager (pnpm is recommended since this is a pnpm workspace project):
   - pnpm: `pnpm install`
   - npm: `npm install`

2. Copy the example environment variables file and configure it:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and define the required variables (e.g., `NEXT_PUBLIC_MOMENTO_API_URL` for the backend endpoint).

3. After installing dependencies and setting up the environment, you can proceed to run the development server.

**Section sources**
- [README.md:5-15](file://README.md#L5-L15)
- [package.json:5-10](file://package.json#L5-L10)

## Development Environment Setup
Configure your environment for optimal development:

- Environment Variables: Defined in `.env.local`. Core variables include:
  - `MOMENTO_API_URL`: Server-side API URL fallback
  - `NEXT_PUBLIC_MOMENTO_API_URL`: Browser-side API URL
  - `MOMENTO_REVALIDATE_SECRET`: Shared secret token for dynamic page revalidation

- ESLint: The project uses ESLint with next/core-web-vitals preset and custom overrides. Run the linter to validate code quality.
  - Command: `pnpm lint`
  - Config: [eslint.config.mjs:1-17](file://eslint.config.mjs#L1-L17)

- PostCSS and Tailwind CSS v4: Tailwind is configured via PostCSS and enabled in the project.
  - PostCSS config: [postcss.config.mjs:1-8](file://postcss.config.mjs#L1-L8)
  - Tailwind is imported in global styles: [app/globals.css:1](file://app/globals.css#L1)

- Next.js Compiler Optimizations: React Compiler is enabled in Next.js config.
  - Config: [next.config.mjs:4](file://next.config.mjs#L4)

- Path Aliases: The project uses a path alias @ pointing to the repository root for convenient imports.
  - Config: [jsconfig.json:3-5](file://jsconfig.json#L3-L5)

**Section sources**
- [eslint.config.mjs:1-17](file://eslint.config.mjs#L1-L17)
- [postcss.config.mjs:1-8](file://postcss.config.mjs#L1-L8)
- [app/globals.css:1](file://app/globals.css#L1)
- [next.config.mjs:4](file://next.config.mjs#L4)
- [jsconfig.json:3-5](file://jsconfig.json#L3-L5)

## Project Structure Overview
The project follows Next.js App Router conventions with route groups for better structure:

- app/: Application shell, metadata, and pages.
  - app/layout.js: Root layout with fonts, metadata, and OpenGraph configurations.
  - app/globals.css: Global Tailwind v4 styles, custom scrollbars, and animations.
  - app/(site)/: Route group for public website pages (layout with Navbar, Footer, and Floating WhatsApp; pages for Home, Pricing, and Estimation).
  - app/(invitation)/: Route group for digital invitation dynamic themes.

- components/: Reusable UI and feature components.
  - components/ui/: Shared UI primitives (Navbar, Footer, ExtraBanner, ImageViewer).
  - components/features/landing/: Feature-specific sections for the landing page (e.g., OpeningSection, SeserahanSection).

- lib/: State-less utility functions, data fetching hooks, and default content configurations.

- public/: Static assets (images/icons/fonts) referenced by components.

```mermaid
graph TB
A["Repository Root"] --> B["app/"]
A --> C["components/"]
A --> D["lib/"]
A --> E["public/"]
A --> F["next.config.mjs"]
B --> B1["layout.js (Root)"]
B --> B2["(site)/"]
B --> B3["(invitation)/"]
B --> B4["globals.css"]
B2 --> B2a["layout.js (SiteLayout)"]
B2 --> B2b["page.js (Home)"]
C --> C1["ui/"]
C --> C2["features/landing/"]
C1 --> C1a["Navbar.js"]
C1 --> C1b["ExtraBanner.js"]
C1 --> C1c["Footer.js"]
```

**Diagram sources**
- [app/layout.js:1-58](file://app/layout.js#L1-L58)
- [app/(site)/layout.js:1-30](file://app/(site)/layout.js#L1-L30)
- [app/(site)/page.js:1-50](file://app/(site)/page.js#L1-L50)
- [components/ui/Navbar.js:1-86](file://components/ui/Navbar.js#L1-86)
- [components/ui/Footer.js:1-51](file://components/ui/Footer.js#L1-L51)
- [components/ui/ExtraBanner.js:1-64](file://components/ui/ExtraBanner.js#L1-L64)
- [next.config.mjs:1-24](file://next.config.mjs#L1-L24)

**Section sources**
- [app/layout.js:1-58](file://app/layout.js#L1-L58)
- [app/(site)/layout.js:1-30](file://app/(site)/layout.js#L1-L30)
- [app/(site)/page.js:1-50](file://app/(site)/page.js#L1-L50)
- [components/ui/Navbar.js:1-86](file://components/ui/Navbar.js#L1-L86)
- [components/ui/Footer.js:1-51](file://components/ui/Footer.js#L1-L51)
- [components/ui/ExtraBanner.js:1-64](file://components/ui/ExtraBanner.js#L1-L64)
- [next.config.mjs:1-24](file://next.config.mjs#L1-L24)
- [jsconfig.json:1-8](file://jsconfig.json#L1-L8)
- [postcss.config.mjs:1-8](file://postcss.config.mjs#L1-L8)
- [eslint.config.mjs:1-17](file://eslint.config.mjs#L1-L17)

## Running the Development Server
Start the Next.js development server:

- Command: [README.md:7-15](file://README.md#L7-L15)
- Scripts: [package.json:5-10](file://package.json#L5-L10)

Open http://localhost:3000 in your browser to view the site.

**Section sources**
- [README.md:5-17](file://README.md#L5-L17)
- [package.json:5-10](file://package.json#L5-L10)

## Supported Package Managers
The project supports multiple package managers. Choose one and use its standard commands:

- npm: [README.md:7-8](file://README.md#L7-L8)
- yarn: [README.md:10](file://README.md#L10)
- pnpm: [README.md:12](file://README.md#L12)
- bun: [README.md:14](file://README.md#L14)

Build and start scripts are also defined:
- Build: [package.json:7](file://package.json#L7)
- Start: [package.json:8](file://package.json#L8)

**Section sources**
- [README.md:7-15](file://README.md#L7-L15)
- [package.json:5-10](file://package.json#L5-L10)

## Verification Steps
After installation and server start, verify everything works:

- Confirm the homepage loads at http://localhost:3000.
- Inspect the root layout and metadata:
  - Root layout and fonts: [app/layout.js:1-58](file://app/layout.js#L1-L58)
- Verify the home page renders the expected sections:
  - Home page composition: [app/(site)/page.js:1-50](file://app/(site)/page.js#L1-L50)
- Ensure global styles and theme tokens are applied:
  - Global CSS and Tailwind integration: [app/globals.css:1-394](file://app/globals.css#L1-L394)
- Confirm navigation and footer components render:
  - Navbar: [components/ui/Navbar.js:17-84](file://components/ui/Navbar.js#L17-L84)
  - Footer: [components/ui/Footer.js:3-49](file://components/ui/Footer.js#L3-L49)
- Validate image optimization and remote image patterns:
  - Remote pattern configuration: [next.config.mjs:1-24](file://next.config.mjs#L1-L24)
- Run the linter to catch issues early:
  - Lint command: `pnpm lint`
  - ESLint config: [eslint.config.mjs:1-17](file://eslint.config.mjs#L1-L17)

**Section sources**
- [app/layout.js:1-58](file://app/layout.js#L1-L58)
- [app/(site)/page.js:1-50](file://app/(site)/page.js#L1-L50)
- [app/globals.css:1-394](file://app/globals.css#L1-L394)
- [components/ui/Navbar.js:17-84](file://components/ui/Navbar.js#L17-L84)
- [components/ui/Footer.js:3-49](file://components/ui/Footer.js#L3-L49)
- [next.config.mjs:1-24](file://next.config.mjs#L1-L24)
- [eslint.config.mjs:1-17](file://eslint.config.mjs#L1-L17)

## Troubleshooting Guide
Common setup and runtime issues:

- Port already in use (commonly port 3000):
  - Change the port in your environment or stop the conflicting process.
  - Start the dev server again: `pnpm dev`

- Node.js version mismatch:
  - Ensure your Node.js version matches Next.js 16.x requirements.
  - Check the Next.js release notes for compatible versions.

- Missing dependencies after clone:
  - Reinstall dependencies using pnpm: `pnpm install`

- Tailwind CSS not applying:
  - Verify Tailwind is imported in global CSS: [app/globals.css:1](file://app/globals.css#L1)
  - Confirm PostCSS plugin is present: [postcss.config.mjs:3](file://postcss.config.mjs#L3)

- ESLint errors blocking development:
  - Run the linter and fix reported issues:
    - Command: `pnpm lint`
    - Config: [eslint.config.mjs:1-17](file://eslint.config.mjs#L1-L17)

- Images not loading:
  - Ensure images are placed under public/ or use next/image with remote patterns configured:
    - Remote patterns: [next.config.mjs:1-24](file://next.config.mjs#L1-L24)

- Path alias not resolving:
  - Confirm path alias configuration:
    - jsconfig.json: [jsconfig.json:3-5](file://jsconfig.json#L3-L5)

**Section sources**
- [app/globals.css:1](file://app/globals.css#L1)
- [postcss.config.mjs:3](file://postcss.config.mjs#L3)
- [eslint.config.mjs:1-17](file://eslint.config.mjs#L1-L17)
- [next.config.mjs:1-24](file://next.config.mjs#L1-L24)
- [jsconfig.json:3-5](file://jsconfig.json#L3-L5)

## Beginner-Friendly Tips
- Start with the development server to confirm your environment is ready: `pnpm dev`
- Explore the root layout and metadata to understand global theming:
  - [app/layout.js:1-58](file://app/layout.js#L1-L58)
- Edit the home page to see changes live:
  - [app/(site)/page.js:1-50](file://app/(site)/page.js#L1-L50)
- Use the Navbar and Footer as reference for building new UI components:
  - [components/ui/Navbar.js:17-84](file://components/ui/Navbar.js#L17-L84)
  - [components/ui/Footer.js:3-49](file://components/ui/Footer.js#L3-L49)
- Keep the linter running during development to maintain code quality:
  - [eslint.config.mjs:1-17](file://eslint.config.mjs#L1-L17)

**Section sources**
- [app/layout.js:1-58](file://app/layout.js#L1-L58)
- [app/(site)/page.js:1-50](file://app/(site)/page.js#L1-L50)
- [components/ui/Navbar.js:17-84](file://components/ui/Navbar.js#L17-L84)
- [components/ui/Footer.js:3-49](file://components/ui/Footer.js#L3-L49)
- [eslint.config.mjs:1-17](file://eslint.config.mjs#L1-L17)

## Conclusion
You now have the essentials to set up, run, and iterate on the Momento Client Frontend. Use the development server, verify your setup, and leverage the provided configurations for a smooth development experience. Refer to the project’s guidelines for UI fidelity and Next.js best practices.

**Section sources**
- [AGENTS.md:1-82](file://AGENTS.md#L1-L82)