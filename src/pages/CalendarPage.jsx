import { Container, Typography, Box, Switch, FormControlLabel, Button, Paper, IconButton, Fab, useTheme, useMediaQuery } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import TodayIcon from "@mui/icons-material/Today";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import CalendarView from "../components/CalendarView";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";

export default function CalendarPage({ darkMode, setDarkMode }) {
  const [doctorFilter, setDoctorFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [currentMonth, setCurrentMonth] = useState(dayjs().toDate());
  const [openFormDate, setOpenFormDate] = useState(null);

  const nav = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const prev =()=>setCurrentMonth(d=>dayjs(d).subtract(1,"month").toDate());
  const next =()=>setCurrentMonth(d=>dayjs(d).add(1,"month").toDate());
  const today=()=>setCurrentMonth(dayjs().toDate());
  const logout=()=>{ localStorage.removeItem("isLoggedIn"); nav("/"); };

  return (
    <Container maxWidth="lg" sx={{mt:4}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexDirection={isMobile?"column":"row"}>
        <Typography variant="h4">Appointment Calendar</Typography>
        <Box>
          <FormControlLabel control={<Switch checked={darkMode} onChange={()=>setDarkMode(d=>!d)}/>} label="Dark Mode"/>
          <Button variant="outlined" color="error" startIcon={<LogoutIcon/>} onClick={logout}>Logout</Button>
        </Box>
      </Box>
      <Paper sx={{p:2,mb:2}} elevation={2}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton onClick={prev}><ArrowBackIos/></IconButton>
          <Typography sx={{mx:2}} variant="h6">
            {dayjs(currentMonth).format("MMMM YYYY")}
          </Typography>
          <IconButton onClick={next}><ArrowForwardIos/></IconButton>
          <Button sx={{ml:2}} startIcon={<TodayIcon/>} onClick={today}>Today</Button>
        </Box>
        <FilterBar selectedDoctor={doctorFilter} setSelectedDoctor={setDoctorFilter} selectedPatient={patientFilter} setSelectedPatient={setPatientFilter}/>
      </Paper>
      <CalendarView
        month={currentMonth}
        doctorFilter={doctorFilter}
        patientFilter={patientFilter}
        newApptDate={openFormDate}
        clearNewApptDate={()=>setOpenFormDate(null)}
      />
      {!isMobile && <Fab color="primary" sx={{position:"fixed",bottom:32,right:32}} onClick={()=>setOpenFormDate(dayjs().format("YYYY-MM-DD"))}><AddIcon/></Fab>}
    </Container>
  );
}




