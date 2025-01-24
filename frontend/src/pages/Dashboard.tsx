import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
interface IDashboardProps {}

export const Dashboard: FC<IDashboardProps> = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate(ROUTES.LOGIN);
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
