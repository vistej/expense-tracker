import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useForm } from "react-hook-form";

interface ILoginFormProps {
  title: string;
  buttonText: string;
  onSubmit: (username: string, password: string) => void;
  loading: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = ({
  title,
  buttonText,
  onSubmit,
  loading,
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onHandleSubmit = (e: any) => {
    const username = e["username"];
    const password = e["password"];
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
        <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-4">
          {/* Username Field */}
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
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className={`p-2 border ${errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${errors.username
                  ? "focus:ring-red-500"
                  : "focus:ring-[var(--color-primary)]"
                }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message as string}
              </p>
            )}
          </div>

          {/* Password Field */}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`p-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${errors.password
                  ? "focus:ring-red-500"
                  : "focus:ring-[var(--color-primary)]"
                }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-[var(--color-primary)] text-white font-semibold rounded-md hover:bg-[var(--color-primary)]/80 transition"
            disabled={loading}
          >
            {buttonText}
          </button>
        </form>

        {/* Footer Links */}
        {title === "Login" ? (
          <p className="text-sm text-gray-700 mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate(ROUTES.REGISTER)}
              className="text-[var(--color-primary)] font-medium cursor-pointer hover:underline"
              disabled={loading}
            >
              Register
            </button>
          </p>
        ) : (
          <p className="text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="text-[var(--color-primary)] font-medium cursor-pointer hover:underline"
              disabled={loading}
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
