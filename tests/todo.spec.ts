import { test, expect } from '../fixtures/base';

test('User can add todos, toggle them, filter by status, and clear completed items', async ({ todoPage }) => {
  // Arrange: Navigate to the application
  await todoPage.goto();

  // Act & Assert: Add four todo items
  await todoPage.addTodo('groceries');
  await todoPage.addTodo('walk');
  await todoPage.addTodo('online');
  await todoPage.addTodo('subway');

  // Toggle all todos as completed
  await todoPage.toggleTodo('groceries');
  await todoPage.toggleTodo('walk');
  await todoPage.toggleTodo('online');
  await todoPage.toggleTodo('subway');

  // Filter through different statuses
  await todoPage.filterByStatus('Active');
  await todoPage.filterByStatus('Completed');
  await todoPage.filterByStatus('Active');
  await todoPage.filterByStatus('All');

  // Verify all todos are still visible
  await todoPage.verifyTodoVisible('walk');
  await todoPage.verifyTodoVisible('groceries');
  await todoPage.verifyTodoVisible('online');
  await todoPage.verifyTodoVisible('subway');

  // Clear all completed todos
  await todoPage.clearCompleted();
});