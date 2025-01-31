import React, { FC } from "react";
import LoginForm from "../components/LoginForm";
import { ENDPOINTS, MESSAGES, ROUTES } from "../constants";
import api from "../apis";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (username: string, password: string) => {
    setLoading(true);
    const body = {
      username: username,
      password: password,
    };
    try {
      const res = await api.post(ENDPOINTS.REGISTER, body);
      if (res.status === 201) {
        localStorage.clear();
        navigate(ROUTES.LOGIN);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.username[0]);
      } else {
        console.error(error);
        alert(MESSAGES.unknownError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm title="Register" buttonText="Submit" onSubmit={handleSubmit} loading={loading} />
  );
};
