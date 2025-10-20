# Contributing to Markitdown Desktop

Thank you for your interest in contributing to Markitdown Desktop! We welcome contributions from the community and appreciate your help in making this project better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Code Style](#code-style)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes
5. Push to your fork
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/markitdown-desktop.git
   cd markitdown-desktop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build the application:
   ```bash
   npm run build
   ```

### Project Structure

```
markitdown-desktop/
├── src/              # Source code
├── public/           # Static assets
├── tests/            # Test files
├── docs/             # Documentation
└── dist/             # Build output
```

## How to Contribute

### Types of Contributions

We welcome many types of contributions, including:

- Bug fixes
- New features
- Documentation improvements
- Code refactoring
- Performance improvements
- Tests
- Examples and tutorials

### Before You Start

- Check existing [issues](https://github.com/yourusername/markitdown-desktop/issues) and [pull requests](https://github.com/yourusername/markitdown-desktop/pulls) to avoid duplicating work
- For large changes, please open an issue first to discuss your proposed changes
- Make sure you agree with our [Code of Conduct](CODE_OF_CONDUCT.md)

## Code Style

### General Guidelines

- Write clear, readable, and maintainable code
- Follow the existing code style and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused on a single task

### JavaScript/TypeScript

- Use ES6+ features where appropriate
- Use `const` and `let` instead of `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Follow the project's ESLint configuration

### Formatting

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings (unless using template literals)
- Maximum line length: 100 characters
- Run `npm run lint` before committing

### Testing

- Write tests for new features and bug fixes
- Ensure all tests pass before submitting a PR
- Run tests with `npm test`
- Aim for good code coverage

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring (no functionality changes)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process, dependencies, etc.

### Examples

```
feat(converter): add support for PDF conversion

Add new PDF conversion feature using pdf-lib library.
Includes support for text extraction and formatting.

Closes #123
```

```
fix(ui): resolve layout issue on mobile devices

Fix responsive layout breaking on screens smaller than 768px.
```

```
docs: update installation instructions in README
```

## Pull Request Process

1. **Create a Branch**: Create a new branch from `main` for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**: Implement your changes following our code style guidelines

3. **Test**: Ensure all tests pass and add new tests if necessary
   ```bash
   npm test
   npm run lint
   ```

4. **Commit**: Commit your changes with a descriptive commit message

5. **Push**: Push your branch to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a PR**: Open a pull request against the `main` branch

7. **Fill Out the Template**: Complete all sections of the PR template

8. **Address Feedback**: Respond to any code review feedback

9. **Wait for Approval**: A maintainer will review and merge your PR

### PR Guidelines

- Keep PRs focused on a single feature or fix
- Update documentation as needed
- Add tests for new functionality
- Ensure CI/CD checks pass
- Link related issues in the PR description
- Request review from maintainers

## Reporting Bugs

If you find a bug, please create an issue using the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.yml).

Include:
- Clear description of the bug
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, version, etc.)
- Relevant logs or screenshots

## Suggesting Features

We welcome feature suggestions! Please create an issue using the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.yml).

Include:
- Problem description or use case
- Proposed solution
- Alternative approaches considered
- Any relevant examples or mockups

## Questions?

If you have questions about contributing, feel free to:
- Open a discussion on GitHub
- Reach out to the maintainers
- Check existing documentation

Thank you for contributing to Markitdown Desktop!
