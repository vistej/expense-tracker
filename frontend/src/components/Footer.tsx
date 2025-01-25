import { FC } from "react";
interface IFooterProps {}

export const Footer: FC<IFooterProps> = (props) => {
  return (
    <footer className="bg-gray-100 h-20 py-4 text-center text-sm text-gray-700">
      <div className="container mx-auto text-center">
        <p>
          Powered by{" "}
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-500 hover:underline"
          >
            React
          </a>
          ,{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-500 hover:underline"
          >
            TailwindCSS
          </a>
          , and{" "}
          <a
            href="https://www.djangoproject.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-500 hover:underline"
          >
            Django
          </a>
          .
        </p>

        <p className="mt-4">
          © {new Date().getFullYear()} Expense Tracker by{" "}
          <a
            href="https://github.com/vistej"
            className="text-blue-500 hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            vistej
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};
