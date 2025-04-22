import React, { useState } from "react";
import GutterlessList from "../common/GutterlessList";
import { IconButton, Typography } from "@mui/material";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Questions");

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
            tabs={["Questions", "Articles", "Users"]}
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
