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

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      aria-hidden="true"
      className={modalClass}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-2">
          <span>Modal</span>
        </div>
      </div>
    </div>
  );
}
