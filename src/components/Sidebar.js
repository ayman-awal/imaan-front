import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
  Button
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LoginModal from "./modals/LoginModal";
import { useAuth } from "@/context/AuthContext";

const ProfileSidebar = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false);

  return (
    <>
      {user ? (
        <Box
          sx={{
            maxWidth: 260,
            backgroundColor: "#fff",
            p: 3,
            mt: 5,
            borderRadius: 3,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            height: "fit-content",
          }}
        >
          <Stack spacing={2} alignItems="center" mb={2}>
            <Avatar
              src={user?.avatarUrl || ""}
              sx={{ width: 80, height: 80 }}
            />
            <Typography variant="h6">{user?.name}</Typography>
          </Stack>

          <Divider sx={{ mb: 1 }} />

          <List>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="View Profile" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="My Questions" />
            </ListItemButton>
          </List>
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: 260,
            backgroundColor: "#fff",
            p: 3,
            mt: 5,
            borderRadius: 3,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Welcome!</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 1, mb: 2 }}
          >
            Login to ask a question.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            LogIn
          </Button>
        </Box>
      )}
      <LoginModal openModal={openModal} closeModal={closeModal} />
    </>
  );
};

export default ProfileSidebar;
