import { FC, ReactNode } from "react";
interface IProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = (props) => {
  return props.children;
};
