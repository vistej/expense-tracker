import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface FloatingButtonProps {
  onclick: () => void;
}

const FloatingButton: FC<FloatingButtonProps> = ({ onclick }) => {
  return (
    <button
      className="fixed bottom-8 right-8 p-4 bg-success text-white rounded-full shadow-lg hover:bg-success-hover transition"
      onClick={onclick}
    >
      <AiOutlinePlus size={30} />
    </button>
  );
};

export default FloatingButton;
