import { useState } from "react";
import { TextField, Button, Divider, Typography, Grid } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useFormik, useField } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./form.css";
import Logo from "../utils/Logo";
import { validationSchema } from "./validations";

function Form() {
  const navigate = useNavigate();

  const [photoPreview, setPhotoPreview] = useState("");

  const formik = useFormik({
    initialValues: { name: "", email: "", birthday: "", phone: "", img: "" },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      const newBirthday = new FormData();

      newBirthday.append("img", values.img);
      newBirthday.append("name", values.name);
      newBirthday.append("birthday", values.birthday);
      newBirthday.append("phone", values.phone);
      newBirthday.append("email", values.email);

      axios
        .post(`http://localhost:5000/api/form`, newBirthday)
        .then((res) => {
          navigate("/calendar");
        })
        .catch((err) => {
          console.log(err);
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
        {photoPreview && <img id="uploaded-image" src={photoPreview} alt="uploaded"></img>}

        <form onSubmit={formik.handleSubmit} className="form-container">
          <label className="upload-photo" htmlFor="img">
            {!photoPreview && <CameraAltOutlinedIcon color="primary" className="camera-icon" />}

            <Typography className="upload-photo-title" variant="body2" fontSize="small" color="primary">
              {!photoPreview ? "Upload Photo. Photo is required." : "Choose Different?"}
            </Typography>

            <input
              style={{ display: "none" }}
              onChange={(e) => {
                setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                formik.values.img = e.target.files[0];
              }}
              id="img"
              type="file"
              name="img"
            />
          </label>

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
            name="birthday"
            type="date"
            value={formik.values.birthday}
            onChange={formik.handleChange}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />

          <TextField
            name="email"
            label="e-mail"
            variant="outlined"
            color="primary"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />

          <TextField
            name="phone"
            label="phone number"
            variant="outlined"
            color="primary"
            type="number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />

          {/* button will remain disabled until photo is uploaded*/}
          <Button
            children="submit"
            type="submit"
            color="primary"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!photoPreview}
          />
        </form>
      </Grid>
    </Grid>
  );
}

export default Form;
