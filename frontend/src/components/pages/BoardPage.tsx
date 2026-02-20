import React from "react";
import { Grid, Box, Typography } from "@mui/material";

import type { Task } from "@/types/index";
import { COLORS } from "@/styles/theme";
import TaskCard from "../organisms/task/TaskCard";

const BoardPage: React.FC<{ tasks: Task[] }> = ({ tasks }) => (
  <Grid container spacing={3}>
    {["Planned", "In Progress", "Completed"].map((status) => (
      <Grid size={{ xs: 12, md: 4 }} key={status}>
        <Typography
          variant="overline"
          sx={{ fontWeight: 800, color: COLORS.primaryUI }}
        >
          {status} [{tasks.filter((t) => t.status === status).length}]
        </Typography>

        <Box
          sx={{
            minHeight: "60vh",
            p: 2,
            bgcolor: "rgba(0,0,0,0.03)",
            borderRadius: 4,
            border: `1px dashed ${COLORS.border}`,
          }}
        >
          {tasks
            .filter((t) => t.status === status)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default BoardPage;
