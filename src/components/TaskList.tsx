import React from 'react';
import Task from './Task';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  filter: 'all' | 'active' | 'completed';
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleComplete, deleteTask, filter }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // Default case if filter is unrecognized
  });

  return (
    <div>
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
