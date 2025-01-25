import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { ROUTES } from "../constants"; // Adjust the import based on where ROUTES are located

interface IDropdownMenuProps {
  handleClick: any;
}

const DropdownMenu: FC<IDropdownMenuProps> = ({ handleClick }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
        {/* <img src={logo} alt="Profile" className="w-8 h-8 rounded-full" /> */}
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
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleClick(ROUTES.LOGOUT)}
                  className={`block w-full text-left px-4 py-2 text-gray-700 ${
                    active ? "bg-blue-100" : "bg-white"
                  } hover:bg-blue-100 transition duration-300`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
