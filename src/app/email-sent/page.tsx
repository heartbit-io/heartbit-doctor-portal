"use client";
import React, { useEffect, useState } from "react";
import { Box, Link, Typography } from "@mui/material";

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
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src="img/logo_lg.svg" />
        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          variant="h5"
          mt={5}
          mb={3}
        >
          Check your email inbox
        </Typography>
        <Typography textAlign={"center"} variant="body1">
          We have sent an email to:{" "}
        </Typography>
        <Typography textAlign={"center"} variant="body1" fontWeight={"bold"}>
          {email}
        </Typography>
        <Typography
          textAlign={"center"}
          variant="body1"
          color={"#3A3A3C"}
          mt={5}
        >
          Didn’t get your email or something not working?
        </Typography>
        <Link
          style={{ textDecoration: "none" }}
          variant="body1"
          color={"#FF2D55"}
          href="/sign-in"
        >
          Try again
        </Link>
      </Box>
    </Box>
  );
};

export default Page;
