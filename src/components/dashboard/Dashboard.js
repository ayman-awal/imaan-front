import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import GutterlessList from "../common/GutterlessList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Typography, Box } from "@mui/material";
import PendingQuestionsPanel from "./PendingQuestionsPanel";

function Dashboard() {
  const router = useRouter();
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Pending questions");

  useEffect(() => {
    const token = localStorage.getItem("imaanToken");

    const fetchUnpublishedQuestions = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/unpublished`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setPendingQuestions(res.data.posts);
      }
    };
    fetchUnpublishedQuestions();
  }, []);

  const handleBack = () => {
    router.back();
  };

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
          Dashboard
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
            tabs={["Pending questions", "Articles", "Users"]}
          />
        </Box>

        <Box sx={{ flex: 7 }}>
          {selectedTab === "Pending questions" && (
            <PendingQuestionsPanel pendingQuestions={pendingQuestions} />
          )}

          {selectedTab === "Articles" && (
            <Typography variant="h6">Articles coming soon...</Typography>
          )}

          {selectedTab === "Users" && (
            <Typography variant="h6">Users coming soon...</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
