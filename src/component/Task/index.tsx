import { useState } from "react";
import { taskStore } from "../../stores/taskStore";
import { TaskModal } from "./TaskModal";

export function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { task } = taskStore((state) => ({
    task: state.task,
  }));

  function toggleModal(isOpen: boolean) {
    setIsModalOpen(isOpen);
  }

  return (
    <section className="bg-[#363636] w-64 p-4 rounded-md flex flex-col items-center gap-8">
      <button
        onClick={() => {
          toggleModal(true);
        }}
      >
        Select a task
      </button>

      {!!task.monster.monster.name && (
        <div>
          {task.currentKills} / {task.monster.task}
        </div>
      )}
      <TaskModal isModalOpen={isModalOpen} setIsModalOpen={toggleModal} />
    </section>
  );
}
