"use client";
import React, { useEffect, useState } from "react";
import { EmptyMyAnswers, Loading, NavBar } from "`@/components`";
import {
  Box,
  Container,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getMyAnswers } from "`@/apis/questionApi`";
import moment from "moment";

export default function Page() {
  const [offset, setOffset] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyAnswers();
  }, []);

  const fetchMyAnswers = async () => {
    setLoading(true);
    getMyAnswers(offset)
      .then((res) => {
        if (res.success && res.statusCode === 200) {
          setAnswers(res.data);
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  if (loading) return <Loading />;

  return (
    <Fade in={!loading} timeout={700}>
      <Box component="div" height={"100vh"} style={{ overflow: "hidden" }}>
        <NavBar />
        {answers.length === 0 ? (
          <EmptyMyAnswers />
        ) : (
          <Container maxWidth={false} component="div">
            <Typography variant="h3" mt={5} mb={5} sx={{ fontWeight: "bold" }}>
              My Answers
            </Typography>

            <TableContainer
              sx={{
                background: "#fff",
                borderRadius: 2,
              }}
            >
              <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <Box
                  component="div"
                  height={"75vh"}
                  style={{ overflow: "scroll" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#8E8E93" }}>Questions</TableCell>
                      <TableCell sx={{ color: "#8E8E93" }} align="right">
                        Bounty
                      </TableCell>
                      <TableCell sx={{ color: "#8E8E93" }} align="right">
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ overflow: "hidden" }}>
                    {answers?.map((el) => (
                      <TableRow
                        key={el?.title}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography variant="subtitle1" fontWeight="bold">
                            {el?.title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              display: "-webkit-box",
                              overflow: "hidden",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 1,
                            }}
                          >
                            {el?.content}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" width={"10%"}>
                          {el?.bountyAmount.toLocaleString()} sats
                        </TableCell>
                        <TableCell align="right" width={"10%"}>
                          {moment(el?.createdAt).format("D MMM YYYY")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Box>
              </Table>
            </TableContainer>
          </Container>
        )}
      </Box>
    </Fade>
  );
}
