/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState,useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CustomPagination } from "../../components/CustomPagination";
import CommonModal from "../../components/modal/commonModal";
import { AddButton, Buttons } from "../../components/Buttons/AllButtons";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import Typography from "@mui/material/Typography";
import ProjectForm from "./ProjectForm";
import SearchIcon from "@mui/icons-material/Search";
import ProjectServices from "../../services/ProjectServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectCard } from "./ProjectCard";
import { Searching } from "../../components/Searching";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import {useSelector  } from "react-redux";
import {superAdminData} from "../../redux/SuperAdminSlice";
import {
  HrTeamLeadMangarapi,
  allClients,
  allEmployees,
} from "../../helperApis/HelperApis";
import Loader from "../../components/Loader"; 
const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(superAdminData);
  const userRole = useMemo(() => userData?.payload?.SuperAdmin?.role?.role, [userData]);

  const [serverError, setServerError] = useState();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState("1");
  const [noRecord, setNoRecord] = useState();

  // api states
  const [getClients, setgetClients] = useState([]);
  const [getProjects, setGetProj] = useState([]);
  const [getEmployees, setGetEmployees] = useState([]);
  const [getTeamlead, setGetTeamlead] = useState([]);
  const [projectData, setProjectData] = useState();
  const [deleteProject, setDeleteProj] = useState();

  // all clients =------------------------------------------
  const getAllClients = async () => {
    try {
      const result = await allClients();
      setgetClients(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // get all employees ----------------------------
  const getAllEmployees = async () => {
    try {
      const result = await allEmployees();
      setGetEmployees(result);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // all teamLeads -------------------------------
  const getAllLeads = async () => {
    try {
      const result = await HrTeamLeadMangarapi();
      setGetTeamlead(result?.data?.data);
    } catch (error) {
      console.log("getAllDepartmentsFn", error);
    }
  };
  // get all Project --------------------------------
  const getProjectsFn = () => {
    setLoading(true);
    ProjectServices.getProjects(page)
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setTotalPages(() => res?.data?.data?.last_page);
          setGetProj(res?.data?.data?.data);
          setLoading(false);
        }
        if (res?.status === 200 && res?.data?.success === false) {
          setLoading(false);
          setGetProj([]);
          setNoRecord(res?.data?.message);
        }
        if (res.status === 404) {
          setNoRecord(res?.data?.message);
          setLoading(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("getProjects error", err);
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
          toast.success(res?.data?.message);
          handleClose();
        }
        if (res.status === 403) {
          setServerError(res?.data);
          setLoading(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("addProjects error: " + err);
      });
  };
  // edit Project -------------------------------
  const handleEdit = (data) => {
    let payload = { ...data, id: projectData?.id };
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
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("editProject error: " + err);
      });
  };
  // delete project -------------------------------
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
        if (res.status === 401) {
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
  // search project ---------------------
  const searchProject = (payload) => {
    setLoading(true);
    ProjectServices.searchProjects(payload)
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setGetProj(res?.data?.data);
          console.log(res?.data);
          setLoading(false);
        }
        if (res?.status === 200 && res?.data?.success === false) {
          loading(false);
          // setGetProj([]);
          setNoRecord(res?.data?.message);
        }
        if (res.status === 404) {
          setNoRecord(res.data.message);
          setLoading(false);
        }
        if (res.status === 401) {
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
  // edit click
  const handleEditProject = (projectData) => {
    setProjectData(() => projectData);
    handleEditOpen();
  };
  // delete click
  const handleDeleteClick = (id) => {
    setDeleteProj(id);
    handleDeleteOpen();
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const [searchFlag, setSearchFlag] = useState(false);
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
                <Buttons
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
                    getProjectsFn();
                    setSerchBtn(false);
                    handleSearchClose();
                  }}
                  variant="contained"
                >
                  Clear
                </Buttons>
              )}
                { userRole === 'Admin' || userRole === 'HR' ?
                <AddButton onClick={handleOpen}>Add</AddButton> : null
                }  
             
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
            <Loader/>
        ) : (
          <p>{noRecord}</p>
        )}
      </Box>

      {/*  add/edit modal */}
      <CommonModal isOpen={open || editopen} isClose={open ? handleClose : handleEditClose}
      title = {open ? "Add Projects" : "Edit Projects"}>
    
        <ProjectForm
          apiFun={open ? addProjects : handleEdit}
          projectData={editopen ? projectData : undefined}
          serverError={serverError}
          clientsData={getClients}
          employeesData={getEmployees}
          getTeamlead={getTeamlead}
          btnName={open ? "Save" : "Save Changes"}
        />
     
      </CommonModal>
    
      {/* delete  component */}
      <DltndConf
        title="Delete Project"
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
        loading={loading}
        open={deleteopen}
      />

      {/* pagination */}
      {totalPages && totalPages >= 2 && (
        <div style={{ width: "100%", marginTop: "10px", background: "white" }}>
          <CustomPagination totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </>
  );
};
export default Projects;
