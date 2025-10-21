# TDD Framework (TypeScript + Playwright) — Quick Start

Purpose
This is a minimal TDD-friendly example for students that demonstrates a login flow using Playwright and TypeScript.

Demo credentials
- username: Admin
- password: admin123

Quick start (minimum steps)
1) Install dependencies and Playwright browsers

```bash
npm install
npx playwright install
```

2) Run tests

```bash
npm test
```

Run tests

```bash
npm test
```

Optional (helpful for learning)
- Run tests headed: `npm run test:headed`
- Lint: `npm run lint` (ESLint + Prettier config included)
- CI: GitHub Actions workflow at `.github/workflows/playwright.yml`

Where to look
- Page Object: `src/pages/LoginPage.ts`
- Tests: `tests/` (positive and negative login examples)

Teaching tips
- Use the tests as the specification: write failing tests first (red), implement code to pass them (green), then refactor.
- Keep Page Objects small and focused — one file per page helps students reason about behavior.

That's it — small, focused, and ready for students to expand with more tests.
