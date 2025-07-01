# Contributing to Shopify AI Agent

We love your input! We want to make contributing to the Shopify AI Agent as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Block-Based Development

Our development follows a **block-based approach**. Each block is:
- ✅ Independently testable
- ✅ Deployable 
- ✅ Well-documented
- ✅ Reviewed before merge

## 📋 Pull Request Process

1. **Fork the repo** and create your branch from `main`
2. **Choose a block** from our [Development Roadmap](README.md#-development-roadmap)
3. **Implement the block** following our standards
4. **Add tests** with 90%+ coverage
5. **Update documentation** 
6. **Ensure the test suite passes**
7. **Submit a pull request**

### Branch Naming Convention

```
feature/block-X.Y-description
bugfix/issue-description
hotfix/critical-issue
docs/documentation-update
```

Examples:
- `feature/block-1.2-environment-config`
- `feature/block-4.1-ai-provider-infrastructure`
- `bugfix/cache-connection-timeout`

## 🧪 Testing Requirements

### Unit Tests
- **Coverage**: Minimum 90%
- **Framework**: Jest
- **Location**: `tests/unit/`
- **Naming**: `*.test.ts`

### Integration Tests
- **Coverage**: All API endpoints
- **Framework**: Jest + Supertest
- **Location**: `tests/integration/`
- **Database**: Test database/in-memory

### End-to-End Tests
- **Coverage**: Critical user journeys
- **Framework**: Jest
- **Location**: `tests/e2e/`

### Running Tests

```bash
# All tests
npm test

# Specific test type
npm run test:unit
npm run test:integration
npm run test:e2e

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Specific block tests
npm run test:block -- --testPathPattern="block-1.2"
```

## 📝 Code Style

### TypeScript Standards
- **Strict mode** enabled
- **ESLint** with Airbnb configuration
- **Prettier** for formatting
- **No `any` types** (use proper typing)

### Naming Conventions

```typescript
// Files and directories
kebab-case: user-service.ts, auth-middleware.ts

// Classes
PascalCase: UserService, AuthMiddleware

// Functions and variables
camelCase: getUserById, isAuthenticated

// Constants
SCREAMING_SNAKE_CASE: API_BASE_URL, MAX_RETRY_ATTEMPTS

// Interfaces
PascalCase with 'I' prefix: IUserRepository, IAuthService

// Types
PascalCase: UserRole, QueryType

// Enums
PascalCase: OrderStatus, ProductType
```

### File Structure

```typescript
// Standard file structure
import statements (external libraries first, then internal)
├── Types and interfaces
├── Constants
├── Main implementation
└── Default export

// Example:
import express from 'express';
import { Logger } from 'winston';

import { IUserRepository } from '../interfaces';
import { UserEntity } from '../entities';

interface UserServiceOptions {
  repository: IUserRepository;
  logger: Logger;
}

export class UserService {
  // Implementation
}

export default UserService;
```

## 🔍 Code Review Guidelines

### What We Look For

1. **Functionality**
   - Does the code work as intended?
   - Are edge cases handled?
   - Is error handling comprehensive?

2. **Code Quality**
   - Is the code readable and maintainable?
   - Are functions and classes appropriately sized?
   - Are naming conventions followed?

3. **Testing**
   - Are there adequate unit tests?
   - Do integration tests cover the feature?
   - Is the happy path and error cases tested?

4. **Performance**
   - Are there any obvious performance issues?
   - Is caching used appropriately?
   - Are database queries optimized?

5. **Security**
   - Are inputs validated and sanitized?
   - Are authentication and authorization handled?
   - Are secrets properly managed?

### Review Checklist

- [ ] Code follows project conventions
- [ ] Tests pass and have good coverage
- [ ] Documentation is updated
- [ ] No sensitive data in commits
- [ ] Performance considerations addressed
- [ ] Security best practices followed
- [ ] Backward compatibility maintained

## 🐛 Bug Reports

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/shopify-ai-agent/issues).

### Good Bug Reports Include:

1. **Summary**: Quick summary of the issue
2. **Environment**: OS, Node version, package versions
3. **Steps to reproduce**: Detailed steps
4. **Expected behavior**: What should happen
5. **Actual behavior**: What actually happens
6. **Additional context**: Screenshots, logs, etc.

### Bug Report Template

```markdown
## Bug Description
Brief description of the bug.

## Environment
- OS: [e.g., macOS 14.0]
- Node.js: [e.g., 18.17.0]
- npm: [e.g., 9.6.7]
- Package Version: [e.g., 1.2.3]

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Additional Context
Add any other context, screenshots, logs, etc.

## Possible Solution
If you have ideas for fixing the issue.
```

## 💡 Feature Requests

We welcome feature requests! Please check if the feature aligns with our [roadmap](README.md#-development-roadmap).

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature.

## Problem Statement
What problem does this solve?

## Proposed Solution
Detailed description of your proposed solution.

## Alternatives Considered
Other solutions you've considered.

## Additional Context
Screenshots, mockups, examples, etc.

## Implementation Notes
Technical considerations or suggestions.
```

## 🎯 Development Guidelines

### Setting Up Development Environment

```bash
# Clone your fork
git clone https://github.com/yourusername/shopify-ai-agent.git
cd shopify-ai-agent

# Install dependencies
npm install

# Copy environment file
cp .env.development .env

# Set up git hooks
npm run setup:hooks

# Run tests to ensure everything works
npm test

# Start development server
npm run dev
```

### Before You Start Coding

1. **Check existing issues** to avoid duplicate work
2. **Create an issue** for new features or significant changes
3. **Discuss the approach** with maintainers
4. **Create a branch** from the latest `main`

### While Coding

1. **Write tests first** (TDD approach recommended)
2. **Keep commits small** and focused
3. **Use descriptive commit messages**
4. **Run tests frequently**
5. **Follow the coding standards**

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

#### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

#### Examples:
```
feat(auth): add JWT authentication middleware
fix(cache): resolve Redis connection timeout issue
docs(readme): update installation instructions
test(api): add integration tests for order endpoints
refactor(query): improve query processing performance
```

### Documentation Requirements

- **Public APIs**: Full JSDoc documentation
- **Complex functions**: Inline comments explaining logic
- **README updates**: For new features or changes
- **Architecture decisions**: Document in `docs/` folder

```typescript
/**
 * Processes a natural language query and returns structured results.
 * 
 * @param query - The natural language query string
 * @param storeId - The Shopify store identifier
 * @param options - Additional processing options
 * @returns Promise resolving to query results
 * 
 * @example
 * ```typescript
 * const result = await processQuery(
 *   "What are my top selling products?",
 *   "store-123",
 *   { limit: 10 }
 * );
 * ```
 */
export async function processQuery(
  query: string,
  storeId: string,
  options: QueryOptions = {}
): Promise<QueryResult> {
  // Implementation
}
```

## 🏆 Recognition

Contributors will be recognized in:
- **README contributors section**
- **Release notes** for significant contributions
- **Annual contributor report**
- **Special recognition** for major features

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/shopify-ai-agent)
- **GitHub Discussions**: For general questions
- **Issues**: For bugs and feature requests
- **Email**: For security concerns - security@shopify-ai-agent.com

## 📚 Resources

- [Project Roadmap](README.md#-development-roadmap)
- [Architecture Documentation](docs/architecture/)
- [API Reference](docs/api/)
- [Development Setup Guide](docs/development/)

## 🎉 First Time Contributors

New to open source? Here are some good first issues:
- Documentation improvements
- Adding tests to existing code
- Fixing typos or small bugs
- Adding examples or tutorials

Look for issues labeled with:
- `good first issue`
- `help wanted`
- `documentation`
- `beginner friendly`

Thank you for contributing to Shopify AI Agent! 🚀
