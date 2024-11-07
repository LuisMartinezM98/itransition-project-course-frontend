import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import LogIn from "./pages/LogIn.tsx";
import ProtectedRoute from "./layouts/ProtectedRoute.tsx";
import Dashboard from "./pages/ProtectedRoutes/Dashboard.tsx";
import {
  SliderProvider,
  AuthProvider,
  QuestionProvider,
  SurveysProvider,
  AnswerProvider,
  SalesForceProvider
} from "./Providers/Providers.tsx";
import Survey from "./pages/ProtectedRoutes/Survey.tsx";
import NewSurvey from "./pages/ProtectedRoutes/Surveys/NewSurvey.tsx";
import AnswerSurvey from "./pages/ProtectedRoutes/Surveys/AnswerSurvey.tsx";
import MySurveys from "./pages/ProtectedRoutes/Surveys/MySurveys.tsx";
import CreateAccount from "./pages/ProtectedRoutes/CreateAccount.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "survey/show-survey/:id",
        element: <Survey />,
      },
      {
        path: "survey/new-survey",
        element: <NewSurvey />,
      },
      {
        path: "survey/ask-survey/:id",
        element: <AnswerSurvey/>
      },
      {
        path: "survey/my-surveys",
        element: <MySurveys/>
      },
      {
        path: "create-account-salesforce",
        element:<CreateAccount/>
      }
    ],
  },
  {
    path: "login",
    element: <LogIn />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <SliderProvider>
    <AuthProvider>
      <QuestionProvider>
        <SurveysProvider>
          <AnswerProvider>
            <SalesForceProvider>
              <RouterProvider router={router} />
            </SalesForceProvider>
          </AnswerProvider>
        </SurveysProvider>
      </QuestionProvider>
    </AuthProvider>
  </SliderProvider>
);