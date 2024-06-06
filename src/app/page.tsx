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
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '');
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
    <>

      <header className="
      w-full
      h-50
      sm:h-74
      sm:bg-mobile-light
      bg-desktop-light
      bg-cover
      bg-no-repeat
      transition-all
      duration-300
    ">
      <div className="max-w-xl  mx-auto p-4 ">
      <h1 className="text-4xl text-white text-center font-bold py-8">Task Manager</h1>
      <TaskInput addTask={addTask} />

      <div className="flex bg-white shadow-lg rounded-md py-1 justify-around mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`text-[#A9AABE] px-4 py-2 hover:text-[#3a7bfdcc] ${
            filter === 'all' ? ' font-bold text-[#3a7bfdcc]  ' : ''
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`text-[#A9AABE] px-4 py-2 hover:text-[#3a7bfdcc]   ${
            filter === 'active' ? 'font-bold text-[#3a7bfdcc] ' : ''
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`text-[#A9AABE] px-4 py-2 hover:text-[#3a7bfdcc]  ${
            filter === 'completed' ? 'font-bold text-[#3a7bfdcc] ' : ''
          }`}
        >
          Completed
        </button>
      </div>

      </div>

    </header>
    <div className="max-w-xl  mx-auto p-4 ">
    <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        filter={filter}
      />
    </div>



    </>
  );
};

export default Home;
