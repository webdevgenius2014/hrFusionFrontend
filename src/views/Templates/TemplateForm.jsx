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


const TemplateForm = (props) => {
  const data = props?.data || {};
  const editor = useRef(null);

  const [html,setHtml]=useState( data?.message || '')
  const onChange = (data) => {
    setHtml(data)
  };
 
  const {
    control,
    setError,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
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
                </Grid>
              </Grid>
              <SubmitButton loading={props?.loading} btnName={props?.btnName} />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <h4 style={{ margin: "10px  auto" }}>
              {" "}
              Use these Keywords for dynamic data
            </h4>
            <p style={{ fontSize: "12px" }}>Client Name = %CLIENT_NAME% </p>
            <p style={{ fontSize: "12px" }}>Client Email = %CLIENT_EMAIL% </p>
            <p style={{ fontSize: "12px" }}>
              Client Phone No. = %CLIENT_PHONE%
            </p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default TemplateForm;
