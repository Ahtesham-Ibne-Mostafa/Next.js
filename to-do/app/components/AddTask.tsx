'use client';

import { useState, FormEventHandler } from 'react';
import { TbHexagonPlus } from 'react-icons/tb';
import Modal from './Modal';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');
  const [taskTime, setTaskTime] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
      time: taskTime
    });
    setNewTaskValue("");
    setTaskTime("");
    setModalOpen(false);
    router.refresh();
  }

  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex gap-4">
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        Add New Task
        <TbHexagonPlus className="ml-2" size={18}/>
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={closeModal}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">
            Add New Task
          </h3>
          <div className="modal-action">
            <input 
              value={newTaskValue} 
              onChange={(e) => setNewTaskValue(e.target.value)} 
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full" 
            />
            <input 
              value={taskTime} 
              onChange={(e) => setTaskTime(e.target.value)} 
              type="time" 
              className="input input-bordered w-full" 
            />
            <button type="submit" className="btn btn-primary">Add Task</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddTask;