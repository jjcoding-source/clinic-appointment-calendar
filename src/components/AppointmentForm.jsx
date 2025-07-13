import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { patients, doctors } from "../data/staticData";

export default function AppointmentForm({ date, existing, onSave, onClose }) {
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (existing) {
      setPatient(existing.patient);
      setDoctor(existing.doctor);
      setTime(existing.time);
    } else {
      setPatient("");
      setDoctor("");
      setTime("");
    }
  }, [existing]);

  const handleSubmit = () => {
    if (patient && doctor && time) {
      onSave({ date, patient, doctor, time });
      onClose(); // Close after save
    }
  };

  return (
    <>
      {/* Dialog Title with Close Button */}
      <DialogTitle sx={{ m: 0, p: 2, pr: 5 }}>
        Appointment Form
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Form Fields */}
      <DialogContent dividers>
        <TextField
          label="Patient"
          fullWidth
          select
          margin="normal"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
        >
          {patients.map((p) => (
            <MenuItem key={p.id} value={p.name}>
              {p.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Doctor"
          fullWidth
          select
          margin="normal"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          {doctors.map((d) => (
            <MenuItem key={d.id} value={d.name}>
              {d.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Appointment Time"
          type="time"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </DialogContent>

      {/* Action Buttons */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="contained" onClick={handleSubmit} disabled={!patient || !doctor || !time}>
          Save
        </Button>
      </DialogActions>
    </>
  );
}



