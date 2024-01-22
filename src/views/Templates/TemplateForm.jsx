import React, { useState, useEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import copy from "clipboard-copy";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";
import JoditEditor from "jodit-react";
import FormHelperText from "@mui/material/FormHelperText";

const TemplateForm = (props) => {
  const data = props?.data || {};
  const editor = useRef(null);

  const cName = useRef(null);
  const cPhone = useRef(null);
  const cEmail = useRef(null);

  const [html, setHtml] = useState(data?.message || "");
  const onChange = (html) => {
    setHtml(html);
    setValue("message", html);
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Tilte is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Subject is required"),
  });
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data?.title,
      message: data?.message,
      subject: props?.subject,
    },
    resolver: yupResolver(validationSchema),
  });
  const newErrors = props?.error;
  useEffect(() => {
    if (newErrors)
      setError("designation_name", {
        type: "manual",
        message: newErrors?.message,
      });
  }, [newErrors]);
  const keyWords = ["%CLIENT_NAME%","%CLIENT_EMAIL%","%CLIENT_PHONE%"];
 

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit((values) => props.apiFun(values, html))}
              sx={{ mt: 1 }}
            >
              <Grid container justifyContent="space-between">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormInputText
                    autoComplete="given-name"
                    name="title"
                    id="title"
                    label="Title"
                    required
                    fullWidth
                    error={errors && errors?.title}
                    control={control}
                    //autoFocus
                    defaultValue={data?.title || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormInputText
                    autoComplete="given-name"
                    name="subject"
                    id="subject"
                    label="Subject"
                    required
                    fullWidth
                    error={errors && errors?.subject}
                    control={control}
                    //autoFocus
                    defaultValue={data?.subject || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <JoditEditor
                    ref={editor}
                    value={props?.data?.message}
                    tabIndex={2} // tabIndex of textarea
                    onChange={(newContent) => {
                      onChange(newContent);
                    }}

                    // config={config}
                    // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  />
                  <FormHelperText
                    style={{ color: errors?.message ? "#f79277" : "" }}
                  >
                    {errors?.message}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#808080",
                      gap:'5px',
                    }}
                  >
                    {keyWords?.map((text,index) => {
                      return (<>
                        <CopyToClipboardButton key={index} text={text} /> 
                        <span> , </span>
                        </>
                      );
                    })}
                  </div>
                </Grid>
              </Grid>
              <SubmitButton loading={props?.loading} btnName={props?.btnName} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};


function CopyToClipboardButton({ text }) {
  const handleCopyClick = async () => {
    try {
      await copy(text); 
      console.log('Text copied to clipboard:', text);
    } catch (error) {
      console.error('Unable to copy text to clipboard:', error);
    }
  };

  return (
    <span onClick={handleCopyClick} style={{ cursor: 'pointer' }}>
      {text}
    </span>
  );
}
export default TemplateForm;
