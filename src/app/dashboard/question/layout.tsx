"use client";

import React from "react";
import { styled } from "styled-components";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default layout;

const Container = styled.div`
  position: relative;
  border-radius: 12px;
  margin: 40px;
  padding: 32px;
  background-color: #fff;
`;
