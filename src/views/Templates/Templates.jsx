import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CommonModal from "../../components/modal/commonModal";
import Loader from "../../components/Loader";
import Typography from "@mui/material/Typography";
import { AddButton } from "../../components/Buttons/AllButtons";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import { useNavigate } from "react-router-dom";
import TemplateServices from "../../services/TemplateServices";
import TemplateCard from "./TemplateCard";
import { toast } from "react-toastify";
import TemplateForm from "./TemplateForm";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { CustomPagination } from "../../components/CustomPagination";
import { useDispatch } from "react-redux";
import { superAdminLogout } from "../../redux/SuperAdminSlice";


const Templates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [page, setPage] = useState(1);
  const [noRecord, setNoRecord] = useState();
  const [serverErr, setServerErr] = useState();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  // api states
  const [templData, setTemplData] = useState();
  const [editTempData, setEditTempData] = useState();
  const [deleteTemp, setDeleteTemp] = useState();

  // api get template --------------------------------
  const getTemplate = () => {
    setLoading(true);
    TemplateServices.getTemplate(page)
      .then((res) => {
        if (res.status === 200) {
          setTotalPages(res?.data?.data?.last_page);
          setTemplData(res?.data?.data?.data);
          setLoading(false);

          if (res.data.success === false) {
            setLoading(false);
            setNoRecord(res?.data?.message);
          }
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("getdep error", err);
      });
  };
  // add templates ----------------------------------------------------------------
  const addTemplate = (data, html) => {
    setLoading(true);
    const payload = { ...data, message: html };
    TemplateServices.addTemplate(payload)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          toast.success(res?.data?.message);
          getTemplate();
          handleClose();
        }
        if (res.status === 403) {
          setLoading(false);
          setServerErr(res?.data?.errors);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("add template error", err);
      });
  };
  //  Edit template ----------------------------------------------------------------
  const handleEdit = (data, html) => {
    let payload = { ...data, template_id: editTempData?.id, message: html };
    setLoading(true);
    TemplateServices.editTemplate(payload)
      .then((res) => {
        if (res?.data?.success === true) {
          setLoading(false);
          handleEditClose();
          getTemplate();
          toast.success(res?.data?.message);
        }
        if (res.status === 403) {
          setLoading(false);
          setServerErr(res?.data?.errors);

        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Edit template error: " + err);
      });
  };
  // delete template --------------------------------
  const handleDelete = (e) => {
    const payload = { id: deleteTemp };
    setLoading(true);
    e.preventDefault();
    TemplateServices.deleteTemplate(payload)
      .then((res) => {
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          console.log(res.data.message);
          toast.success(res?.data?.message);
          getTemplate();
        } else if (res.status === 401) {
          navigate("/");
          setLoading(false);
          toast.error("error");
        }
        if (res.status === 403) {
          setLoading(false);
          toast.error(res.data.message);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("delete template error: ", err);
        setLoading(false);
      });
  };
  // edit click
  const handleEditClick = (data) => {
    setEditTempData(() => data);
    handleEditOpen();
  };
  // delete click
  const handleDeleteClick = (id) => {
    setDeleteTemp(id);
    handleDeleteOpen();
  };

  useEffect(() => {
    getTemplate(page);
  }, [page]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);setServerErr(null);};

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {setEditOpen(false); setServerErr(null);};

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  return (
    <>
      <Container style={{ padding: 0 }}>
        <DatagridHeader name={"Templates"}>
          <>
            <AddButton onClick={handleOpen}>Add</AddButton>
          </>
        </DatagridHeader>
        <Box>
          <Box
            maxWidth="sm"
            style={{
              display: "flex",
              flexWrap: "wrap",

              gap: "10px",
              justifyContent: "flex-start",
            }}
          >
            {templData && templData?.length > 0 ? (
              templData?.map((i) => {
                return (
                  <TemplateCard
                    data={i}
                    key={i.id}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick}
                  />
                );
              })
            ) : loading === true ? (
              <Loader />
            ) : (
              <span>{noRecord}</span>
            )}
          </Box>
          <CommonModal
            isOpen={open || editopen}
            isClose={open ? handleClose : handleEditClose}
            title={open ? "Add Template" : "Edit Template"}
          >
              <TemplateForm
                apiFun={open ? addTemplate : handleEdit}
                data={editopen ? editTempData : undefined}
                btnName={open ? "Save" : "Save Changes"}
                loading={loading}
                error={serverErr}
              />
           
          </CommonModal>

          <DltndConf
            title="Delete Template"
            handleClose={handleDeleteClose}
            handleDelete={handleDelete}
            loading={loading}
            open={deleteopen}
          />
          {totalPages && totalPages >= "2" && (
            <Box
              style={{ width: "100%", marginTop: "10px", background: "white" }}
            >
              <CustomPagination totalPages={totalPages} setPage={setPage} />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};
export default Templates;
