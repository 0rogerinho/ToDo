import { Task } from "./Task";
import { useContext, useEffect } from "react";
import { newTask } from "../App";
import prancheta from "../Components/assets/prancheta.svg";

export function TaskList() {
  const [tasks, setTasks] = useContext(newTask);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <div className="flex justify-center">
      <section className="w-[46rem] mt-6 p-4 border-t rounded-[.5rem] border-[#333333]">
        <div
          className={`mt-[5.5rem] flex flex-col justify-center items-center ${
            tasks.length === 0 ? "block" : "hidden"
          }`}
        >
          <div>
            <img src={prancheta} alt="" />
          </div>
          <p className="mt-[1rem] text-[#808080] font-bold">
            Você ainda não tem tarefas cadastradas
          </p>
          <p className="text-[#808080]">
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>
        {tasks.map((item) => (
          <Task
            key={item.id}
            id={item.id}
            content={item.content}
            deleteTask={deleteTask}
            checked={item.checked}
          />
        ))}
      </section>
    </div>
  );
}
