"use client";

import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Search } from "lucide-react"; 

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState("");


  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onSearch(city);
    }
  };

  return (
    <Box 
      className="flex gap-2 bg-white p-4 rounded-2xl shadow-sm mb-6"
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        // Ensuring it looks good on mobile and desktop
        flexDirection: { xs: 'column', sm: 'row' } 
      }}
    >
      <TextField
        fullWidth
        size="small"
        label="Search City in India..."
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
      />
      <Button 
        variant="contained" 
        onClick={() => onSearch(city)}
        disabled={!city.trim()} // Disable if input is empty
        startIcon={<Search size={18} />} // Optional icon
        sx={{ 
          borderRadius: '12px', 
          px: 4,
          py: 1,
          textTransform: 'none', // Keeps "Search" from being all caps
          fontWeight: 'bold',
          minWidth: { sm: '120px' },
          width: { xs: '100%', sm: 'auto' }
        }}
      >
        Search
      </Button>
    </Box>
  );
}