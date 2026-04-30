"use client";

import { Card, CardContent, Typography } from "@mui/material";

export default function WeatherCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" className="mt-2">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}