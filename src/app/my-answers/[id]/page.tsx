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
import {
  BackButton,
  DoubleButton,
  Loading,
  NavBar,
  PatientInfo,
} from "`@/components`";
import React, { useEffect, useState } from "react";

const answerDetails = [
  { title: "Chief Complaint", type: "chiefComplaint" },
  { title: "Medical History", type: "medicalHistory" },
  { title: "Current Medication", type: "currentMedications" },
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
      .then((res) => {
        if (res.success && res.statusCode === 200) {
          setAnswer(res.data);
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <Loading />;
  return (
    <Fade in={!loading} timeout={700}>
      <Box>
        <NavBar />
        <Container maxWidth={false}>
          <BackButton />
          <Typography
            variant="h3"
            mt={3}
            mb={5}
            sx={{
              fontWeight: "bold",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {answer.title}
          </Typography>
          <Box sx={{ background: "#fff" }} p={5}>
            <DoubleButton
              bounty={answer?.bountyAmount}
              date={answer?.createdAt}
            />
            <Divider />
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Stack flex={1}>
                {answerDetails.map((el) => (
                  <Box key={el.type}>
                    <Box mt={4} mb={4}>
                      <Typography sx={{ fontWeight: "bold" }} mb={3}>
                        {el.title}
                      </Typography>
                      <Typography whiteSpace={"break-spaces"}>
                        {answer[el?.type]}
                      </Typography>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Stack>
              <PatientInfo />
            </Box>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
};

export default Page;
