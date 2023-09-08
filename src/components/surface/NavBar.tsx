"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "`@/firebase`";
import { Link, Menu } from "@mui/material";
import { styled } from "styled-components";

function NavBar() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [menuVisible, toggleMenu] = useState(false);

  return (
    <Wrapper>
      <Link href="/dashboard/question" style={{ marginLeft: 40 }}>
        <Image src="/img/logo.svg" />
      </Link>
      <CenterWrapper>
        <LinkTextWrapper onClick={() => router.push("/dashboard/question")}>
          <LinkText>Take Questions</LinkText>
        </LinkTextWrapper>
        <Space />
        <LinkTextWrapper onClick={() => router.push("/dashboard/my-answers")}>
          <LinkText>My Answers</LinkText>
        </LinkTextWrapper>
      </CenterWrapper>
      <Btn onClick={() => toggleMenu(true)}>
        <BtnText>{user?.email}</BtnText>
      </Btn>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuVisible}
        onClose={() => toggleMenu(false)}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Btn
          style={{ minWidth: "unset" }}
          onClick={() => {
            router.push("/sign-in");
            auth.signOut();
            localStorage.clear();
          }}
        >
          <BtnText>Sign Out</BtnText>
        </Btn>
      </Menu>
    </Wrapper>
  );
}
export default NavBar;

const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 100;
`;

const Image = styled.img``;

const CenterWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const LinkTextWrapper = styled.div``;

const LinkText = styled.p`
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  color: #3a3a3c;
  text-decoration: none;
`;

const Btn = styled.div`
  border: 0.5px solid #8e8e93;
  border-radius: 14px;
  padding: 12px 20px;
  margin-right: 40px;
  cursor: pointer;
  min-width: 150px;
  min-height: 44px;
  background-color: #fff;
`;

const BtnText = styled.p`
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
`;

const Space = styled.div`
  width: 32px;
`;
