import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

const DoubleButton = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      mb={4}
    >
      <Stack spacing={5} direction="row">
        <Stack spacing={1} direction="row">
          <Typography sx={{ fontWeight: "bold" }}>Bounty:</Typography>
          <Typography>1,000sats</Typography>
        </Stack>
        <Stack spacing={1} direction="row">
          <Typography sx={{ fontWeight: "bold" }}>Date:</Typography>
          <Typography>10:49AM, 9th Mar 2023</Typography>
        </Stack>
      </Stack>
      <Stack spacing={1} direction="row">
        <Button
          variant="text"
          size="large"
          sx={{ color: "#3A3A3C", padding: "8px 60px" }}
        >
          Pass
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#34C759", padding: "8px 60px" }}
        >
          Take
        </Button>
      </Stack>
    </Box>
  );
};

export default DoubleButton;
