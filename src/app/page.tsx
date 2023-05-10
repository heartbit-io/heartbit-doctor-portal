"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { TopBar } from "`@/components`";

export default function Home() {
  return (
    <Box>
      <TopBar />
      <Container maxWidth={false}>
        <Typography variant="h3" mt={5} mb={5} sx={{ fontWeight: "bold" }}>
          Cataracts and Methotrexate Concerns
        </Typography>
        <Box sx={{ background: "#fff" }} p={5}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={4}
          >
            <Stack spacing={5} direction="row">
              <Stack spacing={1} direction="row">
                <Typography sx={{ fontWeight: "bold" }}>Bounty:</Typography>
                <Typography>1,000sats</Typography>
              </Stack>
              <Stack spacing={1} direction="row">
                <Typography sx={{ fontWeight: "bold" }}>Date:</Typography>
                <Typography>10:49AM, 9th Mar 2023</Typography>
              </Stack>
            </Stack>
            <Stack spacing={1} direction="row">
              <Button
                variant="text"
                size="large"
                sx={{ color: "#3A3A3C", padding: "8px 60px" }}
              >
                Pass
              </Button>
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#34C759", padding: "8px 60px" }}
              >
                Take
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Box mt={4} mb={4}>
              <Typography sx={{ fontWeight: "bold" }} mb={3}>
                Question
              </Typography>
              <Typography>
                I have early cataracts. I've been taking MTX steroid 1.5 tablets
                for 2 weeks now for arthritis, is it okay to take it? I'm scared
                because my eyes feel like they've gotten worse.
              </Typography>
            </Box>
            <Divider />
            <Box mt={4} mb={4}>
              <Typography sx={{ fontWeight: "bold" }} mb={3}>
                Chief Complaint
              </Typography>
              <Typography>
                Early cataracts Concerns about methotrexate (MTX) steroid (1.5
                tablets for 2 weeks) for arthritis Fear of worsening eye
                condition
              </Typography>
            </Box>
            <Divider />
            <Box mt={4} mb={4}>
              <Typography sx={{ fontWeight: "bold", opacity: 0.3 }}>
                Medical History
              </Typography>
            </Box>
            <Divider />
          </Box>
          <Box></Box>
        </Box>
      </Container>
    </Box>
  );
}
