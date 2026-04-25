# TodoMVC Test Automation Suite

A modern, enterprise-grade Playwright test automation framework for testing the [TodoMVC React](https://todomvc.com/examples/react/dist/) application. Built with TypeScript, Page Object Model (POM) pattern, and custom fixtures for scalable end-to-end testing.

---

## 📋 Project Overview

- **Application Under Test (AUT):** TodoMVC React  
- **Test Framework:** Playwright 1.59.1  
- **Language:** TypeScript 5.x (strict mode)  
- **Pattern:** Page Object Model (POM)  
- **Architecture:** Custom fixtures with dependency injection  

This test suite validates core TodoMVC functionality including:
- Adding new todo items
- Toggling completion state
- Filtering by status (All, Active, Completed)
- Clearing completed items

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (recommended 18+)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers** (if not already cached):
   ```bash
   npx playwright install
   ```

---

## 📁 Project Structure

```
miniProjectTodoMVC/
├── fixtures/
│   └── base.ts                 # Custom Playwright fixtures (todoPage auto-fixture)
├── pages/
│   └── TodoPage.ts             # Page Object encapsulating TodoMVC interactions
├── tests/
│   ├── todo.spec.ts            # Main test suite
│   └── example.spec.ts         # Example test (generated)
├── playwright-report/          # HTML test reports
├── test-results/               # Test execution artifacts
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json              # TypeScript configuration (strict mode)
├── package.json               # Project dependencies
└── README.md                  # This file
```

---

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run a specific test file
```bash
npx playwright test tests/todo.spec.ts
```

### Run with UI mode (interactive debugging)
```bash
npx playwright test --ui
```

### Run in headed mode with UI (see browser & debug)
```bash
npx playwright test todo.spec.ts --headed --project chromium --ui
```

### Run against specific browser
```bash
npx playwright test --project chromium
npx playwright test --project firefox
npx playwright test --project webkit
```

### Run with trace collection (debug failed tests)
```bash
npx playwright test --trace on
```

### View test report
```bash
npx playwright show-report
```

---

## 🏗️ Architecture & Design Patterns

### Page Object Model (POM)

All page interactions are encapsulated in the `TodoPage` class (`pages/TodoPage.ts`), providing:
- **Semantic locators:** Uses `getByRole()`, `getByTestId()`, `getByText()` for resilience
- **Descriptive methods:** High-level actions like `addTodo()`, `toggleTodo()`, `filterByStatus()`
- **No selector leakage:** Tests import only the page object, never raw selectors

**Benefits:**
- ✅ Maintainability: Locators updated in one place
- ✅ Readability: Tests read like user stories
- ✅ Reusability: Methods shareable across multiple tests
- ✅ Abstraction: Implementation details hidden from tests

### Custom Fixtures

The `fixtures/base.ts` extends Playwright's `test` with a `todoPage` fixture:

```typescript
export const test = base.extend<TestFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await use(todoPage);
  },
});
```

**Benefits:**
- ✅ Auto-instantiation: `todoPage` ready in every test
- ✅ Dependency injection: Cleaner test code
- ✅ Consistency: Same setup across all tests

---

## 📝 Test File Structure

Tests follow the **Arrange-Act-Assert** pattern:

```typescript
import { test, expect } from '../fixtures/base';

test('User can add todos, toggle them, filter by status, and clear completed items', async ({ todoPage }) => {
  // Arrange: Navigate to the application
  await todoPage.goto();

  // Act: Perform user interactions
  await todoPage.addTodo('groceries');
  await todoPage.toggleTodo('groceries');
  await todoPage.filterByStatus('Completed');

  // Assert: Verify outcomes
  await todoPage.verifyTodoVisible('groceries');
});
```

---

## 🎯 Page Object Methods

### `TodoPage` Class

| Method | Signature | Description |
|--------|-----------|-------------|
| `goto()` | `async goto(): Promise<void>` | Navigate to the TodoMVC application |
| `addTodo()` | `async addTodo(text: string): Promise<void>` | Add a new todo item |
| `toggleTodo()` | `async toggleTodo(text: string): Promise<void>` | Toggle completion state by text |
| `filterByStatus()` | `async filterByStatus(status: 'All' \| 'Active' \| 'Completed'): Promise<void>` | Filter todos by status |
| `verifyTodoVisible()` | `async verifyTodoVisible(text: string): Promise<void>` | Verify a todo is visible |
| `clearCompleted()` | `async clearCompleted(): Promise<void>` | Clear all completed todos |

---

## ⚙️ Configuration

### `playwright.config.ts`

Key settings:
- **Base URL:** `https://todomvc.com/examples/react/dist/`
- **Browsers:** Chromium, Firefox, WebKit
- **Reporter:** HTML (see `playwright-report/index.html`)
- **Tracing:** Enabled on first retry (`trace: 'on-first-retry'`)
- **Parallel:** Enabled locally, disabled on CI (`fullyParallel: true`, `workers: 1` on CI)

### `tsconfig.json`

Strict TypeScript configuration:
- `strict: true` — Enforces null/undefined safety
- `moduleResolution: "node"` — CommonJS + ES modules support
- Path aliases for clean imports (`@pages/*`, `@fixtures/*`)

---

## 🔧 Technologies & Dependencies

| Dependency | Version | Purpose |
|-----------|---------|---------|
| `@playwright/test` | ^1.59.1 | Test framework & browser automation |
| `playwright` | ^1.59.1 | Browser engines |
| `@types/node` | ^25.6.0 | Node.js type definitions |
| TypeScript | v5.x | Type safety & strict mode |

---

## 📚 Best Practices Applied

✅ **TypeScript Strict Mode:** No `any`, no non-null assertions (`!`)  
✅ **Semantic Locators:** `getByRole()`, `getByTestId()` over CSS selectors  
✅ **Auto-Waiting:** Playwright's built-in waits instead of `waitForTimeout()`  
✅ **Async/Await:** Modern async patterns, no `.then()` chains  
✅ **DRY Principle:** Locators and interactions centralized in POM  
✅ **Test Independence:** Each test can run in isolation  
✅ **Descriptive Names:** Tests and methods clearly state intent  

---

## 🐛 Troubleshooting

### Test fails with "Cannot find element"
- Verify `baseURL` is correct in `playwright.config.ts`
- Check if the application is accessible from your network
- Use `--debug` flag to step through the test

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Verify `tsconfig.json` is present and `Node` is in the types
- Restart your IDE's TypeScript language server

### Tests run but seem slow
- Ensure no test is using `waitForTimeout()` — use auto-waits instead
- Check for network delays in the test report
- Run with `--workers=1` to isolate performance issues

---

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Models Guide](https://playwright.dev/docs/pom)
- [TodoMVC Repository](https://github.com/tastejs/todomvc)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

## 📄 License

ISC

---

**Last Updated:** April 26, 2026
