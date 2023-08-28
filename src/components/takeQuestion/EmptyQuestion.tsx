import { Box, Button, Typography } from "@mui/material";
import React from "react";

const EmptyQuestion = () => {
  return (
    <Box
      height={"80vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <img src="img/confetti.svg" />
      <Typography
        whiteSpace={"pre-line"}
        variant="body1"
        textAlign={"center"}
        mt={3}
      >
        You have answered all the questions.
        <br />
        While you wait for new questions, why not take a look at the HeartBit
        community?
      </Typography>
      <Button
        variant="contained"
        onClick={() => window.open("https://discord.gg/Gq6Xerb7sa")}
        startIcon={<img src="img/discord.svg" style={{ color: "white" }} />}
        style={{
          height: 48,
          borderRadius: 10,
          backgroundColor: "#5A65EA",
          fontSize: 17,
          fontWeight: 600,
          textTransform: "capitalize",
          marginTop: 32,
        }}
      >
        Join Community
      </Button>
    </Box>
  );
};

export default EmptyQuestion;
