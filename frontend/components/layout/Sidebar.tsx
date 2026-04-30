"use client";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Box,Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

export default function Sidebar() {
  const router = useRouter();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          backgroundColor: '#1e293b', // Dark slate for a premium look
          color: 'white'
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>WeatherApp</Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/dashboard")}>
              <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/login")}>
              <ListItemText primary="Logout" sx={{ color: 'gray' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}