import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

interface ILoginFormProps {
  title: string;
  buttonText: string;
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({
  title,
  buttonText,
  onSubmit,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 5rem)" }}
      className="flex flex-col items-center bg-gray-100 bg-opacity-50 backdrop-blur-lg"
    >
      <h1 className="text-4xl py-20 font-bold text-black mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
        Expense Tracker
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {title}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[var(--color-primary)] text-white font-semibold rounded-md hover:bg-[var(--color-primary)]/80 transition"
          >
            {buttonText}
          </button>
        </form>
        {title === "Login" ? (
          <p className="text-sm text-gray-700 mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate(ROUTES.REGISTER)}
              className="text-[var(--color-primary)] font-medium"
            >
              Register
            </button>
          </p>
        ) : (
          <p className="text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="text-[var(--color-primary)] font-medium"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
