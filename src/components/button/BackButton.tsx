import React from "react";
import { styled } from "styled-components";

const BackButton = () => {
  return (
    <Wrapper onClick={() => window.history.back()}>
      <Image src={"/img/chevronLeft.svg"} />
      <Text>Back to the list</Text>
    </Wrapper>
  );
};

export default BackButton;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 26px 40px;
  cursor: pointer;
`;

const Image = styled.img`
  margin-right: 5px;
`;

const Text = styled.p`
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: #ff2d55;
`;
