import React, { Children, useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";

import logo from "../../assets/images/logo.svg";
import Logo from "../utils/Logo";
import BirthdaysList from "../birthdays/BirthdaysList";
import "./calendar.css";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [allBirthdays, setAllBirthdays] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // decide in which cell a birthday will be shown
  const BirthdayCell = ({ children, value }) => {
    let dayInMonth = value;

    return React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        background: dayInMonth === currentDate && `url(${logo})`,
      },
    });
  };

  console.log(currentDate);

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
    <div>
      <div className="calendar-logo">
        <Logo />
      </div>

      <Calendar
        localizer={localizer}
        events={allBirthdays}
        // always open calendar on birthday created last
        //defaultDate={currentDate}
        date={currentDate}
        onNavigate={(date) => {
          setCurrentDate(date);
        }}
        views={["month"]}
        style={{ height: "100vh" }}
        onSelectEvent={(e) => {
          // trigger modal open on click of birthday
          console.log(e);
        }}
        onSelectSlot={(e) => console.log("s")}
        onClick={() => console.log("fsirst")}
        on
        components={{
          dateCellWrapper: BirthdayCell,
        }}
      />

      <BirthdaysList allBirthdays={allBirthdays} setCurrentDate={setCurrentDate} />
    </div>
  );
}

export default MyCalendar;
