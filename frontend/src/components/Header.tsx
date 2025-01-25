import { FC, useState } from "react";
import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropDownMenu";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = (props) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (route: string) => {
    setIsMenuOpen(false);
    if (route === ROUTES.LOGOUT) {
      localStorage.clear();
      navigate(ROUTES.LOGIN);
    } else {
      navigate(route);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-50 shadow-md px-6 py-3 flex items-center justify-between border-b border-blue-100">
      {/* Left Section */}
      <nav className="flex items-center space-x-6 md:space-x-6 flex-col md:flex-row md:space-y-0 space-y-4 md:block hidden">
        {" "}
        <button
          onClick={() => handleClick(ROUTES.DASHBOARD)}
          className="text-gray-700 hover:text-blue-500 font-medium text-lg transition duration-300 w-full md:w-auto"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleClick(ROUTES.EXPENSES)}
          className="text-gray-700 hover:text-blue-500 font-medium text-lg transition duration-300 w-full md:w-auto"
        >
          Expenses
        </button>
      </nav>

      {/* Hamburger Menu for mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <XMarkIcon className="w-8 h-8 text-gray-700" />
          ) : (
            <Bars3Icon className="w-8 h-8 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg px-6 py-4 space-y-4 z-50">
          <button
            onClick={() => handleClick(ROUTES.DASHBOARD)}
            className="w-full text-left text-gray-700 hover:text-blue-500 font-medium text-lg"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleClick(ROUTES.EXPENSES)}
            className="w-full text-left text-gray-700 hover:text-blue-500 font-medium text-lg"
          >
            Expenses
          </button>
        </div>
      )}

      <div className="relative">
        <DropdownMenu handleClick={handleClick} />
      </div>
    </header>
  );
};
