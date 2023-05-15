"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "`@/firebase`";

const settings = ["Sign-out"];

function NavBar() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: "#fff", padding: "0 40px" }}
    >
      <Toolbar disableGutters>
        <img src="img/logo.svg" />
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => router.push("/take-question")}
            sx={{
              color: "#3A3A3C",
              fontWeight: "bold",
            }}
          >
            Take Questions
          </Button>
          <Button
            onClick={() => router.push("/my-answers")}
            sx={{
              color: "#3A3A3C",
              fontWeight: "bold",
            }}
          >
            My Answers
          </Button>
        </Box>
        <Box>
          <Tooltip title="Sign-out">
            <Button
              sx={{
                background: "white",
                color: "#3A3A3C",
                border: "1px solid #3A3A3C",
                borderRadius: 14,
              }}
              size="small"
              variant="outlined"
              onClick={handleOpenUserMenu}
            >
              {user?.email}
            </Button>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
