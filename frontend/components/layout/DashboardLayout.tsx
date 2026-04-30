"use client";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const drawerWidth = 240;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline /> {/* This resets browser styles for MUI */}
      
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // Dynamic width
          backgroundColor: '#f8fafc', // Light gray background
          minHeight: '100vh',
        }}
      >
        <Navbar />
        {/* Added a margin top to push content below the AppBar */}
        <Box sx={{ mt: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}