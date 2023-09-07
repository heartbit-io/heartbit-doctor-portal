import React from "react";
import { styled } from "styled-components";
import { CircularProgress } from "@mui/material";

const ContainerLoading = () => {
  return (
    <LoadingWrapper>
      <CircularProgress size={100} sx={{ color: "#EE8223" }} />
    </LoadingWrapper>
  );
};

export default ContainerLoading;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
