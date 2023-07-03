"use client";
import {
  Box,
  Container,
  Divider,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
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
  { title: "Chief Complaint", type: "chiefComplaint" },
  { title: "Medical History", type: "medicalHistory" },
  { title: "Current Medication", type: "currentMedication" },
  { title: "Assessment", type: "assessment" },
  { title: "Plan", type: "plan" },
  { title: "Triage", type: "triage" },
  { title: "Doctor’s Note", type: "doctorNote" },
];

const generalInputs = [{ title: "Your answer", type: "doctorNote" }];

export default function Page(props: any) {
  const { questionId } = props.searchParams;
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const [question, setQuestion] = useState<any>();
  const [values, setValues] = useState<any>({
    chiefComplaint: "",
    medicalHistory: "",
    currentMedication: "",
    assessment: "",
    plan: "",
    triage: "",
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
            triage: res.data.aiJsonReply?.triage || "",
            doctorNote: res.data.aiJsonReply?.doctorNote || "",
          });
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  }, [questionId]);

  const confirmHandler = async () => {
    if (
      (question.type === "general" && values.doctorNote.length < 50) ||
      (question.type === "illness" &&
        (values.plan.length < 50 ||
          values.chiefComplaint.length < 50 ||
          values.medicalHistory.length < 50 ||
          values.currentMedication.length < 50 ||
          values.assessment.length < 50 ||
          values.triage.length < 50 ||
          values.doctorNote.length < 50))
    ) {
      setShowError(true);
    } else {
      setShowError(false);
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
        triage: values.triage,
        doctorNote: values.doctorNote,
        status: "done",
      })
        .then((res) => router.replace("/my-answers"))
        .catch((err) => {})
        .finally(() => setAnswering(false));
    }
  };

  if (loading) return <Loading />;

  const inputs = question.type === "general" ? generalInputs : illnessInputs;
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
              bounty={question?.bountyAmount}
              date={question?.createdAt}
              cancelBtn={{ text: "Cancel", onClick: () => router.back() }}
              confirmBtn={{
                text: "Confirm",
                onClick: confirmHandler,
                style: { background: "#007AFF" },
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
                    showError={showError}
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
                style: { background: "#007AFF" },
              }}
              loading={answering}
            />
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
