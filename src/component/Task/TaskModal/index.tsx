import { useEffect, useState } from "react";
import { monsterStore } from "../../../stores/monsterStore";
import { places } from "../../../utils/monsters";

interface TaskModal {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function TaskModal({ isModalOpen, setIsModalOpen }: TaskModal) {
  const [modalClass, setModalClass] = useState(
    "hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  );
  const { huntId } = monsterStore((state) => ({
    huntId: state.huntId,
  }));

  useEffect(() => {
    if (isModalOpen) {
      setModalClass(
        "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      );
    } else {
      setModalClass(
        "hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      );
    }
  }, [isModalOpen]);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      aria-hidden="true"
      className={modalClass}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="flex flex-col relative bg-white rounded-lg shadow dark:bg-gray-700 p-2 gap-8">
          <button onClick={closeModal}>Close modal</button>
          <div className="grid items-center justify-center gap-3 grid-cols-5 gap-y-8 h-32 overflow-auto">
            {places[huntId].monsters.map((monster) => (
              <div className="transition ease-in-out delay-150 flex flex-col items-center justify-center cursor-pointer p-2 bg-[#1f1f1f] rounded-md gap-3 hover:opacity-75">
                <img src={monster.monster.src} alt="" />
                <span>{monster.monster.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
