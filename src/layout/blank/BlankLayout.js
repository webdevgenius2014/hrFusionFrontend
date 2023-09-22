import { Outlet } from "react-router-dom";
import { Footer } from "../dashboard/Footer";
const BlankLayout = () => (
  <>
    <Outlet />
    <Footer sx={{ mt: 8, mb: 4 }} />
  </>
);

export default BlankLayout;
