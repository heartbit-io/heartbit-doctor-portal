"use client";

import React from "react";
import { styled } from "styled-components";

// components
import { NavBar } from "../surface";

const Layout = ({ children }: any) => {
  return (
    <Wrapper>
      <NavBar />
      <Space />
      {children}
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div``;
const Space = styled.div`
  height: 80px;
`;
