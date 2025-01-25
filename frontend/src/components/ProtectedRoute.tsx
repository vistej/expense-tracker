import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, ENDPOINTS, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../apis";
import { useCategories } from "../context/categoryContext";
interface IProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = (props) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const { categories, setCategories } = useCategories();

  const fetchCategories = async () => {
    if (!categories.length) {
      try {
        const res = await api.get(ENDPOINTS.GET_CATEGORIES);
        if (res.status === 200) {
          setCategories(res.data.results);
          setIsAuthorized(true);
        }
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    } else {
      // TODO change this to loading
      setIsAuthorized(true);
    }
  };
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const token = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post(ENDPOINTS.REFRESH, {
        refresh: token,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        fetchCategories();
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration && tokenExpiration < now) {
      await refreshToken();
    } else {
      fetchCategories();
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? props.children : <Navigate to="/login" />;
};
