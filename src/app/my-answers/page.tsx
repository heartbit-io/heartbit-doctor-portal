"use client";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import moment from "moment";
import { useRouter } from "next/navigation";

// components
import { EmptyMyAnswers, Layout, Loading } from "`@/components`";

// apis
import { getMyAnswers } from "`@/apis/questionApi`";
import { getBtcRates } from "`@/apis/coinApi`";

export default function Page() {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [USDPerSat, setUSDPerSat] = useState(0);

  useEffect(() => {
    fetchMyAnswers();
    getBtcRates().then((res) =>
      setUSDPerSat(res.data?.customSatoshi as number)
    );
  }, []);

  const fetchMyAnswers = async () => {
    setLoading(true);
    getMyAnswers(offset)
      .then((res) => {
        if (res?.success && res?.statusCode === 200) {
          setAnswers(res.data);
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : answers.length === 0 ? (
        <EmptyMyAnswers />
      ) : (
        <InnerWrapper>
          <Title>My Answers</Title>
          <Container>
            <RowWrapper>
              <Subtitle>Question</Subtitle>
              <RightContainer>
                <Subtitle style={{ width: 120 }}>Bounty</Subtitle>
                <Subtitle style={{ width: 120, marginLeft: 8 }}>Date</Subtitle>
              </RightContainer>
            </RowWrapper>
            <ScrollContainer>
              {answers?.map((el) => (
                <ClickableRow
                  onClick={() => router.push(`/my-answers/${el.id}`)}
                >
                  <ColumnWrapper>
                    <QuestionTitle>{el?.content}</QuestionTitle>
                    <Answer>{el?.content}</Answer>
                  </ColumnWrapper>
                  <RightContainer>
                    <ColumnWrapper>
                      <Bounty>{el?.bountyAmount.toLocaleString()} sats</Bounty>
                      <BountyDollar>
                        $
                        {(Number(el?.bountyAmount) * USDPerSat).toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 2,
                          }
                        )}
                      </BountyDollar>
                    </ColumnWrapper>
                    <Date>{moment(el?.createdAt).format("D MMM YYYY")}</Date>
                  </RightContainer>
                </ClickableRow>
              ))}
            </ScrollContainer>
          </Container>
        </InnerWrapper>
      )}
    </Layout>
  );
}

const InnerWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
`;

const Title = styled.p`
  font-size: 34px;
  font-weight: 700;
  line-height: 41px;
  margin: 32px 40px;
`;

const Container = styled.div`
  height: calc(100vh - 210px);
  background-color: #fff;
  border-radius: 12px;
  margin: 0 40px 40px;
  overflow: scroll;
`;

const ScrollContainer = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 32px;
`;

const ClickableRow = styled(RowWrapper)`
  border-top: 1px solid #e5e5ea;
  cursor: pointer;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Subtitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  color: #8e8e93;
  text-align: center;
`;

const ColumnWrapper = styled.div``;

const QuestionTitle = styled.p`
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  color: #1c1c1e;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const Answer = styled.p`
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  color: #3a3a3c;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const Bounty = styled.p`
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: #3a3a3c;
  width: 120px;
  text-align: center;
`;

const BountyDollar = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #8e8e93;
  width: 120px;
  text-align: center;
`;

const Date = styled.p`
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: #3a3a3c;
  width: 120px;
  text-align: center;
  margin-left: 8px;
`;
