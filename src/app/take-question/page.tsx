"use client";

import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppSelector } from "`@/hooks/hooks`";
import { styled } from "styled-components";

// components
import { DoubleButton, NavBar, EmptyQuestion, Loading } from "`@/components`";

// apis
import { assignQuestion, getQuestion } from "`@/apis/questionApi`";
import { getBtcRates } from "`@/apis/coinApi`";

export default function Page() {
  const router = useRouter();
  const { userData } = useAppSelector((state) => state.user);
  const [question, setQuestion] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
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

  const fetchQuestion = async (showSpinner = false) => {
    setLoading(true);
    setShowSpinner(showSpinner);
    getQuestion(questionIndex)
      .then((res) => {
        if (res?.success && res?.statusCode === 200) {
          setQuestion(res.data);
          setQuestionIndex(questionIndex + 1);
        }
      })
      .catch((err) => {
        console.log("ERROR>>>>>>>>>>>>>>>>>>", err);
      })
      .finally(() => {
        setLoading(false);
        setShowSpinner(false);
      });
  };

  const takeQuestionHandler = () => {
    setShowSpinner(true);
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
      .catch((err) => alert(err.message))
      .finally(() => setShowSpinner(false));
  };

  return (
    <Wrapper>
      <NavBar />
      {loading && !question ? (
        <Loading />
      ) : !question ? (
        <EmptyQuestion />
      ) : (
        <Container>
          <DoubleButton
            bounty={`${question?.bountyAmount.toLocaleString()} sats ($${(
              question?.bountyAmount * USDPerSat
            ).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })})`}
            date={question?.createdAt}
            cancelBtn={{ text: "Pass", onClick: () => fetchQuestion(true) }}
            confirmBtn={{
              text: "Take",
              onClick: takeQuestionHandler,
            }}
          />
          <Divider style={{ marginTop: 32, marginBottom: 32 }} />
          <Title>Question</Title>
          <QuestionWrapper>
            <Subtitle>History of your present illness</Subtitle>
            <Description>{question?.content}</Description>
          </QuestionWrapper>
          {!!question?.currentMedication && (
            <QuestionWrapper>
              <Subtitle>Current medications</Subtitle>
              <Description>{question?.currentMedication}</Description>
            </QuestionWrapper>
          )}
          {!!question?.ageSexEthnicity && (
            <QuestionWrapper>
              <Subtitle>Age, Sex and Ethnicity</Subtitle>
              <Description>{question?.ageSexEthnicity}</Description>
            </QuestionWrapper>
          )}

          <Divider style={{ marginTop: 32, marginBottom: 32 }} />
          {question?.type === "illness" && (
            <Footnote>
              You can see the full information if you take this question to
              leave an answer.
            </Footnote>
          )}
        </Container>
      )}
      {showSpinner && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  border-radius: 12px;
  margin: 40px;
  padding: 32px;
  background-color: #fff;
`;

const QuestionWrapper = styled.div`
  margin-top: 26px;
`;

const Title = styled.p`
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  color: #1c1c1e;
`;

const Subtitle = styled.p`
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  color: #8e8e93;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: #3a3a3c;
`;

const Footnote = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  color: #f68f2a;
  text-align: center;
`;
