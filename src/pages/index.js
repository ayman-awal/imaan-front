// import React from "react";
// import Feed from "@/components/Feed";
// import ProfileSidebar from "@/components/Sidebar";

// const HomePage = () => {
//   return (
//     <div>
//       <div className="container">
//         <ProfileSidebar />
//         <Feed />
//       </div>
//     </div>
//   );
// };

// export default HomePage;

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
      }}
    >
      <Box sx={{ width: "20%" }}>
        <ProfileSidebar />
      </Box>

      <Box sx={{ width: "60%" }}>
        <Feed />
      </Box>

    </Box>
  );
};

export default HomePage;
