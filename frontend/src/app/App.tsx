import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { PublicRoute, ProtectedRoute } from "@/routes/RouteGuards";

import Layout from "@/components/templates/Layout";
import LoginPage from "@/components/pages/Auth/LoginPage";
import RegisterPage from "@/components/pages/Auth/RegisterPage"; // New
import VerifyOTPPage from "@/components/pages/Auth/VerifyOTPPage"; // New
import BoardPage from "@/components/pages/BoardPage";
import StatsPage from "@/components/pages/StatsPage";
import AuthLayout from "@/components/templates/AuthLayout";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { tasks } = useAppSelector((state) => state.task);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [tasks, searchQuery],
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC AUTH ROUTES */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <AuthLayout>
                <VerifyOTPPage />
              </AuthLayout>
            </PublicRoute>
          }
        />

        {/* PROTECTED APP ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout
                view="board"
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              >
                <BoardPage tasks={filteredTasks} />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Layout view="stats">
                <StatsPage tasks={tasks} />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
