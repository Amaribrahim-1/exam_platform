import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";

// ── Layouts & guards (small shells – kept eager) ──────────────────────────────
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import ExamSessionProvider from "./features/student/exam-session/context/ExamSessionContext";
import AdminLayout from "./layouts/AdminLayout";
import InstructorLayout from "./layouts/InstructorLayout";
import StudentLayout from "./layouts/StudentLayout";

// ── Auth pages ────────────────────────────────────────────────────────────────
const LoginForm = lazy(() => import("./features/auth/components/LoginForm"));
const RegisterForm = lazy(
  () => import("./features/auth/components/RegisterForm"),
);
const EmailVerificationPage = lazy(
  () => import("./features/auth/components/EmailVerificationPage"),
);
const ResetPasswordPage = lazy(
  () => import("./features/auth/components/ResetPasswordPage"),
);

// ── Public / shared pages ─────────────────────────────────────────────────────
const HomePage = lazy(() => import("./pages/HomePage"));
const LandingPage = lazy(() => import("./components/LandingPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ── Instructor pages ──────────────────────────────────────────────────────────
const DashboardPage = lazy(
  () => import("./features/instructor/dashboard/InstructorDashboardPage"),
);
const ExamsManagementPage = lazy(
  () => import("./features/instructor/exam-management/ExamManagementPage"),
);
const ExamWizardPage = lazy(
  () => import("./features/instructor/exam-wizard/ExamWizardPage"),
);
const StudentsPage = lazy(
  () => import("./features/instructor/students/StudentsPage"),
);
const InstructorExamHistoryPage = lazy(
  () => import("./features/instructor/exam-history/InstructorExamHistoryPage"),
);
const InstructorProfilePage = lazy(
  () => import("./features/instructor/profile/InstructorProfilePage"),
);
const InstructorResultPage = lazy(
  () => import("./features/instructor/results/InstructorResultPage"),
);

// ── Admin pages ───────────────────────────────────────────────────────────────
const AdminDashboardPage = lazy(
  () => import("./features/admin/dashboard/AdminDashboardPage"),
);
const ExamOversightPage = lazy(
  () => import("./features/admin/exam-oversight/ExamOversightPage"),
);
const ReportsPage = lazy(() => import("./features/admin/reports/ReportsPage"));
const UserManagementPage = lazy(
  () => import("./features/admin/user-management/UserManagementPage"),
);
const AdminProfilePage = lazy(
  () => import("./features/admin/profile/AdminProfilePage"),
);

// ── Student pages ─────────────────────────────────────────────────────────────
const CompleteProfilePage = lazy(
  () => import("./features/student/profile/CompleteProfilePage"),
);
const StudentDashboardPage = lazy(
  () => import("./features/student/dashboard/StudentDashboardPage"),
);
const AvailableExamsPage = lazy(
  () => import("./features/student/available-exams/AvailableExamsPage"),
);
const ExamSessionPage = lazy(
  () => import("./features/student/exam-session/ExamSessionPage"),
);
const StudentResultPage = lazy(
  () => import("./features/student/results/StudentResultPage"),
);
const StudentExamsHistoryPage = lazy(
  () => import("./features/student/exam-history/StudentExamsHistoryPage"),
);
const StudentProfilePage = lazy(
  () => import("./features/student/profile/StudentProfilePage"),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
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
              { path: "exam-wizard", element: <ExamWizardPage /> },
              { path: "exam-wizard/:examId", element: <ExamWizardPage /> },
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
              { path: "profile", element: <AdminProfilePage /> },
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
    element: <NotFound />,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* Suspense catches every lazy page chunk while it's being downloaded */}
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
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
    </ErrorBoundary>
  );
}

export default App;
