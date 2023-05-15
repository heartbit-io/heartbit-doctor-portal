import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const EmptyMyAnswers = () => {
  const router = useRouter();

  return (
    <Box
      height={"80%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography whiteSpace={"pre-line"} variant="body1" textAlign={"center"}>
        {
          "You haven't answered any questions yet.\nMake your first response to a patient's question."
        }
      </Typography>
      <Button
        variant="contained"
        style={{ background: "#34C759", marginTop: 24 }}
        onClick={() => router.push("/take-question")}
      >
        Take Question
      </Button>
    </Box>
  );
};

export default EmptyMyAnswers;
