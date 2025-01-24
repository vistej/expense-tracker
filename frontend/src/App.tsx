import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { NotFound } from "./pages/NotFound";
import { Expenses } from "./pages/Expenses";
import { ROUTES } from "./constants";
import { Header } from "./components/Header";
import { CategoryProvider } from "./context/categoryContext";

function App() {
  const ProtectedWithCategoryProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <CategoryProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </CategoryProvider>
  );
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedWithCategoryProvider>
                <Dashboard />
              </ProtectedWithCategoryProvider>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedWithCategoryProvider>
                <Profile />
              </ProtectedWithCategoryProvider>
            }
          />
          <Route
            path={ROUTES.EXPENSES}
            element={
              <ProtectedWithCategoryProvider>
                <Expenses />
              </ProtectedWithCategoryProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
