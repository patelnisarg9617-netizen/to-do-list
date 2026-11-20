# TaskForge Architecture

## Overview
TaskForge is a single‑page productivity web app built with **static HTML5**, modern **CSS3**, and **vanilla JavaScript**. All interactions—task creation, editing, filtering, and UI state (drawer, modal, toasts)—are handled client‑side.

## Data Management
- **In‑memory state** holds the current list of tasks.
- **LocalStorage** persists tasks across page reloads, providing a simple key‑value store (`tasks` array) without a backend.

## UI Components
- **Navbar** – responsive navigation with mobile hamburger toggle.
- **Hero** – introductory banner.
- **CardsGrid** – displays task cards; supports filter tabs (All / Active / Completed).
- **Modal / CartDrawer** – slide‑over panels for task details and editing.
- **Footer** – static site footer.
- **Toast notifications** – feedback for add/edit/delete actions.

## Interaction Flow
1. User adds/edits a task via the modal form.
2. Form validation runs in JavaScript; on success the task is saved to the in‑memory array and synced to LocalStorage.
3. UI updates instantly; a toast confirms the action.
4. Filter tabs re‑render the CardsGrid based on task status.
5. The drawer/modal can be opened/closed with smooth CSS transitions.

## Build & Deployment
- No build step required; files can be served from any static host (GitHub Pages, Netlify, Vercel, etc.).
- The `index.html` entry point loads `styles.css` and `app.js`.

## Rationale
Choosing a pure client‑side stack eliminates server costs, simplifies deployment, and meets the project's functional scope, which does not require multi‑user persistence or server‑side logic.