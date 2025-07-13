import { Box, Button, Typography, TextField } from "@mui/material";
import dayjs from "dayjs";

export default function MobileDayView({ date, appointments, onAdd, onDelete }) {
  const daily = appointments.filter(a => a.date === date);
  return (
    <Box>
      <TextField
        label="Select Date" type="date" fullWidth margin="normal"
        value={date} onChange={e => onAdd(e.target.value)}
      />
      <Button variant="contained" fullWidth onClick={()=>onAdd(date)}>+ Add Appointment</Button>
      {daily.length===0 ? (
        <Typography mt={2}>No appointments on {dayjs(date).format('MMM D, YYYY')}</Typography>
      ) : daily.map((appt,i)=>(
        <Box key={i} mt={2} p={2} display="flex" justifyContent="space-between" border={1} borderRadius={1}>
          <Typography>{appt.time} — {appt.patient} ({appt.doctor})</Typography>
          <Typography color="error" sx={{cursor:'pointer'}} onClick={()=>onDelete(i)}>✕</Typography>
        </Box>
      ))}
    </Box>
  );
}
