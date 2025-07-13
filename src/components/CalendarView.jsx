import { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Dialog,
  Box,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import AppointmentForm from "./AppointmentForm";
import MobileDayView from "./MobileDayView";
import {
  getAppointments,
  saveAppointments,
  deleteAppointment,
} from "../utils/storageUtils";

export default function CalendarView({
  month,
  doctorFilter,
  patientFilter,
  newApptDate,
  clearNewApptDate,
}) {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editing, setEditing] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  useEffect(() => {
    if (newApptDate) {
      setSelectedDate(newApptDate);
      setEditing(null);
      setOpen(true);
      clearNewApptDate();
    }
  }, [newApptDate]);

  const handleSave = (appt) => {
    const updated = editing
      ? appointments.map((a) => (a === editing ? appt : a))
      : [...appointments, appt];
    setAppointments(updated);
    saveAppointments(updated);
    setOpen(false);
    setEditing(null);
  };

  const handleDelete = (idx) => {
    deleteAppointment(idx);
    setAppointments(getAppointments());
  };

  const filtered = appointments.filter(
    (a) =>
      (!doctorFilter || a.doctor === doctorFilter) &&
      (!patientFilter || a.patient === patientFilter)
  );

  const firstDay = dayjs(month).startOf("month");
  const lastDay = dayjs(month).endOf("month");

  const leadingBlanks = firstDay.day(); 
  const totalDaysInMonth = lastDay.date();

  const days = [];

  for (let i = 0; i < leadingBlanks; i++) {
    days.push(null);
  }

  for (let i = 1; i <= totalDaysInMonth; i++) {
    const date = firstDay.date(i);
    days.push({ date });
  }

  const totalCells = days.length;
  const trailingBlanks = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < trailingBlanks; i++) {
    days.push(null);
  }

  return (
    <Box>
      {isMobile ? (
        <MobileDayView
          date={selectedDate || dayjs().format("YYYY-MM-DD")}
          appointments={filtered}
          onAdd={(d) => {
            setSelectedDate(d);
            setEditing(null);
            setOpen(true);
          }}
          onDelete={(i) => {
            const daily = filtered.filter((a) => a.date === selectedDate);
            const toDelete = daily[i];
            const idxAll = appointments.findIndex((a) => a === toDelete);
            handleDelete(idxAll);
          }}
        />
      ) : (
        <Grid container spacing={1} justifyContent="center">
          {days.map((dayObj, index) => {
            if (!dayObj) {
              return (
                <Grid item key={`blank-${index}`}>
                  <Box sx={{ width: 170, height: 170 }} />
                </Grid>
              );
            }

            const date = dayObj.date;
            const d = date.format("YYYY-MM-DD");
            const day = date.date();
            const dayName = date.format("ddd");
            const daily = filtered.filter((a) => a.date === d);
            const tooltip = daily.map((a) => `${a.patient} @ ${a.time}`).join("\n");

            return (
              <Grid item key={d}>
                <Tooltip title={tooltip} arrow>
                  <Paper
                    onClick={() => {
                      setSelectedDate(d);
                      setEditing(null);
                      setOpen(true);
                    }}
                    sx={{
                      width: 170,
                      height: 170,
                      p: 1,
                      bgcolor: theme.palette.background.paper,
                      cursor: "pointer",
                      overflowY: "auto",
                      borderRadius: 2,
                      boxSizing: "border-box",
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        {dayName}
                      </Typography>
                      <Typography fontWeight="bold">{day}</Typography>
                    </Box>

                    {daily.map((a, i) => (
                      <Box
                        key={i}
                        mt={0.5}
                        p={0.5}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                          borderRadius: 1,
                          fontSize: "0.75rem",
                          whiteSpace: "nowrap",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDate(d);
                          setEditing(a);
                          setOpen(true);
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="primary.contrastText"
                          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                        >
                          {a.patient} @ {a.time}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ cursor: "pointer", ml: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const idxAll = appointments.findIndex((x) => x === a);
                            handleDelete(idxAll);
                          }}
                        >
                          ✕
                        </Typography>
                      </Box>
                    ))}
                  </Paper>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <AppointmentForm
          date={selectedDate}
          existing={editing}
          onSave={handleSave}
          onClose={() => setOpen(false)}
        />
      </Dialog>
    </Box>
  );
}






