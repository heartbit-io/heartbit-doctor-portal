"use client";
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "`@/firebase`";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getUser } from "`@/apis/userApi`";
import { api } from "`@/apis`";
import { Loading } from "`@/components`";

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
              if (res.user.email) {
                fetchUserInfo(res.user);
              }
            })
            .catch(() => {
              router.push("sign-in");
            });
        }
      } else {
        router.push("sign-in");
      }
    }
  });

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
          router.push(`sign-in`);
        }
      })
      .catch(() => {
        router.push("sign-in");
      });
  };

  if (loading || user) return <Loading />;

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <img src="img/logo_lg.svg" />
        <Typography textAlign={"center"} variant="h5" mt={5} mb={3}>
          Check your email inbox
        </Typography>
        <Typography textAlign={"center"} variant="body1">
          We have sent an email to:{" "}
        </Typography>
        <Typography textAlign={"center"} variant="body1" fontWeight={"bold"}>
          {localStorage.getItem("email")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Page;
