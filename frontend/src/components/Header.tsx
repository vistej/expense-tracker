import { FC, useState } from "react";
import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropDownMenu";
import { Bars3Icon, XMarkIcon, ChartBarIcon, ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { useUser } from "../context/UserContext";

export const Header: FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();

  const handleClick = (route: string) => {
    setIsMenuOpen(false);
    if (route === ROUTES.LOGOUT) {
      localStorage.clear();
      setUser(null);
      navigate(ROUTES.LOGIN);
    } else {
      navigate(route);
    }
  };

  const navItems = [
    {
      route: ROUTES.DASHBOARD,
      label: "Dashboard",
      icon: ChartBarIcon,
    },
    {
      route: ROUTES.EXPENSES,
      label: "Expenses",
      icon: ReceiptPercentIcon,
    },
  ];

  return (
    <>
      {user && (
        <header className="sticky top-0 z-50 bg-gradient-primary shadow-medium border-b border-primary-600/20 backdrop-blur-sm transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Brand */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-white font-display font-bold text-xl tracking-tight">
                    ExpenseTracker
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleClick(item.route)}
                      className="group flex items-center px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200 hover-lift"
                    >
                      <Icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <XMarkIcon className="w-6 h-6" />
                  ) : (
                    <Bars3Icon className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* User dropdown */}
              <div className="hidden md:block">
                <DropdownMenu handleClick={handleClick} />
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-background-card/95 dark:bg-dark-background-card/95 backdrop-blur-sm border-t border-primary-100/50 dark:border-dark-border/50 shadow-large animate-slide-up transition-colors duration-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.route}
                      onClick={() => handleClick(item.route)}
                      className="group flex items-center w-full px-3 py-3 text-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg font-medium transition-all duration-200"
                    >
                      <Icon className="w-5 h-5 mr-3 text-primary-500 group-hover:scale-110 transition-transform duration-200" />
                      {item.label}
                    </button>
                  );
                })}
                <div className="pt-4 border-t border-neutral-200 dark:border-dark-border">
                  <DropdownMenu handleClick={handleClick} />
                </div>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
};
