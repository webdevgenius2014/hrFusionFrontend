import React, { useEffect ,useState,useCallback} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { Buttons } from "../../components/Buttons/AllButtons";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";

const EventForm = (props) => {
  const start = props?.data?.start || props?.data?.eventstart;
  const end = props?.data?.end || props?.data?.eventend;
  const subject = props?.data?.subject;
  const url = props?.data?.url;
  const newErrors = props?.error;
  const [StartDateTime, setStartDateTime] =useState(start);
  const [EndDateTime, setEndDateTime] = useState(end);
  // const [handleOpen, setHandleOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("Event subject is required"),
    url: Yup.string().required("Event Url is required"),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: props?.data?.subject,
      url: props?.data?.url,
     
    },
    resolver: yupResolver(validationSchema),
  });
  
  useEffect(() => {
    if (newErrors) {
      Object.keys(newErrors).forEach((field) => {
          setError(field, {
            type: "manual",
            message: newErrors[field],
          });
    })
  }
  }, [newErrors, setError]);
  const handleStartDate = (newDateTime) => {
    setStartDateTime(newDateTime);
  };

  const handleEndDate = (newDateTime) => {
    setEndDateTime(newDateTime);
  };
const [eDateError,setEDateError]=useState()
  const handleData = (data) => {
    const sDate = new Date(StartDateTime ||start)
    const  eDate = new Date(EndDateTime ||end)
    if(sDate > eDate) 
     setEDateError({message:"End date must be higher than start date"})
    else
    props.apiFun( { 
      url: data?.url,
      subject: data?.subject,
      eventstart:sDate,
      eventend: eDate,
    })
  };
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsDatePickerOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsDatePickerOpen(false);
  }, []);

  return (
    <>
      <form noValidate onSubmit={handleSubmit(handleData)}>
        <FormInputText
          required
          fullWidth
          id="subject"
          label="Event Subject"
          name="subject"
          size="small"
          defaultValue={subject && subject !== undefined ? subject : ""}
          error={errors && errors?.subject}
          control={control}
          autoComplete="family-name"
        />
        <FormInputText
          required
          fullWidth
          id="url"
          label="Url"
          name="url"
          size="small"
          defaultValue={url && url !== undefined ? url : ""}
          error={errors && errors?.url}
          control={control}
          autoComplete="family-name"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              defaultValue={dayjs(start)}
              label="Event Started"
              onChange={handleStartDate}
              slotProps={{
                textField: {
                  size: "small",
                    // error: !!errors,
                    // helperText: errors && `${ errors?.message}`
                },
              }}
            />
            <DateTimePicker
              label="Event End"
              onOpen={isDatePickerOpen} onClose={handleClose}
              
              defaultValue={dayjs(end && end !== undefined || end !== null ? end : start)}
              onChange={handleEndDate}
              slotProps={{
                textField: {
                  size: "small",
                    error: !!eDateError,
                    helperText: eDateError && `${ eDateError?.message}`
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Box sx={{display:'flex'}}>
        <SubmitButton loading={props.loading} btnName={props?.btnName} />
       {subject && subject !== undefined && subject !== null &&
        <Buttons 
        color='error'
        loading={props.loading} 
        onClick={props?.onClick}
        >
          Delete
        </Buttons>
       }
        
        </Box>
      </form>
    </>
  );
};
export default EventForm;
