"use client";

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Divider } from "@mui/material";

// components
import { BackButton, ContainerLoading, DoubleButton } from "`@/components`";

// apis
import { getBtcRates } from "`@/apis/coinApi`";
import { getAnswerDetails } from "`@/apis/questionApi`";

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
      .catch((err) => console.log("Fetch answer details error:", err))
      .finally(() => setLoading(false));

    getBtcRates().then((res) =>
      setUSDPerSat(res.data?.customSatoshi as number)
    );
  }, [params.id]);

  return (
    <InnerWrapper>
      <BackButton />
      <Container>
        <DoubleButton
          bounty={`${answer?.bountyAmount?.toLocaleString()} sats ($${(
            answer?.bountyAmount * USDPerSat
          ).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })})`}
          date={answer?.createdAt}
        />
        <Divider style={{ marginTop: 32, marginBottom: 32 }} />
        <Title>Question</Title>
        <QuestionWrapper>
          <Subtitle>History of your present illness</Subtitle>
          <Description>{answer?.content}</Description>
        </QuestionWrapper>
        {!!answer?.currentMedication && (
          <QuestionWrapper>
            <Subtitle>Current medications</Subtitle>
            <Description>{answer?.currentMedication}</Description>
          </QuestionWrapper>
        )}
        {!!answer?.ageSexEthnicity && (
          <QuestionWrapper>
            <Subtitle>Age, Sex and Ethnicity</Subtitle>
            <Description>{answer?.ageSexEthnicity}</Description>
          </QuestionWrapper>
        )}
        <Divider style={{ marginTop: 32, marginBottom: 32 }} />
        <Title>Your answer</Title>
        <QuestionWrapper>
          <Description>{answer?.doctorNote}</Description>
        </QuestionWrapper>
        {loading && <ContainerLoading />}
      </Container>
    </InnerWrapper>
  );
};

export default Page;

const InnerWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  height: calc(100vh - 194px);
  background-color: #ffffff;
  border-radius: 12px;
  margin: 0 40px 40px;
  padding: 32px;
  overflow: scroll;
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
