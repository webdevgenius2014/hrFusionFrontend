import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { persistor } from "../redux/Store";
import { superAdminLogout } from "../redux/SuperAdminSlice";
import CommonServices from "../services/CommonServices";

const LogoutFn = () => {
  console.log("run logoutfn");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(superAdminLogout());
    persistor.purge();
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  logout();
};

export default LogoutFn;
