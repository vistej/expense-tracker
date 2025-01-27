import { FC } from "react";


export const Footer: FC = () => {
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
            href="https://www.djangoproject.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-500 hover:underline"
          >
            Django
          </a> {" "}
          and{" "}
          <a
            href="https://aws.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-500 hover:underline"
          >
            AWS
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
