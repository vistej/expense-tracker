import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { ROUTES } from "../constants";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

interface IDropdownMenuProps {
  handleClick: (key: string) => void;
}

const DropdownMenu: FC<IDropdownMenuProps> = ({ handleClick }) => {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {user && (
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-2 cursor-pointer text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">{user.first_name}</span>
            <ChevronDownIcon className="w-4 h-4 transition-transform duration-200" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 bg-background-card dark:bg-dark-background-card border border-border dark:border-dark-border rounded-xl shadow-large dark:shadow-dark-large z-50 overflow-hidden">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-border dark:border-dark-border bg-neutral-50 dark:bg-dark-background">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-text dark:text-dark-text">{user.first_name}</p>
                    <p className="text-sm text-text-muted dark:text-dark-text-muted">User Account</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {/* Theme Toggle */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={toggleTheme}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200 ${active
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'text-text dark:text-dark-text hover:bg-neutral-50 dark:hover:bg-dark-background'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        {theme === 'dark' ? (
                          <SunIcon className="w-5 h-5 text-accent-500" />
                        ) : (
                          <MoonIcon className="w-5 h-5 text-accent-500" />
                        )}
                        <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-text-muted dark:text-dark-text-muted">
                          {theme === 'dark' ? '🌙' : '☀️'}
                        </span>
                      </div>
                    </button>
                  )}
                </Menu.Item>

                {/* Profile Link */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleClick(ROUTES.PROFILE)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${active
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'text-text dark:text-dark-text hover:bg-neutral-50 dark:hover:bg-dark-background'
                        }`}
                    >
                      <UserIcon className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                  )}
                </Menu.Item>

                {/* Logout */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleClick(ROUTES.LOGOUT)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${active
                        ? 'bg-danger-50 dark:bg-danger-900/20 text-danger-700 dark:text-danger-300'
                        : 'text-text dark:text-dark-text hover:bg-neutral-50 dark:hover:bg-dark-background'
                        }`}
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  )}
                </Menu.Item>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-neutral-50 dark:bg-dark-background border-t border-border dark:border-dark-border">
                <p className="text-xs text-text-muted dark:text-dark-text-muted text-center">
                  ExpenseTracker v1.0
                </p>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
};

export default DropdownMenu;
