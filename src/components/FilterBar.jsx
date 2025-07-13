import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { doctors, patients } from "../data/staticData";

export default function FilterBar({ selectedDoctor, setSelectedDoctor, selectedPatient, setSelectedPatient }) {
  return (
    <Box display="flex" gap={2} mb={2}>
      <FormControl fullWidth>
        <InputLabel>Doctor</InputLabel>
        <Select value={selectedDoctor} onChange={e=>setSelectedDoctor(e.target.value)} label="Doctor">
          <MenuItem value="">All Doctors</MenuItem>
          {doctors.map(d => <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Patient</InputLabel>
        <Select value={selectedPatient} onChange={e=>setSelectedPatient(e.target.value)} label="Patient">
          <MenuItem value="">All Patients</MenuItem>
          {patients.map(p => <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
