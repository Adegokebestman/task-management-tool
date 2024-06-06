import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskInput from '../components/TaskInput';

describe('TaskInput', () => {
  it('renders input field and submits task', () => {
    const addTask = jest.fn();
    render(<TaskInput addTask={addTask} />);

    const input = screen.getByPlaceholderText('Add a new task');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.submit(form!);

    expect(addTask).toHaveBeenCalledWith('New Task');
    expect(input).toHaveValue('');
  });
});
