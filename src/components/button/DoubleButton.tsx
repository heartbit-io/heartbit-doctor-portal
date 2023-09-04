import React from "react";
import moment from "moment";
import { styled } from "styled-components";

type Props = {
  bounty?: string | number;
  date?: string | number;
  cancelBtn?: {
    text: string;
    onClick: () => void;
    style?: any;
    disabled?: boolean;
  };
  confirmBtn?: {
    text: string;
    onClick: () => void;
    style?: any;
    disabled?: boolean;
  };
};

const DoubleButton = ({ bounty, date, cancelBtn, confirmBtn }: Props) => {
  return (
    <Wrapper>
      <Container>
        {!!bounty && (
          <>
            <Key>Bounty:</Key>
            <Value>{bounty}</Value>
          </>
        )}
        {!!date && (
          <>
            <Key>Date:</Key>
            <Value>{moment(date).format("h:mmA, Do MMMM YYYY")}</Value>
          </>
        )}
      </Container>

      {!!cancelBtn && (
        <Btn
          disabled={cancelBtn.disabled}
          onClick={cancelBtn?.onClick}
          style={cancelBtn.style}
        >
          <BtnText>{cancelBtn?.text}</BtnText>
        </Btn>
      )}
      {!!confirmBtn && (
        <Btn
          disabled={confirmBtn.disabled}
          onClick={confirmBtn?.onClick}
          style={{
            marginLeft: 8,
            backgroundColor: "#34C759",
            ...confirmBtn.style,
          }}
        >
          <BtnText color="#fff">{confirmBtn?.text}</BtnText>
        </Btn>
      )}
    </Wrapper>
  );
};

export default DoubleButton;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const Key = styled.p`
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  margin-right: 8px;
`;

const Value = styled.p`
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  margin-right: 32px;
`;

const Btn = styled.button`
  display: flex;
  width: 160px;
  height: 48px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  cursor: pointer;
`;

const BtnText = styled.div`
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  color: ${({ color }) => color || "#3A3A3C"};
`;
