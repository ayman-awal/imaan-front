import React from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import ReviewQuestion from "@/components/dashboard/ReviewQuestion";

function ReviewPage() {
  const router = useRouter();
  const { postId } = router.query;
  return (
    <ProtectedRoute checkAdmin={true}>
      <ReviewQuestion postId={postId} />
    </ProtectedRoute>
  );
}

export default ReviewPage;
