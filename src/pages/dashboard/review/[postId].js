import React from "react";
import { useRouter } from "next/router";
import ReviewQuestion from "@/components/dashboard/ReviewQuestion";

function ReviewPage() {
  const router = useRouter();
  const { postId } = router.query;
  return <ReviewQuestion postId={postId} />;
}

export default ReviewPage;
