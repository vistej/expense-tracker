import React, { FC } from "react";
import LoginForm from "../components/LoginForm";
import api from "../apis";
import { ACCESS_TOKEN, ENDPOINTS, MESSAGES, REFRESH_TOKEN, ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LockClosedIcon, ChartBarIcon, ShieldCheckIcon, BellIcon } from "@heroicons/react/24/outline";

export const Login: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (email: string, password: string) => {
    setLoading(true);
    const body = {
      username: email,
      password: password,
    };

    try {
      const res = await api.post(ENDPOINTS.LOGIN, body);
      if (res.status === 200) {
        localStorage.clear();
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate(ROUTES.DASHBOARD);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle different types of login errors
        if (error.response.data.detail) {
          alert(error.response.data.detail);
        } else if (error.response.data.non_field_errors) {
          alert(`Login error: ${error.response.data.non_field_errors[0]}`);
        } else if (error.response.data.email) {
          alert(`Email error: ${error.response.data.email[0]}`);
        } else if (error.response.data.password) {
          alert(`Password error: ${error.response.data.password[0]}`);
        } else {
          alert("Invalid credentials. Please try again.");
        }
      } else {
        console.error(error);
        alert(MESSAGES.unknownError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-primary-900/20 dark:via-dark-background dark:to-secondary-900/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-6 shadow-large">
            <LockClosedIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-text dark:text-dark-text mb-2">
            Welcome Back
          </h1>
          <p className="text-text-muted dark:text-dark-text-muted">
            Sign in to access your expense dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="card-elevated">
          <LoginForm
            buttonText="Sign In"
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>

        {/* Features */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-4">
            What You'll Get
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center text-sm text-text-muted dark:text-dark-text-muted">
              <ChartBarIcon className="w-4 h-4 mr-2 text-primary-500" />
              Access to your financial dashboard
            </div>
            <div className="flex items-center justify-center text-sm text-text-muted dark:text-dark-text-muted">
              <ShieldCheckIcon className="w-4 h-4 mr-2 text-secondary-500" />
              Secure expense tracking
            </div>
            <div className="flex items-center justify-center text-sm text-text-muted dark:text-dark-text-muted">
              <BellIcon className="w-4 h-4 mr-2 text-accent-500" />
              Smart spending insights
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-text-muted dark:text-dark-text-muted">
            Don't have an account?{" "}
            <button
              onClick={() => navigate(ROUTES.REGISTER)}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors duration-200"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
