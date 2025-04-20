import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Box,
  Button,
  ListItemIcon,
} from "@mui/material";
import { AccountCircle as AccountCircleIcon, Logout, Settings } from "@mui/icons-material";
import LoginModal from "./Modals/LoginModal";
import { useAuth } from "@/context/AuthContext";

export default function MenuAppBar() {
  const router = useRouter();
  const { isLoggedIn, logout, nameInitial } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const closeModal = () => setOpenModal(false);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  
  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleProfileRedirect = () => {
    router.push("/profile");
  };

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
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {nameInitial}
                      </Avatar>
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
                disableScrollLock={true}
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
      <LoginModal
        openModal={openModal}
        closeModal={closeModal}
      />
    </Box>
  );
}
