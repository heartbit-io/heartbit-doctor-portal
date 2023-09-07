"use client";
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
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
      flexDirection={"column"}
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
          placeholder="Your email address"
          style={{
            backgroundColor: "#fff",
            marginTop: 30,
            marginBottom: 10,
            borderRadius: 14,
          }}
          InputProps={{
            style: {
              borderRadius: 14,
            },
            sx: {
              "& input": {
                borderRadius: 14,
                textAlign: "center",
              },
            },
          }}
        />
        <LoadingButton
          style={{
            backgroundColor: "#F68F2A",
            color: "#ffff",
            opacity: isValidEmail ? 1 : 0.4,
            borderRadius: 14,
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
      <Box>
        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          variant="body1"
          mt={3}
          mb={2}
        >
          You'll need to be verified as a doctor to sign-in using the path
          below.
        </Typography>
        <Typography textAlign={"center"} variant="body1">
          1. Go to{" "}
          <Link
            href="https://testflight.apple.com/join/ZXzhTjIp"
            style={{ color: "#FF2D55", textDecoration: "none" }}
          >
            HeartBit app
          </Link>
        </Typography>
        <Typography textAlign={"center"} variant="body1">
          2. Click Menu (Upper-right corner)
        </Typography>
        <Typography textAlign={"center"} variant="body1">
          3. Click Your email address
        </Typography>
        <Typography textAlign={"center"} variant="body1">
          4. Click ‘Are you a doctor?’
        </Typography>
      </Box>

      {loading && (
        <CircularProgress
          size={100}
          sx={{ position: "absolute", color: "#EE8223" }}
        />
      )}
    </Box>
  );
};

export default Page;
