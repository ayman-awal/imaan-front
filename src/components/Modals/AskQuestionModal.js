import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function AskQuestionModal({ open, handleClose, setSnackbar, token }) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const createPost = async () => {
    try {
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
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            required
            id="standard-basic"
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
            style={{ width: "100%" }}
          />

          <TextField
            required
            id="outlined-multiline-static"
            label="Question"
            onChange={(e) => {
              const value = e.target.value;
              const words = value.trim().split(/\s+/);
              if (words.length <= 150) {
                setQuestion(value);
              }
            }}
            multiline
            minRows={6}
            maxRows={15}
            style={{ width: "100%" }}
          />
          <span>
            {question.trim() === ""
              ? 0
              : question.trim().split(/\s+/).length <= 150
              ? question.trim().split(/\s+/).length
              : 150}
            /150 words
          </span>
          <Button variant="contained" onClick={createPost}>
            Post
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AskQuestionModal;
