import React from "react";
import { useRouter } from "next/router";
import Answer from "@/components/Answer";

function AnswerPage() {
  const router = useRouter();
  const { postId } = router.query;

  return <Answer postId={postId} />;
}

export default AnswerPage;
