import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Container,
  Avatar,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormInputEmail } from "../../components/form-components/formInputEmail";
import { FormInputPassword } from "../../components/form-components/formInputPassword";
import SubmitButton from "../../components/form-components/submitButton";
import { useDispatch } from "react-redux";
import { superAdminData } from "../../redux/SuperAdminSlice";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginServices from "../../services/loginServices/LoginServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const SignIn = () => {
  const [loading, setLoading] = useState(false);

   // break points 
   const theme = useTheme();
   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
   const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
   const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));  
  // redux
  // const sAdminData = useSelector((state) => state.SuperAdmin);
  // console.log("sAdminData",sAdminData)
  const dispatch = useDispatch();
  //----------------------------------------------------------------
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    useremail: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  // login api ---------------------------------------
  const onSubmit = (formdata) => {
    setLoading(true);
    let data = {
      email: formdata.useremail,
      password: formdata.password,
    };

    LoginServices.superAdminLogin(data)
      .then(function (response) {
        if (response.status === 200) {
          if (response?.data?.success === true) {
            toast.success("Login Success");
            dispatch(superAdminData(response.data.user));
            sessionStorage.setItem("token", response?.data?.user?.token);
            setLoading(false);
            navigate("/dashboard");
          } else {
            toast.error(response?.data?.message);
            setLoading(false);
          }
        }
        if (response.status === 401) {
          setLoading(false);
          toast.error(response?.data?.message);
        }
        if (response.status === 403) {
          setLoading(false);
          console.log(...response?.data?.errors?.email);
          toast.error(...response?.data?.errors?.email);
        }
        if (response.status === 404) {
          setLoading(false);
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("sign in catch", error);
      });
    // end api --------------------------------
  };
  return (
    <>
    <ToastContainer />
      <Box
        sx={{
          background: "url('loginpage/box.png')",
          backgroundSize: "container",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: { xl: "400px", lg: "530px", md: "640px", sm: "480px" },
          maxHeight: { xl: "400px", lg: "700px", md: "900px", sm: "600px" },
          width: isSmallScreen ? "100%" : (isMediumScreen ? "390px" : isLargeScreen ?"395px" : 440),
          minWidth: isSmallScreen ? 0 : (isMediumScreen ? 0 : 0),
          maxWidth: isSmallScreen ? 840 : (isMediumScreen ? 740 : 850),
          position: "absolute",
          borderRadius: "10px",
          top: "50%",
          left: "50%",
          transform: "translate(-100%, -50%)",
          zIndex: 1,
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            display:isSmallScreen?'none':'',
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            textAlign="center"
            sx={{
              fontSize: { lg: "40px", md: "35px", sm: "30px" },
              mb: 2,
              lineHeight: "48px",
              fontWeight: 700,
              color: "#647691",
            }}
          >
            Hr Fusion
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            textAlign="center"
            sx={{
              fontSize: { lg: "60px", md: "55px", sm: "50px" },
              mb: 1,
              lineHeight: "48px",
              fontWeight: 700,
              color: "#000000",
            }}
          >
            Welcome!
          </Typography>
          <Typography
            component="p"
            variant="p"
            textAlign="center"
            sx={{
              fontSize: { lg: "12px", md: "11px", sm: "10px" },
              color: "#647691",
              paddingX: 8,
            }}
          >
            Lorem Ipsum has been the industry's standard dummy text eveandard
            dummy text ever since the 1500s, ever since the 1500s
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position:isSmallScreen?"": "absolute" ,
          top: isSmallScreen?"":"50%",
          left:isSmallScreen?"": "50%",
          margin:'auto',
          transform:isSmallScreen?"": "translate(-15%, -50%)",
          zIndex: 2,
        }}
      >
        <Container component="main" maxWidth="xs">
          <Card
            sx={{
              justifyContent: "center",
              display: "flex",
              py: "20px",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              width: isSmallScreen ? "100%" : (isMediumScreen ? "380px" :  400),
              minWidth: isSmallScreen ? 0 : (isMediumScreen ? 0 : 0),
              maxWidth: isSmallScreen ? 740 : (isMediumScreen ? 740 : 750),
              height: isSmallScreen ? "100%" : (isMediumScreen ? "360px" : 390),
              minHeight: isSmallScreen ? 0 : (isMediumScreen ? 0 : 0),
              maxHeight: isSmallScreen ? 750 : (isMediumScreen ? 750 : 750),
            
            }}
          >
            <CardContent sx={{ p: 3 }}
             
              >
              <Typography
                component="h1"
                variant="h5"
                textAlign="center"
                sx={{
                  fontSize: { lg: "30px", md: "25px", sm: "20px" },
                  lineHeight: "36px",
                  fontWeight: 700,
                  color: "#647691",
                }}
              >
                Login Account
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                <FormInputEmail
                  name="useremail"
                  control={control}
                  label="Email Address"
                  error={errors && errors.useremail}
                  required
                  autoComplete="email"
                  // size="small"
                />
                <FormInputPassword
                  name="password"
                  control={control}
                  label="Password"
                  required
                  error={errors && errors.password}
                  // autoComplete="current-password"
                  // size="small"
                />
                <Grid container>
                  <Grid item sm={6} md={6} lg={6} textAlign="center"></Grid>
                  <Grid item sm={6} md={6} lg={6} textAlign="center">
                    <Link to="/reset-password" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                  <SubmitButton
                    sx={{ mt: 3 }}
                    btnName={loading ? "Loading.." : "Sign In"}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};
export default SignIn;
