import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { COLORS, MONO_FONT } from "@/styles/theme";
import type { Task } from "@/types/index";

const StatsPage: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const stats = [
    { label: "TOTAL_SEQUENCES", value: tasks.length, color: COLORS.accent },
    {
      label: "COMPLETED_TASKS",
      value: tasks.filter((t) => t.status === "done").length,
      color: "#4CAF50",
    },
    {
      label: "PENDING_OPERATIONS",
      value: tasks.filter((t) => t.status !== "done").length,
      color: "#2196F3",
    },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: MONO_FONT,
          fontWeight: 900,
          mb: 4,
          color: COLORS.primaryUI,
        }}
      >
        SYSTEM_DIAGNOSTICS
      </Typography>
      <Grid container spacing={4}>
        {stats.map((s) => (
          <Grid item xs={12} md={4} key={s.label}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: COLORS.primaryUI,
                borderRadius: 4,
                border: `2px solid ${s.color}`,
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontFamily: MONO_FONT, fontWeight: 900, color: s.color }}
              >
                {s.value}
              </Typography>
              <Typography
                variant="button"
                sx={{ color: "white", opacity: 0.7, letterSpacing: 2 }}
              >
                {s.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsPage;
