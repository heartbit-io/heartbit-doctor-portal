"use client";
import React from "react";
import { Button, Box } from "@mui/material";

const Page = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <img src="img/logo_lg.svg" />
        <Button
          variant="outlined"
          sx={{
            mt: 5,
            borderRadius: 3,
            backgroundColor: "#fff",
            borderColor: "#F68F2A",
            borderWidth: 2,
            color: "#F68F2A",
            "&:hover": {
              borderWidth: 2,
              borderColor: "#F68F2A",
              backgroundColor: "#F68F2A",
              color: "#fff",
            },
          }}
          fullWidth
          size="large"
        >
          Sign in with app
        </Button>
      </Box>
    </Box>
  );
};

export default Page;
