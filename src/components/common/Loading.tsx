import React from "react";
import { CircularProgress, Container } from "@mui/material";

const Loading = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,.2)",
      }}
    >
      <CircularProgress
        size={100}
        sx={{ position: "absolute", color: "#EE8223" }}
      />
    </Container>
  );
};

export default Loading;
