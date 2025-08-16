import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { FieldValues, useForm } from "react-hook-form";
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

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
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const onHandleSubmit = (e: FieldValues) => {
    const username = e.username;
    const password = e.password;
    onSubmit(username, password);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-6">
        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-text dark:text-dark-text mb-2"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
            </div>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 1,
                  message: "Username cannot be empty",
                },
              })}
              className={`input-field pl-10 ${errors.username ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>
          {errors.username && (
            <p className="mt-2 text-sm text-danger flex items-center space-x-1">
              <span>⚠</span>
              <span>{errors.username.message as string}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text dark:text-dark-text mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 1,
                  message: "Password cannot be empty",
                },
              })}
              className={`input-field pl-10 pr-10 ${errors.password ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
              ) : (
                <EyeIcon className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-danger flex items-center space-x-1">
              <span>⚠</span>
              <span>{errors.password.message as string}</span>
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="remember"
              {...register("remember")}
              className="w-4 h-4 text-primary-600 border-border dark:border-dark-border rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="remember" className="text-sm text-text dark:text-dark-text">
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={() => navigate(ROUTES.REGISTER)} // You can change this to a forgot password route
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isValid}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Signing in...
            </>
          ) : (
            <>
              <LockClosedIcon className="w-5 h-5 mr-2" />
              {buttonText}
            </>
          )}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-6 text-center">
        <p className="text-sm text-text-muted dark:text-dark-text-muted">
          Don't have an account?{" "}
          <button
            onClick={() => navigate(ROUTES.REGISTER)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200"
            disabled={loading}
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
