import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/App.css";
import { MyCalendar, Form } from "./components";

function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/calendar" element={<MyCalendar />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
