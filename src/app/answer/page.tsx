"use client";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { getQuestionDetails } from "`@/apis/questionApi`";
import { DoubleButton, PatientInfo, NavBar, AnswerInput } from "`@/components`";
import { useEffect, useState } from "react";

export default function Page(props: any) {
  const { questionId } = props.searchParams;

  const [question, setQuestion] = useState<any>();
  const [chiefComplaint, setChiefComplaint] = useState<string>("");
  const [medicalHistory, setMedicalHistory] = useState<string>("");
  const [currentMedication, setCurrentMedication] = useState<string>("");
  const [assessment, setAssessment] = useState<string>("");
  const [plan, setPlan] = useState<string>("");
  const [triage, setTriage] = useState<string>("");
  const [doctorNote, setDoctorNote] = useState<string>("");

  useEffect(() => {
    getQuestionDetails(questionId)
      .then((res) => {
        if (res.success && res.statusCode === 200) {
          setQuestion(res.data);
          setChiefComplaint(res.data.chiefComplaint || "");
          setMedicalHistory(res.data.medicalHistory || "");
          setCurrentMedication(res.data.currentMedications);
          setAssessment(res.data.assessment || "");
          setPlan(res.data.plan || "");
          setTriage(res.data.triage || "");
          setDoctorNote(res.data.doctorNote || "");
        }
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  return (
    <Box>
      <NavBar />
      <Container maxWidth={false}>
        <Typography variant="h3" mt={5} mb={5} sx={{ fontWeight: "bold" }}>
          {question?.title}
        </Typography>
        <Box sx={{ background: "#fff" }} p={5}>
          <DoubleButton
            bounty={question?.bountyAmount}
            date={question?.createdAt}
            cancelBtn={{ text: "Cancel", onClick: () => {} }}
            confirmBtn={{
              text: "Confirm",
              onClick: () => {},
              style: { background: "#007AFF" },
            }}
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
              <AnswerInput
                title="Chief Complaint"
                description={chiefComplaint}
                onTextChange={setChiefComplaint}
              />
              <AnswerInput
                title="Medical History"
                description={medicalHistory}
                onTextChange={setMedicalHistory}
              />
              <AnswerInput
                title="Current Medication"
                description={currentMedication}
                onTextChange={setCurrentMedication}
              />
              <AnswerInput
                title="Assessment"
                description={assessment}
                onTextChange={setAssessment}
              />
              <AnswerInput
                title="Plan"
                description={plan}
                onTextChange={setPlan}
              />
              <AnswerInput
                title="Triage"
                description={triage}
                onTextChange={setTriage}
              />
              <AnswerInput
                title="Doctor’s Note"
                description={doctorNote}
                onTextChange={setDoctorNote}
              />
            </Stack>
            <PatientInfo />
          </Box>
          <Divider sx={{ mb: 4 }} />
          <DoubleButton
            cancelBtn={{ text: "Cancel", onClick: () => {} }}
            confirmBtn={{
              text: "Confirm",
              onClick: () => {},
              style: { background: "#007AFF" },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
