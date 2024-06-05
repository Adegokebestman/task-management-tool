import React from 'react';
import Image from 'next/image';
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
      className={`flex items-center justify-between p-4 mb-4 bg-white rounded-2xl  shadow-md ${
        task.completed ? 'line-through text-gray-400' : ''
      }`}
    >
      <div className='flex gap-2'>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        className="mr-2 "
      />
      <div className='divide-x rounded-xl h-[40px] w-[2px] bg-[#FF0066]'>

</div>
      </div>


      <span>{task.text}</span>
      <button
        onClick={() => deleteTask(task.id)}

      >
        <Image src="/cancel.png" alt='cancel button' width={25} height={25} />
      </button>
    </div>
  );
};

export default Task;
