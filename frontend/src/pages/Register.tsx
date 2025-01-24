import { FC } from "react";
import LoginForm from "../components/LoginForm";
import { ENDPOINTS, ROUTES } from "../constants";
import api from "../apis";
import { useNavigate } from "react-router-dom";
interface IRegisterProps {}

export const Register: FC<IRegisterProps> = (props) => {
  const navigate = useNavigate();
  const handleSubmit = async (username: string, password: string) => {
    const body = {
      username: username,
      password: password,
    };
    try {
      const res = await api.post(ENDPOINTS.REGISTER, body);
      console.log(res);
      if (res.status === 201) {
        console.log(res.data);
        localStorage.clear();
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <LoginForm title="Register" buttonText="Submit" onSubmit={handleSubmit} />
  );
};
