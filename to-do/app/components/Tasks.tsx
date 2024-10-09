'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ITask } from "@/types/tasks";
import { FiEdit } from "react-icons/fi";
import { IoTrashBinSharp } from "react-icons/io5";
import Modal from './Modal';
import { updateTodo, deleteTodo } from '@/api';

interface TaskProps {
  task: ITask;
  onTaskUpdated: () => void; 
}

const Task: React.FC<TaskProps> = ({ task, onTaskUpdated }) => {
  const router = useRouter();
  const [openModalEdit, setModalOpenEdit] = useState(false);
  const [openModalDeleted, setModalOpenDeleted] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState(task.text);
  const [newTaskTime, setNewTaskTime] = useState(task.time);

  useEffect(() => {
    setNewTaskValue(task.text);
    setNewTaskTime(task.time);
  }, [task]);

  const handleSubmitEditTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTodo({
        ...task,
        text: newTaskValue,
        time: newTaskTime
      });
      setModalOpenEdit(false);
      onTaskUpdated();
      router.refresh();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(task.id);
      setModalOpenDeleted(false);
      onTaskUpdated();
      router.ref();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <>
      <tr key={task.id} className="hover">
        <td className="w-1/2 px-6 py-4">{task.text}</td>
        <td className="w-1/4 px-6 py-4">{task.time}</td>
        <td className="w-1/4 px-6 py-4 flex justify-between items-center gap-4">
          <button className="text-blue-500 hover:text-blue-700" onClick={() => setModalOpenEdit(true)}>
            <FiEdit size={20} />
          </button>
          <button className="text-red-500 hover:text-red-700" onClick={() => setModalOpenDeleted(true)}>
            <IoTrashBinSharp size={20} />
          </button>
        </td>
      </tr>


      <Modal modalOpen={openModalEdit} setModalOpen={setModalOpenEdit}>
        <form onSubmit={handleSubmitEditTodo}>
          <h3 className="font-bold text-lg">Edit Task</h3>
          <div className="modal-action">
            <input 
              value={newTaskValue} 
              onChange={(e) => setNewTaskValue(e.target.value)} 
              type="text" 
              placeholder="Edit task" 
              className="input input-bordered w-full" 
            />
            <input 
              value={newTaskTime} 
              onChange={(e) => setNewTaskTime(e.target.value)} 
              type="time" 
              className="input input-bordered w-full" 
            />
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </Modal>


      <Modal modalOpen={openModalDeleted} setModalOpen={setModalOpenDeleted}>
        <h3 className="font-bold text-lg">Delete Task</h3>
        <p>Are you sure you want to delete this task?</p>
        <div className="modal-action">
          <button className="btn btn-danger" onClick={handleDeleteTodo}>Delete</button>
          <button className="btn" onClick={() => setModalOpenDeleted(false)}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default Task;