import { FC } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

interface FloatingButtonProps {
  onclick: () => void;
}

const FloatingButton: FC<FloatingButtonProps> = ({ onclick }) => {
  return (
    <button
      className="fixed bottom-8 right-8 group z-40"
      onClick={onclick}
      aria-label="Add new expense"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-primary-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

      {/* Main button */}
      <div className="relative w-16 h-16 bg-gradient-primary hover:bg-gradient-to-r hover:from-primary-600 hover:to-primary-700 rounded-full shadow-large hover:shadow-2xl transition-all duration-300 hover-lift flex items-center justify-center">
        <PlusIcon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-200" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-neutral-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Add Expense
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800"></div>
      </div>
    </button>
  );
};

export default FloatingButton;
