import "./form.css";
import React, { useState, useEffect } from "react";
import { Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import moment from "moment";

import Logo from "../utils/Logo";
import { validationSchema } from "./validations";

function EditForm() {
  //helpers
  const navigate = useNavigate();
  const url = window.location.pathname;

  // local state

  const [photoPreview, setPhotoPreview] = useState("");
  const [singleBirthday, setSingleBirthday] = useState(false);
  const [message, setMessage] = useState("");

  // side effects

  useEffect(() => {
    const getBirthday = async () => {
      try {
        let data = await axios.get(`http://localhost:5000/api/${url}`).then((res) => {
          setSingleBirthday(res.data);
          setPhotoPreview(`http://localhost:5000/uploads/${res.data.photo}`);

          // prevent adding dates from future in date input field
          let today = moment().toDate();
          document.getElementById("my-date").max = moment(today).format("YYYY-MM-DD");
        });

        if (!data) throw new Error("No birthdays recieved...");
      } catch (error) {
        console.log(error);
      }
    };

    getBirthday();
  }, []);

  return (
    <>
      {singleBirthday && (
        <Grid container spacing={1} className="form-wrapp">
          <Grid item xs={12} md={6}>
            <Logo />
          </Grid>

          <Grid item xs={12} md={6} className="birthday-form">
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                img: singleBirthday.photo,
                name: singleBirthday.name,
                email: singleBirthday.email,
                birthday: moment(singleBirthday.birthday).format("YYYY-MM-DD"),
                phone: singleBirthday.phone,
              }}
              onSubmit={(values) => {
                const newBirthday = new FormData();

                newBirthday.append("img", values.img);
                newBirthday.append("name", values.name);
                newBirthday.append("birthday", values.birthday);
                newBirthday.append("phone", values.phone);
                newBirthday.append("email", values.email);

                axios
                  .patch(`http://localhost:5000/api/${url}`, newBirthday)
                  .then((res) => {
                    setMessage("Updated successfuly!");
                    setTimeout(() => {
                      navigate("/calendar");
                    }, 2000);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {({ values }) => (
                <Form encType="multipart/form-data" style={{ width: "100%" }}>
                  <label className="upload-photo" htmlFor="img">
                    {photoPreview && <img id="uploaded-image" src={photoPreview} alt="uploaded"></img>}
                    {!photoPreview && <CameraAltOutlinedIcon color="primary" className="camera-icon" />}
                    <Typography className="upload-photo-title" variant="body2" color="primary">
                      {!photoPreview ? "Upldoad Photo. Photo is required." : "Choose Different?"}
                    </Typography>
                    <input
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                        values.img = e.target.files[0];
                      }}
                      id="img"
                      type="file"
                      name="img"
                    />
                  </label>
                  <br></br>

                  <label htmlFor="name">Name:</label>
                  <Field name="name" type="text" className="text-input" />

                  <label htmlFor="birthday">Birthday:</label>
                  <Field id="my-date" name="birthday" type="date" className="text-input" />

                  <label htmlFor="email">Email:</label>
                  <Field name="email" type="email" className="text-input" />

                  <label htmlFor="phone">Phone:</label>
                  <Field name="phone" type="number" className="text-input" />

                  <Button size="small" variant="outlined" type="submit" children="submit" fullWidth sx={{ mt: 2, mb: 2 }} />

                  <Button
                    children="cancel"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => {
                      navigate("/calendar");
                    }}
                  />

                  <p>{message}</p>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default EditForm;
