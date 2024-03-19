/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import EventForm from "./EventForm";
import { useCallback,useMemo } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material/";
import { useRef, useState, useEffect } from "react";
import EventServices from "../../services/EventServices";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CommonModal from "../../components/modal/commonModal";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { superAdminLogout } from "../../redux/SuperAdminSlice";
import { DltndConf } from "../../components/modal/Dlt-Conf-Modal";
import { DatagridHeader } from "../../components/dataGrid/DatagridHeader";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {useSelector  } from "react-redux";
import {superAdminData} from "../../redux/SuperAdminSlice";

const MyCalendar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  const DnDCalendar = withDragAndDrop(Calendar);
  // user role
  const userData = useSelector(superAdminData);
  const userRole = useMemo(() => userData?.payload?.SuperAdmin?.role?.role, [userData]);

  const [loading, setLoading] = useState(false);
  const [getEventsList, setGetEventsList] = useState();
  const [eventData, setEventData] = useState();
  const [serverError, setServerError] = useState([]);

  // api integration
  // get events api
  const getEvents = () => {
    setLoading(true);
    EventServices.getEvents()
      .then((res) => {
        if (res?.status === 200 && res?.data?.success === true) {
          const data = res?.data?.data?.data;
          const finalData = data.map(({ eventstart, eventend, ...rest }) => ({
            eventstart: new Date(Date.parse(eventstart)),
            eventend: new Date(Date.parse(eventend)),
            ...rest,
          }));
          setGetEventsList(finalData);
        }
        if (res.status === 200 && res?.data?.success === false) {
          setLoading(false);
          setGetEventsList([]);
        }
        if (res.status === 403) {
          setLoading(false);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
        if (res.status === 404) {
          setLoading(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("getClients error", err);
      });
  };
  // add event api
  const handleAddEvent = (payload) => {
    setLoading(true);
    setServerError(null);
    EventServices.addEvent(payload)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          getEvents();
          toast.success(res?.data?.message);
          handleClose();
        }
        if (res.status === 403) {
          console.log(res.data.errors);
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
        setLoading(false);
        console.log("AddClients error: " + err);
      });
  };
  // edit event
  const handleEventEdit = (data) => {
    let payload = { ...data, id: eventData?.id };
    setLoading(true);
    EventServices?.editEvent(payload)
      .then((res) => {
        if (res?.data?.success === true) {
          setLoading(false);
          handleEditClose();
          getEvents();
          toast.success(res?.data?.message);
        } else if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        } else if (res.status === 403) {
          setServerError(() => res.data.errors);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("edit client error: " + err);
      });
  };
  // delete event api
  const handleDelete = () => {
    let id = { id: eventData?.id };
    setLoading(true);
    EventServices.deleteEvent(id)
      .then((res) => {
        if (res.status === 200 || res.status === 404) {
          setLoading(false);
          handleDeleteClose();
          getEvents();
          toast.success(res?.data?.message);
        }
        if (res.status === 401) {
          dispatch(superAdminLogout());
          setLoading(false);
          navigate("/");
        }
        if (res.status === 403) {
          setLoading(false);
          // setServerError(res.data.message);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("delete Client error: ", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const onSelectEvent = useCallback((calEvent) => {
    if(userRole === 'Admin'|| userRole === 'HR' || userRole === 'Team Leader'){
    setEventData(calEvent);
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {}, 250);
    handleEditOpen();
    }
  }, []);

  const clickRef = useRef(null);

  const onSelectSlot = useCallback((slotInfo) => {
    if(userRole === 'Admin'|| userRole === 'HR' || userRole === 'Team Leader'){
      window.clearTimeout(clickRef?.current);
      clickRef.current = window.setTimeout(() => {
        // window.alert(slotInfo)
        // console.log(slotInfo)
        setEventData(() => slotInfo);
        handleOpen();
      }, 250);
    }
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);

  const dleteOpen = () => {
    handleEditClose();
    handleDeleteOpen();
  };

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
      <Box>
        <DatagridHeader name={"Events"} />
        <DnDCalendar
          localizer={localizer}
          events={getEventsList}
          startAccessor="eventstart"
          defaultDate={new Date()}
          endAccessor="eventend"
          titleAccessor="subject"
          tooltipAccessor="url"
          popup={true}
          selectable
          // draggableAccessor={(event) => true}
          style={{ height: 500 }}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          // onDoubleClick={handleEventClick}
        />

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
            {open ? "Add Event" : "Edit Event"}
          </Typography>
          <Box
            sx={{
              minWidth: { lg: 350, md: 250, sm: 150, xs: 70, xl: 500 },
              maxWidth: { lg: 500, md: 400, sm: 350, xs: 200, xl: 700 },
            }}
          >
            <EventForm
              error={serverError}
              handleClose={open ? handleClose : handleEditClose}
              apiFun={open ? handleAddEvent : handleEventEdit}
              data={eventData}
              btnName={editopen ? "Save Changes" : undefined}
              onClick={editopen ? dleteOpen : undefined}
            />
          </Box>
        </CommonModal>

        <DltndConf
          title="Delete Event"
          btnName="Confirm"
          handleClose={handleDeleteClose}
          handleDelete={handleDelete}
          message={`Are you sure want to Delete ?`}
          loading={loading}
          open={deleteopen}
        />
      </Box>
    </>
  );
};
export default MyCalendar;
