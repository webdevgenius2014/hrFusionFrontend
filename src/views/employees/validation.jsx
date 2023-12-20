import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const validationSchema = Yup.object().shape({
  useremail: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    // .matches(passwordRules, { message: "must constain uppercase lower case numer and symbol" }),
    .min(6, "password must contain 6 chracters Eg.(Abcd@123)")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
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
  department: Yup.string().required('Please select an option'),
  role: Yup.string().required('Please select an option'),
  designation: Yup.string().required('Please select an option'),


});

export default validationSchema;
