import React, { FC } from "react";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../components/AuthLayout";
import api from "../apis";
import { ACCESS_TOKEN, ENDPOINTS, MESSAGES, REFRESH_TOKEN, ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/24/outline";

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
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your expense dashboard"
      icon={LockClosedIcon}
    >
      {/* Login Form */}
      <div className="card-elevated">
        <LoginForm
          buttonText="Sign In"
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

    </AuthLayout>
  );
};
