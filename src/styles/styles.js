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
    }
});
export default hrDashboardStyles