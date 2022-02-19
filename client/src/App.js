import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/App.css";
import { MyCalendar, Form, Admin, EditForm } from "./components";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditForm />
              </PrivateRoute>
            }
          />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
