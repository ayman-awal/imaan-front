import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import GutterlessList from "./GutterlessList";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuestionsPanel from "./QuestionsPanel";

function Profile() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("My Questions");
  const [loading, setLoading] = useState(true);
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

        if (response.status == 200) {
          console.log(response.data);
          setAnsweredQuestions(response.data.posts.answered);
          setUnansweredQuestions(response.data.posts.unanswered);
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
    <div className="profile-container">
      <IconButton onClick={handleBack} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
        <div style={{ flex: 3 }}>
          <GutterlessList
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>

        <div style={{ flex: 7 }}>
          {selectedTab === "My Questions" && (
            <QuestionsPanel
              loading={loading}
              answeredQuestions={answeredQuestions}
              unansweredQuestions={unansweredQuestions}
            />
          )}

          {selectedTab === "Saved" && (
            <Typography variant="h6">Your saved items.</Typography>
          )}

          {selectedTab === "Account Settings" && (
            <Typography variant="h6">Your account settings.</Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
