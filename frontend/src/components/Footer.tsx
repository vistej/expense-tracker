import { FC } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

export const Footer: FC = () => {
  return (
    <footer className="bg-background-card dark:bg-dark-background-card border-t border-border dark:border-dark-border mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          {/* Main footer content */}
          <div className="mb-6">
            <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-3">
              ExpenseTracker
            </h3>
            <p className="text-text-muted dark:text-dark-text-muted max-w-md mx-auto leading-relaxed">
              Take control of your finances with our intuitive expense tracking solution.
            </p>
          </div>

          {/* Tech stack */}
          <div className="mb-6">
            <p className="text-sm text-text-muted dark:text-dark-text-muted mb-3">
              Built with modern technologies:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors duration-200 font-medium"
              >
                React
              </a>
              <a
                href="https://www.djangoproject.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-secondary-50 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-900/50 transition-colors duration-200 font-medium"
              >
                Django
              </a>
              <a
                href="https://aws.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full hover:bg-accent-100 dark:hover:bg-accent-900/50 transition-colors duration-200 font-medium"
              >
                AWS
              </a>
            </div>
          </div>

          {/* Copyright and attribution */}
          <div className="pt-6 border-t border-border dark:border-dark-border">
            <p className="text-sm text-text-muted dark:text-dark-text-muted mb-2">
              © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
            </p>
            <p className="text-sm text-text-muted dark:text-dark-text-muted">
              Made with{" "}
              <HeartIcon className="inline w-4 h-4 text-danger-500 mx-1" />
              {" "}by{" "}
              <a
                href="https://github.com/vistej"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                vistej
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
