import * as Yup from "yup";

const  validationSchema = Yup.object().shape({
    useremail: Yup.lazy((value) => {
      if (value === "") {
        return Yup.string()
          .required("Email is required")
          .email("Email is invalid");
      } else {
        return Yup.string();
      }
    }),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    employee_id: Yup.string().required("Employee id is required"),
    joining_date: Yup.string().required("Joining Date is required"),
    phone: Yup.string().required("phone Number is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    dob: Yup.string().required("Date of birth  is required"),
  });


export default validationSchema;