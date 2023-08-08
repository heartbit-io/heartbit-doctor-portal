import { Box, TextField, Typography } from "@mui/material";
import React from "react";

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
    <Box mt={4} mb={4}>
      <Typography sx={{ fontWeight: "bold" }} mb={3}>
        {title}
      </Typography>
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={10}
        value={description}
        fullWidth
        onChange={(e) => onTextChange(e.target.value)}
        error={!!errorMsg}
        helperText={errorMsg}
        disabled={disabled}
      />
    </Box>
  );
};

export default AnswerInput;
