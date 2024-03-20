import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";

const CommonModal = ({ isOpen, children, isClose, title }) => {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={isClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      sx={{
        "& .MuiDialog-paperWidthSm": {
          maxWidth: "700px" 
        },
        "& .MuiDialog-paperWidthMd": {
          maxWidth: "1100px"
        },
        "& .MuiDialog-paperWidthLg": {
          maxWidth: "1400px" 
        },
        "& .MuiDialog-paperWidthXl": {
          maxWidth: "1600px" 
        }
      }}
    >
      <DialogTitle id="scroll-dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={isClose}
          style={{ position: "absolute", right: "8px", top: "8px" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={"paper"}>
        <DialogContentText id="scroll-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      {/* <DialogActions>
          <Button onClick={isClose}>Cancel</Button>
          <Button onClick={isClose}>Subscribe</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default CommonModal;
