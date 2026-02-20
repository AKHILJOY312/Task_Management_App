import { useMemo } from "react";
import { Grid, Box, Typography } from "@mui/material";

import { COLORS } from "@/styles/theme";
import TaskCard from "../organisms/task/TaskCard";
import { useTasks } from "@/hooks/useTasks";

const BoardPage = () => {
  const boardId = "default";
  const { tasks = [] } = useTasks(boardId); // defensive default

  const grouped = useMemo(() => {
    const map = {
      Planned: [] as typeof tasks,
      "In Progress": [] as typeof tasks,
      Completed: [] as typeof tasks,
    };

    for (const t of tasks) {
      if (t.status === "todo") map.Planned.push(t);
      else if (t.status === "inprogress") map["In Progress"].push(t);
      else if (t.status === "done") map.Completed.push(t);
    }

    return map;
  }, [tasks]);

  const isEmpty = tasks.length === 0;

  return (
    <Grid container spacing={3}>
      {Object.entries(grouped).map(([status, list]) => (
        <Grid size={{ xs: 12, md: 4 }} key={status}>
          <Typography
            variant="overline"
            sx={{ fontWeight: 800, color: COLORS.primaryUI }}
          >
            {status} [{list.length}]
          </Typography>

          <Box
            sx={{
              minHeight: "60vh",
              p: 2,
              bgcolor: "rgba(0,0,0,0.03)",
              borderRadius: 4,
              border: `1px dashed ${COLORS.border}`,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: list.length === 0 ? "center" : "flex-start",
              alignItems: "center",
            }}
          >
            {list.length === 0 ? (
              <Typography
                variant="body2"
                sx={{ opacity: 0.6, fontStyle: "italic" }}
              >
                No tasks
              </Typography>
            ) : (
              list.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </Box>
        </Grid>
      ))}

      {isEmpty && (
        <Grid size={12}>
          <Box
            sx={{
              mt: 4,
              p: 4,
              textAlign: "center",
              border: `1px dashed ${COLORS.border}`,
              borderRadius: 4,
              bgcolor: "rgba(0,0,0,0.02)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              No tasks yet
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Create your first task to start organizing your workflow.
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default BoardPage;
