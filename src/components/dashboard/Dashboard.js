import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import GutterlessList from "../common/GutterlessList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Typography } from "@mui/material";
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

      if (res.status == 200) {
        setPendingQuestions(res.data.posts);
      }
    };
    fetchUnpublishedQuestions();
  }, []);

  return (
    <div className="profile-container">
      <IconButton onClick={() => router.back()} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
        <div style={{ flex: 3 }}>
          <GutterlessList
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={["Pending questions", "Articles", "List of users"]}
          />
        </div>
        <div style={{ flex: 7 }}>
          {selectedTab === "Pending questions" && (
            <PendingQuestionsPanel pendingQuestions={pendingQuestions} />
          )}

          {selectedTab === "Articles" && (
            <Typography variant="h6">Articles</Typography>
          )}

          {selectedTab === "List of users" && (
            <Typography variant="h6">Users</Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
