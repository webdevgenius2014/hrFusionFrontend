import * as Yup from "yup";
import YupPassword from "yup-password";
import { validImageType,maxImageSize } from "../../helperFunctions/imageValidation";
YupPassword(Yup);
const validationSchema = Yup.object().shape({
  useremail: Yup.string().email('Must be a valid email').max(255).required("Email is required").email("Email is invalid"),
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
  phone: Yup.number()
  .positive("A phone number can't start with a minus")
  .integer("A phone number can't include a decimal point")
  .min(10,' Nunber must be 10 digits')
  .required('A phone number is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  dob: Yup.string().required("Date of birth  is required"),
  department: Yup.string().required('Please select an option'),
  role: Yup.string().required('Please select an option'),
  designation: Yup.string().required('Please select an option'),
  // profile_image: Yup.string().required("Profile Image is required"),
  // profile_image: Yup
  // .mixed()
  // .required("Required")
  // .test("is-valid-type", "Not a valid image ",
  //   value => validImageType(value && value.name.toLowerCase(), "image"))
  // .test("is-valid-size", "Max allowed size is 2Mb",
  //   value => value && value.size <= maxImageSize), 



});

export default validationSchema;
