import React, { useState } from "react";
import { useRouter } from "next/router";
import PostCard from "../PostCard";
import TabNavigation from "../common/TabNavigation";
import PostSkeleton from "../skeleton/PostSkeleton";

function QuestionsPanel({ loading, answeredQuestions, unansweredQuestions }) {
  const router = useRouter();
  const [value, setValue] = useState(0);

  return (
    <div>
      <TabNavigation
        value={value}
        setValue={setValue}
        labels={["Answered questions", "Unanswered questions"]}
      />

      {loading ? (
        <div>
          {[...Array(5)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : value === 0 ? (
        answeredQuestions.length > 0 ? (
          answeredQuestions.map((q, i) => (
            <PostCard
              key={i}
              title={q.title}
              question={q.question}
              onClick={() => router.push(`/answers/${q.id}`)}
            />
          ))
        ) : (
          <div className="no-posts">No answered questions</div>
        )
      ) : value === 1 ? (
        unansweredQuestions.length > 0 ? (
          unansweredQuestions.map((q, i) => (
            <PostCard
              key={i}
              title={q.title}
              question={q.question}
              onClick={null}
            />
          ))
        ) : (
          <div className="no-posts">No unanswered questions</div>
        )
      ) : null}
    </div>
  );
}

export default QuestionsPanel;
