import React, { useState } from "react";
import { useRouter } from "next/router";
import PostCard from "../PostCard";
import TabNavigation from "../common/TabNavigation";
import PostSkeleton from "../skeleton/PostSkeleton";
import { Box, Typography } from "@mui/material";

function QuestionsPanel({ loading, answeredQuestions, unansweredQuestions }) {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const noPostsTextStyle = {
    color: "#555",
    fontSize: "22px",
    fontWeight: 700,
  };


  return (
    <Box>
      <TabNavigation
        value={value}
        setValue={setValue}
        labels={["Answered questions", "Unanswered questions"]}
      />

      {loading ? (
        <Box>
          {[...Array(5)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </Box>
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
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography sx={noPostsTextStyle}>
              No answered questions
            </Typography>
          </Box>
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
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography sx={noPostsTextStyle}>
              No answered questions
            </Typography>
          </Box>
        )
      ) : null}
    </Box>
  );
}

export default QuestionsPanel;
