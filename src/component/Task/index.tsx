import { useState } from "react";
import { monsterStore } from "../../stores/monsterStore";
import { taskStore } from "../../stores/taskStore";
import { TaskModal } from "./TaskModal";

export function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { task } = taskStore((state) => ({
    task: state.task,
  }));

  const { huntId } = monsterStore((state) => ({
    huntId: state.huntId,
  }));

  function toggleModal(isOpen: boolean) {
    if (huntId !== -1) {
      setIsModalOpen(isOpen);
    } else {
      window.alert("Please select a hunt first.");
    }
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
