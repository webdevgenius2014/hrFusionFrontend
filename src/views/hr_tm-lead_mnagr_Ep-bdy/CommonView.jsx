import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CommonServices from "../../services/CommonServices";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { GridActionsCellItem } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ImagePath } from "../../helperFunctions/ImagePath";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import "react-toastify/dist/ReactToastify.css";
import { HrTeamLeadMangarapi } from "../../helperApis/HelperApis";

function HrTeamLeadMangar() {
  const url = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = url.pathname?.split("/")?.[1];
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/`;

  const [formLoader, setFormLoader] = useState(false);
  // api state
  const [data, setData] = useState([]);

  // get hr / team lead / team manager -----------------------
  const getAllHrTeamLeadMangar = async () => {
    try {
      setFormLoader(true);
      const res = await HrTeamLeadMangarapi(location);
      if (res.status === 200) {
        console.log(res)
        setData(res?.data?.data);
        setFormLoader(false);
      } else if (res.status === 200 && res.success === false) {
        setData([]);
        setFormLoader(false);
      } else if (res.status === 401) {
        dispatch(superAdminLogout());
        setFormLoader(false);
        navigate("/");
      } else if (res.status === 500) {
        setFormLoader(false);
      }
    } catch (error) {
      setFormLoader(false);
      console.log("commonView error", error);
    }
  };
  //  get emp-bday api
  const EmplpyeeBday = () => {
    setFormLoader(true);
    CommonServices.empBirthday()
      .then((res) => {
        if (res.status === 200) {
          setData(res?.data?.data);
          setFormLoader(false);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
          setData([]);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setFormLoader(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("getbday error", err);
      });
  };

  useEffect(() => {
    if (location === "Employees-Birthday") {
      EmplpyeeBday();
    } else {
      getAllHrTeamLeadMangar();
    }
  }, []);
  // navigate emp view
  const detailEmployee = (data) => {
    let id = data?.id;
    navigate(`/employees/${id}`);
  };

  let columns;

  if (location === "Employees-Birthday") {
    columns = [
      {
        field: "id",
        headerName: "No.",
        filterable: false,
        width: 70,
        headerClassName: "super-app-theme--header",
        renderCell: (params) =>
          params.api.getAllRowIds().indexOf(params.id) + 1,
      },
      {
        field: "profile_image",
        headerName: "Profile ",
        headerClassName: "super-app-theme--header",
        flex: 1,
        options: { filter: true },
        renderCell: (params) => (
          <Avatar
            alt="Profile Image"
            src={ImagePath(params?.row?.user_meta?.profile_image)}
            sx={{ width: 40, height: 40 }}
          />
        ),
      },
      {
        field: "name",
        headerName: "Name",
        headerClassName: "super-app-theme--header",
        flex: 1,
        options: { filter: true },
      },
      {
        field: "email",
        headerName: "Email",
        headerClassName: "super-app-theme--header",
        width: 200,
        options: { filter: true },
      },
      {
        field: "birthday",
        headerName: "Birth Date",
        headerClassName: "super-app-theme--header",
        flex: 1,
        options: { filter: true },
      },

      {
        field: "days_left",
        headerName: "Days Left",
        headerClassName: "super-app-theme--header",
        flex: 1,
        options: { filter: true },
        renderCell: (params) => <>{params.value} days</>,
      },
      {
        field: "action",
        headerName: "Action",
        headerClassName: "super-app-theme--header",
        type: "actions",
        getActions: (params) => {
          return [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="View"
              color="inherit"
              onClick={() => detailEmployee(params?.row)}
            />,
          ];
        },
        flex: 1,
      },
    ];
  } else {
    columns = [
      {
        field: "id",
        headerName: "No.",
        filterable: false,
        width: 100,
        headerClassName: "super-app-theme--header",
        renderCell: (params) =>
          params.api.getAllRowIds().indexOf(params.id) + 1,
      },
      {
        field: "profile_image",
        headerName: "Profile ",
        headerClassName: "super-app-theme--header",
        width: 100,
        options: { filter: true },
        renderCell: (params) => (
          <Avatar
            alt="Profile Image"
            src={apiURL + params?.row?.user_meta?.profile_image}
            sx={{ width: 40, height: 40 }}
          />
        ),
      },
      {
        field: "name",
        headerName: "Name",
        headerClassName: "super-app-theme--header",
        flex: 1,
        options: { filter: true },
      },
      {
        field: "email",
        headerName: "Email",
        headerClassName: "super-app-theme--header",
        flex: 1,
        options: { filter: true },
      },
      {
        field: "joindate",
        headerName: "Joindate",
        headerClassName: "super-app-theme--header",
        width: 120,
        options: { filter: true },
        valueGetter: (params) => params.row.user_meta?.joining_date,
      },
      {
        field: "designation_name",
        headerName: "Designation Name",
        headerClassName: "super-app-theme--header",
        flex: 1,
        options: { filter: true },
        valueGetter: (params) =>
          params?.row?.user_meta?.designation?.designation_name,
      },
    ];
  }

  return (
    <>
      <Box>
        <DatagridHeader
          name={
            location === "hr"
              ? "Human resources (Hr)"
              : location === "team-leaders"
              ? " Team Leaders"
              : location === "team-managers"
              ? " Team Members"
              : "Upcoming 6 Months Birthdays"
          }
        ></DatagridHeader>
      </Box>
      <Box style={{}}>
        <CustDataGrid data={data} columns={columns} loading={formLoader} />
      </Box>
    </>
  );
}

export default HrTeamLeadMangar;
