import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Enter valid email").required("Email is requiered"),
  phone: yup.string().min(8, "Please enter valid phone number").required("You must enter phone number!"),
  birthday: yup.string().required("You must enter birthday!"),
});
