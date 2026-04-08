import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import InstructorLayout from "./layouts/InstructorLayout";

import { Flip, ToastContainer } from "react-toastify";
import { ExamDataProvider } from "./features/exam-wizard/context/ExamDataContext";
import CreateExamPage from "./pages/CreateExamPage";
import DashboardPage from "./pages/DashboardPage";
import ExamResultsPage from "./pages/ExamResultsPage";
import ExamsManagementPage from "./pages/ExamsManagementPage";
import StudentsPage from "./pages/StudentsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minutes
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/instructor/dashboard' replace />,
  },
  {
    path: "/instructor",
    element: <InstructorLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "exam-wizard",
        element: (
          <ExamDataProvider>
            <CreateExamPage />
          </ExamDataProvider>
        ),
      },
      {
        path: "exams-management",
        element: <ExamsManagementPage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "results",
        element: <ExamResultsPage />,
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
