"use client";
import {
  Box,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DoubleButton, PatientInfo, NavBar } from "`@/components`";

const body = [
  {
    title: "Chief Complaint",
    description: `* Early cataracts \n* Concerns about methotrexate (MTX) steroid (1.5 tablets for 2 weeks) for arthritis \n* Fear of worsening eye condition`,
  },
  {
    title: "Medical History",
    description: `Early cataracts \nArthritis`,
  },
  {
    title: "Current Medication",
    description: `Methotrexate (MTX) steroid: 1.5 tablets for 2 weeks`,
  },
  {
    title: "Assessment",
    description: `* The patient has early cataracts and is concerned about the effects of methotrexate on their eye condition.\n
    * It is important to evaluate the potential side effects of methotrexate and weigh the benefits against the risks.`,
  },
  {
    title: "Plan",
    description: `1. Consult an ophthalmologist to assess the progression of cataracts and any potential impacts of methotrexate.
    2. Consult a rheumatologist to discuss the current arthritis treatment and explore possible alternatives if necessary.
    3. Monitor the patient's eye condition and report any sudden changes or worsening symptoms to healthcare providers.
    4. Encourage the patient to maintain a healthy lifestyle, including proper eye care and a balanced diet.`,
  },
  {
    title: "Triage",
    description: `Triage: The patient's case requires a consultation with an ophthalmologist and a rheumatologist.
    At-home symptomatic treatment:
    Avoid direct sunlight exposure and use sunglasses to protect the eyes.
    Maintain a balanced diet rich in antioxidants (e.g., vitamins A, C, and E).
    Practice good eye hygiene and avoid rubbing the eyes.
    Hospital visit: It is best to visit the hospital if the patient experiences sudden vision changes, severe eye pain, or increased sensitivity to light.`,
  },
  {
    title: "Doctor’s Note",
    description:
      "Dear Patient, Thank you for sharing your concerns about your early cataracts and the potential impact of methotrexate on your eye condition. I understand your concerns and have documented your case in the 'Health Record'. I recommend consulting both an ophthalmologist and a rheumatologist to discuss your current treatment plan and evaluate the risks and benefits of continuing methotrexate for your arthritis. In the meantime, you can practice some simple at-home eye care, such as wearing sunglasses to protect your eyes from sunlight, maintaining a balanced diet rich in antioxidants, and practicing good eye hygiene. It's important to monitor your eye condition and report any sudden changes or worsening symptoms to your healthcare providers. Remember to take care of your overall health, and please do not hesitate to reach out if you have any further questions or concerns. Sincerely,[Your Name] Licensed Doctor",
  },
];

export default function Page() {
  return (
    <Box>
      <NavBar />
      <Container maxWidth={false}>
        <Typography variant="h3" mt={5} mb={5} sx={{ fontWeight: "bold" }}>
          Cataracts and Methotrexate Concerns
        </Typography>
        <Box sx={{ background: "#fff" }} p={5}>
          <DoubleButton
            bounty={"1,000"}
            date={"10:49AM, 9th Mar 2023"}
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
                    {
                      "I have early cataracts. I've been taking MTX steroid 1.5 tablets for 2 weeks now for arthritis, is it okay to take it? \nI'm scared because my eyes feel like they've gotten worse."
                    }
                  </Typography>
                </Box>
                <Divider />
              </Box>
              <Box>
                {body.map((el, index) => (
                  <Box mt={4} mb={4}>
                    <Typography sx={{ fontWeight: "bold" }} mb={3}>
                      {el.title}
                    </Typography>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={10}
                      value={el.description}
                      fullWidth
                    />
                  </Box>
                ))}
              </Box>
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
