// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from '../components/TodoList';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { title: 'Test Todo 1', completed: false },
      { title: 'Test Todo 2', completed: true }
    ])
  })
);

describe('TodoList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetches and displays todos', async () => {
    render(<TodoList />);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos');

    // Use findAllByRole to wait for the todos to be displayed
    const todoItems = await screen.findAllByRole('listitem');

    expect(todoItems).toHaveLength(2);
    expect(todoItems[0]).toHaveTextContent('Test Todo 1');
    expect(todoItems[1]).toHaveTextContent('Test Todo 2');
  });

  test('adds a new todo', async () => {
    render(<TodoList />);

    // Wait for initial todos to be displayed
    await screen.findAllByRole('listitem');

    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    const todoItems = await screen.findAllByRole('listitem');
    
    expect(todoItems).toHaveLength(3);
    expect(todoItems[2]).toHaveTextContent('New Todo');
  });
});
