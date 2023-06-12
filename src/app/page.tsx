"use client";
import React, { useEffect } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "`@/firebase`";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getUser } from "`@/apis/userApi`";
import { api } from "`@/apis`";

const Page = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user?.email) {
      fetchUserInfo(user);
    } else {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem("email");
        if (!email) {
          email = window.prompt("Please provide your email");
        } else {
          signInWithEmailLink(auth, email, window.location.href)
            .then((res) => {
              if (res.user) {
                localStorage.removeItem("email");
                fetchUserInfo(res.user);
              }
            })
            .catch(() => {
              router.push("sign-in");
            });
        }
      } else {
        if (!loading) router.push("sign-in");
      }
    }
  }, [user, loading]);

  const fetchUserInfo = async (user: any) => {
    const token = await user?.getIdToken();
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    getUser(user.email)
      .then(async (res) => {
        if (res.data.role === "doctor" || res.data.role === "admin") {
          router.push("take-question");
        } else {
          alert("Authentication failed. User is not verified as a doctor");
          router.replace("sign-in");
        }
      })
      .catch(() => {
        router.push("sign-in");
      });
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box justifyContent={"center"} alignItems={"center"}>
        <img src="img/logo_lg.svg" />
        <Typography textAlign={"center"} variant="h3" mt={5} mb={3}>
          Authenticating
        </Typography>
        <LinearProgress
          sx={{
            background: "#ee822335",
            "& .MuiLinearProgress-barColorPrimary": {
              backgroundColor: "#EE8223",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Page;
