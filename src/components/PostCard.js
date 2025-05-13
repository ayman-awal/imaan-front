import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
} from "@mui/material";
import LongMenu from "./LongMenu";
import { useAuth } from "@/context/AuthContext";

function PostCard({ title, question, onClick }) {
  const { isAdmin } = useAuth();

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        mb: 3,
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
      }}
    >
      {isAdmin && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <LongMenu />
        </Box>
      )}

      <CardContent sx={{ pt: isAdmin ? 0 : 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            color: "#333",
            mb: 1.5,
            letterSpacing: "0.5px",
          }}
        >
          {title.length > 85 ? `${title.substring(0, 85)}...` : title}
        </Typography>

        <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.8 }}>
          {question.length > 175 ? (
            <>
              {question.substring(0, 175)}
              <Link
                component="button"
                sx={{
                  fontSize: "0.875rem",
                  color: "#007BFF",
                  paddingLeft: 0.5,
                  display: "inline-block",
                  fontWeight: 400,
                  textDecoration: "none",
                }}
              >
                ...read more
              </Link>
            </>
          ) : (
            question
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;
