"use client";
import { Box, Container, Divider, Typography } from "@mui/material";
import { DoubleButton, PatientInfo, NavBar } from "`@/components`";

const body = [
  {
    title: "Question",
    description: `I have early cataracts. I've been taking MTX steroid 1.5 tablets for 2 weeks now for arthritis, is it okay to take it? \nI'm scared because my eyes feel like they've gotten worse.`,
  },
  {
    title: "Chief Complaint",
    description: `* Early cataracts \n* Concerns about methotrexate (MTX) steroid (1.5 tablets for 2 weeks) for arthritis \n* Fear of worsening eye condition`,
  },
  {
    title: " Medical History",
  },
];

export default function Page() {
  return (
    <Box>
      <NavBar />
      <Container maxWidth={false}>
        <Typography variant="h3" mt={5} mb={5} sx={{ fontWeight: "bold" }}>
          Cataracts and Methotrexate Concerns
        </Typography>
        <Box sx={{ background: "#fff" }} p={5}>
          <DoubleButton />
          <Divider />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box flex={1}>
              {body.map((el, index) => (
                <Box>
                  <Box
                    mt={4}
                    mb={4}
                    sx={{ opacity: index + 1 == body.length ? 0.3 : 1 }}
                  >
                    <Typography sx={{ fontWeight: "bold" }} mb={3}>
                      {el.title}
                    </Typography>
                    <Typography whiteSpace={"break-spaces"}>
                      {el.description}
                    </Typography>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </Box>
            <PatientInfo />
          </Box>
          <Typography variant="h5" textAlign={"center"} color={"#F68F2A"}>
            You can see the full information if you take this question to leave
            an answer.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
