# Code of Conduct for the Tao Project

## Our Commitment

In the interest of fostering an open, inclusive, and professional
environment, we are committed to making participation in the Tao project
a harassment-free experience for everyone, regardless of experience
level, gender, gender identity and expression, sexual orientation,
disability, personal appearance, body size, race, ethnicity, age,
religion, or nationality.

Tao is built as an academic and professional web application. All
contributors are expected to maintain respectful collaboration and high
dev/design standards.

## Standards of Conduct

### Behavior We Appreciate

- Be respectful and professional in all communications.
- Provide constructive and solution-oriented feedback.
- Collaborate openly and support team members.
- Write clean, readable, and well-documented code.
- Follow agreed architectural and design decisions.
- Respect deadlines and communicate blockers early.

### Unacceptable Behavior

- Be rude.
- Make personal attacks or use aggressive communication.
- Publish insider information.
- Intentionally disrupt the application or repository.
- Ignore the agreed-upon Git workflow and project standards.

## Development Guidelines

### Commit Convention

We follow a structured commit message format:

type(scope): short description

Examples:

- feat(auth): implement login with Firebase
- fix(dashboard): correct energy chart rendering bug
- refactor(tasks): simplify state management logic
- docs(readme): update setup instructions
- style(ui): improve button alignment

<b>Commit types:</b>

- feat: new feature
- fix: bug fix
- refactor: code improvement without feature change
- docs: documentation only
- style: formatting or UI improvements
- chore: tooling, configuration, or dependency updates

All commits must be in English, in lowercase, and clearly describe the change.

### Branching Model

We follow a structured branching strategy:

- main: production-ready code
- develop: integration branch for completed features
- feature/feature-name: new features
- fix/issue-name: bug fixes
- hotfix/description: urgent production fixes

Rules:

- Never commit directly to main.
- Open Pull Requests to merge into develop.
- At least one team member must review each Pull Request.
- Delete feature branches after merging (If there are too many.)

### Setup Instructions

To run Tao locally:

1.  Clone the repository.
2.  Install dependencies using: npm install
3.  Start the development server: npm run dev
4.  Configure environment variables using a .env file.

All contributors must use the same Node.js version defined in the
project configuration.

### Technologies and Libraries

Tao is built using:

- React
- Vite
- Firebase for authentication and database
- External API integration where required
- React Router for navigation
- CSS Modules or Styled Components for styling

All written content and code must be in English, as required by the
project guidelines.

## Accessibility and Quality Standards

We commit to:

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Responsive design across devices
- Clean component structure and separation of concerns
- Performance optimization (memoization, lazy loading, efficient
  rendering)

## Maintainer Responsibilities

Project maintainers commit to:

- Reviewing Pull Requests in a reasonable timeframe.
- Enforcing clean code and architecture standards.
- Maintaining a safe and respectful development environment.
- Ensuring compliance with academic project requirements.

## Reporting Issues

If you experience any errors or unacceptable technical failures, please contact us via "Issues" on github

Includes:

- Title
- Description of what happened
- People involved (if applicable)
- Supporting evidence (if applicable)

## Scope

This Code of Conduct applies to:

- The GitHub repository (issues, pull requests, discussions)
- Project documentation
- Team communication channels
- Project presentations and demonstrations

## Consequences

Violations of this Code of Conduct may result in:

1.  Private warning
2.  Removal from the project team (if applicable)
3.  Escalation to academic authorities if required

---

This Code of Conduct ensures that Tao is developed under professional,
ethical, and collaborative standards.
