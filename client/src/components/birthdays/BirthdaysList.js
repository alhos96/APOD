import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, Link, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import "./birthdays.css";

function BirthdaysList({ allBirthdays, setCurrentDate }) {
  const navigate = useNavigate();

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
              <TableCell key="actions">Actions</TableCell>
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
                      setCurrentDate(e.target.id);
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
                    {
                      <>
                        <Link
                          className="table-link link"
                          onClick={(e) => navigate(`/birthdays/edit-birthday/${e.target.id}`)}
                          id={birthday._id}
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
                            setShowModal("block");
                            setId(e.target.id);
                          }}
                        >
                          Delete
                        </Link>
                      </>
                    }
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
