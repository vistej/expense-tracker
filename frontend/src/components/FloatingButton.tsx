import { AiOutlinePlus } from "react-icons/ai";

const FloatingButton = ({ onclick }: any) => {
  return (
    <button
      className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      onClick={onclick}
    >
      <AiOutlinePlus size={30} />
    </button>
  );
};

export default FloatingButton;
