import React, { useState } from "react";
// import TabNavigation from "../common/TabNavigation";
import PostCard from "../PostCard";

function QuestionReviewPanel({ pendingQuestions }) {

  return (
    <div>
      {pendingQuestions.map((q, i) => (
        <PostCard title={q.title} question={q.question} onClick={null} />
      ))}
    </div>
  );
}

export default QuestionReviewPanel;
