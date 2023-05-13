"use client";

import { Box, Container, Divider, Typography } from "@mui/material";
import { DoubleButton, PatientInfo, NavBar, Loading } from "`@/components`";
import { useEffect, useState } from "react";

import { getQuestion } from "`@/apis/questionApi`";

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
  const [question, setQuestion] = useState<any>();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestion()
      .then((res) => {
        if (res.success && res.statusCode === 200) {
          setQuestion(res.data);
        }
      })
      .catch((err) => setErr(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <Box>
      <NavBar />
      <Container maxWidth={false}>
        <Typography variant="h3" mt={5} mb={5} sx={{ fontWeight: "bold" }}>
          {question?.title}
        </Typography>
        <Box sx={{ background: "#fff" }} p={5}>
          <DoubleButton
            bounty={question?.bountyAmount}
            date={question?.createdAt}
            cancelBtn={{ text: "Pass", onClick: () => {} }}
            confirmBtn={{
              text: "Take",
              onClick: () => {},
            }}
          />
          <Divider />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box flex={1}>
              <Box>
                <Box mt={4} mb={4}>
                  <Typography sx={{ fontWeight: "bold" }} mb={3}>
                    Question
                  </Typography>
                  <Typography whiteSpace={"break-spaces"}>
                    {question?.content}
                  </Typography>
                </Box>
                <Divider />
              </Box>

              <Box>
                <Box mt={4} mb={4}>
                  <Typography sx={{ fontWeight: "bold" }} mb={3}>
                    Chief Complaint
                  </Typography>
                  <Typography whiteSpace={"break-spaces"}>
                    {question?.chiefComplaint}
                  </Typography>
                </Box>
                <Divider />
              </Box>

              <Box>
                <Box mt={4} mb={4} sx={{ opacity: 0.3 }}>
                  <Typography sx={{ fontWeight: "bold" }} mb={3}>
                    Medical History
                  </Typography>
                </Box>
                <Divider />
              </Box>
            </Box>
            <PatientInfo />
          </Box>
          <Typography
            variant="h5"
            textAlign={"center"}
            color={"#F68F2A"}
            pt={4}
          >
            You can see the full information if you take this question to leave
            an answer.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
