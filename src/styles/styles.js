import { styled } from "@mui/material/styles";
import { defaultTheme } from "../theme/theme";
import { red } from "@mui/material/colors";
const theme = defaultTheme; 
const hrDashboardStyles = styled({
    '&.brand': {
        color: theme.palette.primary.light,
        "& .brand_text span": {
            color: red,
        }
    },
    field: {
        // paddingTop: '20px',
        padding: "100px",
        backgroundColor: "red",
    
        "&&": {
          marginBottom: "100px"
        }
        // margin: 100
        // display: 'block'
      }
    
});
export default hrDashboardStyles