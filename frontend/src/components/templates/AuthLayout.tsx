import React from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import { COLORS } from "@/styles/theme";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      bgcolor: COLORS.mainBg,
      background: `radial-gradient(circle, ${COLORS.mainBg} 0%, #D1D8D8 100%)`,
    }}
  >
    <CssBaseline />
    <Container maxWidth="sm">{children}</Container>
  </Box>
);
export default AuthLayout;
