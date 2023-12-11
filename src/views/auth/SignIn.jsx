import * as React from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
import { Footer } from "../../layout/dashboard/Footer";
import SubmitButton from "../../components/form-components/submitButton";
import ApiConfig from "../../config/apiConfig";
import { useSelector, useDispatch } from "react-redux";
import { superAdminData } from "../../redux/SuperAdminSlice";
import { useState } from "react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

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
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  // login api ---------------------------------------
  const onSubmit = async (formdata) => {
    setLoading(true);
    let data = {
      email: formdata.useremail,
      password: formdata.password,
    };
    await axios
      .post(ApiConfig.login, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.success === true) {
          setLoading(false);
          dispatch(superAdminData(response.data.user));
          navigate("/dashboard");
        } else {
          setLoading(false);
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
    // end api --------------------------------
  };
  return (
    <Container component="main" maxWidth="xs">
      <Card
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Avatar sx={{ m: [1, "auto"], bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" textAlign="center">
            Sign in
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
              error={errors && errors.email}
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
            <SubmitButton btnText={loading ? "Loading.." : "Sign In"} />
            <Grid container>
              <Grid item xs textAlign="center">
                <Link to="/reset-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
export default SignIn;
