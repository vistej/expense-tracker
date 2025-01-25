import { AiOutlinePlus } from "react-icons/ai";

const FloatingButton = ({ onclick }: any) => {
  return (
    <button
      className="fixed bottom-8 right-8 p-4 bg-[var(--color-success)] text-white rounded-full shadow-lg hover:bg-[var(--color-success-hover)] transition"
      onClick={onclick}
    >
      <AiOutlinePlus size={30} />
    </button>
  );
};

export default FloatingButton;
