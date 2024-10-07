import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getAllTodos } from "@/api";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);

  return (
    <main classname= 'max-w-4xl mx-auto mt-4'>
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">TO-DO</h1>
        <p className="text-lg">Simple TO-DO App for leraning Next.js</p>
        <AddTask />
      </div>
      <TodoList />
    </main>
  );
}
