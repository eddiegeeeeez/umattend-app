# Contributing to UMAttend App

Thank you for your interest in contributing to UMAttend App!

## Getting Started

1. Ensure you have repository access
2. Clone the repository locally
3. Install dependencies: `npm install`
4. Create a new branch for your feature/fix

## Branching Convention

We follow a simple branching strategy:

### Branch Types

- `feature/` - New features (e.g., `feature/user-authentication`)
- `fix/` - Bug fixes (e.g., `fix/login-validation`)
- `hotfix/` - Critical fixes (e.g., `hotfix/security-patch`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)
- `docs/` - Documentation updates (e.g., `docs/api-documentation`)

### Branch Naming

Use descriptive names with hyphens:

```bash
feature/user-profile-management
fix/password-reset-email
chore/eslint-configuration
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code changes that neither fix a bug nor add a feature
- `test` - Adding or updating tests
- `chore` - Changes to build process or auxiliary tools

### Examples

```bash
feat(auth): add Google OAuth integration
fix(api): resolve user registration validation
docs: update API documentation
chore(deps): update dependencies to latest versions
```

## Development Workflow

1. Create a branch following our naming convention
2. Make your changes
3. Write/update tests if applicable
4. Ensure code passes linting: `npm run lint`
5. Commit using conventional commit format
6. Follow pre-push checklist (see below)
7. Push to the repository
8. Create a Pull Request

## Pre-Push Checklist

Before pushing your changes to the remote repository, ensure you complete these steps:

### Code Quality

- [ ] Run linting: `npm run lint`
- [ ] Fix any linting issues: `npm run lint:fix`
- [ ] Format code: `npm run format`
- [ ] Type check passes: `npm run type-check`

### Testing

- [ ] Add tests for new features (when test framework is set up)
- [ ] Test your changes manually in the browser/API

### Build & Functionality

- [ ] Code builds successfully: `npm run build`
- [ ] Application runs without errors: `npm run dev`
- [ ] Verify your changes work as expected

### Git Best Practices

- [ ] Review your changes: `git diff`
- [ ] Commit follows conventional commit format
- [ ] Branch is up to date with main: `git pull origin main`
- [ ] Resolve any merge conflicts if they exist

### Final Check

```bash
# Quick pre-push validation
npm run lint && npm run type-check && npm run build
```

## Pull Request Guidelines

- Use a descriptive title
- Reference any related issues
- Provide a clear description of changes
- Ensure all tests pass
- Keep PRs focused and atomic

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint:fix` to automatically fix style issues
- Follow existing code patterns and conventions

## Questions?

If you have questions, feel free to open an issue for discussion.
