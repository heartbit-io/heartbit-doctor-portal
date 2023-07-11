"use client";
import {
  Box,
  Container,
  Divider,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
import { getBtcRates } from "`@/apis/coinApi`";
import { answer, getQuestionDetails } from "`@/apis/questionApi`";
import {
  DoubleButton,
  PatientInfo,
  NavBar,
  AnswerInput,
  Loading,
} from "`@/components`";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const illnessInputs = [
  { title: "Chief Complaint", type: "chiefComplaint", minLength: 10 },
  { title: "Medical History (Optional)", type: "medicalHistory", minLength: 0 },
  {
    title: "Current Medication (Optional)",
    type: "currentMedication",
    minLength: 0,
  },
  { title: "Assessment", type: "assessment", minLength: 20 },
  { title: "Plan", type: "plan", minLength: 20 },
  { title: "Guide", type: "triageGuide", minLength: 20 },
  { title: "Doctor’s Note", type: "doctorNote", minLength: 50 },
];

const generalInputs = [
  { title: "Your answer", type: "doctorNote", minLength: 50 },
];

export default function Page(props: any) {
  const { questionId } = props.searchParams;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const [USDPerSat, setUSDPerSat] = useState(0);
  const [question, setQuestion] = useState<any>();
  const [values, setValues] = useState<any>({
    chiefComplaint: "",
    medicalHistory: "",
    currentMedication: "",
    assessment: "",
    plan: "",
    triageGuide: "",
    doctorNote: "",
  });

  useEffect(() => {
    getQuestionDetails(questionId)
      .then((res) => {
        if (res.success && res.statusCode === 200) {
          setQuestion(res.data);
          setValues({
            chiefComplaint: res.data.aiJsonReply?.chiefComplaint || "",
            medicalHistory: res.data.aiJsonReply?.medicalHistory || "",
            currentMedication: res.data.aiJsonReply?.currentMedications,
            assessment: res.data.aiJsonReply?.assessment || "",
            plan: res.data.aiJsonReply?.plan || "",
            triageGuide: res.data.aiJsonReply?.triageGuide || "",
            doctorNote: res.data.aiJsonReply?.doctorNote || "",
          });
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));

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
      plan: values.plan,
      majorComplaint: values.chiefComplaint,
      medicalHistory: values.medicalHistory,
      currentMedications: values.currentMedication,
      assessment: values.assessment,
      triage: values.triageGuide,
      doctorNote: values.doctorNote,
      status: "done",
    })
      .then((res) => router.replace("/take-question"))
      .catch((err) => {})
      .finally(() => setAnswering(false));
  };

  if (loading) return <Loading />;

  const inputs = question.type === "general" ? generalInputs : illnessInputs;
  const disabled =
    (question.type === "general" && values.doctorNote.length < 50) ||
    (question.type === "illness" &&
      (values.chiefComplaint.length < 10 ||
        values.assessment.length < 20 ||
        values.plan.length < 20 ||
        values.triageGuide.length < 20 ||
        values.doctorNote.length < 50));

  return (
    <Fade in={!loading} timeout={700}>
      <Box>
        <NavBar />
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
            {question?.aiJsonReply?.title}
          </Typography>
          <Box sx={{ background: "#fff" }} p={5}>
            <DoubleButton
              bounty={`${question?.bountyAmount.toLocaleString()} sats ($${(
                question?.bountyAmount * USDPerSat
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })})`}
              date={question?.createdAt}
              cancelBtn={{ text: "Cancel", onClick: () => router.back() }}
              confirmBtn={{
                text: "Confirm",
                onClick: confirmHandler,
                style: { background: "#007AFF", opacity: disabled ? 0.4 : 1 },
                disabled: disabled,
              }}
              loading={answering}
            />
            <Divider />
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Stack flex={1}>
                <Box>
                  <Box mt={4} mb={4}>
                    <Typography sx={{ fontWeight: "bold" }} mb={3}>
                      Question
                    </Typography>
                    <Typography mb={3} whiteSpace={"break-spaces"}>
                      {question?.content}
                    </Typography>
                  </Box>
                  <Divider />
                </Box>
                {inputs.map((el) => (
                  <AnswerInput
                    key={el.type}
                    title={el.title}
                    description={values[el.type]}
                    onTextChange={(text) =>
                      setValues({ ...values, [el.type]: text })
                    }
                    errorMsg={
                      values[el.type]?.length < el?.minLength
                        ? `Please write at least ${el.minLength} characters.`
                        : ""
                    }
                  />
                ))}
              </Stack>
              <PatientInfo />
            </Box>
            <Divider sx={{ mb: 4 }} />
            <DoubleButton
              cancelBtn={{ text: "Cancel", onClick: () => router.back() }}
              confirmBtn={{
                text: "Confirm",
                onClick: confirmHandler,
                style: { background: "#007AFF", opacity: disabled ? 0.4 : 1 },
                disabled: disabled,
              }}
              loading={answering}
            />
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
