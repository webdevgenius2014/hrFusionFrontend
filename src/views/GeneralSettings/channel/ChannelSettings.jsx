import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import CommonModal from "../../../components/modal/commonModal";
import { AddButton, Buttons } from "../../../components/Buttons/AllButtons";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DltndConf } from "../../../components/modal/Dlt-Conf-Modal";
import { CustDataGrid } from "../../../components/dataGrid/CustDataGrid";
import { DatagridHeader } from "../../../components/dataGrid/DatagridHeader";
import { superAdminLogout } from "../../../redux/SuperAdminSlice";
import GeneralServices from "../../../services/GeneralServices";
import { ChannelForm } from "./ChannelForm";
import { useTheme } from '@mui/material/styles';
import Menu3Dot from '../../../components/Menu3Dot';
import useMediaQuery from '@mui/material/useMediaQuery';

export const ChannelSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [formLoader, setFormLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState();
  // api states
  const [getAddChannel, setGetAddChannel] = useState([]);
  const [editChnlData, setEditChnlData] = useState();
  const [deleteChannel, setDeleteChannel] = useState();

  // get api channel
  const getAllChannel = () => {
    setFormLoader(true);
    GeneralServices.getAllChannels()
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setFormLoader(false);
          setGetAddChannel(res?.data?.data);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          navigate("/");
        }
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("getdep error", err);
      });
  };
  // add api --------------------------------
  const addChannel = (data) => {
    setLoading(true);
    GeneralServices.addChannel(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          handleClose();
          toast.success(res?.data?.message);
          getAllChannel();
        }
        if (res.status === 403) {
          setServerError(res?.data?.errors);
          setLoading(false);
        }
        if (res.status === 401) {
          // con9sole.log()
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("add Channel error: " + err);
      });
  };
  // edit api --------------------------------
  const handleEdit = (data) => {
    let payload = { ...data, id: editChnlData?.id };
    setLoading(true);
    GeneralServices.editChannel(payload)
      .then((res) => {
        if (res.data.success === true) {
          setLoading(false);
          handleEditClose();
          getAllChannel();
          toast.success(res?.data?.message);
        }
        if (res.status === 403) {
          setServerError(res?.data?.errors);
          setLoading(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("editDepartment error: " + err);
      });
  };
  // delete appi ------------------------------
  const handleDelete = (e) => {
    let id = { id: deleteChannel };
    setLoading(true);
    e.preventDefault();
    GeneralServices.deleteChannel(id)
      .then((res) => {
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success(res?.data?.message);
          getAllChannel();
        } else if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");

          toast.error("please login again");
        }
        if (res.status === 403) {
          setLoading(false);

          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("delete department error: ", err);
        setLoading(false);
      });
  };
  // get edit click values
  const editValue = (channelData) => {
    setEditChnlData(() => channelData);
    handleEditOpen();
  };
  // delete click  ---------------------------
  const handleDeleteClick = (id) => {
    setDeleteChannel(id);
    handleDeleteOpen();
  };

  useEffect(() => {
    getAllChannel();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "No.",
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "channel_name",
      headerName: "Channel Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
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
              editValue(params.row);
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
      flex: 1,
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setServerError(null) } ;

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {setEditOpen(false); setServerError(null)} ;

  const [deleteopen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  return (
    <Container style={{ padding: 0 }}>
      <Box>
        <DatagridHeader name={"Channel "}>
        {isSmallScreen ? <>
          <Menu3Dot option={[{value:'Add Channel',onClick:handleOpen}]}/>
          </>
          :
          <AddButton onClick={handleOpen}>Add Channel</AddButton>
        }
        </DatagridHeader>

        <CommonModal
          isOpen={open || editopen}
          isClose={open ? handleClose : handleEditClose}
          title= {editopen ? "Edit Channel" : "Add Channel"}
        >
         
            <ChannelForm
              loading={loading}
              apiFun={editopen ? handleEdit : addChannel}
              error={serverError}
              channel_name={editopen ? editChnlData?.channel_name : undefined}
              btnName={editopen ? "Save Changes" : "Save"}
            />
        </CommonModal>

        {/*  display grid */}
      </Box>
      <CustDataGrid
        data={getAddChannel}
        loading={formLoader}
        columns={columns}
      />
      <DltndConf
        title="Delete Channel"
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
        loading={loading}
        open={deleteopen}
      />
    </Container>
  );
};
