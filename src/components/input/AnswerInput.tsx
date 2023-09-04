import React from "react";
import { styled } from "styled-components";
import { TextField } from "@mui/material";

type Props = {
  title: string;
  description: string;
  onTextChange: (val: string) => void;
  errorMsg: string;
  disabled?: boolean;
};

const AnswerInput = ({
  title,
  description,
  onTextChange,
  errorMsg,
  disabled,
}: Props) => {
  return (
    <Wrapper>
      <Label>{title}</Label>
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={15}
        value={description}
        fullWidth
        onChange={(e) => onTextChange(e.target.value)}
        error={!!errorMsg}
        helperText={errorMsg}
        disabled={disabled}
      />
    </Wrapper>
  );
};

export default AnswerInput;

const Wrapper = styled.div``;

const Label = styled.p`
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  color: #1c1c1e;
  margin-bottom: 8px;
`;
