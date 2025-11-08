import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CohortListPage from "./pages/CohortListPage";
import CohortDetailsPage from "./pages/CohortDetailsPage";
import CohortEditPage from "./pages/CohortEditPage";
import CohortCreatePage from "./pages/CohortCreatePage";
import StudentListPage from "./pages/StudentListPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import StudentEditPage from "./pages/StudentEditPage";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((open) => !open);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="App">
      <div className="relative flex min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="flex min-h-screen flex-1 flex-col transition-all duration-500 ease-out lg:ml-72">
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
              onClick={closeSidebar}
            />
          )}

          <main className="relative z-20 flex-1 px-4 pb-16 pt-28 sm:px-8 lg:px-12 lg:pt-32">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<CohortListPage />} />
                <Route path="/students" element={<StudentListPage />} />
                <Route path="/cohorts/details/:cohortId" element={<CohortDetailsPage />} />
                <Route path="/cohorts/edit/:cohortId" element={<CohortEditPage />} />
                <Route path="/cohorts/create" element={<CohortCreatePage />} />
                <Route path="/students/details/:studentId" element={<StudentDetailsPage />} />
                <Route path="/students/edit/:studentId" element={<StudentEditPage />} />
                <Route
                  path="/profile"
                  element={
                    <IsPrivate>
                      <UserProfilePage />
                    </IsPrivate>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <IsAnon>
                      <LoginPage />
                    </IsAnon>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <IsAnon>
                      <SignupPage />
                    </IsAnon>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
