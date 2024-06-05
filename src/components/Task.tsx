import React from 'react';

interface TaskProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, toggleComplete, deleteTask }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 mb-2 bg-white rounded shadow ${
        task.completed ? 'line-through text-gray-400' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        className="mr-2"
      />
      <span>{task.text}</span>
      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
