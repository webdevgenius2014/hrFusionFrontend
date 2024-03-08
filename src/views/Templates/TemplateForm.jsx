import React, { useState, useEffect, useRef } from "react";
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
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TemplateForm = (props) => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const data = props?.data || {};
  const newErrors = props?.error;
  const keyWords = ["%CLIENT_NAME%", "%CLIENT_EMAIL%", "%CLIENT_PHONE%"];

  const [html, setHtml] = useState(data?.message || []);
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
      subject: data?.subject,
    },
    resolver: yupResolver(validationSchema),
  });

  const onChange = (html) => {
    setHtml(html);
    setValue("message", html);
  };

  useEffect(() => {
    if (newErrors)
      setError("designation_name", {
        type: "manual",
        message: newErrors?.message,
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newErrors]);

  const config = {
    useSearch: false,
    spellcheck: false,
    enter: "P",
    defaultMode: "1",
    toolbarAdaptive: false,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    minHeight: 300,
    minWidth: null,
    buttons:
      "paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,|,font,fontsize,brush,,link,|,align,undo,redo",
    editorCssClass: "alic",
    placeHolder: "",
    controls: {
      fontsize: {
        list: [
          "8",
          "9",
          "10",
          "11",
          "12",
          "14",
          "16",
          "18",
          "24",
          "30",
          "36",
          "48",
          "60",
          "72",
          "96",
          "100",
        ],
      },
      font: {
        command: "fontname",
        list: {
          "": "Default",
          "'Open Sans',sans-serif": "Open Sans",
          "Helvetica,sans-serif": "Helvetica",
          "Arial,Helvetica,sans-serif": "Arial",
          "Georgia,serif": "Georgia",
          "Impact,Charcoal,sans-serif": "Impact",
          "Tahoma,Geneva,sans-serif": "Tahoma",
          "'Times New Roman',Times,serif": "Times New Roman",
          "Verdana,Geneva,sans-serif": "Verdana",
        },
      },
    },
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit((values) =>{ 
                console.log(html)
                if(html?.length >= 5) props.apiFun(values, html)})}
              sx={{ mt: 1 }}
            >
              <Grid container sx={{ pr: 1 }}>
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
                <Grid xs={12} sm={9} md={9} lg={9} sx={{ paddingLeft: "5px" }}>
                  <JoditEditor
                    ref={editor}
                    value={props?.data?.message || ''}
                    tabIndex={1} 
                    // config={{minHeight: 300,
                    //   minWidth: null,}}
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
                <Grid xs={12} sm={3} md={3} lg={3}>
                  <Box
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#808080",
                      gap: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        fontWeight: 600,
                        textDecoration: "underline",
                        textAlign: "center",
                        color: "gray",
                      }}
                    >
                      {" "}
                      Keywords{" "}
                    </Box>
                    {keyWords?.map((text, index) => {
                      return (
                        <Box sx={{ textAlign: "center" }}>
                          <CopyToClipboardButton key={text} text={text} />
                          <br />
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
              </Grid>
              <Grid xs={9}>
                {" "}
                <SubmitButton
                  loading={props?.loading}
                  btnName={props?.btnName}
                />
              </Grid>
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
      console.log("Text copied to clipboard:", text);
    } catch (error) {
      console.error("Unable to copy text to clipboard:", error);
    }
  };

  return (
    <span
      onClick={handleCopyClick}
      style={{ cursor: "pointer", textAlign: "center", fontSize: "10px" }}
    >
      {text}
    </span>
  );
}
export default TemplateForm;
