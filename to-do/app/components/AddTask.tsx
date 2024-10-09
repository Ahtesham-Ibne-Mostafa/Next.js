'use client';

import { TbHexagonPlus } from "react-icons/tb";
import Modal from "./Modal";
import { useState } from "react";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex gap-4">
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        Add New Task
        <TbHexagonPlus className="ml-2" size={18}/>
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={closeModal} />
    </div>
  );
}

export default AddTask;