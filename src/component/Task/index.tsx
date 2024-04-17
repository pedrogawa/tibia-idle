import { useState } from "react";
import { TaskModal } from "./TaskModal";

export function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <TaskModal isModalOpen={isModalOpen} setIsModalOpen={toggleModal} />
    </section>
  );
}
