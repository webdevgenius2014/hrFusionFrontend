import React, { lazy } from 'react';
import Loadable from '../layout/dashboard/Lodable';
/* ***Layouts**** */
const DashboardLayout = Loadable(lazy(() => import('../layout/dashboard/DashboardLayout')));
const BlankLayout = Loadable(lazy(() => import('../layout/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Departments = Loadable(lazy(() => import('../views/departments/Deartments')))

const Error = Loadable(lazy(() => import('../views/auth/Error')));
const SignIn = Loadable(lazy(() => import('../views/auth/SignIn')));
const ResetPassword = Loadable(lazy(() => import('../views/auth/ResetPassword')));

const Router = [
  {
    element: <BlankLayout />,
    children: [
      {
        path: "/login",
        element: <SignIn />
      },
      {
        path: "/reset-password",
        element: <ResetPassword />
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/departments",
        element: <Departments />,
      }
    ],
  },
];
export default Router;