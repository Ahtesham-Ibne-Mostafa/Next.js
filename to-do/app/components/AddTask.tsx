import { TbHexagonPlus } from "react-icons/tb";

const AddTask = () => {
  return (
    <div className="flex gap-4">
      <button className="btn btn-primary w-full">
        Add New Task
        <TbHexagonPlus className="ml-2" size={18}/>
      </button>
    </div>
  );
}

export default AddTask