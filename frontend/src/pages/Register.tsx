import { FC } from "react";
import LoginForm from "../components/LoginForm";
import { ENDPOINTS, ROUTES } from "../constants";
import api from "../apis";
import { useNavigate } from "react-router-dom";
interface IRegisterProps { }

export const Register: FC<IRegisterProps> = (props) => {
  const navigate = useNavigate();
  const handleSubmit = async (username: string, password: string) => {
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
    } catch (error) {
      console.log(error);
      alert("Failed to register. Try a different username.");
    }
  };

  return (
    <LoginForm title="Register" buttonText="Submit" onSubmit={handleSubmit} />
  );
};
