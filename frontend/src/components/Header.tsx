import { FC, useState } from "react";
import { ROUTES } from "../constants";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AddExpenseDialog from "./AddExpenseDialog";

interface IHeaderProps {}

export const Header: FC<IHeaderProps> = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    setShowMenu(false);
    if (route === ROUTES.LOGOUT) {
      localStorage.clear();
      navigate(ROUTES.LOGIN);
    } else {
      navigate(route);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 py-2 flex items-center justify-between">
      {/* Left Section */}
      <nav className="flex items-center space-x-6">
        <button
          onClick={() => handleClick(ROUTES.DASHBOARD)}
          className="text-gray-700 hover:text-blue-500 font-medium"
        >
          Dashboard
        </button>
        <button
          onClick={() => handleClick(ROUTES.EXPENSES)}
          className="text-gray-700 hover:text-blue-500 font-medium"
        >
          Expenses
        </button>
        <button
          onClick={() => setOpenModal(true)}
          className="text-gray-700 hover:text-blue-500 font-medium"
        >
          Add Expense
        </button>
      </nav>

      {/* Right Section */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
        >
          <img src={logo} alt="Profile" className="w-8 h-8 rounded-full" />
          {/* TODO add username here */}
          <span>John Doe</span>
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg group-hover:block">
            {/* <a
              onClick={() => handleClick(ROUTES.PROFILE)}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
            >
              Profile
            </a> */}
            <button
              onClick={() => handleClick(ROUTES.LOGOUT)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <AddExpenseDialog
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </header>
  );
};
