import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import HolidaysForm from "./HolidaysForm";
import { useForm } from "react-hook-form";
import ToolTip from "../../components/ToolTip";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import HolidayService from "../../services/HolidaysServices";
import CommonModal from "../../components/modal/commonModal";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { AddButton } from "../../components/Buttons/AllButtons";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { CustomPagination } from "../../components/CustomPagination";
import { CustDataGrid } from "../../components/dataGrid/CustDataGrid";
import { FormSelect } from "../../components/form-components/FormSelect";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";

function Holidays() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectOptions = [
    { id: "year", name: "This Year" },
    { id: "three", name: "Upcoming Three Holidays" },
    { id: "all", name: "All" },
  ];

  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [formLoader, setFormLoader] = useState(false);
  const [renderApi, setRenderApi] = useState("All");
  const { control } = useForm();
  // api states
  const [getHolidays, setGetHolidays] = useState([]);
  const [editData, setEditData] = useState();
  const [deleteHoliday, setDeleteHoliday] = useState();

  // api integration -----------------------------------
  const getHolidaysList = () => {
    setFormLoader(true);
    setGetHolidays([]);
    let setApi;
    if (renderApi === "year") setApi = HolidayService.thisYearholidays(page);
    else if (renderApi === "three")
      setApi = HolidayService.upcomingThreeHoliday(page);
    else setApi = HolidayService.getHolidays(page);
    setApi
      .then((res) => {
        if (res.status === 200 && res?.data?.success === true) {
          setTotalPages(res?.data?.data?.last_page);
          if (renderApi === "three") setGetHolidays(res?.data?.data);
          else setGetHolidays(res?.data?.data?.data);
          setFormLoader(false);
        } else if (res.status === 200 && res?.data?.success === false) {
          setFormLoader(false);
          setGetHolidays([]);
        } else if (res.status === 401) {
          setFormLoader(false);
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        setFormLoader(false);
        console.log("getHolidays error", err);
      });
  };
  // add holidays-------------------------------------
  const addHolidays = (data) => {
    setLoading(true);
    HolidayService.addHoliday(data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          handleClose();
          toast.success(res?.data?.message);
          getHolidaysList();
        }
        if (res.status === 403) {
          setServerError(res?.data);
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
        console.log("addHolidays error: " + err);
      });
  };
  // edit holidays -------------------------------
  const handleEdit = (data) => {
    let payload = { ...data, id: editData?.id };
    setLoading(true);
    HolidayService.editHoliday(payload)
      .then((res) => {
        if (res.data.success === true) {
          setLoading(false);
          handleEditClose();
          getHolidaysList();
          toast.success(res?.data?.message);
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
        console.log("edit holidays error: " + err);
      });
  };
  // delete holidays -------------------------------
  const handleDelete = (e) => {
    let id = { id: deleteHoliday };
    setLoading(true);
    e.preventDefault();
    HolidayService.deleteHoliday(id)
      .then((res) => {
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          toast.success(res?.data?.message);
          getHolidaysList();
        } else if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");

          toast.error("please login again");
        }
        if (res.status === 403) {
          setLoading(false);
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("delete holidays error: ", err);
        setLoading(false);
      });
  };
  // change values on edit holidays
  const handleHoliData = (data) => {
    setEditData(() => data);
    handleEditOpen();
  };
  // delete click get id of holidays
  const handleDeleteClick = (id) => {
    setDeleteHoliday(id);
    handleDeleteOpen();
  };
  // handle show data all data / upcoming 3 holidays / one year holidays
  const handleShowData = (data) => {
    setRenderApi(() => data);
  };

  useEffect(() => {
    getHolidaysList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderApi]);

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
      field: "holiday_name",
      headerName: "Holiday Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      options: { filter: true },
    },
    {
      field: "holiday_date",
      headerName: "Holiday Date",
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
              handleHoliData(params?.row);
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
  return (
    <>
      <Container style={{ padding: 0 }}>
        <Box>
          <DatagridHeader name={"Holidays"}>
            <Box>
              <AddButton
                startIcon={<AddIcon />}
                variant="contained"
                onClick={handleOpen}
              >
                Add Fields
              </AddButton>
            </Box>
            <ToolTip title="Search Holidays By">
              <Box sx={{ minWidth: "150px", maxWid: "200px" }}>
                <FormSelect
                  name="name"
                  stylee={{ width: "150px", marginTop: "5px" }}
                  data={selectOptions}
                  pass_fun={handleShowData}
                  label="Select options"
                  control={control}
                  fieldaname="name"
                  def={"All"}
                  // error={errors && errors?.designation}
                />
              </Box>
            </ToolTip>
          </DatagridHeader>
        </Box>

        <CustDataGrid
          data={getHolidays}
          loading={formLoader}
          columns={columns}
          totalPages={totalPages}
        />
        {/* checkboxSelection  upline */}
      </Container>
      
      <CommonModal
        isOpen={open || editopen}
        isClose={open ? handleClose : handleEditClose}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "20px", fontWeight: "600" }}
        >
          {open ? "Add Holidays" : "Edit Holiday"}
        </Typography>
        <Box
          sx={{
            minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
            maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
          }}
        >
          <HolidaysForm
            data={editopen ? editData : undefined}
            apiFun={open ? addHolidays : handleEdit}
            loading={loading}
            error={serverError}
            btnName={open ? "Save" : "Save Changes"}
          />
        </Box>
      </CommonModal>

      <DltndConf
        title="Delete Holiday"
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
    </>
  );
}

export default Holidays;
