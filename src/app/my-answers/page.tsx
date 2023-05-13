"use client";
import React from "react";
import { NavBar } from "`@/components`";
import { Box, Container, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box>
      <NavBar />
      <Container maxWidth={false}>
        <Typography variant="h3" mt={5} mb={5} sx={{ fontWeight: "bold" }}>
          My Answers
        </Typography>
      </Container>
    </Box>
  );
}
