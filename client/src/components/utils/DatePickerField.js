import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

function DatePickerField({ onChange, value }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/dd/yyyy"
        name="date"
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default DatePickerField;
