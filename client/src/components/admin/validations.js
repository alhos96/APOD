import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  password: yup.string("Enter your password").min(5, "Password should be of minimum 5 characters length").required("Password is required"),
});
