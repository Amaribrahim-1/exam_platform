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

import CreateExamPage from "./features/instructor/exam-wizard/CreateExamPage";
import DashboardPage from "./features/instructor/dashboard/DashboardPage";
import ExamResultsPage from "./features/instructor/results/ExamResultsPage";
import ExamsManagementPage from "./features/instructor/exam-management/ExamManagementPage";
import StudentsPage from "./features/instructor/students/StudentsPage";

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
          <ExamWizardProvider>
            <CreateExamPage />
          </ExamWizardProvider>
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
