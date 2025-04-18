import React, { useState } from "react";
import { useRouter } from "next/router";
import GutterlessList from "./GutterlessList";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuestionsPanel from "./QuestionsPanel";

function Profile() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("My Questions");
  const [answeredQuestions, setAnsweredQuestions] = useState([
    {title: "A1", question: "A1", onClick: null},
    {title: "A2", question: "A2", onClick: null},
    {title: "A3", question: "A3", onClick: null},
    {title: "A4", question: "A4", onClick: null},
    {title: "A5", question: "A5", onClick: null},
    {title: "A6", question: "A6", onClick: null}
  ]);

  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState([
    {title: "uA1", question: "uA1", onClick: null},
    {title: "uA2", question: "uA2", onClick: null},
    {title: "uA3", question: "uA3", onClick: null},
    {title: "uA4", question: "uA4", onClick: null},
  ]);

  const handleBack = () => {
    router.back();
  };

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
              answeredQuestions={answeredQuestions}
              unAnsweredQuestions={unAnsweredQuestions}
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
