"use client";
import React, { useState, useEffect } from 'react';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl text-center font-semibold mb-4">Task Manager</h1>

      <div className="flex justify-around mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`text-[#A9AABE] px-4 py-2 hover:text-black rounded  ${
            filter === 'all' ? ' font-bold text-black ' : ''
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`text-[#A9AABE] px-4 py-2 hover:text-black   ${
            filter === 'active' ? 'font-bold ' : ''
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`text-[#A9AABE] px-4 py-2 hover:text-black  ${
            filter === 'completed' ? 'font-bold text-white' : ''
          }`}
        >
          Completed
        </button>
      </div>
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        filter={filter}
      />

      <button className='text-white justify-end flex absolute rounded-2xl bg-blue-500 p-4'>Create Task</button>

      <TaskInput addTask={addTask} />
    </div>
  );
};

export default Home;
