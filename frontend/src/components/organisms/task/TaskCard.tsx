import React from "react";
import { Paper, Typography, Box, Chip, Avatar } from "@mui/material";
import { COLORS, MONO_FONT } from "@/styles/theme";
import type { Task } from "@/types/index";

const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      mb: 2,
      bgcolor: COLORS.cardSurface,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 2,
    }}
  >
    <Typography
      variant="subtitle2"
      sx={{ fontFamily: MONO_FONT, fontWeight: 700 }}
    >
      {task.title.toUpperCase()}
    </Typography>
    <Box
      display="flex"
      justifyContent="space-between"
      mt={2}
      alignItems="center"
    >
      <Chip
        label={task.deadline}
        size="small"
        sx={{ fontSize: "0.6rem", fontFamily: MONO_FONT }}
      />
      <Avatar
        sx={{
          width: 24,
          height: 24,
          fontSize: "0.7rem",
          bgcolor: COLORS.primaryUI,
        }}
      >
        {task.assignee[0]}
      </Avatar>
    </Box>
  </Paper>
);
export default TaskCard;
