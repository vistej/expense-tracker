import React, { FC } from "react";
import LoginForm from "../components/LoginForm";
import api from "../apis";
import { ACCESS_TOKEN, ENDPOINTS, MESSAGES, REFRESH_TOKEN, ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (username: string, password: string) => {
    setLoading(true);
    const body = {
      username: username,
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
        alert(error.response.data.detail);
      } else {
        console.error(error);
        alert(MESSAGES.unknownError);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoginForm title="Login" buttonText="Proceed" onSubmit={handleSubmit} loading={loading} />
  );
};
