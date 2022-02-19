import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Typography } from "@mui/material";
import moment from "moment";
import axios from "axios";

import "./calendar.css";
import Logo from "../utils/Logo";
import Loader from "../utils/Loader";
import BirthdaysList from "../birthdays/BirthdaysList";
import MyModal from "../modal/MyModal";
import AdminLogoutButton from "./AdminLogoutButton";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [allBirthdays, setAllBirthdays] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // global state
  const adminIsLoggedIn = sessionStorage.getItem("token");

  // get all birthdays data
  useEffect(() => {
    const getBirthdays = async () => {
      try {
        let data = await axios.get("http://localhost:5000/api/calendar").then((res) => {
          setAllBirthdays(res.data);

          // prevent app from crashing when no birthdays are returend and undefined is passed to Date.
          res.data.length > 0 && setCurrentDate(new Date(res.data[0]?.birthday));
        });

        if (!data) throw new Error("No birthdays recieved...");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getBirthdays();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="calendar">
      {selectedBirthday && <MyModal selectedBirthday={selectedBirthday} setSelectedBirthday={setSelectedBirthday} />}

      <div className="calendar-logo">
        <Logo />
      </div>

      {adminIsLoggedIn && <AdminLogoutButton />}

      <Calendar
        localizer={localizer}
        events={allBirthdays}
        // always open calendar on birthday created last
        date={currentDate}
        onNavigate={(date) => {
          // enable navigation
          setCurrentDate(date);
        }}
        views={["month"]}
        style={{ height: "100vh" }}
        onSelectEvent={(e) => {
          // trigger modal open on click of birthday
          setSelectedBirthday(e);
        }}
      />

      {allBirthdays.length > 0 ? (
        <BirthdaysList allBirthdays={allBirthdays} setAllBirthdays={setAllBirthdays} setCurrentDate={setCurrentDate} />
      ) : (
        <Typography textAlign="center" variant="body2" className="warning" color="secondary">
          Something went wrong when fetching birthdays. Check connections and refresh page or click on logo to add birthday..
        </Typography>
      )}
    </div>
  );
}

export default MyCalendar;
