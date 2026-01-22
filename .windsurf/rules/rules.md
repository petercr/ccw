---
trigger: always_on
---

# TanStack Start + Sanity CMS Rules

## Purpose

These rules guide the AI when working on this codebase, which uses **TanStack Start** (React + TypeScript) as the application framework and **Sanity** as the headless CMS.

The AI must follow these conventions when generating, refactoring, or explaining code.

---

## Architecture Overview

- The app is built with **TanStack Start** using file-based routing and loaders/actions for data fetching and mutations.
- Content comes from **Sanity**; schemas live in the `sanity` (or `./sanity`) directory, and content is fetched via GROQ or the Sanity client.
- Components are written in **TypeScript + React** and should favor composability and clear separation of concerns.

---

## TanStack Start Conventions

- Use **file-based routing** under `app/routes`:
  - Each route file exports a `Route` with the correct path configuration.
  - Use loaders/actions for data fetching and mutations instead of fetching in components.
- Prefer **server-side data loading**:
  - Put data-fetching logic in route loaders or server helpers, not in React components.
  - Handle errors in loaders and surface typed results to components.
- Respect the existing **router patterns**:
  - Reuse any existing `Route` factories, layout routes, or shared loader utilities.
  - Do not invent new routing patterns if there is a clear existing convention.
- When adding features:
  - Co-locate route-specific components with their route file if that is the project’s convention.
  - Keep reusable components in a shared components directory (for example `components/` or `app/components/`).

---

## React + TypeScript Guidelines

- Always write components in **TypeScript** with explicit props interfaces or types.
- Prefer **function components** and hooks (`useState`, `useEffect`, `useMemo`, etc.) over class components.
- Keep components **small and focused**:
  - Extract reusable logic into custom hooks or utility functions.
  - Avoid mixing data fetching, complex state management, and presentational logic in a single component.
- Follow existing **styling conventions** (e.g. Tailwind, CSS Modules, etc.):
  - Do not introduce a new styling solution if the project already uses one.
  - Reuse existing utility classes, design tokens, and layout patterns.

---

## Sanity CMS Conventions

- Treat **Sanity as the source of truth** for content:
  - Do not hard-code content that should live in Sanity.
  - When adding content types, define or update the relevant Sanity schemas.
- Keep **schemas organized**:
  - Place all Sanity schema definitions under the designated `sanity/schemas` directory (or the project’s chosen path).
  - Reuse common fields and types via shared schema modules when possible.
- Use **GROQ queries or the Sanity client** consistently:
  - Implement queries in server-side code (loaders, API handlers, or server utilities), not in React components.
  - Keep queries close to the route or feature that uses them, unless there is an existing shared query utilities module.
- Prefer **references** to model relationships between documents instead of duplicating content.

---

## Data Flow Between TanStack Start and Sanity

## Sanity Data Fetching Pattern

- **Sanity Client Setup**: Uses `@sanity/client` with configuration from `projectDetails.ts`, connecting to a specific project ID, dataset, and API version with CDN enabled for performance

- **GROQ Queries**: Data is fetched using GROQ (Graph-Relational Object Queries) defined in files like [queries.ts](/apps/frontend/src/sanity/queries.ts) and [homeQuery.ts](/apps/frontend/src/sanity/queries/homeQuery.ts), which construct structured queries for different content types (posts, home page, categories, etc.)

- **React Loader Pattern**: Data is loaded through React Router loaders (e.g., [homeLoader](/apps/frontend/src/loaders/home.ts:6:0-38:2), [documentLoader](/apps/frontend/src/loaders/document.ts:6:0-40:2)) that use TanStack Query for caching and state management, with support for preview mode that switches between 'published' and 'drafts' perspectives

- **Live Preview Support**: Implements `@sanity/react-loader` with `useLiveMode` for real-time content editing, including Stega for visual editing overlays and token-based draft access for authenticated preview sessions

- If you need to check data in Sanity for reference, use the Sanity MCP (Model Checking Protocol) to check the data.
- Fetch Sanity data in **route loaders** or server utilities:
  - Loader returns should be typed and minimal (only what the route needs).
  - Validate or narrow types after fetching (with TypeScript, Zod, or existing helpers).
- Components should receive **already-shaped data**:
  - Avoid transforming data heavily inside components.
  - Do mapping/normalization in the loader or a shared utility function.
- When creating new pages or sections that rely on Sanity:
  - Add or update the relevant Sanity schema.
  - Add or update GROQ queries or Sanity client calls in loaders.
  - Ensure that preview/draft behavior (if present) matches existing patterns.

---

## Error Handling and Edge Cases

- Handle missing or invalid Sanity content gracefully:
  - For missing documents, prefer returning a 404 response or a clear fallback UI rather than throwing unhandled errors.
  - Log or surface errors in a way consistent with existing error handling.
- For TanStack Start loaders:
  - Return typed error states or use the framework’s error-handling mechanisms.
  - Do not leak raw Sanity errors directly to the UI; sanitize them first.

---

## Code Style and Quality

- Follow the existing **linting and formatting** setup (ESLint, Prettier, etc.):
  - Do not disable rules unless absolutely necessary and justified in comments.
- Prefer **clear, descriptive names** for:
  - Routes
  - Loaders and actions
  - Sanity schemas and fields
  - GROQ queries and helpers
- Add comments only where they clarify non-obvious logic or project-specific quirks; avoid redundant comments.

---

## When Unsure

- Prefer patterns and conventions that are already present in the repo.
- If multiple approaches are possible, pick the one that:
  - Aligns best with TanStack Start’s routing and data-loading model.
  - Keeps Sanity as the single source of truth for content.
  - Minimizes duplication and keeps concerns separated.
