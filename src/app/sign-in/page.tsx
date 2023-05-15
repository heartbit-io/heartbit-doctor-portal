"use client";
import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { auth } from "`@/firebase`";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { validateEmail } from "`@/utils/utility`";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const signInHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000/",
      handleCodeInApp: true,
    }).then(() => {
      localStorage.setItem("email", email);
      router.push("/");
    });
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
        <Button
          style={{
            backgroundColor: isValidEmail ? "#F68F2A" : "#E5E5EA",
            color: isValidEmail ? "#fff" : "#fff",
          }}
          fullWidth
          size="large"
          onClick={signInHandler}
          disabled={!isValidEmail}
        >
          Sign-in
        </Button>
      </Box>
    </Box>
  );
};

export default Page;
