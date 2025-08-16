import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { FieldValues, useForm } from "react-hook-form";
import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

interface IRegisterFormProps {
  title: string;
  buttonText: string;
  onSubmit: (username: string, email: string, password: string) => void;
  loading: boolean;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({
  title,
  buttonText,
  onSubmit,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const password = watch("password");

  const onHandleSubmit = (e: FieldValues) => {
    const username = e.username;
    const email = e.email;
    const password = e.password;
    onSubmit(username, email, password);
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
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Username must be less than 30 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Username can only contain letters, numbers, and underscores",
                },
              })}
              className={`input-field pl-10 ${errors.username ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
              placeholder="Choose a unique username"
            />
          </div>
          {errors.username && (
            <p className="mt-2 text-sm text-danger flex items-center space-x-1">
              <span>⚠</span>
              <span>{errors.username.message as string}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text dark:text-dark-text mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
            </div>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className={`input-field pl-10 ${errors.email ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-danger flex items-center space-x-1">
              <span>⚠</span>
              <span>{errors.email.message as string}</span>
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
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
              className={`input-field pl-10 pr-10 ${errors.password ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
              placeholder="Create a strong password"
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

          {/* Password Strength Indicator */}
          <div className="mt-2">
            <div className="flex space-x-1">
              {[
                { label: "8+ chars", met: password.length >= 8 },
                { label: "Uppercase", met: /[A-Z]/.test(password) },
                { label: "Lowercase", met: /[a-z]/.test(password) },
                { label: "Number", met: /\d/.test(password) },
                { label: "Special", met: /[@$!%*?&]/.test(password) },
              ].map((requirement, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-1 text-xs ${requirement.met ? "text-success" : "text-text-muted dark:text-dark-text-muted"
                    }`}
                >
                  {requirement.met ? (
                    <CheckIcon className="w-3 h-3" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-current" />
                  )}
                  <span>{requirement.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-text dark:text-dark-text mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`input-field pl-10 pr-10 ${errors.confirmPassword ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
              ) : (
                <EyeIcon className="h-5 w-5 text-text-muted dark:text-dark-text-muted" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-danger flex items-center space-x-1">
              <span>⚠</span>
              <span>{errors.confirmPassword.message as string}</span>
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            {...register("terms", {
              required: "You must accept the terms and conditions",
            })}
            className="w-4 h-4 text-primary-600 border-border dark:border-dark-border rounded focus:ring-primary-500 focus:ring-2 mt-1"
          />
          <label htmlFor="terms" className="text-sm text-text dark:text-dark-text">
            I agree to the{" "}
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200"
            >
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="mt-2 text-sm text-danger flex items-center space-x-1">
            <span>⚠</span>
            <span>{errors.terms.message as string}</span>
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isValid}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Creating account...
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
          Already have an account?{" "}
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200"
            disabled={loading}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

