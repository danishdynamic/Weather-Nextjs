"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import { saveToken } from "@/lib/auth";
import { Box, Button, TextField, Typography, Paper, Container,Alert } from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
      });

      if (res.data.token) {
        saveToken(res.data.token);
        router.push("/dashboard"); 
      }
    } catch (err: any) {
      console.error("Login failed", err);
      setError(err.response?.data?.message || "Login failed. Ensure backend is running at port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
                Weather App Login
            </Typography>
          
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
            Enter your username to access the India Weather Dashboard
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              autoFocus
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}