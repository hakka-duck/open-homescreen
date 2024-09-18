"use client";

import { useRouter } from "next/navigation";
import { deleteHomeScreenById } from "../action";

const DeleteScreenButton = ({ id }: { id: number }) => {
  const router = useRouter();

  const handleDelete = () => {
    console.log("Delete", id);
    deleteHomeScreenById(id);
    router.refresh();
  };
  return (
    <div className="absolute bottom-1 left-1">
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white font-semibold px-1 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-300"
      >
        <i className="ti ti-trash" />
      </button>
    </div>
  );
};
export default DeleteScreenButton;
