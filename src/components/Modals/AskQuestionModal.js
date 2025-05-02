import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SnackbarComponent from "../common/SnackbarComponent";

function AskQuestionModal({ open, handleClose, setSnackbar, token }) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [wordCount, setWordCount] = useState("");

  const createPost = async () => {
    try {
      if (title === "" || question === "") {
        setSnackbar({
          open: true,
          message: "Title and question both required",
          severity: "danger",
        });

        return;
      }
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/post`,
        {
          title,
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 201) {
        setSnackbar({
          open: true,
          message: "Question posted successfully",
          severity: "success",
        });
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/);

    if (words.length <= 150) {
      setQuestion(value);
      setWordCount(words.length);
    }

    if(question == ""){
      setWordCount("");
    }
  };

  // const wordCount = question.trim() === "" ? 0 : question.trim().split(/\s+/).length;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock={true}
    >
      <Box className="modal-style">
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 1 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="standard-basic"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
          />

          <TextField
            required
            id="outlined-multiline-static"
            label="Question"
            onChange={handleQuestionChange}
            multiline
            minRows={6}
            maxRows={15}
            value={question}
          />
          <Typography variant="body2" align="right" color="textSecondary">
            {wordCount}/150 words
          </Typography>
          <Button
            variant="contained"
            onClick={createPost}
            disabled={wordCount === 0 || title === ""}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AskQuestionModal;
