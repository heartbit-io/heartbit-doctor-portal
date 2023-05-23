import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <Stack
      flexDirection={"row"}
      mt={3}
      onClick={() => router.back()}
      sx={{ cursor: "pointer" }}
    >
      <img src={"/img/chevronLeft.svg"} />
      <Typography variant="body1" color={"#FF2D55"} ml={1}>
        Back to the list
      </Typography>
    </Stack>
  );
};

export default BackButton;
