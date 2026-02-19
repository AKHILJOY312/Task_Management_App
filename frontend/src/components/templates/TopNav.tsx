import React from "react";
import { Box, Container, Typography, Tabs, Tab, Button } from "@mui/material";

import { COLORS, MONO_FONT } from "@/styles/theme";

import { useNavigate, useLocation } from "react-router-dom";

interface TopNavProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (b: boolean) => void;
}

const TopNav: React.FC<TopNavProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight the tab based on the current URL
  const currentTab = location.pathname === "/stats" ? "stats" : "board";

  return (
    <Box sx={{ bgcolor: COLORS.primaryUI, color: "white" }}>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <Typography
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", fontFamily: MONO_FONT }}
        >
          TERMINAL_OS
        </Typography>

        <Tabs
          value={currentTab}
          onChange={(_, newValue) =>
            navigate(newValue === "stats" ? "/stats" : "/")
          }
          textColor="inherit"
        >
          <Tab value="board" label="BOARD" />
          <Tab value="stats" label="STATS" />
        </Tabs>

        <Box>
          {!isLoggedIn ? (
            <Button onClick={() => navigate("/login")} color="inherit">
              LOGIN
            </Button>
          ) : (
            <Button onClick={() => setIsLoggedIn(false)} color="inherit">
              LOGOUT
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TopNav;
