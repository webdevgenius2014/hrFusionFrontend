import React, { Children } from "react";
import Tooltip from "@mui/material/Tooltip";

function ToolTip({ title, children }) {
  return (
    <Tooltip title={title} 
     placement="top-start"
     arrow variant="outlined">
      {children}
    </Tooltip>
  );
}

export default ToolTip;
