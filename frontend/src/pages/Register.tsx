import React, { FC } from "react";
import RegisterForm from "../components/RegisterForm";
import AuthLayout from "../components/AuthLayout";
import { ENDPOINTS, MESSAGES, ROUTES } from "../constants";
import api from "../apis";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlusIcon } from "@heroicons/react/24/outline";

export const Register: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (firstName: string, lastName: string, email: string, password: string) => {
    setLoading(true);
    const body = {
      username: email,
      first_name: firstName,
      last_name: lastName,
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
        if (error.response.data.first_name) {
          alert(`First name error: ${error.response.data.first_name[0]}`);
        } else if (error.response.data.last_name) {
          alert(`Last name error: ${error.response.data.last_name[0]}`);
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
    <AuthLayout
      title="Create Account"
      subtitle="Join ExpenseTracker and start managing your finances today"
      icon={UserPlusIcon}
    >
      {/* Registration Form */}
      <div className="card-elevated">
        <RegisterForm
          buttonText="Create Account"
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </AuthLayout>
  );
};
