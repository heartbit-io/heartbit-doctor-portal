"use client";

import { Box, Container, Divider, Fade, Typography } from "@mui/material";
import { DoubleButton, NavBar, Loading, EmptyQuestion } from "`@/components`";
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
        if (res?.success && res?.statusCode === 200) {
          setQuestion(res.data);
        } else {
          alert(res.data.message);
        }
        setQuestionIndex(questionIndex + 1);
      })
      .catch((err) => {
        alert("FETCH QUESTION ERROR:" + err.message);
        console.log("ERROR>>>>>>>>>>>>>>>>>>", err);
      })
      .finally(() => setLoading(false));
  };

  const takeQuestionHandler = () => {
    assignQuestion({ doctorId: userData.id, questionId: question.id })
      .then((res) => {
        if (res?.success && res?.statusCode === 200) {
          router.push(`/answer?questionId=${question?.id}`);
        } else if (res.response.data.statusCode === 409) {
          alert(
            "Please cancel currently taken question to take another question."
          );

          router.push(
            `/answer?questionId=${res.response.data.data.questionId}`
          );
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
            <Box sx={{ background: "#fff" }} p={5} mt={3}>
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
              <Box mt={4} mb={4}>
                <Typography sx={{ fontWeight: "bold" }} mb={3}>
                  Question
                </Typography>
                <Box mb={3}>
                  <Typography mb={1} color={"#8E8E93"}>
                    History of your present illness
                  </Typography>
                  <Typography whiteSpace={"break-spaces"}>
                    {question?.content}
                  </Typography>
                </Box>
                {!!question?.currentMedication && (
                  <Box mb={3}>
                    <Typography mb={1} color={"#8E8E93"}>
                      Current medications
                    </Typography>
                    <Typography whiteSpace={"break-spaces"}>
                      {question?.currentMedication}
                    </Typography>
                  </Box>
                )}
                {!!question?.ageSexEthnicity && (
                  <Box>
                    <Typography mb={1} color={"#8E8E93"}>
                      Age, Sex and Ethnicity
                    </Typography>
                    <Typography whiteSpace={"break-spaces"}>
                      {question?.ageSexEthnicity}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Divider />
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
