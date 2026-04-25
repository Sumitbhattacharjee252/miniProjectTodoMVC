import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

/**
 * Custom fixture that provides a pre-instantiated TodoPage.
 * This eliminates boilerplate in every test and ensures consistent setup.
 */
type TestFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<TestFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await use(todoPage);
  },
});

export { expect };
