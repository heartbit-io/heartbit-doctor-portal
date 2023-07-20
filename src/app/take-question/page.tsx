"use client";

import { Box, Container, Divider, Fade, Typography } from "@mui/material";
import {
  DoubleButton,
  PatientInfo,
  NavBar,
  Loading,
  EmptyQuestion,
} from "`@/components`";
import { useEffect, useState } from "react";

import { assignQuestion, getQuestion } from "`@/apis/questionApi`";
import { useRouter } from "next/navigation";
import { getBtcRates } from "`@/apis/coinApi`";
import { useAppSelector } from "`@/hooks/hooks`";

export default function Page() {
  const router = useRouter();
  const { userData } = useAppSelector((state) => state.user);
  const [question, setQuestion] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [USDPerSat, setUSDPerSat] = useState(0);

  useEffect(() => {
    fetchQuestion();
    getBtcRates().then((res) =>
      setUSDPerSat(res.data?.customSatoshi as number)
    );

    const interval = setInterval(() => {
      fetchQuestion();
    }, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, []);

  const fetchQuestion = async () => {
    setLoading(true);
    getQuestion(questionIndex)
      .then((res) => {
        if (res.success && res.statusCode === 200) {
          setQuestion(res.data);
        } else {
          setQuestionIndex(questionIndex + 1);
          alert(res.data.message);
        }
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  const takeQuestionHandler = () => {
    assignQuestion({ doctorId: userData.id, questionId: question.id })
      .then((res) => {
        if (res.success && res.statusCode === 200) {
          router.push(`/answer?questionId=${question?.id}`);
        } else {
        }
      })
      .catch((err) => alert(err.message));
  };

  if (loading) return <Loading />;

  return (
    <Fade in={!loading} timeout={700}>
      <Box>
        <NavBar />
        {!question ? (
          <EmptyQuestion />
        ) : (
          <Container maxWidth={false}>
            <Typography
              variant="h3"
              mt={5}
              mb={5}
              sx={{
                fontWeight: "bold",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {question?.title}
            </Typography>
            <Box sx={{ background: "#fff" }} p={5}>
              <DoubleButton
                bounty={`${question?.bountyAmount.toLocaleString()} sats ($${(
                  question?.bountyAmount * USDPerSat
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })})`}
                date={question?.createdAt}
                cancelBtn={{ text: "Pass", onClick: fetchQuestion }}
                confirmBtn={{
                  text: "Take",
                  onClick: takeQuestionHandler,
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

                  {question.type === "illness" && (
                    <>
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
                    </>
                  )}
                </Box>
                <PatientInfo />
              </Box>
              {question.type === "illness" && (
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  color={"#F68F2A"}
                  pt={4}
                >
                  You can see the full information if you take this question to
                  leave an answer.
                </Typography>
              )}
            </Box>
          </Container>
        )}
      </Box>
    </Fade>
  );
}
