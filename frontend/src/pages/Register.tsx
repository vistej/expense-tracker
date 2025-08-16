import React, { FC } from "react";
import RegisterForm from "../components/RegisterForm";
import { ENDPOINTS, MESSAGES, ROUTES } from "../constants";
import api from "../apis";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlusIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export const Register: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (username: string, email: string, password: string) => {
    setLoading(true);
    const body = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const res = await api.post(ENDPOINTS.REGISTER, body);
      if (res.status === 201) {
        // Show success message and redirect to login
        alert("Account created successfully! Please sign in with your new credentials.");
        navigate(ROUTES.LOGIN);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle different types of validation errors
        if (error.response.data.username) {
          alert(`Username error: ${error.response.data.username[0]}`);
        } else if (error.response.data.email) {
          alert(`Email error: ${error.response.data.email[0]}`);
        } else if (error.response.data.password) {
          alert(`Password error: ${error.response.data.password[0]}`);
        } else if (error.response.data.non_field_errors) {
          alert(`Registration error: ${error.response.data.non_field_errors[0]}`);
        } else {
          alert("Registration failed. Please try again.");
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
            <UserPlusIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-text dark:text-dark-text mb-2">
            Create Account
          </h1>
          <p className="text-text-muted dark:text-dark-text-muted">
            Join ExpenseTracker and start managing your finances today
          </p>
        </div>

        {/* Registration Form */}
        <div className="card-elevated">
          <RegisterForm
            title="Create Account"
            buttonText="Create Account"
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>

        {/* Benefits */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-4">
            Why Choose ExpenseTracker?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center text-sm text-text-muted dark:text-dark-text-muted">
              <ChartBarIcon className="w-4 h-4 mr-2 text-primary-500" />
              Track spending patterns with beautiful charts
            </div>
            <div className="flex items-center justify-center text-sm text-text-muted dark:text-dark-text-muted">
              <UserPlusIcon className="w-4 h-4 mr-2 text-secondary-500" />
              Secure and private expense management
            </div>
            <div className="flex items-center justify-center text-sm text-text-muted dark:text-dark-text-muted">
              <ChartBarIcon className="w-4 h-4 mr-2 text-accent-500" />
              Categorize and analyze your expenses
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
