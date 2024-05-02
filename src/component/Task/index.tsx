import { useState } from "react";
import { monsterStore } from "../../stores/monsterStore";
import { taskStore } from "../../stores/taskStore";
import { TaskModal } from "./TaskModal";

export function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { task, finishTask } = taskStore((state) => ({
    task: state.task,
    finishTask: state.finishTask,
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

  function handleReceiveReward() {
    finishTask();
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

      {task.isTaskOn && (
        <div className="flex flex-col items-center gap-4">
          <img src={task.monster.src} alt={task.monster.name} />
          {task.currentKills} / {task.monster.task}
          {task.currentKills >= task.monster.task && (
            <button onClick={handleReceiveReward}>Receive reward</button>
          )}
        </div>
      )}
      <TaskModal isModalOpen={isModalOpen} setIsModalOpen={toggleModal} />
    </section>
  );
}
