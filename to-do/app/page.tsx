import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getAllTodos } from "@/api";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);

  return (
    <main className="text-center my-5 flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-bold">TO-DO</h1>
      <p className="text-lg">Simple TO-DO App for learning Next.js</p>
      <AddTask />
      <div className="flex items-center justify-center w-full">
        <TodoList tasks={tasks} />
      </div>
    </main>
  );
}