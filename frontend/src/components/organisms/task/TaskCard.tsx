import React from "react";
import { Paper, Typography, Box, Chip } from "@mui/material";
import { COLORS, MONO_FONT } from "@/styles/theme";
import type { Task } from "@/types";

const statusColorMap = {
  todo: "#9E9E9E",
  "in-progress": "#FF9B51",
  done: "#4CAF50",
};

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const formattedDate = new Date(task.createdAt).toLocaleDateString();

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        p: 2,
        bgcolor: COLORS.cardSurface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontFamily: MONO_FONT,
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        {task.title.toUpperCase()}
      </Typography>

      {task.description && (
        <Typography
          variant="body2"
          sx={{
            fontFamily: MONO_FONT,
            opacity: 0.7,
            lineHeight: 1.4,
          }}
        >
          {task.description}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Chip
          label={task.status.toUpperCase()}
          size="small"
          sx={{
            fontSize: "0.65rem",
            fontFamily: MONO_FONT,
            bgcolor: statusColorMap[task.status],
            color: "#fff",
            height: 20,
          }}
        />

        <Typography
          variant="caption"
          sx={{
            fontFamily: MONO_FONT,
            opacity: 0.6,
          }}
        >
          {formattedDate}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TaskCard;
