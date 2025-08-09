import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import GutterlessList from "../common/GutterlessList";
import { IconButton, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuestionsPanel from "./QuestionsPanel";
import BookmarkPanel from "./BookmarkPanel";
import SettingsPanel from "./SettingsPanel";

function Profile() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("My Questions");
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const token = localStorage.getItem("imaanToken");

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAnsweredQuestions(response.data.posts.answered);
          setUnansweredQuestions(response.data.posts.unanswered);
          setBookmarks(response.data.posts.bookmarks);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Box className="profile-container" sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.4,
          }}
        >
          My Profile
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
        }}
      >
        <Box sx={{ flex: 3 }}>
          <GutterlessList
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={["My Questions", "Bookmarks", "Account Settings"]}
          />
        </Box>

        <Box sx={{ flex: 7 }}>
          {selectedTab === "My Questions" && (
            <QuestionsPanel
              loading={loading}
              answeredQuestions={answeredQuestions}
              unansweredQuestions={unansweredQuestions}
            />
          )}

          {selectedTab === "Bookmarks" && <BookmarkPanel bookmarks={bookmarks} />}

          {selectedTab === "Account Settings" && <SettingsPanel />}
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
