import { CircularProgress, Container } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        height: "100vh",
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
