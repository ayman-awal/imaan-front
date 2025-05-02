import React from "react";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Dashboard from "@/components/dashboard/Dashboard";

function DashboardPage() {
  return (
    <ProtectedRoute checkAdmin={true}>
      <Dashboard />
    </ProtectedRoute>
  );
}

export default DashboardPage;
