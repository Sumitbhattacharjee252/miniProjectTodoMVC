import { Page, Locator } from '@playwright/test';

/**
 * TodoPage encapsulates all interactions with the TodoMVC application.
 * Uses Playwright's semantic locators (getByRole, getByTestId) for resilience.
 */
export class TodoPage {
  // Locators for input and main list
  private readonly todoInput: Locator;
  private readonly todoList: Locator;
  private readonly clearCompletedButton: Locator;

  constructor(private readonly page: Page) {
    this.todoInput = page.getByTestId('text-input');
    this.todoList = page.getByTestId('todo-list');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  /**
   * Navigate to the TodoMVC application.
   */
  async goto(): Promise<void> {
    await this.page.goto('https://todomvc.com/examples/react/dist/');
  }

  /**
   * Add a new todo item by filling the input and pressing Enter.
   * @param text - The todo item text to add
   */
  async addTodo(text: string): Promise<void> {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');
  }

  /**
   * Toggle the completion state of a todo item by its text.
   * @param text - The text of the todo to toggle
   */
  async toggleTodo(text: string): Promise<void> {
    const todoItem = this.page
      .getByRole('listitem')
      .filter({ hasText: text });
    const toggleCheckbox = todoItem.getByTestId('todo-item-toggle');
    await toggleCheckbox.check();
  }

  /**
   * Filter todos by status using the navigation links.
   * @param status - Filter status: 'All', 'Active', or 'Completed'
   */
  async filterByStatus(status: 'All' | 'Active' | 'Completed'): Promise<void> {
    await this.page.getByRole('link', { name: status }).click();
  }

  /**
   * Verify that a todo item with the given text is visible in the list.
   * @param text - The text of the todo to verify
   */
  async verifyTodoVisible(text: string): Promise<void> {
    await this.todoList.getByText(text).waitFor({ state: 'visible' });
  }

  /**
   * Clear all completed todo items.
   */
  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }
}
