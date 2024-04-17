import { useState } from "react";
import { TaskModal } from "./TaskModal";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "#000000",
  },
};

export function Task() {
  const [isModalOpen, setIsModalOpen] = useState(true);

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
      <button
        data-modal-target="static-modal"
        data-modal-toggle="static-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>
      <TaskModal isModalOpen={isModalOpen} setIsModalOpen={toggleModal} />
    </section>
  );
}
