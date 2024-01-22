import React,{useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CommonModal from "../../components/modal/commonModal";
import BeatLoader from "react-spinners/ClipLoader";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import { useNavigate } from "react-router-dom";
import TemplateServices from '../../services/TemplateServices'
import TemplateCard from './TemplateCard';
import {  toast } from "react-toastify";
import TemplateForm from './TemplateForm';
import { DeleteDilagBox } from '../../components/modal/DeleteModal';
import { CustomPagination } from "../../components/CustomPagination";


 const Templates = () => {
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const  [noRecord,setNoRecord]=useState();
  const [page, setPage] = useState(1);



  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const navigate = useNavigate();

  // api integration --------------------------------
  const [templData, setTemplData] = useState();
  const getTemplate = () => {
    setLoading(true);
    TemplateServices.getTemplate(page)
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          // console.log(res?.data)
          setTotalPages(res?.data?.data?.last_page);
          setTemplData(res?.data?.data?.data);
          setLoading(false)

          if(res.data.success === false) {
            setLoading(false);
            setNoRecord(res?.data?.message)
          }
        } 
        if(res.status === 401)
        {
          setLoading(false)
          toast.error('Please login again')
          navigate('/')
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("getdep error", err);
      });
  };


// add templates ----------------------------------------------------------------
  const addTemplate = (data,message,contentState) => {
    setLoading(true)
    const payload = {...data, message: message ,raw_data: contentState}
    TemplateServices.addTemplate( payload)
      .then((res) => {
        if (res.status === 200) {         
          // console.log(res.data.message);
          setLoading(false);
          toast.success(res?.data?.message);
          getTemplate();
          handleClose()
        }
        if(res.status===403){
          setLoading(false);
          toast.error(...res?.data?.errors?.message);

        }
        
      })
      .catch((err) => {
        setLoading(false);
        console.log("add template error", err);
      });
  };
//  Edit template ----------------------------------------------------------------
const [template_Id,setTemplate_Id] =useState();
const [editTempData,setEditTempData]=useState();
const handleEditClick = (id, data) => {
  console.log(id, data);
  setTemplate_Id(id);
  setEditTempData(() => data);
  handleEditOpen();
};

const handleEdit = (data,html) => {
  console.log(data);
  let payload = { ...data, template_id: template_Id ,message: html  };
  console.log(payload);
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
      }
    })
    .catch((err) => {
      setLoading(false);
      console.log("Edit template error: " + err);
    });
};

  // delete template --------------------------------
  const [deleteTemp, setDeleteTemp] = useState();
  const handleDeleteClick = (id) => {
    setDeleteTemp(id);
    handleDeleteOpen();
  };
  const handleDelete = (e) => {
    let id = { id: deleteTemp };
    setLoading(true);
    e.preventDefault();
    TemplateServices.deleteTemplate(id)
      .then((res) => {
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success("Template deleted successfully");
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
      })
      .catch((err) => {
        console.log("delete template error: ", err);
        setLoading(false);
      });
  };


  // ----------------------------------------------------------------
useEffect(() => {
  getTemplate();
},[])
useEffect(() => {
  getTemplate(page);
},[page])

  return (
    <>
    <Container style={{ padding: 0 }}>
    <DatagridHeader name={"Templates"}>
      <>
          <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpen}
        >
          Add
        </Button>
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
        <BeatLoader
          color="#2d94cb"
          cssOverride={{
            position: "absolute",
            display: "block",
            
            top: "45%",
            left: "55%",
            transform: "translate(-50%, -50%)",
          }}
          loading={loading}
          margin={4}
          size={90}
        />
      ) : (
        <span>{noRecord}</span>
      )}
    </Box>
      <CommonModal isOpen={open} isClose={handleClose}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          Add Template
        </Typography>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDra:{xs:'wrap'},
            minWidth:{xs:200 },
            // height: 440,
            // overflow: "hidden",
            // overflowY: "scroll",
          }}
        >
        <TemplateForm 
        apiFun={addTemplate}
        btnName={"Save "}
        loading={loading}
        />
        </Box>
      </CommonModal>
    <CommonModal isOpen={editopen} noValidate isClose={handleEditClose}>
    <Typography
      id="modal-modal-title"
      variant="h6"
      component="h2"
      sx={{ marginBottom: "20px", fontWeight: "600" }}
    >
      Edit Template
    </Typography>
    <Box
      sx={{
        mb: 2,
        
        display: "flex",
        // height: 440,
        // overflow: "hidden",
        // overflowY: "scroll",
      }}
    >
    <TemplateForm 
    apiFun={handleEdit}
    data={editTempData}
    btnName={"Save Changes "}
    loading={loading}

    />
    </Box>
  </CommonModal>
    <DeleteDilagBox title='Delete Template' 
    handleDeleteClose={handleDeleteClose}
    handleDelete={handleDelete}
    loading={loading}
    deleteopen={deleteopen} />
      {templData &&
      <div
        style={{ width: "100%", marginTop: "10px", background: "white" }}
      >
        <CustomPagination totalPages={totalPages} setPage={setPage} />
      </div>
      } 
    </Box>
  </Container>
    </>
  )
}
export default Templates;