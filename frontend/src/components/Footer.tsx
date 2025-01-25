import { FC } from "react";
interface IFooterProps {}

export const Footer: FC<IFooterProps> = (props) => {
  return (
    <footer className="bg-gray-100 py-4 text-center text-sm text-gray-700">
      <p className="flex justify-center items-center">
        Made with React 🚀 and Django 🐍
      </p>
    </footer>
  );
};
