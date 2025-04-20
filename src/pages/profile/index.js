import React from "react";
import Profile from "@/components/Profile/Profile";
import ProtectedRoute from "@/components/ProtectedRoute";

function ProfilePage() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}

export default ProfilePage;
