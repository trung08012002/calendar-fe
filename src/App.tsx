import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { PATH } from './constants/routes';
import { getAccessTokenFromLS } from '@utils';
import { LoginPage } from '@pages/LoginPage';
import { SignUpPage } from '@pages/SignUpPage';
import { CalendarPage } from '@pages/CalendarPage';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={PATH.LOGIN_PAGE} replace />;
  }

  return <Outlet />;
};

const isAuthenticated = () => {
  return !!getAccessTokenFromLS();
};

const router = createBrowserRouter([
  {
    path: PATH.ROOT_PAGE,
    element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
    children: [
      {
        path: PATH.ROOT_PAGE,
        element: <CalendarPage />,
      },
    ],
  },
  {
    path: PATH.LOGIN_PAGE,
    element: <LoginPage />,
  },
  {
    path: PATH.SIGNUP_PAGE,
    element: <SignUpPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
