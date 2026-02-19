import React from "react";
import {
  Box,
  CssBaseline,
  Container,
  Paper,
  InputBase,
  Button,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import { COLORS, MONO_FONT } from "@/styles/theme";
import TopNav from "./TopNav";
import type { ViewType } from "@/types";

interface LayoutProps {
  children: React.ReactNode;
  view: ViewType;
  // REMOVE setView from here
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAddTask: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (b: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  view,
  searchQuery,
  setSearchQuery,
  onAddTask,
  isLoggedIn,
  setIsLoggedIn,
}) => (
  <Box
    sx={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      bgcolor: COLORS.mainBg,
      overflow: "hidden",
    }}
  >
    <CssBaseline />
    <TopNav view={view} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

    {/* Search bar only visible on board/stats */}
    {(view === "board" || view === "stats") && (
      <Box
        sx={{
          width: "100%",
          bgcolor: "white",
          borderBottom: `1px solid ${COLORS.border}`,
          py: 1.5,
        }}
      >
        <Container maxWidth={false} sx={{ px: 4, display: "flex", gap: 2 }}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              px: 2,
              bgcolor: COLORS.mainBg,
            }}
          >
            <Search sx={{ color: COLORS.primaryUI, opacity: 0.5 }} />
            <InputBase
              placeholder="SEARCH_DB..."
              fullWidth
              sx={{ ml: 1, fontFamily: MONO_FONT }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Paper>
          <Button
            variant="contained"
            onClick={onAddTask}
            startIcon={<Add />}
            sx={{ bgcolor: COLORS.primaryUI, fontFamily: MONO_FONT }}
          >
            NEW_TASK
          </Button>
        </Container>
      </Box>
    )}

    <Box sx={{ flexGrow: 1, overflowY: "auto", p: 4 }}>
      <Container maxWidth={false}>{children}</Container>
    </Box>
  </Box>
);
export default Layout;
