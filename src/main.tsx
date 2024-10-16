import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import LogIn from './pages/LogIn.tsx';
import ProtectedRoute from './layouts/ProtectedRoute.tsx';
import Dashboard from './pages/ProtectedRoutes/Dashboard.tsx';
import { SliderProvider } from './Providers/Providers.tsx'
import Survey from './pages/ProtectedRoutes/Survey.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <App/>
      },
      {
        path: 'dashboard',
        element: <Dashboard/>
      },
      {
        path: 'survey/:id',
        element: <Survey/>
      }
    ]
  },
  {
    path: "login",
    element: <LogIn/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SliderProvider>
      <RouterProvider router={router}/>
    </SliderProvider>
  </StrictMode>,
)
