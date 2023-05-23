"use client";
import {
  Box,
  Fade,
  Typography,
  Container,
  Divider,
  Stack,
} from "@mui/material";
import { getAnswerDetails } from "`@/apis/questionApi`";
import { DoubleButton, Loading, NavBar, PatientInfo } from "`@/components`";
import React, { useEffect, useState } from "react";

const answers = [
  { title: "Chief Complaint", type: "chiefComplaint" },
  { title: "Medical History", type: "medicalHistory" },
  { title: "Current Medication", type: "currentMedication" },
  { title: "Assessment", type: "assessment" },
  { title: "Plan", type: "plan" },
  { title: "Triage", type: "triage" },
  { title: "Doctor’s Note", type: "doctorNote" },
];

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const [answer, setAnswer] = useState<any>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnswerDetails(params.id)
      .then((res) => console.log(res))
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  return (
    <Fade in={!loading} timeout={700}>
      <Box>
        <NavBar />
        <Container maxWidth={false}>
          <Typography variant="h3" mt={5} mb={5} sx={{ fontWeight: "bold" }}>
            Cataracts and MTX steroids
          </Typography>
          <Box sx={{ background: "#fff" }} p={5}>
            <DoubleButton
              bounty={answer?.bountyAmount}
              date={answer?.createdAt}
              cancelBtn={{ text: "Cancel", onClick: () => {} }}
              confirmBtn={{
                text: "Confirm",
                onClick: () => {},
                style: { background: "#007AFF" },
              }}
            />
            <Divider />
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Stack flex={1}>
                {answers.map((el) => (
                  <Box>
                    <Box mt={4} mb={4}>
                      <Typography sx={{ fontWeight: "bold" }} mb={3}>
                        {el.title}
                      </Typography>
                      <Typography whiteSpace={"break-spaces"}>
                        {el?.type}
                      </Typography>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Stack>
              <PatientInfo />
            </Box>
            <Divider sx={{ mb: 4 }} />
            <DoubleButton
              cancelBtn={{ text: "Cancel", onClick: () => {} }}
              confirmBtn={{
                text: "Confirm",
                onClick: () => {},
                style: { background: "#007AFF" },
              }}
            />
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default Page;
