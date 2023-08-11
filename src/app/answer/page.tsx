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
import {
  answer,
  cancelQuestion,
  getQuestionDetails,
} from "`@/apis/questionApi`";
import {
  DoubleButton,
  PatientInfo,
  NavBar,
  AnswerInput,
  Loading,
} from "`@/components`";
import { useAppSelector } from "`@/hooks/hooks`";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const illnessInputs = [
  { title: "Chief Complaint", type: "chiefComplaint", minLength: 10 },
  {
    title: "History of Present Illness",
    type: "presentIllness",
    minLength: 10,
  },
  {
    title: "Past Medical History (Optional)",
    type: "pastMedicalHistory",
    minLength: 0,
  },
  {
    title: "Current Medication (Optional)",
    type: "currentMedication",
    minLength: 0,
  },
  // { title: "Assessment", type: "assessment", minLength: 20 },
  // { title: "Plan", type: "plan", minLength: 20 },
  { title: "Advice by AI", type: "triageGuide", minLength: 0 },
  { title: "Doctor’s Note", type: "doctorNote", minLength: 50 },
];

const generalInputs = [
  { title: "Your answer", type: "doctorNote", minLength: 50 },
];

export default function Page(props: any) {
  const { questionId, questionIndex } = props.searchParams;
  const { userData } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const [USDPerSat, setUSDPerSat] = useState(0);
  const [question, setQuestion] = useState<any>();
  const [values, setValues] = useState<any>({
    chiefComplaint: "",
    presentIllness: "",
    pastMedicalHistory: "",
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
          if (
            res.data?.assignedDoctorId === userData?.id ||
            userData?.role === "admin"
          ) {
            setQuestion(res.data);
            setValues({
              chiefComplaint: res.data.aiJsonReply?.chiefComplaint || "",
              presentIllness: res.data.aiJsonReply?.presentIllness || "",
              pastMedicalHistory:
                res.data.aiJsonReply?.pastMedicalHistory || "",
              currentMedication: res.data.aiJsonReply?.currentMedications,
              assessment: res.data.aiJsonReply?.assessment || "",
              plan: res.data.aiJsonReply?.plan || "",
              triageGuide: res.data.aiJsonReply?.triageGuide || "",
              doctorNote: res.data.aiJsonReply?.doctorNote || "",
            });
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
      plan: values.plan,
      majorComplaint: values.chiefComplaint,
      presentIllness: values.presentIllness,
      pastMedicalHistory: values.pastMedicalHistory,
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

  const cancelHandler = () => {
    cancelQuestion({ doctorId: userData.id, questionId: question.id })
      .then((res) => {
        if (res.success && res.statusCode === 200) {
          router.replace(`/take-question?questionIndex=${questionIndex}`);
        } else {
          console.log("Cancel question Error: ", res);
        }
      })
      .catch((err) => console.log("Cancel question Error: ", err));
  };

  if (loading) return <Loading />;

  const inputs = question.type === "general" ? generalInputs : illnessInputs;
  const disabled =
    (question.type === "general" && values.doctorNote.length < 50) ||
    (question.type === "illness" &&
      (values.chiefComplaint.length < 10 ||
        values.presentIllness.length < 10 ||
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
              cancelBtn={{ text: "Cancel", onClick: cancelHandler }}
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
                    disabled={el.type === "triageGuide"}
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
