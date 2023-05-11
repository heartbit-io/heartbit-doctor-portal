import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

type Props = {
  bounty?: string | number;
  date?: string | number;
  cancelBtn: {
    text: string;
    onClick: () => void;
    style?: any;
  };
  confirmBtn: {
    text: string;
    onClick: () => void;
    style?: any;
  };
};

const DoubleButton = ({ bounty, date, cancelBtn, confirmBtn }: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      mb={4}
    >
      <Stack spacing={5} direction="row">
        {!!bounty && (
          <Stack spacing={1} direction="row">
            <Typography sx={{ fontWeight: "bold" }}>Bounty:</Typography>
            <Typography>{bounty} sats</Typography>
          </Stack>
        )}
        {!!date && (
          <Stack spacing={1} direction="row">
            <Typography sx={{ fontWeight: "bold" }}>Date:</Typography>
            <Typography>{date}</Typography>
          </Stack>
        )}
      </Stack>
      <Stack spacing={1} direction="row">
        <Button
          variant="text"
          size="large"
          sx={{ color: "#3A3A3C", padding: "8px 60px", ...cancelBtn?.style }}
          onClick={cancelBtn?.onClick}
        >
          {cancelBtn?.text}
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: "#34C759",
            padding: "8px 60px",
            ...confirmBtn?.style,
          }}
          onClick={confirmBtn?.onClick}
        >
          {confirmBtn?.text}
        </Button>
      </Stack>
    </Box>
  );
};

export default DoubleButton;
