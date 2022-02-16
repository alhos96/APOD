import * as yup from "yup";

export const validationSchema = yup.object({
  //img: yup.string().required("Image is required!"),
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Enter valid email").required("Email is requiered"),
  phone: yup.number().required("You must enter phone number!"),
  birthday: yup.string().required("You must enter birthday!"),
});
