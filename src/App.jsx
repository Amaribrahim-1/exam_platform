// import {
//   createBrowserRouter,
//   Navigate,
//   RouterProvider,
// } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { Flip, ToastContainer } from "react-toastify";

// import ExamWizardProvider from "./features/instructor/exam-wizard/context/ExamWizardContext";
// import InstructorLayout from "./layouts/InstructorLayout";

// import CreateExamPage from "./features/instructor/exam-wizard/CreateExamPage";
// import DashboardPage from "./features/instructor/dashboard/DashboardPage";
// import ExamResultsPage from "./features/instructor/results/ExamResultsPage";
// import ExamsManagementPage from "./features/instructor/exam-management/ExamManagementPage";
// import StudentsPage from "./features/instructor/students/StudentsPage";

// import LoginForm from "./features/auth/components/LoginForm";
// import RegisterForm from "./features/auth/components/RegisterForm";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60, // 1 minutes
//     },
//   },
// });

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <LoginForm />,
//   },
//   {
//     path: "/register",
//     element: <RegisterForm />,
//   },
//   {
//     path: "/",
//     element: <Navigate to='/login' replace />,
//   },
//   {
//     path: "/instructor",
//     element: <InstructorLayout />,
//     children: [
//       {
//         path: "dashboard",
//         element: <DashboardPage />,
//       },
//       {
//         path: "exam-wizard",
//         element: (
//           <ExamWizardProvider>
//             <CreateExamPage />
//           </ExamWizardProvider>
//         ),
//       },
//       {
//         path: "exams-management",
//         element: <ExamsManagementPage />,
//       },
//       {
//         path: "students",
//         element: <StudentsPage />,
//       },
//       {
//         path: "results",
//         element: <ExamResultsPage />,
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: (
//       <div className='p-10 text-center text-2xl'>404 - Page Not Found</div>
//     ),
//   },
// ]);

// function App() {
//   return (
//     <>
//       <QueryClientProvider client={queryClient}>
//         <ReactQueryDevtools initialIsOpen={false} />
//         <RouterProvider router={router} />
//       </QueryClientProvider>

//       <ToastContainer
//         position='top-center'
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         transition={Flip}
//       />
//     </>
//   );
// }

// export default App;

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Flip, ToastContainer } from "react-toastify";

import ExamWizardProvider from "./features/instructor/exam-wizard/context/ExamWizardContext";
import InstructorLayout from "./layouts/InstructorLayout";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import CreateExamPage from "./features/instructor/exam-wizard/CreateExamPage";
import DashboardPage from "./features/instructor/dashboard/DashboardPage";
import ExamResultsPage from "./features/instructor/results/ExamResultsPage";
import ExamsManagementPage from "./features/instructor/exam-management/ExamManagementPage";
import StudentsPage from "./features/instructor/students/StudentsPage";

import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";

// Admin pages
import AdminDashboardPage from "./features/admin/dashboard/AdminDashboardPage";
import UserManagementPage from "./features/admin/user-management/UserManagementPage";
import ExamOversightPage from "./features/admin/exam-oversight/ExamOversightPage";
import ReportsPage from "./features/admin/reports/ReportsPage";

// Student pages
import StudentDashboardPage from "./features/student/dashboard/StudentDashboardPage";
import AvailableExamsPage from "./features/student/available-exams/AvailableExamsPage";
import ExamSessionPage from "./features/student/exam-session/ExamSessionPage";
import ExamHistoryPage from "./features/student/exam-history/ExamHistoryPage";
import StudentResultPage from "./features/student/results/StudentResultPage";
import StudentProfilePage from "./features/student/profile/StudentProfilePage";

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
  {
    path: "/",
    element: <Navigate to='/login' replace />,
  },

  // ✅ كل الراوتس دي محمية
  {
    element: <ProtectedRoute />,
    children: [
      // Instructor
      {
        element: <RoleRoute allowedRoles={["instructor"]} />,
        children: [
          {
            path: "/instructor",
            element: <InstructorLayout />,
            children: [
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
              { path: "results", element: <ExamResultsPage /> },
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
              { path: "dashboard", element: <StudentDashboardPage /> },
              { path: "exams", element: <AvailableExamsPage /> },
              { path: "exam-session", element: <ExamSessionPage /> },
              { path: "history", element: <ExamHistoryPage /> },
              { path: "results", element: <StudentResultPage /> },
              { path: "profile", element: <StudentProfilePage /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: (
      <div className='p-10 text-center text-2xl'>404 - Page Not Found</div>
    ),
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
