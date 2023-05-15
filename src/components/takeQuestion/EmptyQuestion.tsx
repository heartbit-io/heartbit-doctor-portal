import { Box, Typography } from "@mui/material";
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
        {
          "All patients' questions were answered. \nThank you for your service, and please come back again."
        }
      </Typography>
    </Box>
  );
};

export default EmptyQuestion;
