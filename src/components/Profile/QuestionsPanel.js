import React from "react";
import { useState } from "react";
import PostCard from "../PostCard";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function QuestionsPanel({ answeredQuestions, unansweredQuestions }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#fff",
          borderRadius: "10px",
          py: 1,
          marginBottom: "15px",
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Answered questions" />
          <Tab label="Unanswered questions" />
        </Tabs>
      </Box>
      {value == 0
        ? answeredQuestions.map((q, i) => (
            <PostCard
              title={q.title}
              question={q.question}
              onClick={q.onClick}
            />
          ))
        : unansweredQuestions.map((q, i) => (
            <PostCard
              title={q.title}
              question={q.question}
              onClick={q.onClick}
            />
          ))}
    </div>
  );
}

export default QuestionsPanel;
