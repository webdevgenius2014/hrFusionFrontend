import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CustomPagination } from "../../components/CustomPagination";
import BeatLoader from "react-spinners/ClipLoader";
import CommonModal from "../../components/modal/commonModal";
import Button from "@mui/material/Button";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import ProjectForm from "./ProjectForm";
import SearchIcon from "@mui/icons-material/Search";
import EmployeServices from "../../services/EmployeServices";
import ProjectServices from "../../services/ProjectServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ClientsServices from "../../services/ClientsServices";
import "react-toastify/dist/ReactToastify.css";
import { ProjectCard } from "./ProjectCard";
import { Searching } from "../../components/Searching";
import { DeleteDilagBox } from "../../components/modal/DeleteModal";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import CommonServices from '../../services/CommonServices'
import {allLeads,allClients,allEmployees } from "../../helperApis/HelperApis";
const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState('1');
  const [searchFlag, setSearchFlag] = useState(false);
  const [noRecord, setNoRecord] = useState();

  // api integration -----------------------------------
  // all clients =------------------------------------------
  const [getClients, setgetClients] = useState([]);
  const getAllClients = async () => {
    try {
      const result = await allClients();
      // console.log(result);
      setgetClients(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // all employess ------------
  // get all employees ----------------------------
  const [getEmployees, setGetEmployees] = useState([]);
  const getAllEmployees = async () => {
    try {
      const result = await allEmployees();
      setGetEmployees(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // add Projects-------------------------------------
  const addProjects = (data) => {
    setLoading(true);
    ProjectServices.addProjects(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          getProjectsFn();
          toast.success(res?.data?.message);
          handleClose();
        }
        if (res.status === 403) {
          setServerError(res?.data);
          setLoading(false);
        }
        if(res.status === 401){
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
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
        // console.log(res.data.data.data)
        if (res.status === 200  && res?.data?.success=== true) {
          setTotalPages(() => res?.data?.data?.last_page);
          setGetProj(res?.data?.data?.data);
          setLoading(false); 
        } 
        if (res?.status=== 200 && res?.data?.success=== false) {
          setLoading(false);
          setGetProj([]);
          setNoRecord(res?.data?.message);
        }
        if (res.status === 404) {
          setNoRecord(res?.data?.message);
          setLoading(false);
        }
        if(res.status === 401){
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("getProjects error", err);
      });
  };
  useEffect(() => {
    getProjectsFn();
    getAllClients();
    getAllLeads();
    getAllEmployees();
  }, []);
  useEffect(() => {
    getProjectsFn();
  }, [page]);

  // end get  all Projrect -------------------------------
  // all teamleads -------------------------------
  const [getTeamlead, setGetTeamlead] = useState([]);
  const getAllLeads = async () => {
    try {
      const result = await allLeads();
      setGetTeamlead(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };

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
        if (res.data.success === true) {
          setLoading(false);
          handleEditClose();
          getProjectsFn();
          toast.success(res.data.message);
        }
        if (res.status === 403) {
          setServerError(res.data);
          setLoading(false);
        }
        if(res.status === 401){
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
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
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success("Project deleted successfully");
          getProjectsFn();
        } else if (res.status === 401) {
          navigate("/");
          setLoading(false);

          toast.error("please login again");
        }
        if (res.status === 403) {
          setLoading(false);

          toast.error(res.data.message);
        }
        if(res.status === 401){
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("delete Project error: ", err);
        setLoading(false);
      });
  };

  // end deleteProjectartment ------------
  // search project ---------------------
  const [searchPage,setSearchPage]=useState()
  const searchProject = (payload) => {
    setLoading(true);
    ProjectServices.searchProjects(payload)
      .then((res) => {
        console.log(res)
        if (res.status === 200 && res?.data?.success=== true)  {
          setGetProj(res?.data?.data);
          setSearchPage(() => res?.data?.data?.last_page);
          console.log(res?.data)
          setLoading(false);
        } 
        if (res?.status=== 200 && res?.data?.success=== false) {
          loading(false);
          // setGetProj([]);
          setNoRecord(res?.data?.message);
        }
        if (res.status === 404) {
          setNoRecord(res.data.message);
          setLoading(false);
        }
        if(res.status === 401){
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("searchProjects error", err);
      });
  };

  //---- end api ------------------

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

  return (
    <>
      
      {/*  display header and search  */}

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
                    setSerchBtn(true);
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
                    handleSearchClose();
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
          {searchFlag && searchFlag === true && (
            <Searching
              fieldLable={["Project Name", "Client Name", "Team Member"]}
              filedName={["project_name", "client_name", "member_name"]}
              apiFun={searchProject}
            />
          )}
        </Box>
      </Container>
      {/*  display card */}
      <Box
        maxWidth="sm"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          
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
        ) : loading === true ? (
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
          <p>{noRecord}</p>
        )}
      </Box>
      {/*  add modal */}
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
            apiFun={addProjects}
            serverError={serverError}
            clientsData={getClients}
            employeesData={getEmployees}
            getTeamlead={getTeamlead}
            btnName={"Save"}
          />
        </Box>
      </CommonModal>
      {/* edit  modal */}

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
            apiFun={handleEdit}
            projectData={projectData}
            serverError={serverError}
            clientsData={getClients}
            employeesData={getEmployees}
            getTeamlead={getTeamlead}
            btnName={"Save Changes "}
          />
        </Box>
      </CommonModal>
      {/* delete  component */}

      <DeleteDilagBox
        title="Delete Project"
        handleDeleteClose={handleDeleteClose}
        handleDelete={handleDelete}
        loading={loading}
        deleteopen={deleteopen}
      />
      {/* pagination */}

      {totalPages && totalPages>=2 && (
        <div style={{ width: "100%", marginTop: "10px", background: "white" }}>
          <CustomPagination totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </>
  );
};
export default Projects;
