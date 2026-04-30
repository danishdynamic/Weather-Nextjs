"use client";

import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts";
import { Box } from "@mui/material";

// Define the shape of the data for TypeScript
interface WeatherChartProps {
  data: {
    time: string;
    temp: number;
  }[];
}

export default function WeatherChart({ data }: WeatherChartProps) {
  return (
    <Box sx={{ width: "100%", height: 300, mt: 2 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#666" }}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "#666" }}
            unit="°"
          />
          
          <Tooltip 
            contentStyle={{ 
              borderRadius: "8px", 
              border: "none", 
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" 
            }} 
          />
          
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#1976d2" 
            strokeWidth={3}
            dot={{ r: 4, fill: "#1976d2" }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}