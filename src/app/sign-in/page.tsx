"use client";
import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { auth } from "`@/firebase`";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { validateEmail } from "`@/utils/utility`";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const signInHandler = (e: React.MouseEvent<HTMLElement>) => {
    setLoading(true);
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, {
      url: "https://doctor.heartbit.io/",
      handleCodeInApp: true,
    })
      .then(() => {
        localStorage.setItem("email", email);
        router.push("/email-sent");
      })
      .finally(() => setLoading(false));
  };

  const onEmailChange = (text: string) => {
    setEmail(text);
    setIsValidEmail(validateEmail(text) ? true : false);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <img src="img/logo_lg.svg" />
        <TextField
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          fullWidth
          size="small"
          style={{ backgroundColor: "#fff", marginTop: 30, marginBottom: 10 }}
        />
        <LoadingButton
          style={{
            backgroundColor: isValidEmail ? "#F68F2A" : "#E5E5EA",
            color: isValidEmail ? "#fff" : "#fff",
          }}
          fullWidth
          size="large"
          onClick={signInHandler}
          disabled={!isValidEmail}
          loading={loading}
        >
          Sign-in
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Page;
