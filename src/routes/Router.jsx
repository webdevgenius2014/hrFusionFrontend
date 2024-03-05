import React, { lazy } from "react";
import Loadable from "../layout/dashboard/Lodable";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

/* ***Layouts**** */
const DashboardLayout = Loadable(
  lazy(() => import("../layout/dashboard/DashboardLayout"))
);
const BlankLayout = Loadable(lazy(() => import("../layout/blank/BlankLayout")));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const Departments = Loadable(
  lazy(() => import("../views/departments/Deartments"))
);
const Designations = Loadable(
  lazy(() => import("../views/designations/Designations"))
);
const Employees = Loadable(lazy(() => import("../views/employees/Employees")));
const EmployeeView = Loadable(
  lazy(() => import("../views/employees/EmployeeView"))
);

const Error = Loadable(lazy(() => import("../views/auth/Error")));
const SignIn = Loadable(lazy(() => import("../views/auth/SignIn")));
const Clients = Loadable(lazy(() => import("../views/clients/Clients")));
const Projects = Loadable(lazy(() => import("../views/projects/Projects")));
const ResetPassword = Loadable(
  lazy(() => import("../views/auth/ResetPassword"))
);
const ClientProfile = Loadable(
  lazy(() => import("../views/clients/ClientProfile"))
);
const ClientMessage = Loadable(
  lazy(() => import("../views/clients/ClientMessage"))
);
const Tamplates = Loadable(
  lazy(() => import("../views/Templates/Templates"))
);
const TemplateForm = Loadable(
  lazy(() => import("../views/Templates/TemplateForm"))
);

const GeneralSettings = Loadable(
  lazy(() => import("../views/GeneralSettings/GeneralSetting"))
);
const ProjectView = Loadable(
  lazy(() => import("../views/projects/ProjectView"))
);
const HrTeamLeadMangar = Loadable(
  lazy(() => import("../views/hr_tm-lead_mnagr_Ep-bdy/CommonView"))
);
const Holidays = Loadable(
  lazy(() => import("../views/Holidays/Holidays"))
);
const Events = Loadable(
  lazy(() => import("../views/events/Events"))
);
const Leaves = Loadable(
  lazy(() => import("../views/Leaves/Leaves"))
);


const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state?.SuperAdmin?.token);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" />
  );
};

const PublicRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state?.SuperAdmin?.token);

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
    ) : (
      element
  );
};
// public routes
const publicRoutes = [
  {
    element: <PublicRoute element={<BlankLayout />} />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
];

// private routes
const privateRoutes = [
  {
    element: <PrivateRoute element={<DashboardLayout />} />,
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
        element: <EmployeeView />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/clients/:id",
        element: <ClientProfile />,
      },
      {
        path: "/client-Message/:id",
        element: <ClientMessage />,
      },
      {
        path: "/TemplateForm",
        element: <TemplateForm />,
      },
    
      {
        path: "/Projects",
        element: <Projects />,
      },
      {
        path: "/Projects/:id",
        element: <ProjectView />,
      },
      {
        path: "/template",
        element: <Tamplates />,
      },
      {
        path: "/Employees-Birthday",
        element: <HrTeamLeadMangar />,
      },
      {
        path: "/generalSettings",
        element: <GeneralSettings />,
      },
      {
        path: "/team-leaders",
        element: <HrTeamLeadMangar />,
      },
      {
        path: "/team-managers",
        element: <HrTeamLeadMangar />,
      },
      {
        path: "/hr",
        element: <HrTeamLeadMangar />,
      },
      {
        path: "/holidays",
        element: <Holidays />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/leaves",
        element: <Leaves />,
      },
    ],
  },
];

const Router = [...publicRoutes, ...privateRoutes];
export default Router;
