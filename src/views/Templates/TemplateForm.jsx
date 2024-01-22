import React, { useState, useEffect,useMemo,useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "../../components/form-components/formInputText";
import SubmitButton from "../../components/form-components/submitButton";
import { TextArea } from "../../components/form-components/TextArea";
import MUIRichTextEditor from "mui-rte";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js'
import parser from "react-html-parser";
import JoditEditor from 'jodit-react';
import FormHelperText from "@mui/material/FormHelperText";



const TemplateForm = (props) => {
  const data = props?.data || {};
  const editor = useRef(null);

  const [html,setHtml]=useState( data?.message || '')
  const onChange = (data) => {
    setHtml(data)
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    subject: Yup.string().required("subject is required"),
    message: Yup.string().required("message is required"),
  });
  const {
    control,
    setError,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { title: data?.title ||" " ,
    subject: data?.subject || " ",
    message: data?.message || " ",
  },
    
  } );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit((data) => props.apiFun(data,html))}
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
                // config={config}
                tabIndex={1} // tabIndex of textarea
                // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { onChange(newContent)}}
              />
              <FormHelperText style={{ color: errors?.message ? "#f79277" : "" }}>
                   {errors?.message}
              </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <span style={{ fontSize: "10px" }}> %CLIENT_NAME%  ,</span>
                <span style={{ fontSize: "10px" }}> %CLIENT_EMAIL%  ,</span>
                <span style={{ fontSize: "10px" }}> %CLIENT_PHONE%  ,</span>
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
export default TemplateForm;
