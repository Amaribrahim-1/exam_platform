import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";

import ExamWizardProvider from "./features/instructor/exam-wizard/context/ExamWizardContext";
import AdminLayout from "./layouts/AdminLayout";
import InstructorLayout from "./layouts/InstructorLayout";
import StudentLayout from "./layouts/StudentLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import DashboardPage from "./features/instructor/dashboard/InstructorDashboardPage";
import ExamsManagementPage from "./features/instructor/exam-management/ExamManagementPage";
import CreateExamPage from "./features/instructor/exam-wizard/CreateExamPage";
import StudentsPage from "./features/instructor/students/StudentsPage";

import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";

// Admin pages
import AdminDashboardPage from "./features/admin/dashboard/AdminDashboardPage";
import ExamOversightPage from "./features/admin/exam-oversight/ExamOversightPage";
import ReportsPage from "./features/admin/reports/ReportsPage";
import UserManagementPage from "./features/admin/user-management/UserManagementPage";

// Student pages
import Empty from "./components/Empty";
import LandingPage from "./components/LandingPage";
import EmailVerificationPage from "./features/auth/components/EmailVerificationPage";
import ResetPasswordPage from "./features/auth/components/ResetPasswordPage";
import InstructorExamHistoryPage from "./features/instructor/exam-history/InstructorExamHistoryPage";
import InstructorProfilePage from "./features/instructor/profile/InstructorProfilePage";
import InstructorResultPage from "./features/instructor/results/InstructorResultPage";
import AvailableExamsPage from "./features/student/available-exams/AvailableExamsPage";
import StudentDashboardPage from "./features/student/dashboard/StudentDashboardPage";
import StudentExamsHistoryPage from "./features/student/exam-history/StudentExamsHistoryPage";
import ExamSessionProvider from "./features/student/exam-session/context/ExamSessionContext";
import ExamSessionPage from "./features/student/exam-session/ExamSessionPage";
import StudentProfilePage from "./features/student/profile/StudentProfilePage";
import StudentResultPage from "./features/student/results/StudentResultPage";
import CompleteProfilePage from "./features/student/profile/CompleteProfilePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  { path: "/email-verification", element: <EmailVerificationPage /> },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/",
    element: <Navigate to='/home' replace />,
  },
  {
    path: "/home",
    element: <LandingPage />,
  },

  // ✅ كل الراوتس دي محمية
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/complete-profile", element: <CompleteProfilePage /> },

      // Instructor
      {
        element: <RoleRoute allowedRoles={["instructor"]} />,
        children: [
          {
            path: "/instructor",
            element: <InstructorLayout />,
            children: [
              { index: true, element: <Navigate to='dashboard' replace /> },
              { path: "dashboard", element: <DashboardPage /> },
              {
                path: "exam-wizard",
                element: (
                  <ExamWizardProvider>
                    <CreateExamPage />
                  </ExamWizardProvider>
                ),
              },
              { path: "exams-management", element: <ExamsManagementPage /> },
              { path: "students", element: <StudentsPage /> },
              { path: "exams-history", element: <InstructorExamHistoryPage /> },
              {
                path: "exam-results/:submissionId",
                element: <InstructorResultPage />,
              },
              { path: "profile", element: <InstructorProfilePage /> },
            ],
          },
        ],
      },

      // Admin
      {
        element: <RoleRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              { index: true, element: <Navigate to='dashboard' replace /> },
              { path: "dashboard", element: <AdminDashboardPage /> },
              { path: "users", element: <UserManagementPage /> },
              { path: "exams", element: <ExamOversightPage /> },
              { path: "reports", element: <ReportsPage /> },
            ],
          },
        ],
      },

      // Student
      {
        element: <RoleRoute allowedRoles={["student"]} />,
        children: [
          {
            path: "/student",
            element: <StudentLayout />,
            children: [
              { index: true, element: <Navigate to='dashboard' replace /> },
              { path: "dashboard", element: <StudentDashboardPage /> },
              { path: "exams", element: <AvailableExamsPage /> },
              {
                path: "exam-session/:examId",
                element: (
                  <ExamSessionProvider>
                    <ExamSessionPage />
                  </ExamSessionProvider>
                ),
              },
              {
                path: "exam-result/:examId",
                element: <StudentResultPage />,
              },
              { path: "exams-history", element: <StudentExamsHistoryPage /> },
              { path: "profile", element: <StudentProfilePage /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Empty message='Page not found' />,
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
    </>
  );
}

export default App;
