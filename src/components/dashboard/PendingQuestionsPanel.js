import React, { useState } from "react";
import { useRouter } from "next/router";
// import TabNavigation from "../common/TabNavigation";
import PostCard from "../PostCard";

function PendingQuestionsPanel({ pendingQuestions }) {
  const router = useRouter();

  return (
    <div>
      {pendingQuestions.map((q, i) => (
        <PostCard key={i} title={q.title} question={q.question} onClick={() => router.push(`/dashboard/review/${q.id}`)} />
      ))}
    </div>
  );
}

export default PendingQuestionsPanel;
