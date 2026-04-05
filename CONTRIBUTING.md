# Contributing to Tao

Thank you for contributing to Tao.

To maintain code quality and consistency, please follow these
guidelines.

---

## Branching Model

We use the following structure:

- main → production-ready code
- develop → integration branch
- feature/feature-name → new features
- fix/issue-name → bug fixes
- chore/task-name → maintenance tasks

Never commit directly to main.

---

## Commit Convention

We follow Conventional Commits:

    type(optional scope): short description

Examples:

    feat(auth): add login functionality
    fix(dashboard): correct chart rendering
    refactor(store): simplify reducer logic
    docs(readme): update setup instructions

Commit types:

- feat
- fix
- refactor
- docs
- style
- chore
- wip
- test

All commits must be written in English.

---

## Pull Requests

Before opening a Pull Request:

1.  Make sure the project builds correctly.
2.  Run: npm run lint && npm run build
3.  Keep PRs focused on a single feature or fix.
4.  Add a clear description of changes.

At least one reviewer approval is required before merging.

---

## Code Standards

- Use clear and descriptive variable names.
- Keep components small and reusable.
- Avoid duplicated logic.
- Follow clean code principles.
- Use semantic HTML for accessibility.

---

## Environment Setup

1.  Clone the repository.
2.  Run: npm install
3.  Configure environment variables using .env file.
4.  Start development server: npm run dev

---

## Reporting Issues

If you find a bug:

- Provide steps to reproduce
- Include screenshots if necessary
- Describe expected vs actual behavior

---

By contributing to Tao, you agree to follow the project's Code of
Conduct.
