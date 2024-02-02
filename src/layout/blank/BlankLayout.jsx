import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

const BlankLayout = () => (
  <>
    <Box
      sx={{
        background: "url('/loginpage/bgLarge.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: 'no-repeat',
        height: "100vh",
        widows:'100vw',
        backgroundSize: '100% 100%',
       
      }}
    >
      
        <Outlet />

      
    </Box>
  </>
);

export default BlankLayout;
