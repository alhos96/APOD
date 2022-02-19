import { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./admin.css";
import Logo from "../utils/Logo";
import { validationSchema } from "./validations";

function Form() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: { name: "", password: "" },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      axios
        .post(`http://localhost:5000/admin`, values)
        .then((res) => {
          sessionStorage.setItem("token", res.data);
          navigate("/calendar");
        })
        .catch((err) => {
          console.log(err.response);
          setErrorMessage(err.response.data);
        });
      //
    },
  });

  return (
    <Grid container spacing={2} className="form-wrapp">
      <Grid item xs={12} md={6}>
        <Logo />
      </Grid>

      <Grid item xs={12} md={6} className="login-form">
        <form onSubmit={formik.handleSubmit} className="form-container">
          <TextField
            name="name"
            label="name"
            variant="outlined"
            color="primary"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            size="small"
            sx={{ mb: 2, mt: 3 }}
          />

          <TextField
            name="password"
            label="password"
            variant="outlined"
            color="primary"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />

          <Typography color="secondary">{errorMessage}</Typography>

          <Button children="submit" type="submit" color="primary" variant="outlined" size="small" fullWidth sx={{ mt: 2, mb: 2 }} />
          <Typography onClick={() => navigate("/")} variant="body1" textAlign="center" className="clickable">
            {" "}
            Return to users panel?
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
}

export default Form;
