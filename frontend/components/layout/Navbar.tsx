"use client";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'white', 
        color: 'black',
        borderBottom: '1px solid #e2e8f0',
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
          Weather Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}