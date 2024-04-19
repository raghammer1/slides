import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Test case to verify if a specific element (here a link with text containing 'o') is rendered.
test('renders learn react link', () => {
  render(<App />); // Renders the App component in a virtual DOM for testing.
  const linkElement = screen.getByText(/o/i); // Attempts to find an element with text matching the regex /o/i.
  expect(linkElement).toBeInTheDocument(); // Asserts that the element is present in the document.
});
