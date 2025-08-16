import "./App.css";
import "./ChartSetup";
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
import { Footer } from "./components/Footer";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

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
    <div className="min-h-screen bg-background dark:bg-dark-background flex flex-col transition-colors duration-200">
      <ThemeProvider>
        <BrowserRouter>
          <UserProvider>
            <Header />
            <main className="flex-1">
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
            </main>
            <Footer />
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
