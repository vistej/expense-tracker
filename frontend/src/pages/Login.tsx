import { FC } from "react";
import LoginForm from "../components/LoginForm";
import api from "../apis";
import { ACCESS_TOKEN, ENDPOINTS, REFRESH_TOKEN, ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";
interface ILoginProps {}

export const Login: FC<ILoginProps> = (props) => {
  const navigate = useNavigate();

  const handleSubmit = async (username: string, password: string) => {
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
    } catch (error) {
      alert(error);
    }
  };
  return (
    <LoginForm title="Login" buttonText="Proceed" onSubmit={handleSubmit} />
  );
};
