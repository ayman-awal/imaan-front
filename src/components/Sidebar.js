// import React from "react";
// import { Box, Avatar, Typography, Button, Stack } from "@mui/material";
// import { useAuth } from "@/context/AuthContext";

// const ProfileSidebar = () => {
//   const { user } = useAuth();

//   return (
//     <Box
//       sx={{
//         maxWidth: 260,
//         backgroundColor: "#fff",
//         p: 3,
//         mt: 5,
//         borderRadius: 3,
//         boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//         height: "fit-content",
//       }}
//     >
//       <Stack spacing={2} alignItems="center">
//         <Avatar
//           src={user?.avatarUrl || ""}
//           sx={{ width: 80, height: 80 }}
//         />
//         <Typography variant="h6">{user?.name}</Typography>
//         <Typography variant="body2" color="textSecondary" textAlign="center">
//           {user?.bio || "No bio available"}
//         </Typography>

//         <Button fullWidth variant="outlined" size="small" sx={{ mt: 2 }}>
//           View Profile
//         </Button>
//         <Button fullWidth variant="outlined" size="small">
//           Bookmarks
//         </Button>
//         <Button fullWidth variant="outlined" size="small">
//           My Questions
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default ProfileSidebar;

import React from "react";
import { Box, Avatar, Typography, Button, Stack } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

const ProfileSidebar = () => {
  const { user } = useAuth();

  if (!user) {
    return (
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
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
          Sign in to view your profile and saved content.
        </Typography>
        <Button fullWidth variant="contained">
          Log In
        </Button>
      </Box>
    );
  }

  return (
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
      <Stack spacing={2} alignItems="center">
        <Avatar
          src={user?.avatarUrl || ""}
          sx={{ width: 80, height: 80 }}
        />
        <Typography variant="h6">{user?.name}</Typography>
        <Typography variant="body2" color="textSecondary" textAlign="center">
          {user?.bio || "No bio available"}
        </Typography>

        <Button fullWidth variant="outlined" size="small" sx={{ mt: 2 }}>
          View Profile
        </Button>
        <Button fullWidth variant="outlined" size="small">
          Bookmarks
        </Button>
        <Button fullWidth variant="outlined" size="small">
          My Questions
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfileSidebar;
