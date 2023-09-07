"use client";
import { Box, Typography, Container, Divider, Stack } from "@mui/material";
import { getBtcRates } from "`@/apis/coinApi`";
import { getAnswerDetails } from "`@/apis/questionApi`";
import {
  BackButton,
  DoubleButton,
  Layout,
  Loading,
  PatientInfo,
} from "`@/components`";
import React, { useEffect, useState } from "react";

const answerDetails = [
  { title: "Chief Complaint", type: "majorComplaint" },
  { title: "Medical History", type: "medicalHistory" },
  { title: "Current Medication", type: "currentMedication" },
  { title: "Assessment", type: "assessment" },
  { title: "Plan", type: "plan" },
  { title: "Guide", type: "triage" },
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
  const [USDPerSat, setUSDPerSat] = useState(0);

  useEffect(() => {
    getAnswerDetails(params.id)
      .then((res) => {
        if (res?.success && res?.statusCode === 200) {
          setAnswer(res.data);
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));

    getBtcRates().then((res) =>
      setUSDPerSat(res.data?.customSatoshi as number)
    );
  }, [params.id]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
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
              bounty={`${answer?.bountyAmount.toLocaleString()} sats ($${(
                answer?.bountyAmount * USDPerSat
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })})`}
              date={answer?.createdAt}
            />
            <Divider />
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Stack flex={1}>
                <Box mt={4} mb={4}>
                  <Typography sx={{ fontWeight: "bold" }} mb={3}>
                    Question
                  </Typography>
                  <Typography whiteSpace={"break-spaces"}>
                    {answer.content}
                  </Typography>
                </Box>
                <Divider />
                {answerDetails.map(
                  (el) =>
                    !!answer[el?.type] && (
                      <Box key={el.type} mt={4} mb={4}>
                        <Typography sx={{ fontWeight: "bold" }} mb={3}>
                          {el.title}
                        </Typography>
                        <Typography whiteSpace={"break-spaces"}>
                          {answer[el?.type]}
                        </Typography>
                      </Box>
                    )
                )}
              </Stack>
              <PatientInfo />
            </Box>
          </Box>
        </Container>
      )}
    </Layout>
  );
};

export default Page;
