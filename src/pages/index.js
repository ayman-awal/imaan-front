import React from "react";
import Feed from "@/components/Feed";
import ProfileSidebar from "@/components/Sidebar";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 2,
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          flexBasis: { xs: "100%", sm: "30%", md: "20%" },
          maxWidth: { xs: "100%", sm: "30%", md: "20%" },
          mb: { xs: 3, md: 0 },
          display: { xs: "none", sm: "block" }
        }}
      >
        <ProfileSidebar />
      </Box>

      <Box
        sx={{
          flexBasis: { xs: "100%", sm: "65%", md: "60%" },
          maxWidth: { xs: "100%", sm: "65%", md: "60%" },
        }}
      >
        <Feed />
      </Box>
    </Box>
  );
};

export default HomePage;
