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
import AddEmployee from "./add-employees/addEmployee";
import EditEmployee from "./edit-employees/editEmployee";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import EmployeServices from "../../services/EmployeServices";
import { ToastContainer, toast } from "react-toastify";
import { Searching } from "../../components/Searching";
import { CustomPagination } from "../../components/CustomPagination";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { allDesignations } from "../../helperApis/HelperApis";
// import CsvUploadBtn from "../../components/Buttons/CsvUploadBtn";

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [searchFlag, setSearchFlag] = useState(false);
  const [getDesig, setGetDesig] = useState([]);
  const [csvFile, setCsvFile] = useState();

  const apiURL = `${process.env.REACT_APP_API_BASE_URL}/`;

  // api integration --------------------------------
  // get all employees ----------------------------
  const [getEmployees, setGetEmployees] = useState([]);
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
  const getAllDesignationFn = async () => {
    try {
      const result = await allDesignations();
      // console.log(result)
      setGetDesig(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  useEffect(() => {
    getAllEmployees();
    getAllDesignationFn();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getAllEmployees();
    // eslint-disable-next-line
  }, [page]);
  //  end get all employees---------------------------------------
  // delete emolpyees--------------------------------
  const [delete_id, setDelete_id] = useState({});
  const handleDeleteClick = (id) => () => {
    handleDeleteOpen();
    setDelete_id(() => id);
    console.log("delete", delete_id);
  };
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
  // end delete emolpyees --------------------------------
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
          console.log("getemployee if", res);
          setGetEmployees([]);
        }
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("getAllEmployees", err);
      });
  };

  const [employeeData, SetEmployeeData] = useState({});
  const handleEditClick = (data) => () => {
    SetEmployeeData(data);
    handleEditOpen();
  };
  // end api intefration ---------------------------

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

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
    // setVewData(()=>data)
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
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      type: "actions",
      getActions: (params) => {
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
            onClick={handleDeleteClick(params?.id)}
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
    },
  ];

  return (
    <>
      <ToastContainer />

      <Container style={{ padding: 0 }}>
        <Box>
          <DatagridHeader name={"Employees"} handleOpen={handleOpen}>
            <Box sx={{ marginLeft: "10px" }}>
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
            </Box>
            <Box>
              <AddButton variant="contained" onClick={handleOpen}>
                Add Fields
              </AddButton>
            </Box>
            {/* <Box>
              <CsvUploadBtn setCsvFile={setCsvFile} handleConfirmOpne={handleConfirmOpne} />
                </Box> */}
          </DatagridHeader>

          {searchFlag && searchFlag === true && (
            <Searching
              fieldLable={["Employee Id", "Employee Name"]}
              filedName={["employee_id", "employee_name"]}
              getDesig={getDesig}
              apiFun={searchEmployee}
            />
          )}

          <CommonModal isOpen={open} isClose={handleClose}>
            <AddEmployee
              handleClose={handleClose}
              getAllEmployees={getAllEmployees}
            />
          </CommonModal>

          <CustDataGrid
            data={getEmployees}
            loading={formLoader}
            columns={columns}
            // totalPages={totalPages}
            setPage={setPage}
          />
        </Box>
      </Container>
      <CommonModal isOpen={editopen} isClose={handleEditClose}>
        <EditEmployee
          handleEditClose={handleEditClose}
          getAllEmployees={getAllEmployees}
          data={employeeData}
        />
      </CommonModal>
      <DltndConf
        title="Delete Employee"
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
        loading={loading}
        open={deleteopen}
      />
      {totalPages && totalPages >= 2 && (
        <div style={{ width: "100%", marginTop: "10px", background: "white" }}>
          <CustomPagination totalPages={totalPages} setPage={setPage} />
        </div>
      )}

      {/* confirm modal*/}
      <DltndConf
        title="Csv Upload"
        btnName="Confirm"
        handleClose={handleConfirmClose}
        // handleDelete={handleDelete}
        message={`Are you sure want to upload  ${csvFile?.name}`}
        loading={loading}
        open={confirm}
      />
    </>
  );
};

export default Employees;
