import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";

export default function App() {
  const [darkMode,setDarkMode] = useState(false);
  const logged = localStorage.getItem("isLoggedIn")==="true";
  const theme = createTheme({ palette: { mode: darkMode?"dark":"light" }});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/calendar" element={logged ? <CalendarPage darkMode={darkMode} setDarkMode={setDarkMode}/> : <Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
