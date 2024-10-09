import { ITask } from "@/types/tasks";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <tr key={task.id} className="hover">
      <td>{task.text}</td>
      <td>{task.time}</td> {/* Fixed to display the task time */}
    </tr>
  );
};

export default Task;