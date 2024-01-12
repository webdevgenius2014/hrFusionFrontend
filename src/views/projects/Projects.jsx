import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { CustomPagination } from "../../components/PaginationMui";
import { styled } from "@mui/material/styles";
import BeatLoader from "react-spinners/ClipLoader";
import CommonModal from "../../components/commonModal";
import Button from "@mui/material/Button";
import { DatagridHeader } from "../../components/DatagridHeader";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { CustDataGrid } from "../../components/form-components/CustDataGrid";
import ProjectForm from "./ProjectForm";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EmployeServices from "../../services/EmployeServices";
import ProjectServices from "../../services/ProjectServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ClientsServices from "../../services/ClientsServices";
import "react-toastify/dist/ReactToastify.css";
import { ProjectCard } from "./ProjectCard";
import { Searching } from "../../components/Searching";

const Projects = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [searchFlag, setSearchFlag] = useState(false);
  const  [record,setRecord]=useState();


  // api integration -----------------------------------
  // all clients =------------------------------------------
  const [getClients, setgetClients] = useState([]);
  const getClientsfn = () => {
    setLoading(true);
    ClientsServices.getClients()
      .then((res) => {
        // console.log(res.data.data.data)
        if (res) {
          setgetClients(res?.data?.data?.data);
          setTotalPages(res?.data?.data?.last_page);
          setLoading(false);
        } else {
          loading(false);
          setgetClients([]);
        }
        if (res.status === 403) {
          console.log("first");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("getClients error", err);
      });
  };
  // all employess ------------
  // get all employees ----------------------------
  const [getEmployees, setGetEmployees] = useState([]);
  const getAllEmployees = () => {
    setLoading(true);
    EmployeServices.getEmployee()
      .then((res) => {
        if (res.status == 200) {
          setGetEmployees(() => res.data.data.data);
          setLoading(false);
        } else {
          setLoading(false);
          console.log("getemployee if", res);
          setGetEmployees([]);
        }
      })
      .catch((err) => {
        // Log any errors that occur during the request
        console.log("getAllEmployees", err);
      });
  };
  // add Projects-------------------------------------
  const addProjects = (data) => {
    setLoading(true);
    ProjectServices.addProjects(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          getProjectsFn();
          toast.success(res.data.message);
          handleClose();
        }
        if (res.status == 403) {
          setServerError(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("addProjects error: " + err);
      });
  };

  //---- end add Project  --------------------------------------------------------
  // get all Project --------------------------------
  const [getProjects, setGetProj] = useState([]);
  const getProjectsFn = () => {
    setLoading(true);
    ProjectServices.getProjects(page)
      .then((res) => {
        if (res.status === 200) {
          setTotalPages(() => res?.data?.data?.last_page);
          setGetProj(res?.data?.data?.data);
          setLoading(false);
        } else {
          loading(false);
          setGetProj([]);
          setRecord(res?.data?.message)
        }
        if (res.status === 404) {
          setRecord(res.data.message)
        setLoading(false);
      }
      })
      .catch((err) => {
        console.log("getProjects error", err);
      });
  };
  useEffect(() => {
    getProjectsFn();
    getClientsfn();
    getAllEmployees();
  }, []);
  useEffect(() => {
    getProjectsFn();
  }, [page]);

  // end get  all Projrect -------------------------------
  // edit Project -------------------------------
  const [proj_id, setprojId] = useState();
  const [projectData, setProjectData] = useState();

  const handleEditProject = (id, projectData) => {
    // console.log(id, projectData);
    setprojId(id);
    setProjectData(() => projectData);
    handleEditOpen();
  };

  const handleEdit = (data) => {
    console.log(data);
    let payload = { ...data, id: proj_id };
    console.log(payload);
    setLoading(true);
    ProjectServices.editProjects(payload)
      .then((res) => {
        if (res.data.success == true) {
          setLoading(false);
          handleEditClose();
          getProjectsFn();
          toast.success(res.data.message);
        }
        if (res.status == 403) {
          setServerError(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("editProject error: " + err);
      });
  };

  // end edit project -------------------------------
  // delete project -------------------------------
  const [deleteProject, setDeleteProj] = useState();
  const handleDeleteClick = (id) => {
    setDeleteProj(id);
    handleDeleteOpen();
  };
  const handleDelete = (e) => {
    let id = { id: deleteProject };
    setLoading(true);
    e.preventDefault();
    ProjectServices.deleteProjects(id)
      .then((res) => {
        if (res.status == 200 || res.status == 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success("Project deleted successfully");
          getProjectsFn();
        } else if (res.status == 401) {
          navigate("/");
          setLoading(false);

          toast.error("please login again");
        }
        if (res.status == 403) {
          setLoading(false);

          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("delete Project error: ", err);
        setLoading(false);
      });
  };

  // end deleteProjectartment ------------
  // search project ---------------------

  const searchProject = (payload) => {
    setLoading(true);
    setSerchBtn(true);
    ProjectServices.searchProjects(payload)
      .then((res) => {
        if (res) {
          setGetProj(res?.data?.data);
          setLoading(false);
          handleSearchClose()
        } else {
          loading(false);
          // setGetProj([]);
          setRecord(res?.data?.message)
          handleSearchClose()
        }
        if (res.status === 404) {
          setRecord(res.data.message)
        setLoading(false);
      }
      })
      .catch((err) => {
        console.log("searchProjects error", err);
      });
  };

  //---- end api ------------------

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
  }));

  const columns = [
    // {  headerName: "ID", width: 100, options: { filter: true } },
    {
      field: "id",
      headerName: "No.",
      filterable: false,
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "project_name",
      headerName: "Project Name",
      headerClassName: "super-app-theme--header",
      width: 150,
      options: { filter: true },
    },
    {
      field: "client_name",
      headerName: "Client Name",
      headerClassName: "super-app-theme--header",
      width: 100,
      options: { filter: true },
    },
    {
      field: "team_members",
      headerClassName: "super-app-theme--header",
      headerName: "Team Members",
      width: 250,
      options: { filter: true },
    },
    {
      field: "payment_status",
      headerClassName: "super-app-theme--header",
      headerName: "Payment Status",
      width: 148,
      options: { filter: true },
    },
    {
      field: "action",
      headerClassName: "super-app-theme--header",
      headerName: "Action",
      type: "actions",
      getActions: (params) => {
        // let id=params?.id
        // console.log("prams",params)
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClickCapture={() => {
              handleEditProject(params?.id, params?.row);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              handleDeleteClick(params?.id);
            }}
            color="inherit"
          />,
        ];
      },
      width: 225,
    },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleSearchOpen = () => setSearchFlag(true);
  const handleSearchClose = () => setSearchFlag(false);

  const [srchbtn, setSerchBtn] = useState(false);

  const styles = {
    backgroundColor: "white",
  };
  return (
    <>
      <ToastContainer />
      <Container style={{ padding: 0 }}>
        <Box>
          <DatagridHeader
            name={"Projects"}
            handleOpen={handleOpen}
            toggle={handleSearchOpen}
          >
            <>
              {!srchbtn ? (
                <Button
                  onClick={() => {
                    handleSearchOpen(true);
                  }}
                  startIcon={<SearchIcon />}
                  variant="contained"
                >
                  Search
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    getProjectsFn();
                    setSerchBtn(false);
                  }}
                  variant="contained"
                >
                  Clear
                </Button>
              )}

              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={handleOpen}
              >
                Add
              </Button>
            </>
          </DatagridHeader>
          {searchFlag && searchFlag == true && (
            <CommonModal
              isOpen={searchFlag}
              noValidate
              isClose={handleSearchClose}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ marginBottom: "20px", fontWeight: "600" }}
              >
                Search Client
              </Typography>
              <Box
                sx={{
                  mb: 2,
                  width: "230px",
                  display: "flex",

                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <Searching
                  fieldLable={["Project Name"]}
                  filedName={["project_name"]}
                  apiFun={searchProject}
                />
              </Box>
            </CommonModal>
          )}
          <CommonModal isOpen={open} isClose={handleClose}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "20px", fontWeight: "600" }}
            >
              Add Projects
            </Typography>
            <Box
              sx={{
                mb: 2,
                width: 800,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                overflowY: "scroll",
              }}
            >
              <ProjectForm
                apiFunc={addProjects}
                serverError={serverError}
                clientsData={getClients}
                employeesData={getEmployees}
                BtnName={"Save"}
              />
            </Box>
          </CommonModal>
          <box
            maxWidth="sm"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "space-around",
            }}
          >
            {getProjects && getProjects?.length > 0 ? (
              getProjects?.map((i) => {
                return (
                  <ProjectCard
                    data={i}
                    handleEditProject={handleEditProject}
                    handleDeleteClick={handleDeleteClick}
                    key={i.id}
                  />
                );
              })
            ) : loading == true ? (
              <BeatLoader
                color="#2d94cb"
                cssOverride={{
                  position: "absolute",
                  display: "block",
                  top: "45%",
                  left: "55%",
                  transform: "translate(-50%, -50%)",
                }}
                loading
                margin={4}
                size={90}
              />
            ) : (
              <p>{record}</p>
            )}
          </box>
         {  getProjects &&  getProjects.length>0 && <div
            style={{ width: "100%", marginTop: "10px", background: "white" }}
          >
            <CustomPagination totalPages={totalPages} setPage={setPage} />
          </div>}
        </Box>
      </Container>
      <CommonModal isOpen={editopen} noValidate isClose={handleEditClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Edit Projects
        </Typography>
        <Box
          sx={{
            mb: 2,
            width: 800,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <ProjectForm
            apiFunc={handleEdit}
            projectData={projectData}
            serverError={serverError}
            clientsData={getClients}
            employeesData={getEmployees}
            BtnName={"Save Changes "}
          />
        </Box>
      </CommonModal>

      <CommonModal isOpen={deleteopen} isClose={handleDeleteClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Delete Project
        </Typography>
        <p>Are you sure want to delete?</p>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "13px", marginRight: "13px" }}
            onClick={handleDelete}
          >
            {loading ? <>Loading..</> : <>Delete</>}
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "13px" }}
            onClick={handleDeleteClose}
          >
            Cancel
          </Button>
        </Box>
      </CommonModal>
    </>
  );
};
export default Projects;
