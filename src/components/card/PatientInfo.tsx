import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const patientInfo = [
  {
    key: "Age",
    value: "24 years old",
  },
  {
    key: "Biological sex",
    value: "Male",
  },
  {
    key: "Height",
    value: "180 cm",
  },
  {
    key: "Weight",
    value: "75 kg",
  },
  {
    key: "Nationality",
    value: "United States",
  },
  {
    key: "State",
    value: "Florida",
  },
  {
    key: "Preferred language",
    value: "Korean",
  },
];

const PatientInfo = () => {
  return null;
  return (
    <Box
      bgcolor={"#F2F2F7"}
      ml={5}
      mt={4}
      p={2}
      pb={0}
      borderRadius={2}
      sx={{ blockSize: "fit-content" }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: "bold", color: "#8E8E93" }}
      >
        Basic information of the patient
      </Typography>
      {patientInfo.map((el, index) => (
        <Box key={el.key}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            mb={2}
            mt={2}
          >
            <Typography mr={15}>{el.key}</Typography>
            <Typography sx={{ fontWeight: "bold" }}>{el.value}</Typography>
          </Stack>
          {patientInfo.length !== index + 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
};

export default PatientInfo;
