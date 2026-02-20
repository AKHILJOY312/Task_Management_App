import { Grid, Paper, Typography, Box } from "@mui/material";
import { COLORS, MONO_FONT } from "@/styles/theme";
import { useTasks } from "@/hooks/useTasks";

const StatsPage = () => {
  const boardId = "default";
  const { tasks = [] } = useTasks(boardId); //  defensive default

  const completed = tasks.filter((t) => t.status === "done").length;
  const pending = tasks.length - completed;

  const stats = [
    { label: "TOTAL_SEQUENCES", value: tasks.length, color: COLORS.accent },
    { label: "COMPLETED_TASKS", value: completed, color: "#4CAF50" },
    { label: "PENDING_OPERATIONS", value: pending, color: "#2196F3" },
  ];

  const isEmpty = tasks.length === 0;

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

      {isEmpty ? (
        <Box
          sx={{
            p: 6,
            textAlign: "center",
            border: `1px dashed ${COLORS.border}`,
            borderRadius: 4,
            bgcolor: "rgba(0,0,0,0.02)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            No data available
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Stats will appear once tasks are created.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {stats.map((s) => (
            <Grid size={{ xs: 12, md: 4 }} key={s.label}>
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
                  sx={{
                    fontFamily: MONO_FONT,
                    fontWeight: 900,
                    color: s.color,
                  }}
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
      )}
    </Box>
  );
};

export default StatsPage;
