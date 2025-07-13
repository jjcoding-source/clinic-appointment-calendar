import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (trimmedEmail === "staff@clinic.com" && trimmedPass === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/calendar");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://www.socra.org/blog/wp-content/uploads/2019/07/bannerNew1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 360,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          align="center"
          color="primary"
        >
          Clinic Staff Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            size="large"
            sx={{ fontWeight: "bold" }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

