"use client";

import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useAppSelector } from "`@/hooks/hooks`";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

// components
import { DoubleButton, AnswerInput, ContainerLoading } from "`@/components`";

// apis
import { getBtcRates } from "`@/apis/coinApi`";
import {
  answer,
  cancelQuestion,
  getQuestionDetails,
} from "`@/apis/questionApi`";

type Props = {
  params: {
    id: number;
  };
};

const Page = ({ params }: Props) => {
  const { userData } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [USDPerSat, setUSDPerSat] = useState(0);
  const [question, setQuestion] = useState<any>();
  const [doctorNote, setDoctorNote] = useState("");

  useEffect(() => {
    if (params.id && userData) {
      getQuestionDetails(params.id)
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
    }
  }, [params.id, userData]);

  const confirmHandler = async () => {
    setLoading(true);
    answer({
      userId: question.userId,
      content: question?.content,
      questionId: params.id,
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
      .catch((err) => console.log("Reply error: ", err))
      .finally(() => setLoading(false));
  };

  const cancelHandler = () => {
    cancelQuestion({ doctorId: userData.id, questionId: question.id })
      .then((res) => {
        if (res?.success && res?.statusCode === 200) {
          window.history.back();
        } else {
          console.log("Cancel question Error: ", res);
        }
      })
      .catch((err) => console.log("Cancel question Error: ", err));
  };

  const disabled = doctorNote.length < 50;

  return (
    <Wrapper>
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
          doctorNote.length < 50 ? `Please write at least 50 characters.` : ""
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
      {loading && <ContainerLoading />}
    </Wrapper>
  );
};

export default Page;

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
