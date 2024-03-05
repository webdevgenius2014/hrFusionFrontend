import React from "react";
import CommonModal from "../../components/modal/commonModal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import parser from "react-html-parser";
import Button from "@mui/material/Button";

export const TemplateView = (props) => {
  return (
    <CommonModal isOpen={props?.open} isClose={props?.handleClose}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ marginBottom: "20px", fontWeight: "600" }}
      >
        View Template
      </Typography>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDra: { xs: "wrap" },
          minWidth: { xs: 900 },
          height: 440,
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Box>
          <Box sx={{ my: 2 }}>
            <b>Title:- </b> <span> {props?.data?.title}</span>
          </Box>
          <Box sx={{ my: 2 }}>
            <b>Subject:- </b> <span>{props?.data?.subject}</span>
          </Box>
          <Box sx={{ my: 2 }}>
            <b>Message:- </b> <span>{parser(props?.data?.message)}</span>
          </Box>
          <Box sx={{ position: "absolute", bottom: "30px", left: "50%" }}>
            {props?.apiFun && (
              <Button
                variant="contained"
                onClick={() => props?.apiFun({ template_id: props?.data?.id })}
              >
                Send
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </CommonModal>
  );
};
