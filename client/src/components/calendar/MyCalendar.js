import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";

import Logo from "../utils/Logo";
import BirthdaysList from "../birthdays/BirthdaysList";
import "./calendar.css";
import { Typography } from "@mui/material";
import MyModal from "../modal/MyModal";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [allBirthdays, setAllBirthdays] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // get all birthdays data
  useEffect(() => {
    const getBirthdays = async () => {
      try {
        let data = axios.get("http://localhost:5000/api/calendar").then((res) => {
          setAllBirthdays(res.data);
          setCurrentDate(res.data[0]?.birthday);
        });

        if (!data) throw new Error("No movies recieved...");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getBirthdays();
  }, []);

  if (isLoading) return <p>...Loading</p>;

  return (
    <div className="calendar">
      {selectedBirthday && <MyModal selectedBirthday={selectedBirthday} setSelectedBirthday={setSelectedBirthday} />}

      <div className="calendar-logo">
        <Logo />
      </div>

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
        <BirthdaysList allBirthdays={allBirthdays} setCurrentDate={setCurrentDate} />
      ) : (
        <Typography textAlign="center" variant="body2" className="warning" color="secondary">
          Something went wrong when fetching birthdays. Check connections and refresh page or click on logo to add birthday..
        </Typography>
      )}
    </div>
  );
}

export default MyCalendar;
