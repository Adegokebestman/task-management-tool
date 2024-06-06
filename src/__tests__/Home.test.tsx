import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page';

describe('Home', () => {
  it('adds a new task', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Add a new task');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('toggles task completion', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Add a new task');
    fireEvent.change(input, { target: { value: 'Task to complete' } });
    fireEvent.submit(input.closest('form')!);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('deletes a task', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Add a new task');
    fireEvent.change(input, { target: { value: 'Task to delete' } });
    fireEvent.submit(input.closest('form')!);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
  });
});
