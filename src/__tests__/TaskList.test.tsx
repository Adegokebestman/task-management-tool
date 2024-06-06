import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';

describe('TaskList', () => {
    const tasks = [
        { id: '1', text: 'Task 1', completed: false },
        { id: '2', text: 'Task 2', completed: true },
        { id: '3', text: 'Task 3', completed: false },
    ];

    it('renders the list of tasks correctly', () => {
        const { getByText } = render(
            <TaskList tasks={tasks} toggleComplete={() => {}} deleteTask={() => {}} filter="all" />
        );

        tasks.forEach((task) => {
            const taskElement = getByText(task.text);
            expect(taskElement).toBeInTheDocument();
        });
    });

    it('calls toggleComplete when a task is clicked', () => {
        const toggleCompleteMock = jest.fn();
        const { getByText } = render(
            <TaskList tasks={tasks} toggleComplete={toggleCompleteMock} deleteTask={() => {}} filter="all" />
        );

        const taskElement = getByText('Task 1');
        fireEvent.click(taskElement);

        expect(toggleCompleteMock).toHaveBeenCalledWith('1');
    });

    it('calls deleteTask when a task is deleted', () => {
        const deleteTaskMock = jest.fn();
        const { getByText } = render(
            <TaskList tasks={tasks} toggleComplete={() => {}} deleteTask={deleteTaskMock} filter="all" />
        );

        const deleteButton = getByText('Delete');
        fireEvent.click(deleteButton);

        expect(deleteTaskMock).toHaveBeenCalledWith('1');
    });
});