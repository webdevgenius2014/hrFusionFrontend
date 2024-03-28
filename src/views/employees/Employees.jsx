/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import CommonModal from "../../components/modal/commonModal";
import { AddButton, Buttons } from "../../components/Buttons/AllButtons";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EmployeesForm from "./EmployeeForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import EmployeServices from "../../services/EmployeServices";
import { toast } from "react-toastify";
import { Searching } from "../../components/Searching";
import { CustomPagination } from "../../components/CustomPagination";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { DemoCsv } from "../../helperFunctions/HelperFunction";
import { useSelector } from "react-redux";
import { superAdminData } from "../../redux/SuperAdminSlice";
import CsvUploadBtn from "../../components/Buttons/CsvUploadBtn";
import {
  getAllDepartmentfn,
  allRoles,
  desByDep,
  allDocList,
} from "../../helperApis/HelperApis";

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/`;

  // user Role
  const userData = useSelector(superAdminData);
  const userRole = React.useMemo(
    () => userData?.payload?.SuperAdmin?.role?.role,
    [userData]
  );

  const [loading, setLoading] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [searchFlag, setSearchFlag] = useState(false);
  const [csvFile, setCsvFile] = useState();
  const [serverError, setServerError] = useState();

  const [addDesignation_id, setAddDesignation_id] = useState("");
  const [addDepartment_id, setAddDepartment_id] = useState("");
  const [addRole, setAddRole] = useState("");

  // api data
  const [getRole, setRole] = useState([]);
  const [getdep, setGetdep] = useState([]);
  const [getDocType, setGetDocType] = useState([]);
  const [getDesig, setGetDesig] = useState([]);
  const [getEmployees, setGetEmployees] = useState([]);
  const [delete_id, setDelete_id] = useState({});
  const [employeeData, SetEmployeeData] = useState({});

  // designation by department
  const desByDepFn = async (payload) => {
    try {
      const result = await desByDep(payload);
      setGetDesig(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // get roles ---------------------------------------------------
  const getAllRole = async () => {
    try {
      const result = await allRoles();
      setRole(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  //get All Departments ------------------------
  const getAllDepartmentsFn = async () => {
    try {
      const result = await getAllDepartmentfn();
      setGetdep(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // get all documentTypes --------------------------------
  const allDocTypeFn = async () => {
    try {
      const result = await allDocList();
      setGetDocType(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };

  // get all employees ----------------------------
  const getAllEmployees = () => {
    setFormLoader(true);
    EmployeServices.getEmployee(page)
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setGetEmployees(() => res?.data?.data?.data);
          setTotalPages(res?.data?.data?.last_page);
          setFormLoader(false);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
          setGetEmployees([]);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setFormLoader(false);
        // Log any errors that occur during the request
        console.log("getAllEmployees", err);
      });
  };
  // add employee --------------------------------
  const addEmployees = (data) => {
    setLoading(true);
    let payload = {
      ...data,
      designation: addDesignation_id,
      email: data.useremail,
      department: addDepartment_id,
      role: addRole,
    };
    EmployeServices.addEmployee(payload)
      .then((res) => {
        if (res?.status === 200) {
          toast.success(res.data?.message);
          getAllEmployees();
          setLoading(false);
          handleClose();
        }
        if (res.status === 403) {
          setServerError(() => res?.data?.errors);
          setLoading(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("add employee", err);
      });
  };
  // Edit employee --------------------------------
  const handleEditEmployee = (formData) => {
    setLoading(true);
    console.log(formData);
    let payload = {
      id: employeeData?.id,
      ...formData,
      email: formData?.useremail || employeeData?.row?.user_meta,
      designation: addDesignation_id,
      department: addDepartment_id,
      role: addRole || employeeData?.row?.user_role.id,
    };
    console.log(formData);
    EmployeServices.editEmployee(payload)
      .then((res) => {
        if (res.status === 200) {
          handleEditClose();
          toast.success(res.data.message);
          EmployeServices.getEmployee();
          setLoading(false);
        }
        if (res.status === 403) {
          setLoading(false);
          setServerError(res.data.errors);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("edit employee error", err);
      });
  };
  // delete emolpyees--------------------------------

  const handleDelete = () => {
    setLoading(true);
    EmployeServices.deleteEmployee({ id: delete_id })
      .then((res) => {
        if (res.status === 200) {
          getAllEmployees();
          console.log(res?.data?.message);
          toast.success(res?.data?.message);
          setLoading(false);
          handleDeleteClose();
        }
        if (res.status === 403) {
          toast.error(res?.data?.error);
          setLoading(false);
        }
        if (res.status === 401) {
          toast.error(res?.data?.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("handleDeleteeEmployees", err);
        setLoading(false);
      });
  };
  // search employees -----------------------------
  const searchEmployee = (data) => {
    setFormLoader(true);
    console.log("search payload:", data);
    let payload = { ...data };
    EmployeServices.searchEmployee(payload)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setTotalPages(res?.data?.data?.last_page);
          setGetEmployees(() => res?.data?.data);
          setFormLoader(false);
        } else {
          setFormLoader(false);
          setGetEmployees([]);
        }
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("serch Employees", err);
      });
  };
  // csv Upload api -------------------------
  const csvUpload = () => {
    setLoading(true);
    EmployeServices.uploadEmployeeCSV({ csv: csvFile })
      .then((res) => {
        if (res?.data?.success === true) {
          setLoading(false);
          handleConfirmClose();
          getAllEmployees();
          toast.success(res?.data?.message);
        } else if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        } else if (res.status === 403) {
          toast.error("Unable to upload Employee Csv file");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("SearchClients error", err);
      });
  };

  const handleEditClick = (data) => () => {
    setAddDesignation_id(data?.row?.user_meta?.designation_id);
    setAddDepartment_id(data?.row?.user_meta?.department_id);
    if (data?.row?.user_meta) {
      desByDepFn({ department_id: data?.row?.user_meta?.department_id });
    }
    SetEmployeeData(data);
    handleEditOpen();
  };

  const handleChangeDep = (id) => {
    setAddDepartment_id(() => id);
    desByDepFn({ department_id: id });
  };
  // end api intefration ---------------------------

  useEffect(() => {
    getAllEmployees();
    getAllDepartmentsFn();
    getAllRole();
    allDocTypeFn();
  }, []);

  useEffect(() => {
    getAllEmployees();
  }, [page]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setServerError(null);
  };

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    setServerError(null);
  };

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleSearchClose = () => setSearchFlag(false);
  const handleSearchOpen = () => setSearchFlag(true);

  const [confirm, setConfirm] = useState(false);
  const handleConfirmOpne = () => setConfirm(true);
  const handleConfirmClose = () => setConfirm(false);

  const [srchbtn, setSerchBtn] = useState(false);
  const detailEmployee = (data) => {
    let id = data.id;
    navigate(`/employees/${id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "No.",
      filterable: false,
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
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
      flex: 1,
      options: { filter: true },
      valueGetter: (params) => params.row.user_meta?.joining_date,
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
      valueGetter: (params) => params?.row?.user_role?.role,
    },
  ];
  if (userRole === "Admin" || userRole === "HR") {
    columns.push({
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      type: "actions",
      getActions: (params) => {
        let id= params.id;
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={()=>{handleDeleteOpen(); setDelete_id( id)}}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            color="inherit"
            onClick={() => detailEmployee(params?.row)}
          />,
        ];
      },
      flex: 1,
    });
  }

  return (
    <>
      <Container style={{ padding: 0 }}>
        <DatagridHeader name={"Employees"} >
          <Box sx={{ display: "flex" }}>
            {!srchbtn ? (
              <Buttons
                sx={{ margin: 0, height: "auto", padding: "0 16px 0 16px" }}
                onClick={() => {
                  handleSearchOpen(true);
                  setSerchBtn(true);
                }}
                startIcon={<SearchIcon />}
                variant="contained"
              >
                Search
              </Buttons>
            ) : (
              <Buttons
                onClick={() => {
                  getAllEmployees();
                  setSerchBtn(false);
                  handleSearchClose();
                }}
                variant="contained"
              >
                Clear
              </Buttons>
            )}
            {userRole === "Admin" || userRole === "HR" ? (
              <Box>
                {
                  <Box sx={{ display: "flex", marginLeft: "5px" }}>
                    <Box>
                      <AddButton variant="contained" onClick={handleOpen}>
                        Add
                      </AddButton>
                    </Box>
                    <Box sx={{ marginLeft: "5px" }}>
                      <CsvUploadBtn
                        setCsvFile={setCsvFile}
                        handleConfirmOpne={handleConfirmOpne}
                      />
                    </Box>
                    <Box sx={{ marginLeft: "5px" }}>
                      <Buttons
                        variant="contained"
                        onClick={() => DemoCsv("download/EmployeeCsv.csv")}
                      >
                        Demo Csv
                      </Buttons>
                    </Box>
                  </Box>
                }
              </Box>
            ) : null}
          </Box>
        </DatagridHeader>

        {searchFlag && searchFlag === true && (
          <Searching
            fieldLable={["Employee Id", "Employee Name"]}
            filedName={["employee_id", "employee_name"]}
            getDesig={getDesig}
            apiFun={searchEmployee}
            date='true'
          />
        )}

        <CustDataGrid
          data={getEmployees}
          loading={formLoader}
          columns={columns}
          // totalPages={totalPages}
          setPage={setPage}
        />
      </Container>
      {userRole !== "Team Leader" && (
        <>
          <CommonModal
            isOpen={open || editopen}
            isClose={open ? handleClose : handleEditClose}
            title={editopen ? "Edit Employee" : "Add Employee"}
          >
            <EmployeesForm
              data={editopen ? employeeData : null}
              getdep={getdep}
              getRole={getRole}
              getDesig={getDesig}
              getDocType={getDocType}
              handleChangeDep={handleChangeDep}
              handleChangeRole={(id) => setAddRole(id)}
              handleChangeDesig={(id) => setAddDesignation_id(id)}
              apiFunc={editopen ? handleEditEmployee : addEmployees}
              serverError={serverError}
              btnName={editopen ? "Save Changes" : "Save"}
              desByDepFn={desByDepFn}
              loading={loading}
              editForm={editopen}
            />
          </CommonModal>

          <DltndConf
            open={ deleteopen}
            title={"Delete Employee"}
            handleClose={ handleDeleteClose }
            handleDelete={ handleDelete }
            btnName={"Delete"}
            loading={loading}
          />
          {/* confirm modal*/}
          <DltndConf
            open={confirm}
            title={"Csv Upload"}
            handleClose={handleConfirmClose}
            handleDelete={csvUpload}
            message={`Are you sure want to upload  ${csvFile?.name}`}
            btnName={"Confirm"}
            loading={loading}
          />
        </>
      )}

      {totalPages && totalPages >= 2 && (
        <div style={{ width: "100%", marginTop: "10px", background: "white" }}>
          <CustomPagination totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </>
  );
};

export default Employees;
