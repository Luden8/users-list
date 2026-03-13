# Users List

Browse and search the user catalog with filtering, sorting, pagination and dark mode.

## Tech Stack

- React 19, TypeScript, Vite 8
- TanStack React Query, React Router 7
- Tailwind CSS 4
- Feature Sliced Design

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project Structure

```
src/
├── app/          # App shell, providers, router, global styles
├── entities/     # Business entities (user: API, hooks, UI)
├── features/     # Feature modules (search, filter, theme toggle)
├── pages/        # Page components (users list, user detail, 404)
└── shared/       # Shared hooks, UI components, icons
```
