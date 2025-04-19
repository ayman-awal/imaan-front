import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginModal from "./Modals/LoginModal";
import { jwtDecode } from 'jwt-decode';

export default function MenuAppBar() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nameInitial, setNameInitial] = useState("")
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const closeModal = () => setOpenModal(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("imaanToken");
    setIsLoggedIn(false);
    setAnchorEl(null);
    localStorage.removeItem("isAdmin");
  }

  const handleProfileRedirect = () => {
    router.push("/profile");
  };
  
  useEffect(() => {
    const token = localStorage.getItem("imaanToken");

    if (token){
      try {
        const decoded = jwtDecode(token);
        const isTokenExpired = decoded.exp * 1000 < Date.now();
  
        if (!isTokenExpired) {
          setIsLoggedIn(true);
          const name = decoded?.name
          setNameInitial(name.charAt(0).toUpperCase());
          localStorage.setItem("isAdmin", decoded.userType === "admin" ? "true" : "false");
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("imaanToken");
          localStorage.removeItem("isAdmin");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#555",
          color: "#fff",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            [Imaan Academy Logo]
          </Typography>
          {
            <div>
              {isLoggedIn ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>{nameInitial}</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<AccountCircleIcon />}
                  sx={{ color: "white", borderColor: "white" }}
                  onClick={() => setOpenModal(true)}
                >
                  Login
                </Button>
              )}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleProfileRedirect}>
                  <Avatar /> My Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
      <LoginModal openModal={openModal} closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} />
    </Box>
  );
}
