import React, { lazy } from 'react';
import Loadable from '../layout/dashboard/Lodable';
/* ***Layouts**** */
const DashboardLayout = Loadable(lazy(() => import('../layout/dashboard/DashboardLayout')));
const BlankLayout = Loadable(lazy(() => import('../layout/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Departments = Loadable(lazy(() => import('../views/departments/Deartments')));
const Designations = Loadable(lazy(() => import('../views/designations/Designations')));
const Employees = Loadable(lazy(() => import('../views/employees/Employees')))
const Profile = Loadable(lazy(() => import('../views/employees/profile-employee/profile')))

const Error = Loadable(lazy(() => import('../views/auth/Error')));
const SignIn = Loadable(lazy(() => import('../views/auth/SignIn')));
const ResetPassword = Loadable(lazy(() => import('../views/auth/ResetPassword')));

const Router = [
  {
    element: <BlankLayout />,
    children: [
      {
        path: "/",
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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/departments",
        element: <Departments />,
      },
      {
        path: "/designations",
        element: <Designations />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/employees/:id",
        element: <Profile />
      }
    ],
  },
];
export default Router;