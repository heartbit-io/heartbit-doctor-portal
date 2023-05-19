"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Page = () => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
  }, []);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <img src="img/logo_lg.svg" />
        <Typography textAlign={"center"} variant="h5" mt={5} mb={3}>
          Check your email inbox
        </Typography>
        <Typography textAlign={"center"} variant="body1">
          We have sent an email to:{" "}
        </Typography>
        <Typography textAlign={"center"} variant="body1" fontWeight={"bold"}>
          {email}
        </Typography>
      </Box>
    </Box>
  );
};

export default Page;
