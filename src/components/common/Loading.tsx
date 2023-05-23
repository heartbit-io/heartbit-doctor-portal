import { Container } from "@mui/material";
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
      <img src="/gif/loading_dot.gif" style={{ background: "red" }} />
    </Container>
  );
};

export default Loading;
