"use client";

import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useAppSelector } from "`@/hooks/hooks`";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

// components
import { DoubleButton, NavBar, AnswerInput, Loading } from "`@/components`";

// apis
import { getBtcRates } from "`@/apis/coinApi`";
import {
  answer,
  cancelQuestion,
  getQuestionDetails,
} from "`@/apis/questionApi`";

export default function Page(props: any) {
  const { questionId } = props.searchParams;
  const { userData } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const [USDPerSat, setUSDPerSat] = useState(0);
  const [question, setQuestion] = useState<any>();
  const [doctorNote, setDoctorNote] = useState("");

  useEffect(() => {
    getQuestionDetails(questionId)
      .then((res) => {
        if (res?.success && res?.statusCode === 200) {
          if (
            res.data?.assignedDoctorId === userData?.id ||
            userData?.role === "admin"
          ) {
            setQuestion(res.data);
            setDoctorNote(res.data.aiJsonReply?.doctorNote || "");
            setLoading(false);
          } else {
            router.replace("/take-question");
          }
        }
      })
      .catch((err) => {
        alert(err.message);
        router.back();
      });

    getBtcRates().then((res) =>
      setUSDPerSat(res.data?.customSatoshi as number)
    );
  }, [questionId]);

  const confirmHandler = async () => {
    setAnswering(true);
    answer({
      userId: question.userId,
      content: question?.content,
      questionId: questionId,
      title: question.title,
      plan: "",
      majorComplaint: "",
      presentIllness: "",
      pastMedicalHistory: "",
      currentMedications: "",
      assessment: "",
      triage: "",
      doctorNote: doctorNote,
      status: "done",
    })
      .then((res) => router.replace("/take-question"))
      .catch((err) => {})
      .finally(() => setAnswering(false));
  };

  const cancelHandler = () => {
    cancelQuestion({ doctorId: userData.id, questionId: question.id })
      .then((res) => {
        if (res?.success && res?.statusCode === 200) {
          router.back();
        } else {
          console.log("Cancel question Error: ", res);
        }
      })
      .catch((err) => console.log("Cancel question Error: ", err));
  };

  const disabled = doctorNote.length < 50;
  return (
    <Wrapper>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <DoubleButton
            bounty={`${question?.bountyAmount.toLocaleString()} sats ($${(
              question?.bountyAmount * USDPerSat
            ).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })})`}
            date={question?.createdAt}
            cancelBtn={{ text: "Cancel", onClick: cancelHandler }}
            confirmBtn={{
              text: "Confirm",
              onClick: confirmHandler,
              style: { background: "#007AFF", opacity: disabled ? 0.4 : 1 },
              disabled: disabled,
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

          <AnswerInput
            title={"Your answer"}
            description={doctorNote}
            onTextChange={setDoctorNote}
            errorMsg={
              doctorNote.length < 50
                ? `Please write at least 50 characters.`
                : ""
            }
          />
          <Divider style={{ marginTop: 32, marginBottom: 32 }} />
          <DoubleButton
            cancelBtn={{ text: "Cancel", onClick: cancelHandler }}
            confirmBtn={{
              text: "Confirm",
              onClick: confirmHandler,
              style: { background: "#007AFF", opacity: disabled ? 0.4 : 1 },
              disabled: disabled,
            }}
          />
        </Container>
      )}
      {answering && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

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
