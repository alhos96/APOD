import React, { useState } from "react";
import { Box, Divider, Typography, Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import "./birthdays.css";

function BirthdaysList({ allBirthdays, setAllBirthdays, setCurrentDate }) {
  const navigate = useNavigate();

  // global state
  const adminIsLoggedIn = sessionStorage.getItem("token");

  const [showModal, setShowModal] = useState("none");
  const [id, setId] = useState("");

  return (
    <Box className="birthday-list-wrapp">
      <Divider textAlign="left">
        <Typography>All Birthdays</Typography>
      </Divider>
      <Box className="table-wrapp">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key="photo" onClick={(e) => console.log(e)}></TableCell>
              <TableCell key="name" onClick={(e) => console.log(e)}>
                Name
              </TableCell>
              <TableCell key="birthday">Birthday</TableCell>
              <TableCell key="email">Email</TableCell>
              <TableCell key="phone">Phone</TableCell>
              {adminIsLoggedIn && <TableCell key="actions">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {allBirthdays.map((birthday, index) => {
              return (
                <TableRow key={birthday._id}>
                  <TableCell width="5px" align="left">
                    <img className="avatar" src={`http://localhost:5000/uploads/${birthday.photo}`} />
                  </TableCell>
                  <TableCell width="5px" align="left">
                    {birthday.name}
                  </TableCell>

                  <TableCell
                    id={birthday.birthday}
                    onClick={(e) => {
                      // convert string to Date to avoid errors
                      setCurrentDate(new Date(e.target.id));
                      window.scrollTo({
                        top: 175,
                        behavior: "smooth",
                      });
                    }}
                    className="clickable"
                    width="5px"
                    align="left"
                  >
                    {moment(birthday.birthday).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell width="5px" align="left">
                    {birthday.email}
                  </TableCell>
                  <TableCell width="5px" align="left">
                    {birthday.phone}
                  </TableCell>
                  <TableCell width="5px">
                    {adminIsLoggedIn && (
                      <>
                        <Link
                          className="table-link link"
                          id={birthday._id}
                          onClick={(e) => navigate(`/edit/${e.target.id}`)}
                          sx={{ mr: 1 }}
                          size="small"
                        >
                          Edit
                        </Link>
                        <Link
                          className="table-link link"
                          id={birthday._id}
                          size="small"
                          onClick={(e) => {
                            console.log(e.target.id);
                            axios.delete(`http://localhost:5000/api/${e.target.id}`).then((res) => setAllBirthdays(res.data));
                          }}
                        >
                          Delete
                        </Link>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default BirthdaysList;
