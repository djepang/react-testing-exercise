// src/__tests__/App.test.js
import React from 'react'
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the app', () => {
  render(<App />);
  expect(screen.getByText('Todo App')).toBeInTheDocument();
});
